/* Этот файл содержит верхний блок страницы “Aide / Чем помогаем” и объясняет, как написать нам (форма = письмо на e-mail). */

import { Section } from "@/components/ui/Section/Section";
import { aideCopy } from "@/content/actions";

type AideHeroProps = {
  locale: "ru" | "fr";
};

// Верхний блок страницы: объясняет, что делать, и ведёт на контакты (без телефонов и личных контактов).
export function AideHero({ locale }: AideHeroProps) {
  // Тексты для верхнего блока: RU/FR хранятся вместе, чтобы не размазывать переводы по коду.
  const copy = aideCopy[locale].hero;

  return (
    <Section inverse style={{ paddingBottom: 56 }}
      title={copy.title}
      titleAs="h1"
      subtitle={
        <>
          {copy.line1}
          <br />
          {copy.line2}
        </>
      }
    >
      {/* Важная короткая строка: фиксируем три ожидания — бесплатно, по записи, ответ по e-mail. */}
      {/* Выносим из section-head, чтобы использовать стандартный Section. */}
      {/* Добавляем отступ сверху отрицательный, если нужно визуально приблизить, или оставляем как есть. */}
      <p className="fineprint" style={{ opacity: 0.9, marginTop: -12, marginBottom: 24 }}>
        {copy.badge}
      </p>
    </Section>
  );
}


