import { NextResponse } from "next/server";
import { classifyWithFallback, sanitizeCustomLabel } from "@/lib/helpFlow/classifyFallback";
import { helpFlowConfig } from "@/lib/helpFlow/config";
import { checkRateLimit, getClientIp } from "@/lib/helpFlow/rateLimit";
import type { HelpBubbleOption, HelpClassifyRequest, HelpClassifyResponse } from "@/lib/helpFlow/types";

export const runtime = "nodejs";

type OpenAiClassifyOutput = {
  mode?: "existing" | "custom";
  suggested_id?: string;
  suggested_label?: string;
  confidence?: number;
  alternative_ids?: string[];
  follow_up?: string;
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

function extractJsonObject(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    return JSON.parse(trimmed) as OpenAiClassifyOutput;
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;

    try {
      return JSON.parse(trimmed.slice(start, end + 1)) as OpenAiClassifyOutput;
    } catch {
      return null;
    }
  }
}

async function classifyWithOpenAi(payload: HelpClassifyRequest) {
  const { apiKey, model, baseUrl, timeoutMs } = helpFlowConfig.openai;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const fallbackLabel = payload.locale === "fr" ? "Autre sujet" : "Другая тема";
  const langLabel = payload.locale === "fr" ? "français" : "russe";
  const prompt = {
    locale: payload.locale,
    step: payload.step,
    text: payload.text,
    options: payload.options,
  };

  const systemPrompt = `You are a support classifier for an association helping immigrants in France.
The user writes in ${langLabel}. Classify their request into one of the provided options.

RULES:
1. Output strict JSON: { mode, suggested_id, suggested_label, confidence, alternative_ids, follow_up }
2. mode="existing" if an option matches well (confidence >= 0.6), mode="custom" otherwise
3. follow_up: write a SHORT reassuring sentence in ${langLabel} confirming you understood
4. confidence: 0-1, be honest — 0.9+ only for clear matches
5. alternative_ids: 1-2 closest options if mode="custom"
6. suggested_label (custom only): max 6 words in ${langLabel}, describing the actual need`;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.15,
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

    const confidence =
      typeof parsed.confidence === "number" && Number.isFinite(parsed.confidence)
        ? Math.max(0, Math.min(1, parsed.confidence))
        : 0.55;

    const alternativeIds = Array.isArray(parsed.alternative_ids)
      ? parsed.alternative_ids.filter((id) => typeof id === "string")
      : [];

    if (parsed.mode === "existing" && typeof parsed.suggested_id === "string") {
      const matched = payload.options.find((option) => option.id === parsed.suggested_id);
      if (!matched) return null;

      return {
        source: "openai" as const,
        suggestion: {
          id: matched.id,
          label: matched.label,
          isCustom: false,
          confidence,
        },
        alternatives: payload.options.filter((option) => alternativeIds.includes(option.id)).slice(0, 2),
        followUp:
          typeof parsed.follow_up === "string" && parsed.follow_up.trim()
            ? parsed.follow_up.trim().slice(0, 140)
            : fallbackLabel,
      };
    }

    if (parsed.mode === "custom") {
      const label = sanitizeCustomLabel(parsed.suggested_label ?? payload.text, fallbackLabel);
      return {
        source: "openai" as const,
        suggestion: {
          id: null,
          label,
          isCustom: true,
          confidence,
        },
        alternatives: payload.options.filter((option) => alternativeIds.includes(option.id)).slice(0, 2),
        followUp:
          typeof parsed.follow_up === "string" && parsed.follow_up.trim()
            ? parsed.follow_up.trim().slice(0, 140)
            : fallbackLabel,
      };
    }

    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function buildFallbackResponse(payload: HelpClassifyRequest): HelpClassifyResponse {
  const fallbackLabel = payload.locale === "fr" ? "Autre sujet" : "Другая тема";
  const fallback = classifyWithFallback(payload.text, payload.options);

  if (!fallback.suggestion) {
    return {
      ok: true,
      source: "fallback",
      suggestion: {
        id: null,
        label: sanitizeCustomLabel(payload.text, fallbackLabel),
        isCustom: true,
        confidence: fallback.confidence,
      },
      alternatives: fallback.alternatives,
      followUp:
        payload.locale === "fr"
          ? "Nous avons bien compris. Confirmez ce sujet pour continuer."
          : "Мы поняли запрос. Подтвердите тему и продолжим.",
    };
  }

  return {
    ok: true,
    source: "fallback",
    suggestion: {
      id: fallback.suggestion.id,
      label: fallback.suggestion.label,
      isCustom: false,
      confidence: fallback.confidence,
    },
    alternatives: fallback.alternatives,
    followUp:
      payload.locale === "fr"
        ? "Ce sujet semble le plus proche. Confirmez pour continuer."
        : "Эта тема кажется наиболее подходящей. Подтвердите и продолжим.",
  };
}

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = checkRateLimit({
    key: `help-classify:${ip}`,
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

  const payload = body as Partial<HelpClassifyRequest>;
  const text = typeof payload.text === "string" ? payload.text.trim() : "";
  const step = payload.step === "primary" || payload.step === "detail" ? payload.step : null;
  const locale = payload.locale === "fr" || payload.locale === "ru" ? payload.locale : null;

  if (!locale || !step || text.length < 3) {
    return NextResponse.json({ error: "Missing or invalid classify fields." }, { status: 400 });
  }

  if (!isOptionArray(payload.options) || payload.options.length === 0 || payload.options.length > 16) {
    return NextResponse.json({ error: "Invalid options list." }, { status: 400 });
  }

  const normalizedPayload: HelpClassifyRequest = {
    locale,
    step,
    text: text.slice(0, 1200),
    options: payload.options.map((option) => ({
      id: option.id.trim(),
      label: option.label.trim().slice(0, 120),
    })),
  };

  const aiResult = await classifyWithOpenAi(normalizedPayload);
  if (aiResult) {
    const response: HelpClassifyResponse = {
      ok: true,
      source: "openai",
      suggestion: aiResult.suggestion,
      alternatives: aiResult.alternatives,
      followUp: aiResult.followUp,
    };
    return NextResponse.json(response);
  }

  return NextResponse.json(buildFallbackResponse(normalizedPayload));
}

