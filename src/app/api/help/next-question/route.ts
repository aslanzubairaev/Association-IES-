import { NextResponse } from "next/server";
import { aideCopy } from "@/content/aideCopy";
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

const FALLBACK_ADVICE: Record<string, Record<"fr" | "ru", string[]>> = {
  prefecture_vnj: {
    fr: [
      "Photographiez le courrier recto-verso d\u00e8s r\u00e9ception",
      "Notez la date limite mentionn\u00e9e dans le courrier",
      "Rassemblez passeport, justificatif de domicile et photos d'identit\u00e9",
      "V\u00e9rifiez votre r\u00e9c\u00e9piss\u00e9 : est-il encore valide ?",
    ],
    ru: [
      "\u0421\u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043f\u0438\u0441\u044c\u043c\u043e \u0441 \u0434\u0432\u0443\u0445 \u0441\u0442\u043e\u0440\u043e\u043d",
      "\u0417\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043a\u0440\u0430\u0439\u043d\u0438\u0439 \u0441\u0440\u043e\u043a \u0438\u0437 \u043f\u0438\u0441\u044c\u043c\u0430",
      "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u044c\u0442\u0435 \u043f\u0430\u0441\u043f\u043e\u0440\u0442, \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u0430\u0434\u0440\u0435\u0441\u0430 \u0438 \u0444\u043e\u0442\u043e",
      "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u0440\u043e\u043a \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0440\u0435\u043a\u0430\u043f\u0438\u0441\u0441\u0435",
    ],
  },
  caf_support: {
    fr: [
      "Notez votre num\u00e9ro allocataire avant de nous \u00e9crire",
      "Photographiez le courrier CAF recto-verso",
      "V\u00e9rifiez dans votre espace si des documents sont demand\u00e9s",
      "Gardez une copie de chaque document envoy\u00e9",
    ],
    ru: [
      "\u0417\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 allocataire",
      "\u0421\u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043f\u0438\u0441\u044c\u043c\u043e CAF \u0441 \u0434\u0432\u0443\u0445 \u0441\u0442\u043e\u0440\u043e\u043d",
      "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0432 \u043b\u0438\u0447\u043d\u043e\u043c \u043a\u0430\u0431\u0438\u043d\u0435\u0442\u0435, \u043a\u0430\u043a\u0438\u0435 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b \u0437\u0430\u043f\u0440\u043e\u0448\u0435\u043d\u044b",
      "\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0439\u0442\u0435 \u043a\u043e\u043f\u0438\u044e \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u043e\u0433\u043e \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430",
    ],
  },
  cpam_health: {
    fr: [
      "Notez votre num\u00e9ro de s\u00e9curit\u00e9 sociale",
      "Photographiez le courrier CPAM recto-verso",
      "V\u00e9rifiez votre attestation de droits sur ameli.fr",
      "Rassemblez pi\u00e8ce d'identit\u00e9 et justificatif de domicile",
    ],
    ru: [
      "\u0417\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 s\u00e9curit\u00e9 sociale",
      "\u0421\u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043f\u0438\u0441\u044c\u043c\u043e CPAM \u0441 \u0434\u0432\u0443\u0445 \u0441\u0442\u043e\u0440\u043e\u043d",
      "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u0432\u043e\u0438 \u043f\u0440\u0430\u0432\u0430 \u043d\u0430 ameli.fr",
      "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u044c\u0442\u0435 \u0443\u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u0435\u043d\u0438\u0435 \u043b\u0438\u0447\u043d\u043e\u0441\u0442\u0438 \u0438 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u0430\u0434\u0440\u0435\u0441\u0430",
    ],
  },
  france_travail: {
    fr: [
      "Photographiez le courrier ou la convocation",
      "Notez la date et l'heure du rendez-vous (si mentionn\u00e9)",
      "Pr\u00e9parez votre pi\u00e8ce d'identit\u00e9 et titre de s\u00e9jour",
      "Connectez-vous \u00e0 votre espace France Travail",
    ],
    ru: [
      "\u0421\u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043f\u0438\u0441\u044c\u043c\u043e \u0438\u043b\u0438 \u043f\u043e\u0432\u0435\u0441\u0442\u043a\u0443",
      "\u0417\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0438 \u0432\u0440\u0435\u043c\u044f \u0437\u0430\u043f\u0438\u0441\u0438 (\u0435\u0441\u043b\u0438 \u0443\u043a\u0430\u0437\u0430\u043d\u044b)",
      "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u044c\u0442\u0435 \u0443\u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u0435\u043d\u0438\u0435 \u043b\u0438\u0447\u043d\u043e\u0441\u0442\u0438 \u0438 titre de s\u00e9jour",
      "\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u043b\u0438\u0447\u043d\u044b\u0439 \u043a\u0430\u0431\u0438\u043d\u0435\u0442 France Travail",
    ],
  },
  housing_school_everyday: {
    fr: [
      "Rassemblez les courriers re\u00e7us li\u00e9s au sujet",
      "Notez votre ville/quartier et le service concern\u00e9",
      "Pr\u00e9parez un justificatif de domicile r\u00e9cent",
    ],
    ru: [
      "\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0441\u0435 \u043f\u0438\u0441\u044c\u043c\u0430 \u043f\u043e \u0442\u0435\u043c\u0435",
      "\u0417\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0433\u043e\u0440\u043e\u0434/\u0440\u0430\u0439\u043e\u043d \u0438 \u043d\u0443\u0436\u043d\u0443\u044e \u0441\u043b\u0443\u0436\u0431\u0443",
      "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u044c\u0442\u0435 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u0430\u0434\u0440\u0435\u0441\u0430",
    ],
  },
  not_sure: {
    fr: [
      "Photographiez le document qui vous inqui\u00e8te",
      "Notez les dates cl\u00e9s mentionn\u00e9es",
      "D\u00e9crivez votre situation en quelques phrases",
    ],
    ru: [
      "\u0421\u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0435\u0441\u043f\u043e\u043a\u043e\u0438\u0442",
      "\u0417\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0435 \u0434\u0430\u0442\u044b",
      "\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044e \u0432 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445",
    ],
  },
};

