export type HelpLocale = "ru" | "fr";

export type HelpBubbleOption = {
  id: string;
  label: string;
};

export type HelpClassifyRequest = {
  locale: HelpLocale;
  step: "primary" | "detail";
  text: string;
  options: HelpBubbleOption[];
};

export type HelpClassifySuggestion = {
  id: string | null;
  label: string;
  isCustom: boolean;
  confidence: number;
};

export type HelpClassifyResponse = {
  ok: true;
  source: "openai" | "fallback";
  suggestion: HelpClassifySuggestion;
  alternatives: HelpBubbleOption[];
  followUp: string;
};

export type HelpFollowUpAnswer = {
  question: string;
  answerLabel: string;
  answerText: string;
  source: "bubble" | "manual";
};

export type HelpNextQuestionRequest = {
  locale: HelpLocale;
  primary: HelpSelection;
  answers: HelpFollowUpAnswer[];
  candidateOptions: HelpBubbleOption[];
};

export type HelpNextQuestionResponse = {
  ok: true;
  source: "openai" | "fallback";
  done: boolean;
  question: string;
  options: HelpBubbleOption[];
  summaryLabel: string;
  guidance: string;
  immediateAdvice: string[];
  urgencyLevel: "low" | "medium" | "high";
};

export type HelpSelection = {
  id: string | null;
  label: string;
  userText: string;
  source: "bubble" | "ai" | "manual";
  confidence?: number;
};

export type HelpSubmissionPayload = {
  locale: HelpLocale;
  submittedAt: string;
  primary: HelpSelection;
  detail: HelpSelection;
  followUps: HelpFollowUpAnswer[];
  message: string;
  contact: {
    fullName: string;
    email: string;
    phone: string;
  };
};
