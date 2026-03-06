/*
 This file contains a reusable copy-to-clipboard button.
 It copies the given string to the clipboard and shows a brief confirmation for 1-2 seconds without any popups.
 It can be used anywhere on the site (e.g., for IBAN/BIC) to keep the copy experience consistent.
*/

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button/Button";

type CopyToClipboardButtonProps = {
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
  showStatus?: boolean;
  onCopied?: (text: string) => void;
};

// Copy button: copies the value on click and briefly shows a confirmation message.
export function CopyToClipboardButton({
  value,
  label,
  copiedLabel,
  className,
  showStatus = true,
  onCopied,
}: CopyToClipboardButtonProps) {
  const [statusText, setStatusText] = useState<string | null>(null);
  const statusId = useId();
  const statusTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        window.clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  // Copies the value to the clipboard (with a fallback for browsers without the Clipboard API).
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
      if (showStatus) {
        if (statusTimeoutRef.current) {
          window.clearTimeout(statusTimeoutRef.current);
        }
        setStatusText(copiedLabel);
        statusTimeoutRef.current = window.setTimeout(() => setStatusText(null), 1600);
      }
      onCopied?.(copiedLabel);
    }
  }

  if (!showStatus) {
    // Simplified variant: copies the value on click without displaying a status line.
    return (
      <>
        {/* Button triggers copying without showing a separate status. */}
        <Button
          onClick={copyValue}
          type="button"
          variant="pill"
          className={className ?? "cta-pill"}
        >
          {label}
        </Button>
      </>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      {/* Main button triggers copying; the status below confirms the action for the user. */}
      {/* The button copies the value and the line below reports the result. */}
      <Button
        onClick={copyValue}
        type="button"
        variant="pill"
        className={className ?? "cta-pill"}
        aria-describedby={statusId}
      >
        {label}
      </Button>

      {/* Confirmation line: made visible on any background while preserving height to prevent layout shifts. */}
      <div
        id={statusId}
        aria-live="polite"
        style={{
          marginTop: 8,
          fontSize: 12,
          color: "rgba(11, 27, 51, 0.96)",
          fontWeight: 800,
          minHeight: 16,
          // Subtle text shadow outline to keep the label readable on gradients without a white background.
          textShadow: statusText ? "0 1px 0 rgba(255, 255, 255, 0.55)" : "none",
        }}
      >
        {statusText ?? ""}
      </div>
    </div>
  );
}


