const DEFAULT_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

function readInt(raw: string | undefined, fallback: number) {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function readBool(raw: string | undefined, fallback: boolean) {
  if (!raw) return fallback;
  const normalized = raw.trim().toLowerCase();
  if (normalized === "1" || normalized === "true" || normalized === "yes") return true;
  if (normalized === "0" || normalized === "false" || normalized === "no") return false;
  return fallback;
}

function readCsv(raw: string | undefined, fallback: string[]) {
  if (!raw) return fallback;
  const parts = raw.split(",").map((item) => item.trim()).filter(Boolean);
  return parts.length > 0 ? parts : fallback;
}

const smtpPort = readInt(process.env.HELP_SMTP_PORT, 587);

const maxFileSizeMb = readInt(process.env.HELP_MAX_FILE_SIZE_MB, 7);
const maxTotalFilesMb = readInt(process.env.HELP_MAX_TOTAL_FILES_SIZE_MB, 20);

export const helpFlowConfig = {
  recipientEmail: process.env.HELP_RECIPIENT_EMAIL?.trim() || "msouleymanov@gmail.com",
  fromEmail:
    process.env.HELP_FROM_EMAIL?.trim() ||
    process.env.HELP_SMTP_USER?.trim() ||
    "no-reply@associationies.fr",
  smtp: {
    host: process.env.HELP_SMTP_HOST?.trim() || "",
    port: smtpPort,
    secure: readBool(process.env.HELP_SMTP_SECURE, smtpPort === 465),
    user: process.env.HELP_SMTP_USER?.trim() || "",
    pass: process.env.HELP_SMTP_PASS?.trim() || "",
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY?.trim() || "",
    model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
    baseUrl: process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1",
    timeoutMs: readInt(process.env.OPENAI_TIMEOUT_MS, 12000),
  },
  limits: {
    maxFiles: readInt(process.env.HELP_MAX_FILES, 5),
    maxFileSizeBytes: maxFileSizeMb * 1024 * 1024,
    maxFileSizeMb,
    maxTotalFilesBytes: maxTotalFilesMb * 1024 * 1024,
    maxTotalFilesMb,
    allowedMimeTypes: readCsv(process.env.HELP_ALLOWED_MIME_TYPES, DEFAULT_ALLOWED_MIME_TYPES),
  },
  rateLimit: {
    classifyMaxRequests: readInt(process.env.HELP_CLASSIFY_RATE_MAX, 12),
    classifyWindowMs: readInt(process.env.HELP_CLASSIFY_RATE_WINDOW_MS, 60_000),
    submitMaxRequests: readInt(process.env.HELP_SUBMIT_RATE_MAX, 4),
    submitWindowMs: readInt(process.env.HELP_SUBMIT_RATE_WINDOW_MS, 60_000),
  },
} as const;

export function isHelpSmtpConfigured() {
  const smtp = helpFlowConfig.smtp;
  return Boolean(smtp.host && smtp.user && smtp.pass);
}

