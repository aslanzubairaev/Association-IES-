/* 
 Этот файл задаёт страницу “Aide / Помощь”.
 Он показывает короткое и понятное объяснение, как получить помощь, и с чем мы помогаем.
 Человек может прочитать шаги, выбрать тему и перейти на страницу контактов, чтобы описать ситуацию.
*/

import { AideHero } from "@/components/aide/AideHero";
import { AideHowItWorks } from "@/components/aide/AideHowItWorks";
import { AideTopics } from "@/components/aide/AideTopics";
import { AideFinalCta } from "@/components/aide/AideFinalCta";

export default function AidePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main>
      {/* Верхний блок: объясняет, что делать, и ведёт на контакты. */}
      <AideHero locale={locale} />

      {/* “Как это работает”: 3 шага без лишней бюрократии. */}
      <AideHowItWorks locale={locale} />

      {/* “С чем помогаем”: темы в карточках, чтобы быстро найти нужное. */}
      <AideTopics locale={locale} />

      {/* Финальный призыв: закрепляет следующий шаг — написать нам. */}
      <AideFinalCta locale={locale} />
    </main>
  );
}




