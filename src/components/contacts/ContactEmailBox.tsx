/* Этот файл показывает блок с e-mail на странице контактов и кнопку “Скопировать e-mail”. */
"use client";

import { useState } from "react";
import { contactEmailBoxCopy } from "@/content/actions";

type ContactEmailBoxProps = {
  locale: "ru" | "fr";
  email: string;
};

// Этот блок делает e-mail заметным и даёт удобную кнопку, чтобы скопировать адрес в буфер обмена.
export function ContactEmailBox({ locale, email }: ContactEmailBoxProps) {
  const [status, setStatus] = useState<string | null>(null);

  const copy = contactEmailBoxCopy[locale];

  // Действие по кнопке: копируем e-mail в буфер, чтобы его можно было вставить в любую почту.
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus(`${copy.copiedLabel}: ${email}`);
      window.setTimeout(() => setStatus(null), 1600);
    } catch {
      setStatus(copy.failedLabel);
      window.setTimeout(() => setStatus(null), 2200);
    }
  }

  return (
    <div className="contact-email-box">
      {/* Строка с e-mail: делаем контрастным, но не открываем mailto, чтобы не появлялось системное окно. */}
      <div className="contact-email-row">
        <div>
          <b className="contact-email-label">{copy.emailLabel}:</b>
        </div>

        {/* Запасной вариант: можно просто скопировать адрес и вставить его в любую почту. */}
        <button
          type="button"
          className="btn btn--pill contact-cta-button contact-cta-button--compact"
          onClick={handleCopy}
        >
          {copy.copyLabel}
        </button>
      </div>

      {/* Короткий статус: подтверждаем копирование или показываем ошибку. */}
      {status ? (
        <div className="fineprint contact-email-status">
          {status}
        </div>
      ) : null}

      {/* Небольшая подсказка: помогает написать письмо так, чтобы мы быстрее разобрались. */}
      <div className="fineprint contact-email-helper">
        {copy.helperText}
      </div>
    </div>
  );
}


