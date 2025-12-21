/* 
 Этот файл содержит небольшой блок с e-mail ассоциации для страницы контактов.
 Он показывает кликабельный адрес и кнопку “Скопировать”, чтобы человек мог быстро написать даже если mailto не открывается.
 Человек может нажать на e-mail (открыть почту) или скопировать адрес в буфер обмена.
*/

"use client";

import { useState } from "react";

type ContactEmailBoxProps = {
  locale: "ru" | "fr";
  email: string;
};

// Этот блок делает e-mail заметным и даёт запасной вариант: “скопировать”, если mailto не срабатывает.
export function ContactEmailBox({ locale, email }: ContactEmailBoxProps) {
  const [status, setStatus] = useState<string | null>(null);

  const copyLabel = locale === "fr" ? "Copier l’e-mail" : "Скопировать e-mail";
  const copiedLabel = locale === "fr" ? "Copié" : "Скопировано";
  const failedLabel = locale === "fr" ? "Impossible de copier automatiquement" : "Не удалось скопировать автоматически";
  const subject = "Demande via le site IES";
  const body =
    locale === "fr"
      ? "Nom: \nEmail: \nMessage:\n"
      : "Имя: \nE-mail: \nСообщение:\n";

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

  // Ссылка mailto: сразу открывает черновик с темой и заготовкой текста (если почта настроена на устройстве).
  const mailto =
    `mailto:${email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  return (
    <div className="contact-box" style={{ marginBottom: 16, color: "rgba(11,27,51,.92)" }}>
      {/* Строка с e-mail: делаем контрастным и точно кликабельным. */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div>
          <b>E-mail:</b>{" "}
          <a
            href={mailto}
            style={{
              color: "var(--blue)",
              textDecoration: "underline",
              fontWeight: 900,
              position: "relative",
              zIndex: 1,
            }}
          >
            {email}
          </a>
        </div>

        {/* Запасной вариант: если mailto не открывается, можно просто скопировать адрес. */}
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
    </div>
  );
}


