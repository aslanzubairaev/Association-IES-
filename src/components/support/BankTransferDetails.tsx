/* 
 Этот файл содержит блок с реквизитами для банковского перевода.
 Он показывает IBAN и BIC понятным, контрастным текстом и даёт кнопки “Скопировать”, чтобы быстро вставить данные в приложении банка.
 Человек может нажать на блок или на одну из кнопок, чтобы скопировать нужную строку.
*/

"use client";

import { useEffect, useRef, useState } from "react";
import { CopyToClipboardButton } from "@/components/ui/CopyToClipboardButton";
import { bankTransferCopy } from "@/content/actions";

type BankTransferDetailsProps = {
  locale: "ru" | "fr";
  iban: string;
  bic: string;
};

// Блок реквизитов: по клику копирует данные в буфер обмена и показывает короткую подсказку.
export function BankTransferDetails({ locale, iban, bic }: BankTransferDetailsProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastOwner, setToastOwner] = useState<"iban" | "bic" | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const toastHideRef = useRef<number | null>(null);

  const copy = bankTransferCopy[locale];

  // Действие: копируем текст в буфер обмена, чтобы человек мог быстро вставить его в приложении банка.
  async function copyToClipboard(textToCopy: string, okMessage: string) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setStatus(okMessage);
      window.setTimeout(() => setStatus(null), 1600);
    } catch {
      setStatus(copy.copyFailedLabel);
      window.setTimeout(() => setStatus(null), 2200);
    }
  }

  // Действие по нажатию на сам блок: копируем IBAN и BIC вместе одной строкой.
  function copyAll() {
    copyToClipboard(`IBAN: ${iban}\nBIC: ${bic}`, `${copy.copiedLabel}: ${copy.copyAllLabel}`);
  }

  function showToast(owner: "iban" | "bic", text: string) {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    if (toastHideRef.current) {
      window.clearTimeout(toastHideRef.current);
    }

    setToastText(text);
    setToastVisible(true);
    setToastOwner(owner);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 1600);
    toastHideRef.current = window.setTimeout(() => {
      setToastText(null);
      setToastOwner(null);
    }, 1800);
  }

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      if (toastHideRef.current) {
        window.clearTimeout(toastHideRef.current);
      }
    };
  }, []);

  return (
    <div className="bank-transfer-details">
      {/* Блок реквизитов: контрастный и кликабельный, чтобы быстро скопировать данные. */}
      <div
        className="contact-box bank-transfer-box support-info-panel"
        role="button"
        tabIndex={0}
        onClick={copyAll}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            copyAll();
          }
        }}
        aria-label={copy.copyAllLabel}
      >
        <div className="support-info-title">
          {copy.cardTitle}
        </div>

        <div className="bank-transfer-lines">
          <div>
            <span className="bank-transfer-label">IBAN:</span>{" "}
            <span className="bank-transfer-value bank-transfer-value--mono">
              {iban}
            </span>
          </div>
          <div className="bank-transfer-row">
            <span className="bank-transfer-label">BIC:</span>{" "}
            <span className="bank-transfer-value bank-transfer-value--mono">
              {bic}
            </span>
          </div>
        </div>

        {/* Подсказка статуса: показывает, что данные скопированы. */}
        <div className="bank-transfer-status" aria-live="polite">
          {status ?? copy.hint}
        </div>
      </div>

      {/* Кнопки копирования: делаем две компактные кнопки рядом, чтобы быстро скопировать IBAN или BIC. */}
      <div className="btn-row bank-transfer-actions support-actions-row support-card-footer">
        <div className="support-copy-wrap">
          <CopyToClipboardButton
            value={iban}
            label={copy.copyIbanLabel}
            copiedLabel={copy.copiedIbanStatus}
            className="btn btn--pill support-cta-button"
            showStatus={false}
            onCopied={(text) => showToast("iban", text)}
          />
          {toastOwner === "iban" && toastText ? (
            <div
              className={`support-copy-toast ${toastVisible ? "support-copy-toast--visible" : ""}`}
              role="status"
              aria-live="polite"
            >
              {toastText}
            </div>
          ) : null}
        </div>
        <div className="support-copy-wrap">
          <CopyToClipboardButton
            value={bic}
            label={copy.copyBicLabel}
            copiedLabel={copy.copiedBicStatus}
            className="btn btn--pill support-cta-button"
            showStatus={false}
            onCopied={(text) => showToast("bic", text)}
          />
          {toastOwner === "bic" && toastText ? (
            <div
              className={`support-copy-toast ${toastVisible ? "support-copy-toast--visible" : ""}`}
              role="status"
              aria-live="polite"
            >
              {toastText}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}


