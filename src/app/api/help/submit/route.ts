import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { helpFlowConfig, isHelpSmtpConfigured } from "@/lib/helpFlow/config";
import { checkRateLimit, getClientIp } from "@/lib/helpFlow/rateLimit";
import type { HelpFollowUpAnswer, HelpSelection, HelpSubmissionPayload } from "@/lib/helpFlow/types";

export const runtime = "nodejs";

type FileValidationResult = {
  ok: boolean;
  error?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toSafeString(value: unknown, maxLength: number, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function parseIsoDate(value: unknown) {
  if (typeof value !== "string") return new Date().toISOString();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}

function parseSelection(value: unknown): HelpSelection | null {
  if (!isRecord(value)) return null;

  const label = toSafeString(value.label, 100);
  if (!label) return null;

  const sourceRaw = value.source;
  const source: HelpSelection["source"] =
    sourceRaw === "bubble" || sourceRaw === "ai" || sourceRaw === "manual" ? sourceRaw : "manual";

  const idRaw = toSafeString(value.id, 80);
  const confidenceRaw = value.confidence;
  const confidence =
    typeof confidenceRaw === "number" && Number.isFinite(confidenceRaw)
      ? Math.max(0, Math.min(1, confidenceRaw))
      : undefined;

  return {
    id: idRaw || null,
    label,
    userText: toSafeString(value.userText, 1200),
    source,
    confidence,
  };
}

function parseFollowUps(value: unknown): HelpFollowUpAnswer[] | null {
  if (!Array.isArray(value)) return null;

  const parsed: HelpFollowUpAnswer[] = [];
  for (const item of value.slice(0, 8)) {
    if (!isRecord(item)) return null;

    const source = item.source;
    if (source !== "bubble" && source !== "manual") return null;

    const question = toSafeString(item.question, 160);
    const answerLabel = toSafeString(item.answerLabel, 100);
    const answerText = toSafeString(item.answerText, 1000);

    if (!question || !answerLabel) return null;

    parsed.push({
      question,
      answerLabel,
      answerText,
      source,
    });
  }

  return parsed;
}

function parseContact(value: unknown): HelpSubmissionPayload["contact"] | null {
  if (!isRecord(value)) return null;

  const fullName = toSafeString(value.fullName, 120);
  const email = toSafeString(value.email, 180);
  const phone = toSafeString(value.phone, 80);

  if (!fullName || !email) return null;
  return { fullName, email, phone };
}

function parsePayload(rawPayload: string): { payload?: HelpSubmissionPayload; error?: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawPayload);
  } catch {
    return { error: "Invalid payload JSON." };
  }

  if (!isRecord(parsed)) {
    return { error: "Invalid payload JSON." };
  }

  const locale = parsed.locale === "fr" || parsed.locale === "ru" ? parsed.locale : null;
  const primary = parseSelection(parsed.primary);
  const detail = parseSelection(parsed.detail);
  const followUps = parseFollowUps(parsed.followUps);
  const contact = parseContact(parsed.contact);

  if (!locale || !primary || !detail || !followUps || !contact) {
    return { error: "Missing or invalid payload fields." };
  }

  return {
    payload: {
      locale,
      submittedAt: parseIsoDate(parsed.submittedAt),
      primary,
      detail,
      followUps,
      message: toSafeString(parsed.message, 2500),
      contact,
    },
  };
}

function normalizeLine(value: string | undefined | null, fallback = "(vide)") {
  const cleaned = (value ?? "").replace(/\s+/g, " ").trim();
  return cleaned || fallback;
}

function sanitizeFilename(name: string) {
  const cleaned = name.replace(/[^\p{L}\p{N}._-]+/gu, "_").replace(/_+/g, "_").trim();
  if (!cleaned) return "document";
  return cleaned.slice(0, 120);
}

function validatePayload(payload: HelpSubmissionPayload) {
  const errors: string[] = [];

  if (payload.locale !== "fr" && payload.locale !== "ru") {
    errors.push("Invalid locale.");
  }

  if (!payload.primary?.label?.trim()) {
    errors.push("Primary topic is required.");
  }

  if (!payload.detail?.label?.trim()) {
    errors.push("Detail topic is required.");
  }

  if (!payload.contact?.fullName?.trim()) {
    errors.push("Contact full name is required.");
  }

  const email = payload.contact?.email?.trim() ?? "";
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailLooksValid) {
    errors.push("Contact email is invalid.");
  }

  if (!Array.isArray(payload.followUps)) {
    errors.push("Follow-up answers are invalid.");
  }

  return errors;
}

