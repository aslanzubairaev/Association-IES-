/* Этот файл показывает форму контактов: проверяет поля и открывает webmail в новой вкладке без mailto и системных окон. */
"use client";

import { useState, type FormEvent, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import { quickContactFormCopy } from "@/content/actions";
import { buildOutlookComposeUrl, openWebmailCompose } from "@/lib/emailCompose";

type QuickContactFormProps = {
  locale: "ru" | "fr";
  // Где используется форма: в Hero (компактный блок) или на отдельной странице контактов.
  variant?: "hero" | "page";
  // Текст, который можно заранее подставить в сообщение (например, когда тема выбрана на другой странице).
  prefillMessage?: string;
};

const EMAIL_TO = "contact@associationies.fr";

// Эта форма работает без сервера: она проверяет поля и подготавливает текст письма для копирования.
export function QuickContactForm({ locale, variant = "hero", prefillMessage }: QuickContactFormProps) {
  const copy = quickContactFormCopy[locale];
  const buttonLabel = copy.buttonLabel[variant];

  // Эти значения нужны, чтобы собрать текст письма и показать подсказки при ошибках.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Сообщение можно заранее заполнить (например, строкой “Тема: CAF …”), чтобы человеку было проще начать.
  const [message, setMessage] = useState(() => prefillMessage ?? "");
  const [touched, setTouched] = useState<{ name: boolean; email: boolean; message: boolean }>({
    name: false,
    email: false,
    message: false,
  });
  const [preparedBody, setPreparedBody] = useState<string | null>(null);
  const [preparedSubject, setPreparedSubject] = useState<string | null>(null);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [hideStatusTimerId, setHideStatusTimerId] = useState<number | null>(null);
  const [hideFollowUpsTimerId, setHideFollowUpsTimerId] = useState<number | null>(null);

  const nameIsEmpty = name.trim().length === 0;
  const emailIsEmpty = email.trim().length === 0;
  const messageIsEmpty = message.trim().length === 0;

  const showNameError = touched.name && nameIsEmpty;
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const showEmailRequiredError = touched.email && emailIsEmpty;
  const showEmailInvalidError = touched.email && !emailIsEmpty && !emailLooksValid;
  const showMessageError = touched.message && messageIsEmpty;

  // Эта функция срабатывает при отправке формы: она проверяет поля и подготавливает текст письма.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCopyStatus(null);
    setStatusText(null);
    setTouched({ name: true, email: true, message: true });

    if (nameIsEmpty || emailIsEmpty || messageIsEmpty) return;
    if (!emailLooksValid) return;

    const body =
      `${copy.bodyLabels.name}: ${name}\n` +
      `${copy.bodyLabels.email}: ${email}\n\n` +
      `${copy.bodyLabels.message}:\n${message}\n`;

    const subject = copy.subject;

    setPreparedBody(body);
    setPreparedSubject(subject);

    // На странице контактов мы сразу открываем Gmail Web в новой вкладке.
    if (variant === "page") {
      const opened = openWebmailCompose({ to: EMAIL_TO, subject, body });
      setStatusText(opened ? copy.openingGmail : copy.sendFailed);
      setShowFollowUps(true);

      if (hideStatusTimerId) window.clearTimeout(hideStatusTimerId);
      setHideStatusTimerId(
        window.setTimeout(() => {
          setStatusText(null);
        }, 3600),
      );

      if (hideFollowUpsTimerId) window.clearTimeout(hideFollowUpsTimerId);
      setHideFollowUpsTimerId(
        window.setTimeout(() => {
          setShowFollowUps(false);
        }, 8000),
      );
    }

    setName("");
    setEmail("");
    setMessage("");
    setTouched({ name: false, email: false, message: false });
  }

  // Действие по кнопке: копируем готовый текст письма в буфер, чтобы его можно было вставить в Gmail/Outlook.
  async function handleCopyLetter() {
    if (!preparedBody || !preparedSubject) return;
    try {
      const letterText = `To: ${EMAIL_TO}\nSubject: ${preparedSubject}\n\n${preparedBody}`;
      await navigator.clipboard.writeText(letterText);
      setCopyStatus(copy.copied);
      window.setTimeout(() => setCopyStatus(null), 1600);
    } catch {
      setCopyStatus(copy.copyFailed);
      window.setTimeout(() => setCopyStatus(null), 2200);
    }
  }

  // Этот стиль резервирует место под строку ошибки, чтобы поля не “прыгали”, когда ошибка появляется.
  const errorTextStyle: CSSProperties = {
    color: "rgba(185, 28, 28, 0.92)",
    marginTop: 2,
    minHeight: 16,
    lineHeight: "16px",
  };

  const outlookComposeHref = buildOutlookComposeUrl({
    to: EMAIL_TO,
    subject: preparedSubject ?? "",
    body: preparedBody ?? "",
  });

  return (
    <form className="form quickForm" onSubmit={handleSubmit} noValidate>
      {/* Заголовок формы показываем только в Hero, чтобы на странице /contact не было дублирования заголовков. */}
      {variant === "hero" ? <h3 className="h3">{copy.title}</h3> : null}

      {/* Подсказка: помогает выбрать нужный раздел ниже на странице, чтобы мы быстрее ответили. */}
      {variant === "hero" ? <p className="fineprint quickForm-helper">{copy.helper}</p> : null}

      <div className="form-grid">
        <label className="field">
          <span>{copy.nameLabel}</span>
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

        <label className="field">
          <span>{copy.emailLabel}</span>
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

        <label className="field field--full">
          <span>{copy.messageLabel}</span>
          <textarea
            rows={5}
            placeholder={copy.messagePlaceholder}
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

      {/* Кнопка отправки: по нажатию проверяем поля и открываем письмо в почте (в зависимости от варианта формы). */}
      <div className={variant === "hero" ? "quickForm-submitRow quickForm-submitRow--hero" : "quickForm-submitRow"}>
        <Button variant="primary" type="submit" className="contact-cta-button">
          {buttonLabel}
        </Button>
      </div>

      {/* Подсказка под формой: в Hero оставляем, а на странице /contact она уже есть в тексте страницы. */}
      {variant === "hero" ? <p className="fineprint">{copy.hint}</p> : null}

      {/* На странице контактов показываем маленький статус и компактные запасные варианты после отправки. */}
      {variant === "page" ? (
        <div style={{ marginTop: 10 }}>
          {statusText ? (
            <div className="fineprint" style={{ opacity: 0.85 }}>
              {statusText}
            </div>
          ) : null}

          {showFollowUps && preparedBody && preparedSubject ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
              <a className="btn btn--pill btn--outline-blue btn--sm" href={outlookComposeHref} target="_blank" rel="noreferrer">
                {copy.openOutlook}
              </a>
              <button type="button" className="btn btn--pill btn--outline-blue btn--sm" onClick={handleCopyLetter}>
                {copy.copyLetter}
              </button>
              {copyStatus ? (
                <span className="fineprint" style={{ opacity: 0.85 }}>
                  {copyStatus}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}


