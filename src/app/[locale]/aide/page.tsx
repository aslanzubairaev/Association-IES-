/* Этот файл задаёт страницу “Aide / Чем помогаем” (RU/FR) и показывает темы помощи. */

import { AideTopics } from "@/components/sections/AideTopics";
import styles from "./page.module.css";

export default function AidePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <div className={styles.aideScope}>
      <main className="page--purple aide-page">
        {/* “С чем помогаем”: темы в карточках, чтобы быстро найти нужное. */}
        <AideTopics locale={locale} />
      </main>
    </div>
  );
}