function formatFollowUps(answers: HelpFollowUpAnswer[]) {
  if (!answers.length) return [];

  const seen = new Set<string>();
  const lines: string[] = [];

  for (const answer of answers) {
    const question = normalizeLine(answer.question, "(question non fournie)");
    const response = normalizeLine(answer.answerText || answer.answerLabel);
    const key = `${question.toLowerCase()}::${response.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(`${lines.length + 1}. ${question}: ${response}`);
  }

  return lines;
}

function validateFiles(files: File[]) {
  const { limits } = helpFlowConfig;
  const result: FileValidationResult = { ok: true };

  if (files.length > limits.maxFiles) {
    return {
      ok: false,
      error: `Too many files. Max allowed is ${limits.maxFiles}.`,
    };
  }

  let totalBytes = 0;
  for (const file of files) {
    totalBytes += file.size;

    if (!limits.allowedMimeTypes.includes(file.type)) {
      return {
        ok: false,
        error: `Unsupported file format: ${file.name}.`,
      };
    }

    if (file.size > limits.maxFileSizeBytes) {
      return {
        ok: false,
        error: `File is too large: ${file.name}.`,
      };
    }
  }

  if (totalBytes > limits.maxTotalFilesBytes) {
    return {
      ok: false,
      error: `Total files size exceeds ${limits.maxTotalFilesMb} MB.`,
    };
  }

  return result;
}

function buildEmailText(payload: HelpSubmissionPayload, fileCount: number) {
  const submittedDate = new Date(payload.submittedAt || Date.now()).toISOString();
  const primaryLabel = normalizeLine(payload.primary.label);
  const detailLabel = normalizeLine(payload.detail.label);
  const freeMessage = normalizeLine(payload.message, "");
  const contactName = normalizeLine(payload.contact.fullName);
  const contactEmail = normalizeLine(payload.contact.email);
  const contactPhone = normalizeLine(payload.contact.phone, "Non renseigné");
  const followUpLines = formatFollowUps(payload.followUps);

  return [
    "DEMANDE D'AIDE",
    "",
    `Date: ${submittedDate}`,
    `Langue: ${payload.locale.toUpperCase()}`,
    "",
    "CONTACT",
    `Nom : ${contactName}`,
    `Email : ${contactEmail}`,
    `Téléphone : ${contactPhone}`,
    "",
    "DEMANDE",
    `Sujet : ${primaryLabel}`,
    `Besoin principal : ${detailLabel}`,
    "",
    followUpLines.length > 0 ? "INFORMATIONS CLÉS" : "",
    ...followUpLines,
    followUpLines.length > 0 ? "" : "",
    freeMessage ? "MESSAGE COMPLÉMENTAIRE" : "",
    freeMessage || "",
    freeMessage ? "" : "",
    `Pièces jointes : ${fileCount}`,
    "Fin.",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildEmailSubject(payload: HelpSubmissionPayload) {
  const primary = payload.primary.label.slice(0, 50);
  const name = payload.contact.fullName.slice(0, 50);
  return `[AIDE] ${primary} — ${name}`;
}

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = checkRateLimit({
    key: `help-submit:${ip}`,
    maxRequests: helpFlowConfig.rateLimit.submitMaxRequests,
    windowMs: helpFlowConfig.rateLimit.submitWindowMs,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  if (!isHelpSmtpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Set HELP_SMTP_HOST / HELP_SMTP_PORT / HELP_SMTP_USER / HELP_SMTP_PASS.",
      },
      { status: 500 },
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const contentLengthRaw = request.headers.get("content-length");
  const contentLength = contentLengthRaw ? Number.parseInt(contentLengthRaw, 10) : Number.NaN;
  const maxExpectedBodyBytes = helpFlowConfig.limits.maxTotalFilesBytes + 2 * 1024 * 1024;
  if (Number.isFinite(contentLength) && contentLength > maxExpectedBodyBytes) {
    return NextResponse.json({ error: "Uploaded payload is too large." }, { status: 413 });
  }

  const formData = await request.formData();
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") {
    return NextResponse.json({ error: "Missing payload JSON." }, { status: 400 });
  }

  const parsedPayload = parsePayload(rawPayload);
  if (!parsedPayload.payload) {
    return NextResponse.json({ error: parsedPayload.error || "Invalid payload JSON." }, { status: 400 });
  }
  const payload = parsedPayload.payload;

  const errors = validatePayload(payload);
  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0] }, { status: 400 });
  }

  const files = formData
    .getAll("documents")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const fileValidation = validateFiles(files);
  if (!fileValidation.ok) {
    return NextResponse.json({ error: fileValidation.error }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: helpFlowConfig.smtp.host,
    port: helpFlowConfig.smtp.port,
    secure: helpFlowConfig.smtp.secure,
    auth: {
      user: helpFlowConfig.smtp.user,
      pass: helpFlowConfig.smtp.pass,
    },
  });

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: sanitizeFilename(file.name),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    })),
  );

  const text = buildEmailText(payload, files.length);
  const subject = buildEmailSubject(payload);

  try {
    await transporter.sendMail({
      from: helpFlowConfig.fromEmail,
      to: helpFlowConfig.recipientEmail,
      replyTo: payload.contact.email.trim(),
      subject,
      text,
      attachments,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to send email right now. Please retry in a few moments.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
