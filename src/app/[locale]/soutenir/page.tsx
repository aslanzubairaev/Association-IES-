/* This file defines the “Support” page and displays the available support options (donation/membership/volunteering). */

import SoutenirPage from "@/components/sections/soutenir/SoutenirPage";
import styles from "./page.module.css";

export default function SoutenirRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Pass the selected locale to the main component to keep the route file short.
  return (
    <div className={styles.supportScope}>
      <SoutenirPage locale={locale} />
    </div>
  );
}
