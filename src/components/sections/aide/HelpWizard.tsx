"use client";

import { useMemo, useState } from "react";
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

type HelpWizardProps = {
  locale: HelpLocale;
};

const TOTAL_STEPS = 4;
const MAX_FOLLOW_UPS = 3;

function toDetailOptionId(label: string, index: number) {
  const slug = label
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return slug ? `detail-${slug}` : `detail-${index + 1}`;
}

function asHelpSelection({
  id,
  label,
  userText,
  source,
  confidence,
}: {
  id: string | null;
  label: string;
  userText: string;
  source: "bubble" | "ai" | "manual";
  confidence?: number;
}): HelpSelection {
  return {
    id,
    label: label.trim(),
    userText: userText.trim(),
    source,
    confidence,
  };
}

function summarizeFollowUps(answers: HelpFollowUpAnswer[]) {
  return answers
    .map((answer, index) => `${index + 1}. ${answer.question} -> ${answer.answerText || answer.answerLabel}`)
    .join(" | ")
    .slice(0, 500);
}

function ButtonLabel({ loading, label }: { loading: boolean; label: string }) {
  return (
    <span className={styles.buttonLabel}>
      {loading ? <span className={styles.buttonSpinner} aria-hidden="true" /> : null}
      <span>{label}</span>
    </span>
  );
}

