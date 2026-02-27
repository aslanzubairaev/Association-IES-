import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { helpFlowConfig, isHelpSmtpConfigured } from "@/lib/helpFlow/config";
import { checkRateLimit, getClientIp } from "@/lib/helpFlow/rateLimit";
import type { HelpSubmissionPayload } from "@/lib/helpFlow/types";

export const runtime = "nodejs";

type FileValidationResult = {
  ok: boolean;
  error?: string;
};

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

  return errors;
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

  return [
    "Nouvelle demande d'aide (wizard)",
    "",
    `Date: ${submittedDate}`,
    `Locale: ${payload.locale}`,
    "",
    "1) Sujet principal",
    `- Label: ${payload.primary.label}`,
    payload.primary.userText ? `- Texte utilisateur: ${payload.primary.userText}` : "- Texte utilisateur: (vide)",
    `- Source: ${payload.primary.source}`,
    payload.primary.confidence != null ? `- Confiance IA: ${payload.primary.confidence}` : "",
    "",
    "2) Précision",
    `- Label: ${payload.detail.label}`,
    payload.detail.userText ? `- Texte utilisateur: ${payload.detail.userText}` : "- Texte utilisateur: (vide)",
    `- Source: ${payload.detail.source}`,
    payload.detail.confidence != null ? `- Confiance IA: ${payload.detail.confidence}` : "",
    "",
    "3) Message libre",
    payload.message?.trim() ? payload.message.trim() : "(vide)",
    "",
    "4) Coordonnées",
    `- Nom: ${payload.contact.fullName}`,
    `- Email: ${payload.contact.email}`,
    `- Téléphone: ${payload.contact.phone || "(vide)"}`,
    "",
    `Pièces jointes: ${fileCount}`,
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

  const formData = await request.formData();
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") {
    return NextResponse.json({ error: "Missing payload JSON." }, { status: 400 });
  }

  let payload: HelpSubmissionPayload;
  try {
    payload = JSON.parse(rawPayload) as HelpSubmissionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid payload JSON." }, { status: 400 });
  }

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

