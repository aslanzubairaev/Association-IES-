/* 
 Этот файл содержит переиспользуемую кнопку копирования.
 Она копирует переданную строку в буфер обмена и на 1–2 секунды показывает короткое подтверждение без всплывающих окон.
 Её можно использовать в любых местах сайта (например для IBAN/BIC), чтобы копирование выглядело аккуратно и одинаково.
*/

"use client";

import { useId, useState } from "react";

type CopyToClipboardButtonProps = {
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
};

// Кнопка копирования: по нажатию копирует value и на короткое время показывает подтверждение отдельной строкой.
export function CopyToClipboardButton({ value, label, copiedLabel, className }: CopyToClipboardButtonProps) {
  const [statusText, setStatusText] = useState<string | null>(null);
  const statusId = useId();

  // Действие: копируем значение в буфер обмена (с запасным вариантом для браузеров без Clipboard API).
  async function copyValue() {
    let isCopied = false;

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(value);
        isCopied = true;
      }
    } catch {
      isCopied = false;
    }

    if (!isCopied) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        isCopied = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        isCopied = false;
      }
    }

    if (isCopied) {
      setStatusText(copiedLabel);
      window.setTimeout(() => setStatusText(null), 1600);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <button
        type="button"
        className={className ?? "btn btn--pill btn--outline-blue"}
        onClick={copyValue}
        aria-describedby={statusId}
      >
        {label}
      </button>

      {/* Строка подтверждения: делаем её заметной на любом фоне, но сохраняем высоту, чтобы интерфейс не прыгал. */}
      <div
        id={statusId}
        aria-live="polite"
        style={{
          marginTop: 8,
          fontSize: 12,
          color: "rgba(11, 27, 51, 0.96)",
          fontWeight: 800,
          minHeight: 16,
          // Лёгкая “обводка” через тень текста, чтобы надпись была читабельной на градиентах без белого фона.
          textShadow: statusText ? "0 1px 0 rgba(255, 255, 255, 0.55)" : "none",
        }}
      >
        {statusText ?? ""}
      </div>
    </div>
  );
}


