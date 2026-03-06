/*
 This file contains the bank transfer details block.
 It displays IBAN and BIC in clear, high-contrast text and provides “Copy” buttons for quick pasting into a banking app.
 The user can click on the block or on individual buttons to copy the desired value.
*/

"use client";

import { useEffect, useRef, useState } from "react";
import { CopyToClipboardButton } from "@/components/ui/CopyToClipboardButton";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { bankTransferCopy } from "@/content/actions";
import styles from "./BankTransferDetails.module.css";

type BankTransferDetailsProps = {
  locale: "ru" | "fr";
  iban: string;
  bic: string;
};

// Transfer details block: copies data to clipboard on click and shows a brief toast.
export function BankTransferDetails({ locale, iban, bic }: BankTransferDetailsProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastOwner, setToastOwner] = useState<"iban" | "bic" | null>(null);
  const statusTimeoutRef = useRef<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const toastHideRef = useRef<number | null>(null);

  const copy = bankTransferCopy[locale];

  // Copies text to clipboard so the user can quickly paste it into their banking app.
  async function copyToClipboard(textToCopy: string, okMessage: string) {
    if (statusTimeoutRef.current) {
      window.clearTimeout(statusTimeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setStatus(okMessage);
      statusTimeoutRef.current = window.setTimeout(() => setStatus(null), 1600);
    } catch {
      setStatus(copy.copyFailedLabel);
      statusTimeoutRef.current = window.setTimeout(() => setStatus(null), 2200);
    }
  }

  // Block click handler: copies IBAN and BIC together as a single string.
  function copyAll() {
    copyToClipboard(`IBAN: ${iban}\nBIC: ${bic}`, `${copy.copiedLabel}: ${copy.copyAllLabel}`);
  }

  // Brief confirmation after copying IBAN or BIC: clears old timers first, then starts new ones.
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

  // Clean up timers on unmount to prevent stale updates for a destroyed component.
  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        window.clearTimeout(statusTimeoutRef.current);
      }
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      if (toastHideRef.current) {
        window.clearTimeout(toastHideRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.bankTransferDetails}>
      {/* Transfer details block: high-contrast and clickable for quick copying. */}
      {/* Clicking the card copies all details and shows a confirmation. */}
      <div
        onClick={copyAll}
        className={`contact-box support-info-panel ${styles.supportInfoPanel} ${styles.bankTransferBox}`}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            copyAll();
          }
        }}
        aria-label={copy.copyAllLabel}
      >
        <div className={`support-info-title ${styles.supportInfoTitle}`}>
          {copy.cardTitle}
        </div>

        <IesList className={`bank-transfer-lines support-info-list ${styles.supportInfoList}`}>
          <IesListItem>
            <span className="bank-transfer-label">IBAN:</span>{" "}
            <span className="bank-transfer-value bank-transfer-value--mono">
              {iban}
            </span>
          </IesListItem>
          <IesListItem className="bank-transfer-row">
            <span className="bank-transfer-label">BIC:</span>{" "}
            <span className="bank-transfer-value bank-transfer-value--mono">
              {bic}
            </span>
          </IesListItem>
        </IesList>

        {/* Status hint: indicates that the data has been copied. */}
        <div className="bank-transfer-status" aria-live="polite">
          {status ?? copy.hint}
        </div>
      </div>

      {/* Copy buttons: two compact buttons side by side for quickly copying IBAN or BIC. */}
      <div
        className={`btn-row bank-transfer-actions ${styles.actionsRow} ${styles.footer}`}
      >
        <div className={styles.supportCopyWrap}>
          <CopyToClipboardButton
            value={iban}
            label={copy.copyIbanLabel}
            copiedLabel={copy.copiedIbanStatus}
            className="cta-pill"
            showStatus={false}
            onCopied={(text) => showToast("iban", text)}
          />
          {toastOwner === "iban" && toastText ? (
            <div
              className={`${styles.supportCopyToast} ${toastVisible ? styles.supportCopyToastVisible : ""}`}
              role="status"
              aria-live="polite"
            >
              {toastText}
            </div>
          ) : null}
        </div>
        <div className={styles.supportCopyWrap}>
          <CopyToClipboardButton
            value={bic}
            label={copy.copyBicLabel}
            copiedLabel={copy.copiedBicStatus}
            className="cta-pill"
            showStatus={false}
            onCopied={(text) => showToast("bic", text)}
          />
          {toastOwner === "bic" && toastText ? (
            <div
              className={`${styles.supportCopyToast} ${toastVisible ? styles.supportCopyToastVisible : ""}`}
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


