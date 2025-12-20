/* 
 Этот файл определяет компактную форму для быстрого обращения в ассоциацию.
 Он показывает поля “имя / e-mail / сообщение” и кнопку отправки.
 Человек может заполнить форму и открыть черновик письма в своей почте.
*/
"use client";

import { useMemo, useState, type FormEvent } from "react";

type QuickContactFormProps = {
  locale: "ru" | "fr";
};

const EMAIL_TO = "contact@associationies.fr";
const SUBJECT = "Demande via le site IES";

// Эта форма открывает почтовый клиент через mailto, поэтому отправка работает без сервера.
export function QuickContactForm({ locale }: QuickContactFormProps) {
  // Эти тексты меняются в зависимости от выбранного языка.
  const texts = useMemo(() => {
    if (locale === "fr") {
      return {
        title: "Écrire à l’association",
        namePlaceholder: "Votre nom",
        emailPlaceholder: "Votre e-mail",
        messagePlaceholder: "Votre message",
        button: "Envoyer",
        hint: "Nous répondrons par e-mail. Accueil sur rendez-vous.",
        required: "Champ requis",
      };
    }

    return {
      title: "Написать в ассоциацию",
      namePlaceholder: "Ваше имя",
      emailPlaceholder: "Ваш e-mail",
      messagePlaceholder: "Сообщение",
      button: "Отправить",
      hint: "Ответим по e-mail. Приём — по записи.",
      required: "Обязательное поле",
    };
  }, [locale]);

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
      <h3 className="h3">{texts.title}</h3>

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

      <p className="fineprint">{texts.hint}</p>

      {draftOpened ? (
        <p className="fineprint">Черновик письма открыт. Нажмите Отправить в почте.</p>
      ) : null}
    </form>
  );
}


