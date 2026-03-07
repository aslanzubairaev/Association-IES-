"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getHelpPrimaryOptions, helpWizardCopy } from "@/content/helpWizard";
import type {
  HelpBubbleOption,
  HelpClassifyResponse,
  HelpFollowUpAnswer,
  HelpLocale,
  HelpNextQuestionResponse,
  HelpSelection,
  HelpSubmissionPayload,
} from "@/lib/helpFlow/types";
import styles from "./HelpWizard.module.css";

type HelpWizardProps = { locale: HelpLocale };

const TOTAL_STEPS = 5;
const MAX_FOLLOW_UPS = 3;
const STORAGE_KEY = "ies-help-wizard";
const MAX_FILE_SIZE = 7 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".pdf", ".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"]);
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

/* ────────────────────────────────────────────
   Utility helpers
   ──────────────────────────────────────────── */

function toDetailOptionId(label: string, index: number) {
  const slug = label
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return slug ? `detail-${slug}` : `detail-${index + 1}`;
}

function asHelpSelection(p: {
  id: string | null;
  label: string;
  userText: string;
  source: "bubble" | "ai" | "manual";
  confidence?: number;
}): HelpSelection {
  return { ...p, label: p.label.trim(), userText: p.userText.trim() };
}

function summarizeFollowUps(answers: HelpFollowUpAnswer[]) {
  return answers
    .map((a, i) => `${i + 1}. ${a.question} -> ${a.answerText || a.answerLabel}`)
    .join(" | ")
    .slice(0, 500);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateSingleFile(
  file: File,
  copy: { fileTooLargeText: string; fileWrongTypeText: string },
): string | null {
  const ext = `.${file.name.split(".").pop()?.toLowerCase() || ""}`;
  if (!ALLOWED_TYPES.has(file.type) && !ALLOWED_EXTENSIONS.has(ext)) return copy.fileWrongTypeText;
  if (file.size > MAX_FILE_SIZE) return copy.fileTooLargeText;
  return null;
}

/* ────────────────────────────────────────────
   Session persistence
   ──────────────────────────────────────────── */

type PersistedState = {
  step: number;
  primarySelectedId: string;
  primaryText: string;
  primarySelection: HelpSelection | null;
  followUpAnswers: HelpFollowUpAnswer[];
  detailSelection: HelpSelection | null;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  savedAt: number;
  immediateAdvice: string[];
  urgencyLevel: "low" | "medium" | "high";
};

function saveWizardState(locale: string, state: PersistedState) {
  try {
    sessionStorage.setItem(`${STORAGE_KEY}-${locale}`, JSON.stringify(state));
  } catch {
    /* quota exceeded or private browsing */
  }
}

function loadWizardState(locale: string): PersistedState | null {
  try {
    const raw = sessionStorage.getItem(`${STORAGE_KEY}-${locale}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (Date.now() - parsed.savedAt > 60 * 60 * 1000) {
      sessionStorage.removeItem(`${STORAGE_KEY}-${locale}`);
      return null;
    }
    // Migration from old 4-step format
    if (!parsed.immediateAdvice) {
      parsed.immediateAdvice = [];
      parsed.urgencyLevel = "low";
      if (parsed.step >= 3) parsed.step = parsed.step + 1;
    }
    return parsed;
  } catch {
    return null;
  }
}

function clearWizardState(locale: string) {
  try {
    sessionStorage.removeItem(`${STORAGE_KEY}-${locale}`);
  } catch {
    /* noop */
  }
}

/* ────────────────────────────────────────────
   Small UI components
   ──────────────────────────────────────────── */

function CategoryIcon({ topicKey, className }: { topicKey: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    prefecture_vnj: (
      <path
        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 9h.01M15 9h.01M9 13h.01M15 13h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    caf_support: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path
          d="M9 15h6M9 9h3a2 2 0 010 4H9V9z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    cpam_health: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    france_travail: (
      <path
        d="M4 7h16M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7l2-3h12l2 3M10 11h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    housing_school_everyday: (
      <path
        d="M3 12l9-8 9 8M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    not_sure: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path
          d="M9.5 9a3 3 0 015 1c0 2-3 2-3 4M12 17h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icons[topicKey] || icons.not_sure}
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedCheck() {
  return (
    <div className={styles.successCheckWrap}>
      <svg className={styles.successCheckSvg} viewBox="0 0 52 52" aria-hidden="true">
        <circle
          className={styles.successCheckCircle}
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          className={styles.successCheckPath}
          d="M15 27l7 7 15-15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ButtonLabel({ loading, label }: { loading: boolean; label: string }) {
  return (
    <span className={styles.buttonLabel}>
      {loading && <span className={styles.buttonSpinner} aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}

function StepSkeleton({ text }: { text: string }) {
  return (
    <div className={styles.skeletonWrap} aria-busy="true" aria-label={text}>
      <p className={styles.skeletonText}>{text}</p>
      <div className={styles.skeletonBars}>
        <div className={styles.skeletonBar} style={{ width: "80%" }} />
        <div className={styles.skeletonBar} style={{ width: "55%" }} />
        <div className={styles.skeletonBar} style={{ width: "70%" }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   Main component
   ════════════════════════════════════════════ */

export function HelpWizard({ locale }: HelpWizardProps) {
  const copy = helpWizardCopy[locale];
  const primaryOptions = useMemo(() => getHelpPrimaryOptions(locale), [locale]);
  const primaryOptionById = useMemo(() => new Map(primaryOptions.map((o) => [o.id, o])), [primaryOptions]);

  const fallbackDetailOptions = useMemo<HelpBubbleOption[]>(
    () =>
      locale === "fr"
        ? [
            { id: "detail-documents", label: "Je ne comprends pas les documents demand\u00e9s" },
            { id: "detail-urgent", label: "Ma situation est urgente" },
            { id: "detail-rdv", label: "Je veux savoir la prochaine \u00e9tape" },
          ]
        : [
            { id: "detail-documents", label: "\u041d\u0435 \u043f\u043e\u043d\u0438\u043c\u0430\u044e, \u043a\u0430\u043a\u0438\u0435 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b \u043d\u0443\u0436\u043d\u044b" },
            { id: "detail-urgent", label: "\u0421\u0438\u0442\u0443\u0430\u0446\u0438\u044f \u0441\u0440\u043e\u0447\u043d\u0430\u044f" },
            { id: "detail-rdv", label: "\u0425\u043e\u0447\u0443 \u043f\u043e\u043d\u044f\u0442\u044c \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0448\u0430\u0433" },
          ],
    [locale],
  );

  /* ── Core state ── */
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "back">("forward");
  const [slideKey, setSlideKey] = useState(0);

  /* Primary */
  const [primarySelectedId, setPrimarySelectedId] = useState("");
  const [primaryText, setPrimaryText] = useState("");
  const [primarySelection, setPrimarySelection] = useState<HelpSelection | null>(null);
  const [primarySuggestion, setPrimarySuggestion] = useState<HelpClassifyResponse["suggestion"] | null>(null);
  const [primaryAlternatives, setPrimaryAlternatives] = useState<HelpBubbleOption[]>([]);
  const [primaryError, setPrimaryError] = useState("");
  const [primaryBusy, setPrimaryBusy] = useState(false);

  /* Follow-up */
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [followUpOptions, setFollowUpOptions] = useState<HelpBubbleOption[]>([]);
  const [followUpSelectedId, setFollowUpSelectedId] = useState("");
  const [followUpText, setFollowUpText] = useState("");
  const [followUpAnswers, setFollowUpAnswers] = useState<HelpFollowUpAnswer[]>([]);
  const [followUpGuidance, setFollowUpGuidance] = useState("");
  const [detailSelection, setDetailSelection] = useState<HelpSelection | null>(null);
  const [followUpError, setFollowUpError] = useState("");
  const [followUpBusy, setFollowUpBusy] = useState(false);

  /* Guidance / advice */
  const [immediateAdvice, setImmediateAdvice] = useState<string[]>([]);
  const [urgencyLevel, setUrgencyLevel] = useState<"low" | "medium" | "high">("low");

  /* Contact */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [contactError, setContactError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /* Documents & submit */
  const [documents, setDocuments] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<Record<number, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitBusy, setSubmitBusy] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<Record<number, string>>({});
  const [checkedDocs, setCheckedDocs] = useState<Set<number>>(new Set());

  const stepOneBusy = primaryBusy || followUpBusy;
  const stepTitleRef = useRef<HTMLHeadingElement>(null);
  const dragCounterRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const detailOptionById = useMemo(() => new Map(followUpOptions.map((o) => [o.id, o])), [followUpOptions]);

  const selectedTopicData = useMemo(
    () => (primarySelection?.id ? primaryOptionById.get(primarySelection.id) : null),
    [primarySelection, primaryOptionById],
  );

  /* ── Session restore ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = loadWizardState(locale);
    if (saved && saved.step > 1) setShowResume(true);
  }, [locale]);

  function restoreSession() {
    const saved = loadWizardState(locale);
    if (!saved) return;
    setStep(saved.step > 5 ? 4 : saved.step);
    setPrimarySelectedId(saved.primarySelectedId);
    setPrimaryText(saved.primaryText);
    setPrimarySelection(saved.primarySelection);
    setFollowUpAnswers(saved.followUpAnswers);
    setDetailSelection(saved.detailSelection);
    setFullName(saved.fullName);
    setEmail(saved.email);
    setPhone(saved.phone);
    setMessage(saved.message);
    setImmediateAdvice(saved.immediateAdvice || []);
    setUrgencyLevel(saved.urgencyLevel || "low");
    setShowResume(false);
  }

  function discardSession() {
    clearWizardState(locale);
    setShowResume(false);
  }

  /* ── Persist on meaningful changes ── */
  useEffect(() => {
    if (typeof window === "undefined" || done) return;
    if (step === 1 && !primarySelection) return;
    saveWizardState(locale, {
      step,
      primarySelectedId,
      primaryText,
      primarySelection,
      followUpAnswers,
      detailSelection,
      fullName,
      email,
      phone,
      message,
      savedAt: Date.now(),
      immediateAdvice,
      urgencyLevel,
    });
  }, [
    step,
    primarySelection,
    followUpAnswers,
    detailSelection,
    fullName,
    email,
    phone,
    message,
    done,
    locale,
    primarySelectedId,
    primaryText,
    immediateAdvice,
    urgencyLevel,
  ]);

  /* ── Focus management ── */
  useEffect(() => {
    const timer = setTimeout(() => stepTitleRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [step, done]);

  /* ── File preview URLs ── */
  useEffect(() => {
    const urls: Record<number, string> = {};
    documents.forEach((file, i) => {
      if (file.type.startsWith("image/")) urls[i] = URL.createObjectURL(file);
    });
    setPreviewUrls(urls);
    return () => {
      Object.values(urls).forEach(URL.revokeObjectURL);
    };
  }, [documents]);

  /* ── Step transitions ── */
  function goToStep(nextStep: number) {
    setSlideDirection(nextStep > step ? "forward" : "back");
    setSlideKey((k) => k + 1);
    setStep(nextStep);
  }

  /* ────────────────────────────────────────────
     Business logic
     ──────────────────────────────────────────── */

  function getCandidateOptionsForPrimary(selection: HelpSelection) {
    if (selection.id) {
      const option = primaryOptionById.get(selection.id);
      if (option) {
        return option.examples.map((example, index) => ({
          id: toDetailOptionId(example, index),
          label: example,
        }));
      }
    }
    return fallbackDetailOptions;
  }

  function clearFollowUpState() {
    setFollowUpQuestion("");
    setFollowUpOptions([]);
    setFollowUpSelectedId("");
    setFollowUpText("");
    setFollowUpAnswers([]);
    setFollowUpGuidance("");
    setFollowUpError("");
    setDetailSelection(null);
  }

  function buildDetailSelection(summaryLabel: string, answers: HelpFollowUpAnswer[]) {
    const safeLabel = summaryLabel.trim() || answers[answers.length - 1]?.answerLabel || copy.customFallbackLabel;
    return asHelpSelection({ id: null, label: safeLabel, userText: summarizeFollowUps(answers), source: "ai" });
  }

  async function classifyPrimaryText(text: string, options: HelpBubbleOption[]) {
    const response = await fetch("/api/help/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, step: "primary", text, options }),
    });
    if (!response.ok) throw new Error("classify_failed");
    return (await response.json()) as HelpClassifyResponse;
  }

  async function requestNextQuestion(params: {
    primary: HelpSelection;
    answers: HelpFollowUpAnswer[];
    candidateOptions: HelpBubbleOption[];
  }) {
    const response = await fetch("/api/help/next-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, ...params }),
    });
    if (!response.ok) throw new Error("next_question_failed");
    return (await response.json()) as HelpNextQuestionResponse;
  }

  function applyAdviceFromResult(result: HelpNextQuestionResponse) {
    if (result.immediateAdvice?.length) setImmediateAdvice(result.immediateAdvice);
    if (result.urgencyLevel) setUrgencyLevel(result.urgencyLevel);
  }

  async function initializeFollowUpFlow(selection: HelpSelection) {
    const candidateOptions = getCandidateOptionsForPrimary(selection);
    clearFollowUpState();
    setFollowUpBusy(true);
    try {
      const result = await requestNextQuestion({ primary: selection, answers: [], candidateOptions });
      setFollowUpGuidance(result.guidance);
      applyAdviceFromResult(result);
      if (result.done) {
        setDetailSelection(buildDetailSelection(result.summaryLabel, []));
        goToStep(3);
        return;
      }
      setFollowUpQuestion(result.question || copy.chooseDetail);
      setFollowUpOptions(result.options.length > 0 ? result.options : candidateOptions);
      goToStep(2);
    } catch {
      setFollowUpQuestion(copy.chooseDetail);
      setFollowUpOptions(candidateOptions);
      setFollowUpError(copy.nextQuestionErrorText);
      goToStep(2);
    } finally {
      setFollowUpBusy(false);
    }
  }

  async function continuePrimary() {
    setPrimaryError("");
    setPrimaryBusy(true);
    try {
      if (primarySelectedId) {
        const option = primaryOptionById.get(primarySelectedId);
        if (!option) {
          setPrimaryError(copy.noChoiceText);
          return;
        }
        const selection = asHelpSelection({
          id: option.id,
          label: option.label,
          userText: primaryText,
          source: "bubble",
        });
        setPrimarySelection(selection);
        await initializeFollowUpFlow(selection);
        return;
      }
      const typed = primaryText.trim();
      if (typed.length < 3) {
        setPrimaryError(copy.noChoiceText);
        return;
      }
      const result = await classifyPrimaryText(
        typed,
        primaryOptions.map((o) => ({ id: o.id, label: o.label })),
      );
      setPrimarySuggestion(result.suggestion);
      setPrimaryAlternatives(result.alternatives);
    } catch {
      const typed = primaryText.trim();
      const selection = asHelpSelection({
        id: null,
        label: typed.slice(0, 80) || copy.customFallbackLabel,
        userText: typed,
        source: "manual",
      });
      setPrimarySelection(selection);
      setPrimaryError(copy.classifyErrorText);
      await initializeFollowUpFlow(selection);
    } finally {
      setPrimaryBusy(false);
    }
  }

  async function confirmPrimarySuggestion(accept: boolean) {
    const typed = primaryText.trim();
    setPrimaryBusy(true);
    try {
      const selection = accept && primarySuggestion
        ? asHelpSelection({
            id: primarySuggestion.id,
            label: primarySuggestion.label,
            userText: typed,
            source: "ai",
            confidence: primarySuggestion.confidence,
          })
        : asHelpSelection({
            id: null,
            label: typed.slice(0, 80) || copy.customFallbackLabel,
            userText: typed,
            source: "manual",
          });
      setPrimarySelection(selection);
      await initializeFollowUpFlow(selection);
    } finally {
      setPrimaryBusy(false);
    }
  }

  async function continueFollowUp() {
    if (!primarySelection) {
      setFollowUpError(copy.submitErrorText);
      return;
    }
    setFollowUpError("");
    const typed = followUpText.trim();
    const question = followUpQuestion || copy.chooseDetail;

    let answer: HelpFollowUpAnswer;
    if (followUpSelectedId) {
      const option = detailOptionById.get(followUpSelectedId);
      if (!option) {
        setFollowUpError(copy.noChoiceText);
        return;
      }
      answer = { question, answerLabel: option.label, answerText: option.label, source: "bubble" };
    } else {
      if (typed.length < 3) {
        setFollowUpError(copy.noChoiceText);
        return;
      }
      answer = { question, answerLabel: typed.slice(0, 90), answerText: typed, source: "manual" };
    }

    const nextAnswers = [...followUpAnswers, answer];
    const candidateOptions = getCandidateOptionsForPrimary(primarySelection);
    setFollowUpBusy(true);

    try {
      const result = await requestNextQuestion({ primary: primarySelection, answers: nextAnswers, candidateOptions });
      setFollowUpAnswers(nextAnswers);
      setFollowUpGuidance(result.guidance);
      applyAdviceFromResult(result);
      if (result.done || nextAnswers.length >= MAX_FOLLOW_UPS) {
        setDetailSelection(buildDetailSelection(result.summaryLabel, nextAnswers));
        goToStep(3);
        return;
      }
      setFollowUpQuestion(result.question || copy.chooseDetail);
      setFollowUpOptions(result.options.length > 0 ? result.options : candidateOptions);
      setFollowUpSelectedId("");
      setFollowUpText("");
    } catch {
      setFollowUpAnswers(nextAnswers);
      setDetailSelection(
        asHelpSelection({
          id: null,
          label: answer.answerLabel || primarySelection.label,
          userText: summarizeFollowUps(nextAnswers),
          source: answer.source,
        }),
      );
      setFollowUpError(copy.nextQuestionErrorText);
      goToStep(3);
    } finally {
      setFollowUpBusy(false);
    }
  }

  /* ── Contact validation ── */

  function validateField(field: string, value: string): string {
    if (field === "fullName" && !value.trim()) return copy.requiredFieldText;
    if (field === "email") {
      if (!value.trim()) return copy.requiredFieldText;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return copy.invalidEmailText;
    }
    return "";
  }

  function handleBlur(field: string, value: string) {
    const error = validateField(field, value);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  }

  function continueContact() {
    setContactError("");
    const errors: Record<string, string> = {};
    const nameErr = validateField("fullName", fullName);
    const emailErr = validateField("email", email);
    if (nameErr) errors.fullName = nameErr;
    if (emailErr) errors.email = emailErr;
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    goToStep(5);
  }

  function backStep() {
    if (step <= 1) return;
    if (step === 4) {
      // Going back from contact to guidance
      goToStep(3);
      return;
    }
    if (step === 3) {
      // Going back from guidance to follow-ups
      setDetailSelection(null);
      goToStep(2);
      return;
    }
    if (step === 2) clearFollowUpState();
    goToStep(step - 1);
  }

  /* ── File handling ── */

  function processFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    const allFiles = [...documents, ...incoming].slice(0, 5);
    const errors: Record<number, string> = {};
    allFiles.forEach((file, i) => {
      const err = validateSingleFile(file, copy);
      if (err) errors[i] = err;
    });
    setDocuments(allFiles);
    setFileErrors(errors);
  }

  function removeFile(index: number) {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
    setFileErrors((prev) => {
      const next: Record<number, string> = {};
      Object.entries(prev).forEach(([k, v]) => {
        const n = Number(k);
        if (n === index) return;
        next[n > index ? n - 1 : n] = v;
      });
      return next;
    });
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) setIsDragging(false);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) processFiles(e.dataTransfer.files);
  }

  /* ── Submit ── */

  async function submitWizard() {
    if (!primarySelection || !detailSelection) {
      setSubmitError(copy.submitErrorText);
      return;
    }

    const validDocs = documents.filter((_, i) => !fileErrors[i]);
    const payload: HelpSubmissionPayload = {
      locale,
      submittedAt: new Date().toISOString(),
      primary: primarySelection,
      detail: detailSelection,
      followUps: followUpAnswers,
      message: message.trim(),
      contact: { fullName: fullName.trim(), email: email.trim(), phone: phone.trim() },
    };

    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));
    formData.append("website", "");
    validDocs.forEach((file) => formData.append("documents", file));

    setSubmitBusy(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/help/submit", { method: "POST", body: formData });
      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorBody?.error || copy.submitErrorText);
      }
      setDone(true);
      clearWizardState(locale);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : copy.submitErrorText);
    } finally {
      setSubmitBusy(false);
    }
  }

  function resetWizard() {
    setStep(1);
    setDone(false);
    setPrimarySelectedId("");
    setPrimaryText("");
    setPrimarySelection(null);
    setPrimarySuggestion(null);
    setPrimaryAlternatives([]);
    setPrimaryError("");
    clearFollowUpState();
    setImmediateAdvice([]);
    setUrgencyLevel("low");
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setContactError("");
    setFieldErrors({});
    setDocuments([]);
    setFileErrors({});
    setCheckedDocs(new Set());
    setSubmitError("");
    setSlideKey((k) => k + 1);
  }

  /* ════════════════════════════════════════════
     Render
     ════════════════════════════════════════════ */

  const slideClass = slideDirection === "forward" ? styles.slideForward : styles.slideBack;

  return (
    <section className={styles.scope} aria-label={copy.pageTitle}>
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.pageTitle}</h1>
        <p className={styles.subtitle}>{copy.pageSubtitle}</p>
      </header>

      {/* Resume banner */}
      {showResume && (
        <div className={styles.resumeBanner} role="alert">
          <p className={styles.resumeText}>{copy.resumeTitle}</p>
          <div className={styles.resumeActions}>
            <button type="button" className={styles.primaryButton} onClick={restoreSession}>
              {copy.resumeYes}
            </button>
            <button type="button" className={styles.secondaryButton} onClick={discardSession}>
              {copy.resumeNo}
            </button>
          </div>
        </div>
      )}

      <div className={styles.panel}>
        {/* Progress */}
        <div className={styles.progressRow} aria-live="polite">
          <p className={styles.progressText}>{copy.stepLabel(done ? TOTAL_STEPS : step, TOTAL_STEPS)}</p>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuenow={done ? TOTAL_STEPS : step}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${((done ? TOTAL_STEPS : step) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Done ── */}
        {done && (
          <div className={`${styles.stepBlock} ${styles.slideForward}`}>
            <div className={styles.successBox} role="status">
              <AnimatedCheck />
              <h3 className={styles.successTitle} ref={stepTitleRef} tabIndex={-1}>
                {copy.doneTitle}
              </h3>
              <p className={styles.successText}>{copy.doneText}</p>

              {/* Action plan */}
              {immediateAdvice.length > 0 && (
                <div className={styles.actionPlan}>
                  <p className={styles.summaryTitle}>{copy.actionPlanTitle}</p>
                  <ul className={styles.actionPlanList}>
                    {immediateAdvice.map((tip, i) => (
                      <li key={i} className={styles.adviceTip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Resource links */}
              {selectedTopicData && selectedTopicData.resourceLinks.length > 0 && (
                <div className={styles.resourceLinks}>
                  <p className={styles.summaryTitle}>{copy.usefulLinksLabel}</p>
                  {selectedTopicData.resourceLinks.map((link, i) => (
                    <a
                      key={i}
                      className={styles.resourceLink}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                      {link.phone && <span className={styles.resourcePhone}>{link.phone}</span>}
                    </a>
                  ))}
                </div>
              )}

              {/* Timeline */}
              {selectedTopicData && (
                <p className={styles.responseTime}>
                  {copy.timelineLabel}: {selectedTopicData.estimatedTimeline}
                </p>
              )}

              <div className={styles.successSummary}>
                <p className={styles.summaryTitle}>{copy.summaryTitle}</p>
                <p>
                  <strong>{copy.summaryPrimary}:</strong> {primarySelection?.label}
                </p>
                {detailSelection && (
                  <p>
                    <strong>{copy.summaryDetail}:</strong> {detailSelection.label}
                  </p>
                )}
                {followUpAnswers.length > 0 && (
                  <p>
                    <strong>{copy.summaryFollowUps}:</strong> {followUpAnswers.length}
                  </p>
                )}
                {documents.length > 0 && (
                  <p>
                    <strong>{copy.documentsLabel}:</strong> {copy.filesCountLabel(documents.length)}
                  </p>
                )}
                <p>
                  <strong>{copy.emailLabel}:</strong> {email}
                </p>
              </div>

              <p className={styles.responseTime}>{copy.responseTimeText}</p>

              <div className={styles.actionRow} style={{ justifyContent: "center" }}>
                <button type="button" className={styles.secondaryButton} onClick={resetWizard}>
                  {copy.newRequestLabel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: Primary topic ── */}
        {!done && step === 1 && (
          <div key={`s1-${slideKey}`} className={`${styles.stepBlock} ${slideClass}`}>
            {stepOneBusy && !primarySuggestion ? (
              <StepSkeleton text={copy.analyzingText} />
            ) : (
              <>
                <h3 className={styles.question} ref={stepTitleRef} tabIndex={-1}>
                  {copy.choosePrimary}
                </h3>

                <div className={styles.bubbleGrid}>
                  {primaryOptions.filter((o) => o.id !== "not_sure").map((option) => {
                    const isActive = primarySelectedId === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.bubble} ${isActive ? styles.bubbleActive : ""}`}
                        disabled={stepOneBusy}
                        onClick={() => {
                          setPrimarySelectedId(option.id);
                          setPrimaryText("");
                          setPrimaryError("");
                          setPrimarySuggestion(null);
                        }}
                      >
                        <span className={styles.bubbleInner}>
                          <CategoryIcon topicKey={option.id} className={styles.bubbleIcon} />
                          <span className={styles.bubbleContent}>
                            <span className={styles.bubbleLabel}>{option.label}</span>
                            <span className={styles.bubbleExamples}>
                              {option.examples.slice(0, 2).join(" \u00b7 ")}
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* prepareLine card when a topic is selected */}
                {primarySelectedId && primaryOptionById.get(primarySelectedId)?.prepareLine && (
                  <div className={styles.prepareCard}>
                    <p className={styles.prepareTitle}>{copy.prepareForLabel}</p>
                    <p className={styles.prepareText}>
                      {primaryOptionById.get(primarySelectedId)!.prepareLine}
                    </p>
                  </div>
                )}

                {/* Link to switch to free text when a topic is selected */}
                {primarySelectedId && (
                  <button
                    type="button"
                    className={styles.cantFindButton}
                    disabled={stepOneBusy}
                    onClick={() => {
                      setPrimarySelectedId("");
                      setPrimaryError("");
                      setPrimarySuggestion(null);
                    }}
                  >
                    {copy.cantFindLabel}
                  </button>
                )}

                {/* Free text: shown when no bubble is selected */}
                {!primarySelectedId && (
                  <>
                    <textarea
                      className={styles.textarea}
                      value={primaryText}
                      disabled={stepOneBusy}
                      onChange={(e) => {
                        setPrimaryText(e.target.value);
                        setPrimarySuggestion(null);
                      }}
                      placeholder={copy.freeTextPlaceholderPrimary}
                      rows={3}
                    />
                    <p className={styles.hint}>{copy.freeTextHint}</p>
                  </>
                )}

                {primarySuggestion && (
                  <div className={styles.aiCard}>
                    <p className={styles.aiTitle}>{copy.aiProposedLabel}</p>
                    <p className={styles.aiValue}>{primarySuggestion.label}</p>
                    <p className={styles.aiQuestion}>{copy.aiConfirmQuestion}</p>
                    {primaryAlternatives.length > 0 && (
                      <p className={styles.aiAlt}>{primaryAlternatives.map((o) => o.label).join(" \u2022 ")}</p>
                    )}
                    <div className={styles.actionRow}>
                      <button
                        type="button"
                        className={styles.primaryButton}
                        disabled={stepOneBusy}
                        onClick={() => void confirmPrimarySuggestion(true)}
                      >
                        <ButtonLabel loading={stepOneBusy} label={copy.aiConfirmYes} />
                      </button>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        disabled={stepOneBusy}
                        onClick={() => void confirmPrimarySuggestion(false)}
                      >
                        <ButtonLabel loading={stepOneBusy} label={copy.aiConfirmNo} />
                      </button>
                    </div>
                  </div>
                )}

                {primaryError && (
                  <p className={styles.error} role="alert">
                    {primaryError}
                  </p>
                )}

                <div className={styles.actionRow}>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => void continuePrimary()}
                    disabled={stepOneBusy}
                  >
                    <ButtonLabel loading={stepOneBusy} label={primaryBusy ? copy.sendingLabel : copy.continueLabel} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Step 2: Follow-up questions ── */}
        {!done && step === 2 && (
          <div key={`s2-${slideKey}`} className={`${styles.stepBlock} ${slideClass}`}>
            {followUpBusy && !followUpQuestion ? (
              <StepSkeleton text={copy.preparingText} />
            ) : (
              <>
                <h3 className={styles.question} ref={stepTitleRef} tabIndex={-1}>
                  {followUpQuestion || copy.chooseDetail}
                </h3>
                {followUpGuidance && <p className={styles.hint}>{followUpGuidance}</p>}
                <p className={styles.hint}>
                  {copy.followUpProgressLabel(Math.min(followUpAnswers.length + 1, MAX_FOLLOW_UPS), MAX_FOLLOW_UPS)}
                </p>

                <div className={styles.bubbleGrid}>
                  {followUpOptions.map((option) => {
                    const isActive = followUpSelectedId === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.bubble} ${isActive ? styles.bubbleActive : ""}`}
                        disabled={followUpBusy}
                        onClick={() => {
                          setFollowUpSelectedId(option.id);
                          setFollowUpText("");
                          setFollowUpError("");
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <label className={styles.fieldLabel}>
                  {copy.cantFindLabel}
                  <textarea
                    className={styles.textarea}
                    value={followUpText}
                    disabled={followUpBusy}
                    onChange={(e) => {
                      setFollowUpText(e.target.value);
                      setFollowUpSelectedId("");
                      setFollowUpError("");
                    }}
                    placeholder={copy.freeTextPlaceholderDetail}
                    rows={3}
                  />
                </label>

                {followUpAnswers.length > 0 && (
                  <div className={styles.summaryBox}>
                    <p className={styles.summaryTitle}>{copy.summaryFollowUps}</p>
                    {followUpAnswers.map((a, i) => (
                      <p key={`${a.question}-${i}`}>
                        <strong>{i + 1}. </strong>
                        {a.answerLabel}
                      </p>
                    ))}
                  </div>
                )}

                {followUpError && (
                  <p className={styles.error} role="alert">
                    {followUpError}
                  </p>
                )}

                <div className={styles.actionRow}>
                  <button type="button" className={styles.secondaryButton} onClick={backStep} disabled={followUpBusy}>
                    {copy.backLabel}
                  </button>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => void continueFollowUp()}
                    disabled={followUpBusy}
                  >
                    <ButtonLabel
                      loading={followUpBusy}
                      label={followUpBusy ? copy.sendingLabel : copy.continueLabel}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Step 3: Guidance / AI advice ── */}
        {!done && step === 3 && (
          <div key={`s3-${slideKey}`} className={`${styles.stepBlock} ${slideClass}`}>
            <h3 className={styles.question} ref={stepTitleRef} tabIndex={-1}>
              {copy.guidanceTitle}
            </h3>
            <p className={styles.hint}>{copy.guidanceSubtitle}</p>

            {/* Urgency badge */}
            {urgencyLevel !== "low" && (
              <div className={styles.urgencyBadge} data-level={urgencyLevel}>
                {urgencyLevel === "high" ? copy.urgencyHighLabel : copy.urgencyMediumLabel}
              </div>
            )}

            {/* Immediate advice tips */}
            {immediateAdvice.length > 0 && (
              <div className={styles.adviceSection}>
                <p className={styles.summaryTitle}>{copy.nextStepsLabel}</p>
                <ul className={styles.adviceList}>
                  {immediateAdvice.map((tip, i) => (
                    <li key={i} className={styles.adviceTip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prepare reminder */}
            {selectedTopicData && (
              <div className={styles.prepareCard}>
                <p className={styles.prepareTitle}>{copy.prepareForLabel}</p>
                <p className={styles.prepareText}>{selectedTopicData.prepareLine}</p>
              </div>
            )}

            {/* Resource links */}
            {selectedTopicData && selectedTopicData.resourceLinks.length > 0 && (
              <div className={styles.resourceLinks}>
                <p className={styles.summaryTitle}>{copy.usefulLinksLabel}</p>
                {selectedTopicData.resourceLinks.map((link, i) => (
                  <a
                    key={i}
                    className={styles.resourceLink}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    {link.phone && <span className={styles.resourcePhone}>{link.phone}</span>}
                  </a>
                ))}
              </div>
            )}

            <div className={styles.actionRow}>
              <button type="button" className={styles.secondaryButton} onClick={backStep}>
                {copy.backLabel}
              </button>
              <button type="button" className={styles.primaryButton} onClick={() => goToStep(4)}>
                {copy.continueLabel}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Contact details ── */}
        {!done && step === 4 && (
          <div key={`s4-${slideKey}`} className={`${styles.stepBlock} ${slideClass}`}>
            <h3 className={styles.question} ref={stepTitleRef} tabIndex={-1}>
              {copy.yourDetailsTitle}
            </h3>

            <div className={styles.formGrid}>
              <label className={styles.fieldLabel}>
                {copy.fullNameLabel} <span className={styles.required}>*</span>
                <input
                  className={`${styles.input} ${fieldErrors.fullName ? styles.inputError : ""}`}
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fieldErrors.fullName) setFieldErrors((p) => ({ ...p, fullName: "" }));
                  }}
                  onBlur={() => handleBlur("fullName", fullName)}
                  placeholder={copy.fullNamePlaceholder}
                />
                {fieldErrors.fullName && (
                  <span className={styles.fieldError} role="alert">
                    {fieldErrors.fullName}
                  </span>
                )}
              </label>

              <label className={styles.fieldLabel}>
                {copy.emailLabel} <span className={styles.required}>*</span>
                <input
                  className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: "" }));
                  }}
                  onBlur={() => handleBlur("email", email)}
                  placeholder={copy.emailPlaceholder}
                />
                {fieldErrors.email && (
                  <span className={styles.fieldError} role="alert">
                    {fieldErrors.email}
                  </span>
                )}
              </label>

              <label className={styles.fieldLabel}>
                {copy.phoneLabel}
                <input
                  className={styles.input}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={copy.phonePlaceholder}
                />
              </label>

              <label className={styles.fieldLabel}>
                {copy.messageLabel}
                <textarea
                  className={styles.textarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={copy.messagePlaceholder}
                  rows={4}
                />
              </label>
            </div>

            {contactError && (
              <p className={styles.error} role="alert">
                {contactError}
              </p>
            )}

            <div className={styles.actionRow}>
              <button type="button" className={styles.secondaryButton} onClick={backStep}>
                {copy.backLabel}
              </button>
              <button type="button" className={styles.primaryButton} onClick={continueContact}>
                {copy.continueLabel}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 5: Documents & submit ── */}
        {!done && step === 5 && (
          <div key={`s5-${slideKey}`} className={`${styles.stepBlock} ${slideClass}`}>
            <h3 className={styles.question} ref={stepTitleRef} tabIndex={-1}>
              {copy.docsTitle}
            </h3>
            <p className={styles.hint}>{copy.docsHint}</p>

            {/* Document checklist */}
            {selectedTopicData && selectedTopicData.documentChecklist.length > 0 && (
              <div className={styles.docChecklist}>
                <p className={styles.summaryTitle}>{copy.docChecklistTitle}</p>
                {selectedTopicData.documentChecklist.map((doc, i) => (
                  <label key={i} className={styles.docCheckItem}>
                    <input
                      type="checkbox"
                      className={styles.docCheckbox}
                      checked={checkedDocs.has(i)}
                      onChange={() => {
                        setCheckedDocs((prev) => {
                          const next = new Set(prev);
                          if (next.has(i)) next.delete(i);
                          else next.add(i);
                          return next;
                        });
                      }}
                    />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            )}

            <div className={styles.summaryBox}>
              <p className={styles.summaryTitle}>{copy.summaryTitle}</p>
              <p>
                <strong>{copy.summaryPrimary}: </strong>
                {primarySelection?.label}
              </p>
              <p>
                <strong>{copy.summaryDetail}: </strong>
                {detailSelection?.label}
              </p>
              {followUpAnswers.length > 0 && (
                <p>
                  <strong>{copy.summaryFollowUps}: </strong>
                  {followUpAnswers.length}
                </p>
              )}
            </div>

            {/* Drop zone */}
            <div
              className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ""} ${submitBusy ? styles.dropZoneDisabled : ""}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !submitBusy && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
              }}
              aria-label={copy.dropZoneText}
            >
              <UploadIcon className={styles.dropZoneIcon} />
              <p className={styles.dropZoneText}>{copy.dropZoneText}</p>
              <p className={styles.dropZoneHint}>{copy.dropZoneClickText}</p>
              <p className={styles.dropZoneFormats}>
                {copy.docsAllowedLabel} \u00b7 {copy.docsLimitLabel}
              </p>
              <input
                ref={fileInputRef}
                className={styles.fileInputHidden}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
                multiple
                disabled={submitBusy}
                onChange={(e) => {
                  if (e.target.files) processFiles(e.target.files);
                  e.target.value = "";
                }}
                tabIndex={-1}
              />
            </div>

            {/* File list */}
            {documents.length > 0 && (
              <ul className={styles.fileList}>
                {documents.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className={`${styles.fileRow} ${fileErrors[index] ? styles.fileRowError : ""}`}
                  >
                    <div className={styles.filePreview}>
                      {previewUrls[index] ? (
                        <img src={previewUrls[index]} alt="" className={styles.fileThumbnail} />
                      ) : (
                        <PdfIcon className={styles.fileIconSvg} />
                      )}
                    </div>
                    <div className={styles.fileMeta}>
                      <span className={styles.fileName}>{file.name}</span>
                      <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                      {fileErrors[index] && <span className={styles.fileErrorText}>{fileErrors[index]}</span>}
                    </div>
                    <button
                      type="button"
                      className={styles.removeFileButton}
                      aria-label={locale === "fr" ? "Supprimer ce fichier" : "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e\u0442 \u0444\u0430\u0439\u043b"}
                      disabled={submitBusy}
                      onClick={() => removeFile(index)}
                    >
                      \u00d7
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {submitError && (
              <p className={styles.error} role="alert">
                {submitError}
              </p>
            )}

            <div className={styles.actionRow}>
              <button type="button" className={styles.secondaryButton} onClick={backStep} disabled={submitBusy}>
                {copy.backLabel}
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => void submitWizard()}
                disabled={submitBusy}
              >
                <ButtonLabel loading={submitBusy} label={submitBusy ? copy.sendingLabel : copy.sendLabel} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