export function HelpWizard({ locale }: HelpWizardProps) {
  const copy = helpWizardCopy[locale];
  const primaryOptions = useMemo(() => getHelpPrimaryOptions(locale), [locale]);
  const primaryOptionById = useMemo(
    () => new Map(primaryOptions.map((option) => [option.id, option])),
    [primaryOptions],
  );

  const fallbackDetailOptions = useMemo<HelpBubbleOption[]>(
    () =>
      locale === "fr"
        ? [
            { id: "detail-documents", label: "Je ne comprends pas les documents demandés" },
            { id: "detail-urgent", label: "Ma situation est urgente" },
            { id: "detail-rdv", label: "Je veux savoir la prochaine étape" },
          ]
        : [
            { id: "detail-documents", label: "Не понимаю, какие документы нужны" },
            { id: "detail-urgent", label: "Ситуация срочная" },
            { id: "detail-rdv", label: "Хочу понять следующий шаг" },
          ],
    [locale],
  );

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const [primarySelectedId, setPrimarySelectedId] = useState("");
  const [primaryText, setPrimaryText] = useState("");
  const [primarySelection, setPrimarySelection] = useState<HelpSelection | null>(null);
  const [primarySuggestion, setPrimarySuggestion] = useState<HelpClassifyResponse["suggestion"] | null>(null);
  const [primaryAlternatives, setPrimaryAlternatives] = useState<HelpBubbleOption[]>([]);
  const [primaryError, setPrimaryError] = useState("");
  const [primaryBusy, setPrimaryBusy] = useState(false);

  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [followUpOptions, setFollowUpOptions] = useState<HelpBubbleOption[]>([]);
  const [followUpSelectedId, setFollowUpSelectedId] = useState("");
  const [followUpText, setFollowUpText] = useState("");
  const [followUpAnswers, setFollowUpAnswers] = useState<HelpFollowUpAnswer[]>([]);
  const [followUpGuidance, setFollowUpGuidance] = useState("");
  const [detailSelection, setDetailSelection] = useState<HelpSelection | null>(null);
  const [followUpError, setFollowUpError] = useState("");
  const [followUpBusy, setFollowUpBusy] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [contactError, setContactError] = useState("");

  const [documents, setDocuments] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState("");
  const [submitBusy, setSubmitBusy] = useState(false);
  const stepOneBusy = primaryBusy || followUpBusy;

  const detailOptionById = useMemo(
    () => new Map(followUpOptions.map((option) => [option.id, option])),
    [followUpOptions],
  );

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
    return asHelpSelection({
      id: null,
      label: safeLabel,
      userText: summarizeFollowUps(answers),
      source: "ai",
    });
  }

  async function classifyPrimaryText(text: string, options: HelpBubbleOption[]) {
    const response = await fetch("/api/help/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        step: "primary",
        text,
        options,
      }),
    });

    if (!response.ok) {
      throw new Error("classify_failed");
    }

    return (await response.json()) as HelpClassifyResponse;
  }

  async function requestNextQuestion({
    primary,
    answers,
    candidateOptions,
  }: {
    primary: HelpSelection;
    answers: HelpFollowUpAnswer[];
    candidateOptions: HelpBubbleOption[];
  }) {
    const response = await fetch("/api/help/next-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        primary,
        answers,
        candidateOptions,
      }),
    });

    if (!response.ok) {
      throw new Error("next_question_failed");
    }

    return (await response.json()) as HelpNextQuestionResponse;
  }

  async function initializeFollowUpFlow(selection: HelpSelection) {
    const candidateOptions = getCandidateOptionsForPrimary(selection);
    clearFollowUpState();
    setFollowUpBusy(true);

    try {
      const result = await requestNextQuestion({
        primary: selection,
        answers: [],
        candidateOptions,
      });
      setFollowUpGuidance(result.guidance);

      if (result.done) {
        setDetailSelection(buildDetailSelection(result.summaryLabel, []));
        setStep(3);
        return;
      }

      setFollowUpQuestion(result.question || copy.chooseDetail);
      setFollowUpOptions(result.options.length > 0 ? result.options : candidateOptions);
      setStep(2);
    } catch {
      setFollowUpQuestion(copy.chooseDetail);
      setFollowUpOptions(candidateOptions);
      setFollowUpError(copy.nextQuestionErrorText);
      setStep(2);
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
        primaryOptions.map((option) => ({ id: option.id, label: option.label })),
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
      if (accept && primarySuggestion) {
        const selection = asHelpSelection({
          id: primarySuggestion.id,
          label: primarySuggestion.label,
          userText: typed,
          source: "ai",
          confidence: primarySuggestion.confidence,
        });
        setPrimarySelection(selection);
        await initializeFollowUpFlow(selection);
        return;
      }

      const selection = asHelpSelection({
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

    let answer: HelpFollowUpAnswer | null = null;
    if (followUpSelectedId) {
      const option = detailOptionById.get(followUpSelectedId);
      if (!option) {
        setFollowUpError(copy.noChoiceText);
        return;
      }

      answer = {
        question,
        answerLabel: option.label,
        answerText: option.label,
        source: "bubble",
      };
    } else {
      if (typed.length < 3) {
        setFollowUpError(copy.noChoiceText);
        return;
      }

      answer = {
        question,
        answerLabel: typed.slice(0, 90),
        answerText: typed,
        source: "manual",
      };
    }

    const nextAnswers = [...followUpAnswers, answer];
    const candidateOptions = getCandidateOptionsForPrimary(primarySelection);

    setFollowUpBusy(true);
    try {
      const result = await requestNextQuestion({
        primary: primarySelection,
        answers: nextAnswers,
        candidateOptions,
      });
      setFollowUpAnswers(nextAnswers);
      setFollowUpGuidance(result.guidance);

      if (result.done || nextAnswers.length >= MAX_FOLLOW_UPS) {
        setDetailSelection(buildDetailSelection(result.summaryLabel, nextAnswers));
        setStep(3);
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
      setStep(3);
    } finally {
      setFollowUpBusy(false);
    }
  }

  function continueContact() {
    setContactError("");

    if (!fullName.trim()) {
      setContactError(copy.requiredFieldText);
      return;
    }

    const emailValue = email.trim();
    if (!emailValue) {
      setContactError(copy.requiredFieldText);
      return;
    }

    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    if (!emailLooksValid) {
      setContactError(copy.invalidEmailText);
      return;
    }

    setStep(4);
  }

  function backStep() {
    if (step <= 1) return;
    if (step === 3) {
      setDetailSelection(null);
    }
    if (step === 2) {
      clearFollowUpState();
    }
    setStep((current) => current - 1);
  }

  function handleFilesChange(fileList: FileList | null) {
    const nextFiles = Array.from(fileList ?? []);
    setDocuments(nextFiles.slice(0, 5));
  }

  function removeFile(index: number) {
    setDocuments((previous) => previous.filter((_, currentIndex) => currentIndex !== index));
  }

  async function submitWizard() {
    if (!primarySelection || !detailSelection) {
      setSubmitError(copy.submitErrorText);
      return;
    }

    const payload: HelpSubmissionPayload = {
      locale,
      submittedAt: new Date().toISOString(),
      primary: primarySelection,
      detail: detailSelection,
      followUps: followUpAnswers,
      message: message.trim(),
      contact: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
    };

    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));
    formData.append("website", "");
    documents.forEach((file) => formData.append("documents", file));

    setSubmitBusy(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/help/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorBody?.error || copy.submitErrorText);
      }

      setDone(true);
    } catch (error) {
      const messageText = error instanceof Error ? error.message : copy.submitErrorText;
      setSubmitError(messageText);
    } finally {
      setSubmitBusy(false);
    }
  }

  return (
    <section className={styles.scope} aria-label={copy.pageTitle}>
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.pageTitle}</h1>
        <p className={styles.subtitle}>{copy.pageSubtitle}</p>
      </header>

      <div className={styles.panel}>
        <div className={styles.progressRow}>
          <p className={styles.progressText}>{copy.stepLabel(done ? TOTAL_STEPS : step, TOTAL_STEPS)}</p>
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{ width: `${((done ? TOTAL_STEPS : step) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {done ? (
          <div className={styles.successBox}>
            <h3 className={styles.successTitle}>{copy.doneTitle}</h3>
            <p className={styles.successText}>{copy.doneText}</p>
          </div>
        ) : null}

        {!done && step === 1 ? (
          <div className={styles.stepBlock}>
            <h3 className={styles.question}>{copy.choosePrimary}</h3>
            <div className={styles.bubbleGrid}>
              {primaryOptions.map((option) => {
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
                    {option.label}
                  </button>
                );
              })}
            </div>

            <label className={styles.fieldLabel}>
              {copy.cantFindLabel}
              <textarea
                className={styles.textarea}
                value={primaryText}
                disabled={stepOneBusy}
                onChange={(event) => {
                  setPrimaryText(event.target.value);
                  setPrimarySelectedId("");
                  setPrimarySuggestion(null);
                }}
                placeholder={copy.freeTextPlaceholderPrimary}
                rows={3}
              />
            </label>
            <p className={styles.hint}>{copy.freeTextHint}</p>

            {primarySuggestion ? (
              <div className={styles.aiCard}>
                <p className={styles.aiTitle}>{copy.aiProposedLabel}</p>
                <p className={styles.aiValue}>{primarySuggestion.label}</p>
                <p className={styles.aiQuestion}>{copy.aiConfirmQuestion}</p>
                {primaryAlternatives.length > 0 ? (
                  <p className={styles.aiAlt}>
                    {primaryAlternatives.map((option) => option.label).join(" • ")}
                  </p>
                ) : null}
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
            ) : null}

            {primaryError ? <p className={styles.error}>{primaryError}</p> : null}

            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={continuePrimary}
                disabled={stepOneBusy}
              >
                <ButtonLabel loading={stepOneBusy} label={primaryBusy ? copy.sendingLabel : copy.continueLabel} />
              </button>
            </div>
          </div>
        ) : null}

        {!done && step === 2 ? (
          <div className={styles.stepBlock}>
            <h3 className={styles.question}>{followUpQuestion || copy.chooseDetail}</h3>
            {followUpGuidance ? <p className={styles.hint}>{followUpGuidance}</p> : null}
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
                onChange={(event) => {
                  setFollowUpText(event.target.value);
                  setFollowUpSelectedId("");
                  setFollowUpError("");
                }}
                placeholder={copy.freeTextPlaceholderDetail}
                rows={3}
              />
            </label>

            {followUpAnswers.length > 0 ? (
              <div className={styles.summaryBox}>
                <p className={styles.summaryTitle}>{copy.summaryFollowUps}</p>
                {followUpAnswers.map((answer, index) => (
                  <p key={`${answer.question}-${index}`}>
                    <strong>{index + 1}. </strong>
                    {answer.answerLabel}
                  </p>
                ))}
              </div>
            ) : null}

            {followUpError ? <p className={styles.error}>{followUpError}</p> : null}

            <div className={styles.actionRow}>
              <button type="button" className={styles.secondaryButton} onClick={backStep} disabled={followUpBusy}>
                {copy.backLabel}
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={continueFollowUp}
                disabled={followUpBusy}
              >
                <ButtonLabel loading={followUpBusy} label={followUpBusy ? copy.sendingLabel : copy.continueLabel} />
              </button>
            </div>
          </div>
        ) : null}

        {!done && step === 3 ? (
          <div className={styles.stepBlock}>
            <h3 className={styles.question}>{copy.yourDetailsTitle}</h3>

            <div className={styles.formGrid}>
              <label className={styles.fieldLabel}>
                {copy.fullNameLabel}
                <input
                  className={styles.input}
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder={copy.fullNamePlaceholder}
                />
              </label>

              <label className={styles.fieldLabel}>
                {copy.emailLabel}
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={copy.emailPlaceholder}
                />
              </label>

              <label className={styles.fieldLabel}>
                {copy.phoneLabel}
                <input
                  className={styles.input}
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder={copy.phonePlaceholder}
                />
              </label>

              <label className={styles.fieldLabel}>
                {copy.messageLabel}
                <textarea
                  className={styles.textarea}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={copy.messagePlaceholder}
                  rows={4}
                />
              </label>
            </div>

            {contactError ? <p className={styles.error}>{contactError}</p> : null}

            <div className={styles.actionRow}>
              <button type="button" className={styles.secondaryButton} onClick={backStep}>
                {copy.backLabel}
              </button>
              <button type="button" className={styles.primaryButton} onClick={continueContact}>
                {copy.continueLabel}
              </button>
            </div>
          </div>
        ) : null}

        {!done && step === 4 ? (
          <div className={styles.stepBlock}>
            <h3 className={styles.question}>{copy.docsTitle}</h3>
            <p className={styles.hint}>{copy.docsHint}</p>

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
              {followUpAnswers.length > 0 ? (
                <p>
                  <strong>{copy.summaryFollowUps}: </strong>
                  {followUpAnswers.length}
                </p>
              ) : null}
            </div>

            <label className={styles.uploadBox}>
              <span className={`${styles.uploadLabel} ${submitBusy ? styles.uploadLabelDisabled : ""}`}>
                {copy.docsUploadLabel}
              </span>
              <input
                className={styles.fileInput}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
                multiple
                disabled={submitBusy}
                onChange={(event) => handleFilesChange(event.target.files)}
              />
            </label>

            <p className={styles.hint}>{copy.docsAllowedLabel}</p>
            <p className={styles.hint}>{copy.docsLimitLabel}</p>

            {documents.length > 0 ? (
              <ul className={styles.fileList}>
                {documents.map((file, index) => (
                  <li key={`${file.name}-${index}`} className={styles.fileRow}>
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className={styles.removeFileButton}
                      aria-label={locale === "fr" ? "Supprimer ce fichier" : "Удалить этот файл"}
                      disabled={submitBusy}
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {submitError ? <p className={styles.error}>{submitError}</p> : null}

            <div className={styles.actionRow}>
              <button type="button" className={styles.secondaryButton} onClick={backStep} disabled={submitBusy}>
                {copy.backLabel}
              </button>
              <button type="button" className={styles.primaryButton} onClick={submitWizard} disabled={submitBusy}>
                <ButtonLabel loading={submitBusy} label={submitBusy ? copy.sendingLabel : copy.sendLabel} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
