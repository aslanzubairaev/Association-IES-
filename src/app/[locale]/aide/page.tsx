/* Этот файл задаёт страницу “Aide / Чем помогаем” (RU/FR) и показывает пошаговый мастер помощи. */

import { HelpWizard } from "@/components/sections/aide/HelpWizard";
import styles from "./page.module.css";

export default function AidePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <div className={styles.aideScope}>
      <main className="page--purple aide-page">
        {/* Пошаговая форма: один вопрос за раз + подтверждение темы + отправка по email. */}
        <HelpWizard locale={locale} />
      </main>
    </div>
  );
}




