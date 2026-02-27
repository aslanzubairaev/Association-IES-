import { NextResponse } from "next/server";
import { helpFlowConfig } from "@/lib/helpFlow/config";
import { checkRateLimit, getClientIp } from "@/lib/helpFlow/rateLimit";
import type {
  HelpBubbleOption,
  HelpFollowUpAnswer,
  HelpNextQuestionRequest,
  HelpNextQuestionResponse,
} from "@/lib/helpFlow/types";

export const runtime = "nodejs";

const MAX_FOLLOW_UP_QUESTIONS = 3;

type OpenAiNextQuestionOutput = {
  done?: boolean;
  next_question?: string;
  next_options?: string[];
  summary_label?: string;
  guidance?: string;
};

type QuestionAxis = "blocking" | "deadline" | "documents" | "support" | "other";
type IntakeGap = "blocking" | "deadline_or_official_notice" | "documents" | "history" | "other";

type IntakeSignals = {
  hasUrgencyOrDeadline: boolean;
  hasOfficialNotice: boolean;
  hasDocuments: boolean;
  hasActionHistory: boolean;
  hasPreferredContact: boolean;
};

type IntakeContext = {
  knownFacts: string[];
  askedAxes: QuestionAxis[];
  signals: IntakeSignals;
  missingGaps: IntakeGap[];
};

function isOptionArray(value: unknown): value is HelpBubbleOption[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { id?: unknown }).id === "string" &&
        typeof (item as { label?: unknown }).label === "string",
    )
  );
}

function isAnswersArray(value: unknown): value is HelpFollowUpAnswer[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { question?: unknown }).question === "string" &&
        typeof (item as { answerLabel?: unknown }).answerLabel === "string" &&
        typeof (item as { answerText?: unknown }).answerText === "string" &&
        ((item as { source?: unknown }).source === "bubble" || (item as { source?: unknown }).source === "manual"),
    )
  );
}

function extractJsonObject(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    return JSON.parse(trimmed) as OpenAiNextQuestionOutput;
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;

    try {
      return JSON.parse(trimmed.slice(start, end + 1)) as OpenAiNextQuestionOutput;
    } catch {
      return null;
    }
  }
}

function makeOptionId(label: string, index: number) {
  const slug = label
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return slug ? `ai-${slug}` : `ai-${index + 1}`;
}