function getTopicData(primaryId: string | null, locale: "fr" | "ru") {
  if (!primaryId) return null;
  return aideCopy[locale].topics.items.find((t) => t.topicKey === primaryId) ?? null;
}

type OpenAiNextQuestionOutput = {
  done?: boolean;
  next_question?: string;
  next_options?: string[];
  summary_label?: string;
  guidance?: string;
  immediate_advice?: string[];
  urgency_level?: string;
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

  const topicData = getTopicData(payload.primary.id, payload.locale);
  const langLabel = payload.locale === "fr" ? "français" : "russe";

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
    topicContext: topicData
      ? { title: topicData.title, examples: topicData.examples, prepareLine: topicData.prepareLine }
      : null,
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

  const systemPrompt = `Tu es un assistant d'accueil bienveillant pour une association qui aide les immigrés en France.
Tu parles ${langLabel}.

${topicData ? `CONTEXTE DU SUJET : "${topicData.title}" — exemples : ${topicData.examples.slice(0, 2).join(", ")}. À préparer : ${topicData.prepareLine}` : ""}

RÈGLES :
1. JSON strict : { done, next_question, next_options, summary_label, guidance, immediate_advice, urgency_level }
2. Une seule question à la fois, < 120 caractères. Ton chaleureux et rassurant.
3. 3-5 options cliquables, < 70 caractères chacune. Formulées comme des situations concrètes, pas des catégories abstraites.
4. Ne JAMAIS répéter une question déjà posée ni un axe déjà couvert.
5. Quand done=true :
   - immediate_advice : 3-5 conseils CONCRETS et ACTIONNABLES que la personne peut faire MAINTENANT.
     Exemples bons : "Photographiez le courrier recto-verso", "Notez la date limite mentionnée"
     Exemples mauvais : "Restez positif", "N'hésitez pas à nous contacter"
   - urgency_level : "high" si deadline < 15 jours ou convocation ou risque perte de droits ;
     "medium" si courrier officiel ou délai à venir ; "low" sinon
6. guidance : une phrase d'encouragement contextuelle en ${langLabel}, pas générique
7. Utilise le contexte du sujet pour poser des questions PERTINENTES au domaine (pas des questions génériques)
8. Tout le texte en ${langLabel}.`;

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
            content: systemPrompt,
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

    const immediateAdvice = Array.isArray(parsed.immediate_advice)
      ? parsed.immediate_advice
          .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
          .map((item) => item.trim().slice(0, 200))
          .slice(0, 5)
      : [];

    const rawUrgency = typeof parsed.urgency_level === "string" ? parsed.urgency_level.trim() : "low";
    const urgencyLevel: "low" | "medium" | "high" =
      rawUrgency === "high" ? "high" : rawUrgency === "medium" ? "medium" : "low";

    const done = Boolean(parsed.done) || payload.answers.length >= MAX_FOLLOW_UP_QUESTIONS;
    if (done) {
      return {
        source: "openai" as const,
        done: true,
        question: "",
        options: [] as HelpBubbleOption[],
        summaryLabel,
        guidance,
        immediateAdvice,
        urgencyLevel,
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
      immediateAdvice: [],
      urgencyLevel: "low" as const,
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
  const topicData = getTopicData(payload.primary.id, locale);
  const fallbackGuidance = topicData
    ? (locale === "fr"
        ? `Pour \u00ab ${topicData.title} \u00bb, pr\u00e9parez : ${topicData.prepareLine}`
        : `\u0414\u043b\u044f \u00ab${topicData.title}\u00bb \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u044c\u0442\u0435: ${topicData.prepareLine}`)
    : (locale === "fr" ? "Merci, on continue." : "\u0421\u043f\u0430\u0441\u0438\u0431\u043e, \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0435\u043c.");
  const lastAnswer = payload.answers[payload.answers.length - 1];
  const summaryLabel = lastAnswer?.answerLabel || payload.primary.label;

  const topicKey = payload.primary.id ?? "not_sure";
  const fallbackAdvice = FALLBACK_ADVICE[topicKey]?.[locale] ?? FALLBACK_ADVICE.not_sure[locale];
  const urgencyLevel: "low" | "medium" | "high" = context.signals.hasUrgencyOrDeadline
    ? "high"
    : context.signals.hasOfficialNotice
      ? "medium"
      : "low";

  if (payload.answers.length >= MAX_FOLLOW_UP_QUESTIONS) {
    return {
      ok: true,
      source: "fallback",
      done: true,
      question: "",
      options: [],
      summaryLabel,
      guidance: fallbackGuidance,
      immediateAdvice: fallbackAdvice,
      urgencyLevel,
    };
  }

  const emptyAdvice: string[] = [];

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
      immediateAdvice: emptyAdvice,
      urgencyLevel: "low",
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
      immediateAdvice: emptyAdvice,
      urgencyLevel: "low",
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
      immediateAdvice: emptyAdvice,
      urgencyLevel: "low",
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
      immediateAdvice: emptyAdvice,
      urgencyLevel: "low",
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
    immediateAdvice: fallbackAdvice,
    urgencyLevel,
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
      immediateAdvice: aiResult.immediateAdvice,
      urgencyLevel: aiResult.urgencyLevel,
    };
    return NextResponse.json(response);
  }

  return NextResponse.json(buildFallbackResponse(normalizedPayload));
}
