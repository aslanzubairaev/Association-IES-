/* Этот файл задаёт страницу “Mentions légales / Правовая информация” (RU/FR). */

import type { Metadata } from "next";
import { legalPageCopy } from "@/content/actions";
import LegalPage from "@/components/sections/legal/LegalPage";
import styles from "./page.module.css";

export function generateMetadata({
  params,
}: {
  params: { locale: "ru" | "fr" };
}): Metadata {
  const copy = legalPageCopy[params.locale];

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
  };
}

export default function LegalRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <div className={styles.legalScope}>
      <LegalPage locale={locale} />
    </div>
  );
}
