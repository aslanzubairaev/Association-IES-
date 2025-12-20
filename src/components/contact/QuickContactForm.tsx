/* 
 Этот файл определяет компактную форму для быстрого обращения в ассоциацию.
 Он показывает поля “имя / e-mail / сообщение” и кнопку отправки.
 Человек может заполнить форму и открыть черновик письма в своей почте.
*/
"use client";

import { useMemo, useState, type FormEvent } from "react";

type QuickContactFormProps = {
  locale: "ru" | "fr";
  // Где используется форма: в Hero (компактный блок) или на отдельной странице контактов.
  variant?: "hero" | "page";
};

const EMAIL_TO = "contact@associationies.fr";
const SUBJECT = "Demande via le site IES";

// Эта форма открывает почтовый клиент через mailto, поэтому отправка работает без сервера.
export function QuickContactForm({ locale, variant = "hero" }: QuickContactFormProps) {
  // Эти тексты меняются в зависимости от выбранного языка.
  const texts = useMemo(() => {
    if (locale === "fr") {
      return {
        title: "Écrire à l’association",
        namePlaceholder: "Votre nom",
        emailPlaceholder: "Votre e-mail",
        messagePlaceholder: "Votre message",
        button: variant === "page" ? "Envoyer un message" : "Envoyer",
        hint: "Nous répondrons par e-mail. Accueil sur rendez-vous.",
        required: "Champ requis",
        draftOpened: "Le brouillon est prêt. Cliquez sur Envoyer dans votre messagerie.",
      };
    }

    return {
      title: "Написать в ассоциацию",
      namePlaceholder: "Ваше имя",
      emailPlaceholder: "Ваш e-mail",
      messagePlaceholder: "Сообщение",
      button: variant === "page" ? "Отправить сообщение" : "Отправить",
      hint: "Ответим по e-mail. Приём — по записи.",
      required: "Обязательное поле",
      draftOpened: "Черновик письма открыт. Нажмите Отправить в почте.",
    };
  }, [locale, variant]);

  // Эти значения нужны, чтобы собрать текст письма и показать подсказки при ошибках.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<{ name: boolean; email: boolean; message: boolean }>({
    name: false,
    email: false,
    message: false,
  });
  const [draftOpened, setDraftOpened] = useState(false);

  const nameIsEmpty = name.trim().length === 0;
  const emailIsEmpty = email.trim().length === 0;
  const messageIsEmpty = message.trim().length === 0;

  // Эта функция срабатывает при отправке формы: она проверяет поля и открывает mailto.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDraftOpened(false);
    setTouched({ name: true, email: true, message: true });

    if (nameIsEmpty || emailIsEmpty || messageIsEmpty) return;

    const body =
      `Nom: ${name}\n` +
      `Email: ${email}\n` +
      `Message:\n${message}\n`;

    const mailto =
      `mailto:${EMAIL_TO}` +
      `?subject=${encodeURIComponent(SUBJECT)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setDraftOpened(true);
  }

  return (
    <form className="form quickForm" onSubmit={handleSubmit}>
      {/* Заголовок формы показываем только в Hero, чтобы на странице /contact не было дублирования заголовков. */}
      {variant === "hero" ? <h3 className="h3">{texts.title}</h3> : null}

      <div className="form-grid">
        <label className="field">
          <span>{locale === "fr" ? "Nom" : "Имя"}</span>
          <input
            type="text"
            placeholder={texts.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            aria-invalid={touched.name && nameIsEmpty ? true : undefined}
          />
        </label>

        <label className="field">
          <span>E-mail</span>
          <input
            type="email"
            placeholder={texts.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            aria-invalid={touched.email && emailIsEmpty ? true : undefined}
          />
        </label>

        <label className="field field--full">
          <span>{locale === "fr" ? "Message" : "Сообщение"}</span>
          <textarea
            rows={5}
            placeholder={texts.messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
            aria-invalid={touched.message && messageIsEmpty ? true : undefined}
          />
        </label>
      </div>

      <button className="btn btn--pill btn--blue" type="submit">
        {texts.button}
      </button>

      {/* Подсказка под формой: в Hero оставляем, а на странице /contact она уже есть в тексте страницы. */}
      {variant === "hero" ? <p className="fineprint">{texts.hint}</p> : null}

      {draftOpened ? (
        <p className="fineprint">{texts.draftOpened}</p>
      ) : null}
    </form>
  );
}


