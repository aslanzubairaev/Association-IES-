/* 
 Этот файл определяет страницу лендинга для выбранного языка (/ru или /fr).
 Он показывает блок приветствия, быстрые карточки перехода и блок истории ассоциации.
 Человек может познакомиться с ассоциацией и перейти в нужные разделы через карточки навигации.
*/

import { Hero } from "@/components/sections/Hero";
import { QuickNav } from "@/components/sections/QuickNav";
import { ActivitiesHomeSection } from "@/components/sections/activities/ActivitiesHomeSection";
import { HistorySection } from "@/components/sections/HistorySection";


// Главная страница языка: только новая структура, без legacy-лендинга.
export default function LocalePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main>
      <div className="page--purple">
        {/* Основной набор секций главной страницы для выбранного языка. */}
        <Hero locale={locale} />
        <QuickNav locale={locale} />
        <ActivitiesHomeSection locale={locale} />
        <HistorySection locale={locale} />
      </div>
    </main>
  );
}
