/* Этот файл содержит блок “Важно знать / À savoir” и показывает 3 пункта ожиданий про ответ по e-mail и запись. */

import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { aideCopy } from "@/content/actions";

type AideImportantProps = {
  locale: "ru" | "fr";
};

// Этот блок задаёт ожидания: чтобы не было недопонимания про график, адрес и “гарантии”.
export function AideImportant({ locale }: AideImportantProps) {
  // Тексты пункта “Важно знать” для RU/FR храним в одном месте.
  const copy = aideCopy[locale].important;

  return (
    <Section
      id="important"
      title={copy.title}
    >
      {/* Список ожиданий: короткие пункты, без длинных абзацев. */}
      {/* Используем ContentCard, но без заголовка внутри карточки, так как заголовок уже в секции. */}
      <ContentCard
        className="aide-card aide-card--wide"
        listItems={copy.items}
      />
    </Section>
  );
}


