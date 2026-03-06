/* This file renders the contact form: validates fields and opens webmail in a new tab without mailto or system dialogs. */
"use client";

import { useState, type FormEvent, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactTopicSelectKeys, getContactTopicLabel, quickContactFormCopy } from "@/content/actions";
import { openWebmailCompose } from "@/lib/emailCompose";
import styles from "./QuickContactForm.module.css";

type QuickContactFormProps = {
  locale: "ru" | "fr";
  // Where the form is used: in the Hero (compact block) or on the dedicated contact page.
  variant?: "hero" | "page";
  // Topic that can be pre-selected (e.g., when the user came from another page).
  initialTopic?: string;
  messagePlaceholderOverride?: string;
  messagePlaceholderTopic?: string;
  onTopicChange?: (value: string) => void;
  pageNoteClassName?: string;
  topicOptions?: Array<{ value: string; label: string }>;
  resolveTopicLabel?: (topicKey: string) => string;
};

const EMAIL_TO = "contact@associationies.fr";

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

// This form works without a server: it validates fields and prepares the email body for copying.
export function QuickContactForm({
  locale,
  variant = "hero",
  initialTopic,
  messagePlaceholderOverride,
  messagePlaceholderTopic,
  onTopicChange,
  pageNoteClassName,
  topicOptions,
  resolveTopicLabel,
}: QuickContactFormProps) {
  const copy = quickContactFormCopy[locale];
  const buttonLabel = copy.buttonLabel[variant];
  const initialTopicValue = initialTopic?.trim() ?? "";

  // These values are used to compose the email body and display error hints.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(initialTopicValue);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<{ name: boolean; email: boolean; topic: boolean; message: boolean }>({
    name: false,
    email: false,
    topic: false,
    message: false,
  });

  const nameIsEmpty = name.trim().length === 0;
  const emailIsEmpty = email.trim().length === 0;
  const topicIsEmpty = selectedTopic.trim().length === 0;
  const messageIsEmpty = message.trim().length === 0;

  const defaultTopicOptions = contactTopicSelectKeys.map((key) => ({
    value: key,
    label: getContactTopicLabel(locale, key),
  }));
  const standardTopicOptions = topicOptions?.length ? topicOptions : defaultTopicOptions;
  const standardTopicKeys = standardTopicOptions.map((option) => option.value);
  const resolveTopic = resolveTopicLabel ?? ((topicKey: string) => getContactTopicLabel(locale, topicKey));
  const isStandardTopic = standardTopicKeys.includes(selectedTopic);
  const extraTopicOption =
    selectedTopic && !isStandardTopic
      ? { value: selectedTopic, label: resolveTopic(selectedTopic) }
      : null;
  const topicOptionsList = extraTopicOption ? [extraTopicOption, ...standardTopicOptions] : standardTopicOptions;
  const intentPlaceholder = messagePlaceholderOverride?.trim();
  const shouldUseIntentPlaceholder = messagePlaceholderTopic
    ? Boolean(intentPlaceholder && intentPlaceholder.length > 0 && selectedTopic === messagePlaceholderTopic)
    : Boolean(intentPlaceholder && intentPlaceholder.length > 0 && selectedTopic === initialTopicValue);
  const messagePlaceholder =
    shouldUseIntentPlaceholder
      ? intentPlaceholder
      : selectedTopic === "volunteer"
        ? copy.messagePlaceholderVolunteer
        : selectedTopic === "other"
          ? copy.messagePlaceholderOther
          : copy.messagePlaceholderDefault;
  const pageNoteText = selectedTopic === "volunteer" ? copy.pageNoteVolunteer : copy.pageNoteDefault;

  const showNameError = touched.name && nameIsEmpty;
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const showEmailRequiredError = touched.email && emailIsEmpty;
  const showEmailInvalidError = touched.email && !emailIsEmpty && !emailLooksValid;
  const showTopicError = touched.topic && topicIsEmpty;
  const showMessageError = touched.message && messageIsEmpty;

  // Triggered on form submission: validates fields and prepares the email body.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, topic: true, message: true });

    if (nameIsEmpty || emailIsEmpty || topicIsEmpty || messageIsEmpty) return;
    if (!emailLooksValid) return;

    const phoneValue = phone.trim();
    const topicLabel = resolveTopic(selectedTopic);
    const headerLines = [
      `${copy.bodyLabels.name}: ${name}`,
      `${copy.bodyLabels.email}: ${email}`,
      phoneValue ? `${copy.bodyLabels.phone}: ${phoneValue}` : null,
      `${copy.bodyLabels.topic}: ${topicLabel}`,
    ].filter(Boolean);

    const body = `${headerLines.join("\n")}\n\n${copy.bodyLabels.message}:\n${message}\n`;

    const subject = copy.subject;

    // On the contact page, we directly open Gmail Web in a new tab.
    if (variant === "page") {
      openWebmailCompose({ to: EMAIL_TO, subject, body });
    }

    setName("");
    setEmail("");
    setPhone("");
    setSelectedTopic("");
    setMessage("");
    setTouched({ name: false, email: false, topic: false, message: false });
  }

  // This style reserves space for the error message so fields don't jump when an error appears.
  const errorTextStyle: CSSProperties = {
    color: "rgba(185, 28, 28, 0.92)",
    marginTop: 2,
    minHeight: 16,
    lineHeight: "16px",
  };

  // When the topic dropdown closes, mark the field as touched to show an error if empty.
  function handleTopicOpenChange(open: boolean) {
    if (!open) {
      setTouched((prev) => ({ ...prev, topic: true }));
    }
  }

  // Form submission collects data and opens a pre-filled email in the chosen mail scenario.
  return (
    <form className={cn("form quickForm", styles.root)} onSubmit={handleSubmit} noValidate>
      {/* Form title is shown only in Hero to avoid duplicate headings on the /contact page. */}
      {variant === "hero" ? <h3 className="h3">{copy.title}</h3> : null}

      {/* Helper text: guides the user to pick the right section below so we can respond faster. */}
      {variant === "hero" ? <p className={cn("fineprint", styles.helper)}>{copy.helper}</p> : null}

      {variant === "page" && pageNoteClassName ? <p className={pageNoteClassName}>{pageNoteText}</p> : null}

      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>{copy.nameLabel}</span>
          <input
            type="text"
            placeholder={copy.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            aria-invalid={showNameError ? true : undefined}
          />
          <div className="fineprint" style={errorTextStyle} aria-live="polite">
            {showNameError ? copy.required : "\u00A0"}
          </div>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{copy.emailLabel}</span>
          <input
            type="text"
            inputMode="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            aria-invalid={showEmailRequiredError || showEmailInvalidError ? true : undefined}
          />
          <div className="fineprint" style={errorTextStyle} aria-live="polite">
            {showEmailRequiredError ? copy.required : showEmailInvalidError ? copy.invalidEmail : "\u00A0"}
          </div>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{copy.phoneLabel}</span>
          <input
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder={copy.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="fineprint" style={errorTextStyle} aria-live="polite">
            {"\u00A0"}
          </div>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{copy.topicLabel}</span>
          <Select
            name="topic"
            value={selectedTopic || undefined}
            onValueChange={(value) => {
              setSelectedTopic(value);
              onTopicChange?.(value);
            }}
            onOpenChange={handleTopicOpenChange}
          >
            <SelectTrigger aria-invalid={showTopicError ? true : undefined}>
              <SelectValue placeholder={copy.topicPlaceholder} />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={8}>
              {topicOptionsList.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="fineprint" style={errorTextStyle} aria-live="polite">
            {showTopicError ? copy.required : "\u00A0"}
          </div>
        </label>

        <label className={cn(styles.field, styles.fieldFull)}>
          <span className={styles.label}>{copy.messageLabel}</span>
          <textarea
            rows={5}
            placeholder={messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
            aria-invalid={showMessageError ? true : undefined}
          />
          <div className="fineprint" style={errorTextStyle} aria-live="polite">
            {showMessageError ? copy.required : "\u00A0"}
          </div>
        </label>
      </div>

      {/* Submit button: validates fields on click and opens the email client (depending on form variant). */}
      <div className={styles.submitRow}>
        <Button variant="primary" type="submit" className="contact-cta-button">
          {buttonLabel}
        </Button>
      </div>

      {/* Hint below the form: shown in Hero; on the /contact page it is already part of the page text. */}
      {variant === "hero" ? <p className="fineprint">{copy.hint}</p> : null}

      {/* On the contact page, no additional status is shown after submission. */}
    </form>
  );
}