function normalizeOptions(options: string[]) {
  const unique = Array.from(new Set(options.map((item) => item.trim()).filter(Boolean))).slice(0, 5);
  return unique.map((label, index) => ({
    id: makeOptionId(label, index),
    label: label.slice(0, 90),
  }));
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toTokenSet(value: string) {
  return new Set(
    normalizeText(value)
      .split(" ")
      .map((token) => token.trim())
      .filter((token) => token.length >= 3),
  );
}

function jaccardSimilarity(left: Set<string>, right: Set<string>) {
  if (left.size === 0 || right.size === 0) return 0;
  let intersection = 0;
  for (const token of left) {
    if (right.has(token)) intersection += 1;
  }
  const union = left.size + right.size - intersection;
  return union > 0 ? intersection / union : 0;
}

function detectQuestionAxis(text: string): QuestionAxis {
  const normalized = normalizeText(text);
  if (!normalized) return "other";

  if (
    /(date limite|urgent|urgence|delai|délai|convocation|courrier|7 jours|30 jours|deadline|urgent|срочн|срок|повестк|письм)/.test(
      normalized,
    )
  ) {
    return "deadline";
  }
  if (/(document|papier|justificatif|piece|pi[eè]ce|fichier|doc|документ|справк|файл|бумаг)/.test(normalized)) {
    return "documents";
  }
  if (/(bloque|blocage|probleme|probl[eè]me|difficulte|difficult[eé]|ne comprends|не понимаю|проблем|трудн)/.test(normalized)) {
    return "blocking";
  }
  if (/(contact|rappel|rdv|accompagnement|suivi|support|callback|как связ|помощ|сопровожден|контакт)/.test(normalized)) {
    return "support";
  }
  return "other";
}

function isQuestionTooSimilar(question: string, answers: HelpFollowUpAnswer[]) {
  const normalizedQuestion = normalizeText(question);
  if (!normalizedQuestion) return true;

  const nextAxis = detectQuestionAxis(normalizedQuestion);
  const nextTokens = toTokenSet(normalizedQuestion);

  return answers.some((answer) => {
    const previous = normalizeText(answer.question);
    if (!previous) return false;

    if (previous === normalizedQuestion) return true;
    if (previous.length >= 24 && normalizedQuestion.includes(previous)) return true;
    if (normalizedQuestion.length >= 24 && previous.includes(normalizedQuestion)) return true;

    const similarity = jaccardSimilarity(nextTokens, toTokenSet(previous));
    if (similarity >= 0.55) return true;

    const previousAxis = detectQuestionAxis(previous);
    return nextAxis !== "other" && previousAxis === nextAxis;
  });
}

function filterOptionsAgainstPreviousAnswers(options: HelpBubbleOption[], answers: HelpFollowUpAnswer[]) {
  if (!answers.length) return options;

  const used = new Set(
    answers.flatMap((answer) => {
      const label = normalizeText(answer.answerLabel);
      const text = normalizeText(answer.answerText);
      return [label, text].filter(Boolean);
    }),
  );

  const filtered = options.filter((option) => !used.has(normalizeText(option.label)));
  return filtered.length >= 2 ? filtered : options;
}

function buildKnownFacts(payload: HelpNextQuestionRequest) {
  const facts: string[] = [];
  if (payload.primary.label.trim()) {
    facts.push(`Primary topic: ${payload.primary.label.trim()}`);
  }
  if (payload.primary.userText.trim()) {
    facts.push(`Primary free text: ${payload.primary.userText.trim().slice(0, 200)}`);
  }
  for (const [index, answer] of payload.answers.entries()) {
    const question = answer.question.trim();
    const response = (answer.answerText || answer.answerLabel).trim();
    if (question && response) {
      facts.push(`Q${index + 1}: ${question} -> ${response.slice(0, 180)}`);
    }
  }
  return facts.slice(0, 8);
}

function extractIntakeSignals(payload: HelpNextQuestionRequest): IntakeSignals {
  const corpus = normalizeText(
    [
      payload.primary.label,
      payload.primary.userText,
      ...payload.answers.flatMap((answer) => [answer.question, answer.answerLabel, answer.answerText]),
    ].join(" "),
  );

  return {
    hasUrgencyOrDeadline:
      /(urgent|urgence|delai|date limite|deadline|sous [0-9]+ jours|convocation|courrier|срочн|срок|повестк|письм)/.test(
        corpus,
      ),
    hasOfficialNotice:
      /(prefecture|administration|ofii|caf|cpam|impot|impots|courrier|convocation|notification|письм|повестк|уведомлен|префект)/.test(
        corpus,
      ),
    hasDocuments:
      /(document|justificatif|papier|piece|piece justificative|scan|pdf|fichier|документ|справк|бумаг|файл)/.test(
        corpus,
      ),
    hasActionHistory:
      /(deja|j ai|jai|appele|appel|ecrit|email|rdv|rendez vous|demande envoyee|tent|essay|already|tried|уже|звонил|писал|ходил|подавал)/.test(
        corpus,
      ),
    hasPreferredContact:
      /(telephone|tel|rappel|contact|mail|email|callback|телефон|почта|связ)/.test(corpus),
  };
}

function buildIntakeContext(payload: HelpNextQuestionRequest): IntakeContext {
  const askedAxes = Array.from(
    new Set(payload.answers.map((answer) => detectQuestionAxis(answer.question)).filter((axis) => axis !== "other")),
  ) as QuestionAxis[];

  const signals = extractIntakeSignals(payload);
  const missingGaps: IntakeGap[] = [];

  if (!askedAxes.includes("blocking")) {
    missingGaps.push("blocking");
  }
  if (!signals.hasUrgencyOrDeadline || !signals.hasOfficialNotice) {
    missingGaps.push("deadline_or_official_notice");
  }
  if (!signals.hasDocuments) {
    missingGaps.push("documents");
  }
  if (!signals.hasActionHistory) {
    missingGaps.push("history");
  }
  if (missingGaps.length === 0) {
    missingGaps.push("other");
  }

  return {
    knownFacts: buildKnownFacts(payload),
    askedAxes,
    signals,
    missingGaps: Array.from(new Set(missingGaps)),
  };
}

function pickNextAxisFromContext(context: IntakeContext): QuestionAxis {
  if (context.missingGaps.includes("blocking") && !context.askedAxes.includes("blocking")) {
    return "blocking";
  }
  if (context.missingGaps.includes("deadline_or_official_notice") && !context.askedAxes.includes("deadline")) {
    return "deadline";
  }
  if (context.missingGaps.includes("documents") && !context.askedAxes.includes("documents")) {
    return "documents";
  }
  if (context.missingGaps.includes("history") && !context.askedAxes.includes("support")) {
    return "support";
  }
  if (!context.askedAxes.includes("support")) return "support";
  if (!context.askedAxes.includes("documents")) return "documents";
  if (!context.askedAxes.includes("deadline")) return "deadline";
  return "other";
}

async function nextQuestionWithOpenAi(payload: HelpNextQuestionRequest, context: IntakeContext) {
  const { apiKey, model, baseUrl, timeoutMs } = helpFlowConfig.openai;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const prompt = {
    locale: payload.locale,
    primary: payload.primary,
    answers: payload.answers,
    candidateOptions: payload.candidateOptions,
    constraints: {
      maxFollowUps: MAX_FOLLOW_UP_QUESTIONS,
      maxOptions: 5,
      maxQuestionLength: 120,
      maxOptionLength: 70,
    },
    workerObjective:
      "Collect maximum actionable information so human case workers can understand the case faster, prioritize urgency, and avoid asking repeated questions later.",
    intakeContext: {
      knownFacts: context.knownFacts,
      askedAxes: context.askedAxes,
      detectedSignals: context.signals,
      missingGaps: context.missingGaps,
      recommendedNextAxis: pickNextAxisFromContext(context),
    },
    stageHint:
      payload.answers.length === 0
        ? "First follow-up: identify the main blocking point."
        : payload.answers.length === 1
          ? "Second follow-up: ask about urgency, deadline, letter, or official notice."
          : "Third follow-up: ask for one concrete operational detail that changes processing priority.",
  };

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a support intake assistant. Return strict JSON with keys: done (boolean), next_question (string), next_options (array of strings), summary_label (string), guidance (string). Ask one simple follow-up question at a time. Prefer clickable options. Stop when enough details are gathered to route the request. Never ask the same or semantically similar question twice. Each new question must cover a different axis than previous questions. Use all known context before generating the next question. Prioritize information that saves worker time: urgency/deadline, official notice, documents available, and what has already been tried.",
          },
          {
            role: "user",
            content: JSON.stringify(prompt),
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };

    const content = data.choices?.[0]?.message?.content ?? "";
    if (!content) return null;

    const parsed = extractJsonObject(content);
    if (!parsed) return null;

    const summaryLabel =
      typeof parsed.summary_label === "string" && parsed.summary_label.trim()
        ? parsed.summary_label.trim().slice(0, 100)
        : payload.answers[payload.answers.length - 1]?.answerLabel || payload.primary.label;

    const guidance =
      typeof parsed.guidance === "string" && parsed.guidance.trim()
        ? parsed.guidance.trim().slice(0, 140)
        : payload.locale === "fr"
          ? "Merci, nous continuons."
          : "Спасибо, продолжаем.";

    const done = Boolean(parsed.done) || payload.answers.length >= MAX_FOLLOW_UP_QUESTIONS;
    if (done) {
      return {
        source: "openai" as const,
        done: true,
        question: "",
        options: [] as HelpBubbleOption[],
        summaryLabel,
        guidance,
      };
    }

    const question =
      typeof parsed.next_question === "string" && parsed.next_question.trim()
        ? parsed.next_question.trim().slice(0, 130)
        : null;

    const options = Array.isArray(parsed.next_options) ? normalizeOptions(parsed.next_options) : [];

    if (!question || options.length < 2) {
      return null;
    }

    if (isQuestionTooSimilar(question, payload.answers)) {
      return null;
    }

    const filteredOptions = filterOptionsAgainstPreviousAnswers(options, payload.answers);

    return {
      source: "openai" as const,
      done: false,
      question,
      options: filteredOptions,
      summaryLabel,
      guidance,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function buildFallbackResponse(payload: HelpNextQuestionRequest): HelpNextQuestionResponse {
  const context = buildIntakeContext(payload);
  const locale = payload.locale;
  const fallbackGuidance = locale === "fr" ? "Merci, on continue." : "Спасибо, продолжаем.";
  const lastAnswer = payload.answers[payload.answers.length - 1];
  const summaryLabel = lastAnswer?.answerLabel || payload.primary.label;

  if (payload.answers.length >= MAX_FOLLOW_UP_QUESTIONS) {
    return {
      ok: true,
      source: "fallback",
      done: true,
      question: "",
      options: [],
      summaryLabel,
      guidance: fallbackGuidance,
    };
  }

  const nextAxis = pickNextAxisFromContext(context);
  if (nextAxis === "blocking") {
    return {
      ok: true,
      source: "fallback",
      done: false,
      question:
        locale === "fr"
          ? "Qu'est-ce qui bloque le plus pour vous maintenant ?"
          : "Что именно сейчас блокирует вас сильнее всего?",
      options: filterOptionsAgainstPreviousAnswers(payload.candidateOptions.slice(0, 5), payload.answers),
      summaryLabel,
      guidance: fallbackGuidance,
    };
  }

  if (nextAxis === "deadline") {
    return {
      ok: true,
      source: "fallback",
      done: false,
      question:
        locale === "fr"
          ? "Avez-vous un courrier, une convocation ou une date limite ?"
          : "Есть ли у вас письмо, повестка или крайний срок?",
      options:
        locale === "fr"
          ? [
              { id: "deadline-7", label: "Oui, sous 7 jours" },
              { id: "deadline-30", label: "Oui, sous 30 jours" },
              { id: "deadline-none", label: "Non, pas de date limite" },
              { id: "deadline-unknown", label: "Je ne sais pas" },
            ]
          : [
              { id: "deadline-7", label: "Да, в течение 7 дней" },
              { id: "deadline-30", label: "Да, в течение 30 дней" },
              { id: "deadline-none", label: "Нет, срока нет" },
              { id: "deadline-unknown", label: "Не знаю" },
            ],
      summaryLabel,
      guidance: fallbackGuidance,
    };
  }

  if (nextAxis === "documents") {
    return {
      ok: true,
      source: "fallback",
      done: false,
      question:
        locale === "fr"
          ? "Avez-vous des documents à transmettre pour traiter votre demande ?"
          : "Есть ли у вас документы, которые можно передать для обработки?",
      options:
        locale === "fr"
          ? [
              { id: "docs-ready", label: "Oui, documents prêts" },
              { id: "docs-partial", label: "J'en ai une partie" },
              { id: "docs-none", label: "Non, aucun document" },
              { id: "docs-unknown", label: "Je ne sais pas lesquels fournir" },
            ]
          : [
              { id: "docs-ready", label: "Да, документы готовы" },
              { id: "docs-partial", label: "Есть только часть" },
              { id: "docs-none", label: "Нет документов" },
              { id: "docs-unknown", label: "Не знаю, какие нужны" },
            ],
      summaryLabel,
      guidance: fallbackGuidance,
    };
  }

  if (nextAxis === "support") {
    return {
      ok: true,
      source: "fallback",
      done: false,
      question:
        locale === "fr"
          ? "Qu'avez-vous déjà essayé pour résoudre ce problème ?"
          : "Что вы уже пробовали сделать по этому вопросу?",
      options:
        locale === "fr"
          ? [
              { id: "history-nothing", label: "Rien pour l'instant" },
              { id: "history-contacted", label: "J'ai appelé ou écrit" },
              { id: "history-rdv", label: "J'ai déjà un rendez-vous" },
              { id: "history-unknown", label: "Je ne sais pas quoi faire" },
            ]
          : [
              { id: "history-nothing", label: "Пока ничего" },
              { id: "history-contacted", label: "Уже звонил/писал" },
              { id: "history-rdv", label: "У меня уже есть запись" },
              { id: "history-unknown", label: "Не знаю, что делать" },
            ],
      summaryLabel,
      guidance: fallbackGuidance,
    };
  }

  return {
    ok: true,
    source: "fallback",
    done: true,
    question: "",
    options: [],
    summaryLabel,
    guidance: fallbackGuidance,
  };
}

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = checkRateLimit({
    key: `help-next-question:${ip}`,
    maxRequests: helpFlowConfig.rateLimit.classifyMaxRequests,
    windowMs: helpFlowConfig.rateLimit.classifyWindowMs,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please retry in a moment." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const payload = body as Partial<HelpNextQuestionRequest>;
  const locale = payload.locale === "fr" || payload.locale === "ru" ? payload.locale : null;

  if (!locale || !payload.primary || typeof payload.primary.label !== "string") {
    return NextResponse.json({ error: "Missing or invalid next-question fields." }, { status: 400 });
  }

  if (!isAnswersArray(payload.answers)) {
    return NextResponse.json({ error: "Invalid answers array." }, { status: 400 });
  }

  if (!isOptionArray(payload.candidateOptions) || payload.candidateOptions.length === 0) {
    return NextResponse.json({ error: "Invalid candidate options." }, { status: 400 });
  }

  const normalizedPayload: HelpNextQuestionRequest = {
    locale,
    primary: {
      id: typeof payload.primary.id === "string" ? payload.primary.id : null,
      label: payload.primary.label.trim().slice(0, 100),
      userText: typeof payload.primary.userText === "string" ? payload.primary.userText.trim().slice(0, 500) : "",
      source:
        payload.primary.source === "bubble" || payload.primary.source === "ai" || payload.primary.source === "manual"
          ? payload.primary.source
          : "manual",
      confidence: typeof payload.primary.confidence === "number" ? payload.primary.confidence : undefined,
    },
    answers: payload.answers.slice(0, 8).map((answer) => ({
      question: answer.question.trim().slice(0, 160),
      answerLabel: answer.answerLabel.trim().slice(0, 100),
      answerText: answer.answerText.trim().slice(0, 500),
      source: answer.source,
    })),
    candidateOptions: payload.candidateOptions.slice(0, 8).map((option) => ({
      id: option.id.trim().slice(0, 80),
      label: option.label.trim().slice(0, 100),
    })),
  };

  const context = buildIntakeContext(normalizedPayload);
  const aiResult = await nextQuestionWithOpenAi(normalizedPayload, context);
  if (aiResult) {
    const response: HelpNextQuestionResponse = {
      ok: true,
      source: "openai",
      done: aiResult.done,
      question: aiResult.question,
      options: aiResult.options,
      summaryLabel: aiResult.summaryLabel,
      guidance: aiResult.guidance,
    };
    return NextResponse.json(response);
  }

  return NextResponse.json(buildFallbackResponse(normalizedPayload));
}
