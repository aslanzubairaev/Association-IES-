/* Этот файл содержит блок “Перед тем как написать / Avant d’écrire” и показывает чек-лист, что добавить в сообщение. */

import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { aideCopy } from "@/content/actions";

type AideBeforeYouWriteProps = {
  locale: "ru" | "fr";
};

// Этот блок помогает человеку подготовить сообщение, чтобы мы смогли ответить быстрее и точнее.
export function AideBeforeYouWrite({ locale }: AideBeforeYouWriteProps) {
  // Тексты и пункты чеклиста для RU/FR лежат в одном месте.
  const copy = aideCopy[locale].beforeYouWrite;

  return (
    <Section
      id="before"
      title={copy.title}
      subtitle={copy.subtitle}
    >
      {/* Чеклист: короткий список, чтобы его можно было прочитать за несколько секунд. */}
      {/* Используем ContentCard для списка. */}
      <ContentCard
        className="aide-card aide-card--wide"
        listItems={copy.items}
      />
    </Section>
  );
}


