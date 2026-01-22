/* 
 Этот файл определяет страницу лендинга для выбранного языка (/ru или /fr).
 Он показывает новую структуру главной страницы (секции и навигационные карточки).
 Он показывает только новую структуру: верхний блок, навигацию, блок доверия, обзор действий и подвал.
 Здесь можно постепенно улучшать тексты и ссылки, не меняя общий дизайн.
*/

import { ActionsPreview } from "@/components/sections/ActionsPreview";
import { Hero } from "@/components/sections/Hero";
import { QuickNav } from "@/components/sections/QuickNav";
import { TrustBlock } from "@/components/sections/TrustBlock";

// Главная страница языка: только новая структура, без legacy-лендинга.
export default function LocalePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main>
      <div className="bg-hero-canvas">
        <Hero locale={locale} />
        <QuickNav locale={locale} />
        <TrustBlock locale={locale} />
        <ActionsPreview locale={locale} />
      </div>
    </main>
  );
}

