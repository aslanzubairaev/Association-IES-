/* Этот файл задаёт страницу “Aide / Чем помогаем” (RU/FR) и показывает секции помощи в логичном порядке. */

import { AideHero } from "@/components/sections/AideHero";
import { AideHowItWorks } from "@/components/sections/AideHowItWorks";
import { AideTopics } from "@/components/sections/AideTopics";
import { AideBeforeYouWrite } from "@/components/sections/AideBeforeYouWrite";
import { AideImportant } from "@/components/sections/AideImportant";
import styles from "./page.module.css";

export default function AidePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <div className={styles.aideScope}>
      <main className="page--purple aide-page">
        {/* Верхний блок: объясняет, чем мы помогаем и как написать нам (форма = письмо на e-mail). */}
        <AideHero locale={locale} />

        {/* “С чем помогаем”: темы в карточках, чтобы быстро найти нужное. */}
        <AideTopics locale={locale} />

        {/* “Как это работает”: 3 шага без лишней бюрократии. */}
        <AideHowItWorks locale={locale} />

        {/* “Перед тем как написать”: чеклист, который помогает подготовить сообщение. */}
        <AideBeforeYouWrite locale={locale} />

        {/* “Важно знать”: задаёт ожидания (ответ по e-mail, запись, без “единых адресов/графиков”). */}
        <AideImportant locale={locale} />
      </main>
    </div>
  );
}




