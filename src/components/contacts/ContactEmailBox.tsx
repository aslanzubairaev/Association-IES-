/* Этот файл показывает блок с e-mail на странице контактов и кнопку “Скопировать e-mail”. */
"use client";

import { useState } from "react";

type ContactEmailBoxProps = {
  locale: "ru" | "fr";
  email: string;
};

// Этот блок делает e-mail заметным и даёт удобную кнопку, чтобы скопировать адрес в буфер обмена.
export function ContactEmailBox({ locale, email }: ContactEmailBoxProps) {
  const [status, setStatus] = useState<string | null>(null);

  const copyLabel = locale === "fr" ? "Copier l’e-mail" : "Скопировать e-mail";
  const copiedLabel = locale === "fr" ? "Copié" : "Скопировано";
  const failedLabel = locale === "fr" ? "Impossible de copier automatiquement" : "Не удалось скопировать автоматически";
  const helperText =
    locale === "fr"
      ? "Idéalement, décrivez la situation en 2–3 phrases et joignez une photo/scan du courrier (si possible)."
      : "Лучше писать с кратким описанием ситуации и приложить фото/скан письма (если есть).";

  // Действие по кнопке: копируем e-mail в буфер, чтобы его можно было вставить в любую почту.
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus(`${copiedLabel}: ${email}`);
      window.setTimeout(() => setStatus(null), 1600);
    } catch {
      setStatus(failedLabel);
      window.setTimeout(() => setStatus(null), 2200);
    }
  }

  return (
    <div className="contact-box" style={{ marginBottom: 16, color: "rgba(11,27,51,.92)" }}>
      {/* Строка с e-mail: делаем контрастным, но не открываем mailto, чтобы не появлялось системное окно. */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div>
          <b>E-mail:</b>{" "}
          <span
            style={{
              color: "var(--blue)",
              textDecoration: "underline",
              fontWeight: 900,
              position: "relative",
              zIndex: 1,
            }}
          >
            {email}
          </span>
        </div>

        {/* Запасной вариант: можно просто скопировать адрес и вставить его в любую почту. */}
        <button type="button" className="btn btn--pill btn--outline-blue" onClick={handleCopy}>
          {copyLabel}
        </button>
      </div>

      {/* Короткий статус: подтверждаем копирование или показываем ошибку. */}
      {status ? (
        <div className="fineprint" style={{ marginTop: 10, opacity: 0.85 }}>
          {status}
        </div>
      ) : null}

      {/* Небольшая подсказка: помогает написать письмо так, чтобы мы быстрее разобрались. */}
      <div className="fineprint" style={{ marginTop: 10, opacity: 0.85 }}>
        {helperText}
      </div>
    </div>
  );
}


