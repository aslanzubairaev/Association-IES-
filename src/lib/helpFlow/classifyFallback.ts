import type { HelpBubbleOption } from "@/lib/helpFlow/types";

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]+/gu, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function scoreOption(option: HelpBubbleOption, textTokens: string[]) {
  const optionTokens = tokenize(option.label);
  if (optionTokens.length === 0 || textTokens.length === 0) return 0;

  let score = 0;
  for (const token of optionTokens) {
    if (textTokens.includes(token)) {
      score += 2;
      continue;
    }
    const partialMatch = textTokens.some((textToken) => textToken.includes(token) || token.includes(textToken));
    if (partialMatch) {
      score += 1;
    }
  }

  return score;
}

export function classifyWithFallback(text: string, options: HelpBubbleOption[]) {
  const normalized = text.trim();
  if (!normalized) {
    return {
      suggestion: null as HelpBubbleOption | null,
      confidence: 0,
      alternatives: [] as HelpBubbleOption[],
    };
  }

  const tokens = tokenize(normalized);
  const scored = options
    .map((option) => ({ option, score: scoreOption(option, tokens) }))
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0 || scored[0].score === 0) {
    return {
      suggestion: null,
      confidence: 0.3,
      alternatives: options.slice(0, 2),
    };
  }

  const maxScore = Math.max(2, scored[0].score);
  const confidence = Math.min(0.95, 0.45 + maxScore * 0.08);
  return {
    suggestion: scored[0].option,
    confidence,
    alternatives: scored.slice(1, 3).map((entry) => entry.option),
  };
}

export function sanitizeCustomLabel(input: string, fallbackLabel: string) {
  const cleaned = input.replace(/\s+/g, " ").trim();
  if (!cleaned) return fallbackLabel;
  return cleaned.slice(0, 80);
}

