/* Этот файл показывает форму контактов: проверяет поля и открывает Gmail Web в новой вкладке без mailto и системных окон. */
"use client";

import { useState, type FormEvent, type CSSProperties } from "react";

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
  const texts =
    locale === "fr"
      ? {
          title: "Écrire à l’association",
          nameLabel: "NOM ET PRÉNOM *",
          emailLabel: "E-MAIL *",
          messageLabel: "MESSAGE *",
          namePlaceholder: "Votre nom et prénom",
          emailPlaceholder: "Votre e-mail",
          messagePlaceholder: "Décrivez votre situation (bref). Si vous avez des délais/courriers, précisez ou joignez-les.",
          button: variant === "page" ? "Envoyer le message" : "Envoyer",
          hint: "Réponse par e-mail. Rendez-vous / accueil sur inscription.",
          required: "Champ obligatoire",
          invalidEmail: "Adresse e-mail invalide.",
          openingGmail: "Message envoyé. Nous vous répondrons par e-mail.",
          sendFailed: "Envoi impossible. Réessayez ou écrivez à contact@associationies.fr",
          copyLetter: "Copier le texte du message",
          copied: "Copié",
          copyFailed: "Impossible de copier automatiquement",
          openOutlook: "Ouvrir Outlook Web",
        }
      : {
          title: "Написать в ассоциацию",
          nameLabel: "ИМЯ *",
          emailLabel: "E-MAIL *",
          messageLabel: "СООБЩЕНИЕ *",
          namePlaceholder: "Ваше имя",
          emailPlaceholder: "Ваш e-mail",
          messagePlaceholder:
            "Опишите ситуацию (кратко). Если есть сроки или письмо — напишите об этом или приложите.",
          button: variant === "page" ? "Отправить сообщение" : "Отправить",
          hint: "Ответим по e-mail. Приём/встречи — по записи.",
          required: "Обязательное поле",
          invalidEmail: "Укажите корректный e-mail.",
          openingGmail: "Сообщение отправлено. Мы ответим по e-mail.",
          sendFailed: "Не удалось отправить. Попробуйте ещё раз или напишите на contact@associationies.fr",
          copyLetter: "Скопировать текст письма",
          copied: "Скопировано",
          copyFailed: "Не удалось скопировать автоматически",
          openOutlook: "Открыть Outlook Web",
        };

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

    const bodyLabels =
      locale === "fr"
        ? { name: "Nom", email: "E-mail", message: "Message" }
        : { name: "Имя", email: "E-mail", message: "Сообщение" };

    const body =
      `${bodyLabels.name}: ${name}\n` +
      `${bodyLabels.email}: ${email}\n\n` +
      `${bodyLabels.message}:\n${message}\n`;

    const subject =
      locale === "fr" ? "Message depuis le site Association IES" : "Сообщение с сайта Association IES";

    setPreparedBody(body);
    setPreparedSubject(subject);

    // На странице контактов мы сразу открываем Gmail Web в новой вкладке.
    if (variant === "page") {
      const gmailComposeHref =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        `&to=${encodeURIComponent(EMAIL_TO)}` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      const opened = window.open(gmailComposeHref, "_blank", "noopener,noreferrer");
      setStatusText(opened ? texts.openingGmail : texts.sendFailed);
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
      setCopyStatus(texts.copied);
      window.setTimeout(() => setCopyStatus(null), 1600);
    } catch {
      setCopyStatus(texts.copyFailed);
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

  const outlookComposeHref =
    "https://outlook.office.com/mail/deeplink/compose" +
    `?to=${encodeURIComponent(EMAIL_TO)}` +
    `&subject=${encodeURIComponent(preparedSubject ?? "")}` +
    `&body=${encodeURIComponent(preparedBody ?? "")}`;

  return (
    <form className="form quickForm" onSubmit={handleSubmit} noValidate>
      {/* Заголовок формы показываем только в Hero, чтобы на странице /contact не было дублирования заголовков. */}
      {variant === "hero" ? <h3 className="h3">{texts.title}</h3> : null}

      <div className="form-grid">
        <label className="field">
          <span>{texts.nameLabel}</span>
          <input
            type="text"
            placeholder={texts.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            aria-invalid={showNameError ? true : undefined}
          />
          <div className="fineprint" style={errorTextStyle} aria-live="polite">
            {showNameError ? texts.required : "\u00A0"}
          </div>
        </label>

        <label className="field">
          <span>{texts.emailLabel}</span>
          <input
            type="text"
            inputMode="email"
            autoComplete="email"
            placeholder={texts.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            aria-invalid={showEmailRequiredError || showEmailInvalidError ? true : undefined}
          />
          <div className="fineprint" style={errorTextStyle} aria-live="polite">
            {showEmailRequiredError ? texts.required : showEmailInvalidError ? texts.invalidEmail : "\u00A0"}
          </div>
        </label>

        <label className="field field--full">
          <span>{texts.messageLabel}</span>
          <textarea
            rows={5}
            placeholder={texts.messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
            aria-invalid={showMessageError ? true : undefined}
          />
          <div className="fineprint" style={errorTextStyle} aria-live="polite">
            {showMessageError ? texts.required : "\u00A0"}
          </div>
        </label>
      </div>

      <button className="btn btn--pill btn--blue" type="submit">
        {texts.button}
      </button>

      {/* Подсказка под формой: в Hero оставляем, а на странице /contact она уже есть в тексте страницы. */}
      {variant === "hero" ? <p className="fineprint">{texts.hint}</p> : null}

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
                {texts.openOutlook}
              </a>
              <button type="button" className="btn btn--pill btn--outline-blue btn--sm" onClick={handleCopyLetter}>
                {texts.copyLetter}
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


