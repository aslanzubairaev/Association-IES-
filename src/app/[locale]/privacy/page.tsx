/* Этот файл задаёт страницу “Политика конфиденциальности / Politique de confidentialité” (RU/FR). */

import type { Metadata } from "next";
import { privacyPageCopy } from "@/content/actions";
import PrivacyPage from "@/components/sections/privacy/PrivacyPage";
import styles from "./page.module.css";

// Заголовок и описание вкладки берём из словаря выбранного языка.
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

  // Передаём выбранный язык в основной компонент, чтобы маршрутный файл оставался простым.
  return (
    <div className={styles.privacyScope}>
      <PrivacyPage locale={locale} />
    </div>
  );
}
