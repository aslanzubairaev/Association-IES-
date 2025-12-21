/* Этот файл задаёт страницу “Aide / Чем помогаем” (RU/FR) и показывает секции помощи в логичном порядке. */

import { AideHero } from "@/components/aide/AideHero";
import { AideHowItWorks } from "@/components/aide/AideHowItWorks";
import { AideTopics } from "@/components/aide/AideTopics";
import { AideBeforeYouWrite } from "@/components/aide/AideBeforeYouWrite";
import { AideImportant } from "@/components/aide/AideImportant";

export default function AidePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main>
      {/* Верхний блок: объясняет, чем мы помогаем и как написать нам (форма = письмо на e-mail). */}
      <AideHero locale={locale} />

      {/* “Как это работает”: 3 шага без лишней бюрократии. */}
      <AideHowItWorks locale={locale} />

      {/* “С чем помогаем”: темы в карточках, чтобы быстро найти нужное. */}
      <AideTopics locale={locale} />

      {/* “Перед тем как написать”: чеклист, который помогает подготовить сообщение. */}
      <AideBeforeYouWrite locale={locale} />

      {/* “Важно знать”: задаёт ожидания (ответ по e-mail, запись, без “единых адресов/графиков”). */}
      <AideImportant locale={locale} />
    </main>
  );
}




