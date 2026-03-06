/* This file defines the Privacy Policy page (RU/FR). */

import type { Metadata } from "next";
import { privacyPageCopy } from "@/content/actions";
import PrivacyPage from "@/components/sections/privacy/PrivacyPage";
import styles from "./page.module.css";

// Tab title and description are taken from the copy dictionary for the selected locale.
export function generateMetadata({
  params,
}: {
  params: { locale: "ru" | "fr" };
}): Metadata {
  const copy = privacyPageCopy[params.locale];

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
  };
}

export default function PrivacyRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Pass the selected locale to the main component to keep the route file simple.
  return (
    <div className={styles.privacyScope}>
      <PrivacyPage locale={locale} />
    </div>
  );
}
