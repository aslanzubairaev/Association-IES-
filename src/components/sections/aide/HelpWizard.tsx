"use client";

import { useMemo, useState } from "react";
import { getHelpPrimaryOptions, helpWizardCopy } from "@/content/helpWizard";
import type {
  HelpBubbleOption,
  HelpClassifyResponse,
  HelpLocale,
  HelpSelection,
  HelpSubmissionPayload,
} from "@/lib/helpFlow/types";
import styles from "./HelpWizard.module.css";

type HelpWizardProps = {
  locale: HelpLocale;
};

const TOTAL_STEPS = 4;

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

  const [detailSelectedId, setDetailSelectedId] = useState("");
  const [detailText, setDetailText] = useState("");
  const [detailSelection, setDetailSelection] = useState<HelpSelection | null>(null);
  const [detailSuggestion, setDetailSuggestion] = useState<HelpClassifyResponse["suggestion"] | null>(null);
  const [detailAlternatives, setDetailAlternatives] = useState<HelpBubbleOption[]>([]);
  const [detailError, setDetailError] = useState("");
  const [detailBusy, setDetailBusy] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [contactError, setContactError] = useState("");

  const [documents, setDocuments] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState("");
  const [submitBusy, setSubmitBusy] = useState(false);

  const currentPrimaryOption = primarySelection?.id ? primaryOptionById.get(primarySelection.id) : undefined;
  const detailOptions = useMemo<HelpBubbleOption[]>(() => {
    if (!currentPrimaryOption) {
      return fallbackDetailOptions;
    }
    return currentPrimaryOption.examples.map((example, index) => ({
      id: toDetailOptionId(example, index),
      label: example,
    }));
  }, [currentPrimaryOption, fallbackDetailOptions]);

  const detailOptionById = useMemo(
    () => new Map(detailOptions.map((option) => [option.id, option])),
    [detailOptions],
  );

  async function classifyText({
    stepType,
    text,
    options,
  }: {
    stepType: "primary" | "detail";
    text: string;
    options: HelpBubbleOption[];
  }) {
    const response = await fetch("/api/help/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        step: stepType,
        text,
        options,
      }),
    });

    if (!response.ok) {
      throw new Error("classify_failed");
    }

    return (await response.json()) as HelpClassifyResponse;
  }

  async function continuePrimary() {
    setPrimaryError("");

    if (primarySelectedId) {
      const option = primaryOptionById.get(primarySelectedId);
      if (!option) {
        setPrimaryError(copy.noChoiceText);
        return;
      }

      setPrimarySelection(
        asHelpSelection({
          id: option.id,
          label: option.label,
          userText: primaryText,
          source: "bubble",
        }),
      );
      setStep(2);
      return;
    }

    const typed = primaryText.trim();
    if (typed.length < 3) {
      setPrimaryError(copy.noChoiceText);
      return;
    }

    setPrimaryBusy(true);
    try {
      const result = await classifyText({
        stepType: "primary",
        text: typed,
        options: primaryOptions.map((option) => ({ id: option.id, label: option.label })),
      });
      setPrimarySuggestion(result.suggestion);
      setPrimaryAlternatives(result.alternatives);
    } catch {
      setPrimarySelection(
        asHelpSelection({
          id: null,
          label: typed.slice(0, 80) || copy.customFallbackLabel,
          userText: typed,
          source: "manual",
        }),
      );
      setPrimaryError(copy.classifyErrorText);
      setStep(2);
    } finally {
      setPrimaryBusy(false);
    }
  }

  function confirmPrimarySuggestion(accept: boolean) {
    const typed = primaryText.trim();

    if (accept && primarySuggestion) {
      setPrimarySelection(
        asHelpSelection({
          id: primarySuggestion.id,
          label: primarySuggestion.label,
          userText: typed,
          source: "ai",
          confidence: primarySuggestion.confidence,
        }),
      );
      setStep(2);
      return;
    }

    setPrimarySelection(
      asHelpSelection({
        id: null,
        label: typed.slice(0, 80) || copy.customFallbackLabel,
        userText: typed,
        source: "manual",
      }),
    );
    setStep(2);
  }

  async function continueDetail() {
    setDetailError("");

    if (detailSelectedId) {
      const option = detailOptionById.get(detailSelectedId);
      if (!option) {
        setDetailError(copy.noChoiceText);
        return;
      }

      setDetailSelection(
        asHelpSelection({
          id: option.id,
          label: option.label,
          userText: detailText,
          source: "bubble",
        }),
      );
      setStep(3);
      return;
    }

    const typed = detailText.trim();
    if (typed.length < 3) {
      setDetailError(copy.noChoiceText);
      return;
    }

    setDetailBusy(true);
    try {
      const result = await classifyText({
        stepType: "detail",
        text: typed,
        options: detailOptions,
      });
      setDetailSuggestion(result.suggestion);
      setDetailAlternatives(result.alternatives);
    } catch {
      setDetailSelection(
        asHelpSelection({
          id: null,
          label: typed.slice(0, 80) || copy.customFallbackLabel,
          userText: typed,
          source: "manual",
        }),
      );
      setDetailError(copy.classifyErrorText);
      setStep(3);
    } finally {
      setDetailBusy(false);
    }
  }

  function confirmDetailSuggestion(accept: boolean) {
    const typed = detailText.trim();

    if (accept && detailSuggestion) {
      setDetailSelection(
        asHelpSelection({
          id: detailSuggestion.id,
          label: detailSuggestion.label,
          userText: typed,
          source: "ai",
          confidence: detailSuggestion.confidence,
        }),
      );
      setStep(3);
      return;
    }

    setDetailSelection(
      asHelpSelection({
        id: null,
        label: typed.slice(0, 80) || copy.customFallbackLabel,
        userText: typed,
        source: "manual",
      }),
    );
    setStep(3);
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
                    onClick={() => {
                      setPrimarySelectedId(option.id);
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
                onChange={(event) => {
                  setPrimaryText(event.target.value);
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
                  <button type="button" className={styles.primaryButton} onClick={() => confirmPrimarySuggestion(true)}>
                    {copy.aiConfirmYes}
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => confirmPrimarySuggestion(false)}
                  >
                    {copy.aiConfirmNo}
                  </button>
                </div>
              </div>
            ) : null}

            {primaryError ? <p className={styles.error}>{primaryError}</p> : null}

            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryButton} onClick={continuePrimary} disabled={primaryBusy}>
                {primaryBusy ? copy.sendingLabel : copy.continueLabel}
              </button>
            </div>
          </div>
        ) : null}

        {!done && step === 2 ? (
          <div className={styles.stepBlock}>
            <h3 className={styles.question}>{copy.chooseDetail}</h3>
            <div className={styles.bubbleGrid}>
              {detailOptions.map((option) => {
                const isActive = detailSelectedId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.bubble} ${isActive ? styles.bubbleActive : ""}`}
                    onClick={() => {
                      setDetailSelectedId(option.id);
                      setDetailSuggestion(null);
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
                value={detailText}
                onChange={(event) => {
                  setDetailText(event.target.value);
                  setDetailSuggestion(null);
                }}
                placeholder={copy.freeTextPlaceholderDetail}
                rows={3}
              />
            </label>

            {detailSuggestion ? (
              <div className={styles.aiCard}>
                <p className={styles.aiTitle}>{copy.aiProposedLabel}</p>
                <p className={styles.aiValue}>{detailSuggestion.label}</p>
                <p className={styles.aiQuestion}>{copy.aiConfirmQuestion}</p>
                {detailAlternatives.length > 0 ? (
                  <p className={styles.aiAlt}>
                    {detailAlternatives.map((option) => option.label).join(" • ")}
                  </p>
                ) : null}
                <div className={styles.actionRow}>
                  <button type="button" className={styles.primaryButton} onClick={() => confirmDetailSuggestion(true)}>
                    {copy.aiConfirmYes}
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => confirmDetailSuggestion(false)}
                  >
                    {copy.aiConfirmNo}
                  </button>
                </div>
              </div>
            ) : null}

            {detailError ? <p className={styles.error}>{detailError}</p> : null}

            <div className={styles.actionRow}>
              <button type="button" className={styles.secondaryButton} onClick={backStep}>
                {copy.backLabel}
              </button>
              <button type="button" className={styles.primaryButton} onClick={continueDetail} disabled={detailBusy}>
                {detailBusy ? copy.sendingLabel : copy.continueLabel}
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
            </div>

            <label className={styles.uploadBox}>
              <span className={styles.uploadLabel}>{copy.docsUploadLabel}</span>
              <input
                className={styles.fileInput}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
                multiple
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
                    <button type="button" className={styles.removeFileButton} onClick={() => removeFile(index)}>
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
                {submitBusy ? copy.sendingLabel : copy.sendLabel}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
