/* 
 Этот файл содержит блок с реквизитами для банковского перевода.
 Он показывает IBAN и BIC понятным, контрастным текстом и даёт кнопки “Скопировать”, чтобы быстро вставить данные в приложении банка.
 Человек может нажать на блок или на одну из кнопок, чтобы скопировать нужную строку.
*/

"use client";

import { useState } from "react";
import { CopyToClipboardButton } from "@/components/ui/CopyToClipboardButton";

type BankTransferDetailsProps = {
  locale: "ru" | "fr";
  iban: string;
  bic: string;
};

// Блок реквизитов: по клику копирует данные в буфер обмена и показывает короткую подсказку.
export function BankTransferDetails({ locale, iban, bic }: BankTransferDetailsProps) {
  const [status, setStatus] = useState<string | null>(null);

  const copyAllLabel = locale === "fr" ? "Copier (IBAN + BIC)" : "Скопировать (IBAN + BIC)";
  const copyIbanLabel = locale === "fr" ? "Copier l’IBAN" : "Скопировать IBAN";
  const copyBicLabel = locale === "fr" ? "Copier le BIC" : "Скопировать BIC";
  const copiedLabel = locale === "fr" ? "Copié" : "Скопировано";
  const copiedIbanStatus = locale === "fr" ? "Copié : IBAN" : "Скопировано: IBAN";
  const copiedBicStatus = locale === "fr" ? "Copié : BIC" : "Скопировано: BIC";
  const copyFailedLabel =
    locale === "fr" ? "Impossible de copier automatiquement" : "Не удалось скопировать автоматически";

  // Действие: копируем текст в буфер обмена, чтобы человек мог быстро вставить его в приложении банка.
  async function copyToClipboard(textToCopy: string, okMessage: string) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setStatus(okMessage);
      window.setTimeout(() => setStatus(null), 1600);
    } catch {
      setStatus(copyFailedLabel);
      window.setTimeout(() => setStatus(null), 2200);
    }
  }

  // Действие по нажатию на сам блок: копируем IBAN и BIC вместе одной строкой.
  function copyAll() {
    copyToClipboard(`IBAN: ${iban}\nBIC: ${bic}`, `${copiedLabel}: ${copyAllLabel}`);
  }

  return (
    <div>
      {/* Блок реквизитов: контрастный и кликабельный, чтобы быстро скопировать данные. */}
      <div
        className="contact-box bank-transfer-box"
        role="button"
        tabIndex={0}
        onClick={copyAll}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            copyAll();
          }
        }}
        aria-label={copyAllLabel}
        style={{
          color: "rgba(11,27,51,.92)",
          cursor: "pointer",
          userSelect: "text",
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 8 }}>
          {locale === "fr" ? "Coordonnées bancaires" : "Реквизиты"}
        </div>

        <div style={{ lineHeight: 1.6 }}>
          <div>
            <b>IBAN:</b>{" "}
            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace" }}>
              {iban}
            </span>
          </div>
          <div style={{ marginTop: 6 }}>
            <b>BIC:</b>{" "}
            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace" }}>
              {bic}
            </span>
          </div>
        </div>

        {/* Подсказка статуса: показывает, что данные скопированы. */}
        {status ? (
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
            {status}
          </div>
        ) : (
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
            {locale === "fr"
              ? "Cliquez pour copier (IBAN + BIC)."
              : "Нажмите, чтобы скопировать (IBAN + BIC)."}
          </div>
        )}
      </div>

      {/* Кнопки копирования: делаем две компактные кнопки рядом, чтобы быстро скопировать IBAN или BIC. */}
      <div
        className="btn-row"
        style={{ marginTop: 12, justifyContent: "center", alignItems: "flex-start", flexWrap: "nowrap" }}
      >
        <CopyToClipboardButton
          value={iban}
          label={copyIbanLabel}
          copiedLabel={copiedIbanStatus}
          className="btn btn--pill btn--outline-blue btn--sm"
        />
        <CopyToClipboardButton
          value={bic}
          label={copyBicLabel}
          copiedLabel={copiedBicStatus}
          className="btn btn--pill btn--outline-blue btn--sm"
        />
      </div>
    </div>
  );
}


