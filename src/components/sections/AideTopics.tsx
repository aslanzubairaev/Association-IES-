/* Этот файл содержит блок “Частые темы / Sujets fréquents” и показывает 6 карточек тем, чтобы быстро выбрать направление. */

import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { aideCopy } from "@/content/actions";
import styles from "./AideTopics.module.css";

type AideTopicsProps = {
  locale: "ru" | "fr";
};

// Блок с карточками тем: короткие формулировки, чтобы не перегружать новоприбывших.
export function AideTopics({ locale }: AideTopicsProps) {
  // Тексты и список тем: чтобы RU/FR были синхронны и легко редактировались.
  const copy = aideCopy[locale].topics;

  return (
    <Section
      className={`aide-topics-section ${styles.topicsScope}`}
      id="topics"
      style={{ scrollMarginTop: "calc(var(--site-header-height) + 18px)" }}
      title={copy.title}
      subtitle={copy.subtitle}
    >
      {/* Карточки тем: на десктопе 3 колонки, на мобильных — 1 колонка (это уже в стилях). */}
      <div className="cards-grid aide-topics-grid" aria-label={copy.title}>
        {copy.items.map((topic) => (
          <ContentCard
            key={topic.topicKey}
            className="aide-card aide-card--topic"
            title={topic.title}
            listItems={topic.examples}
            footerText={`${copy.preparePrefix} ${topic.prepareLine}`}
            actions={[{ label: copy.chooseLabel, href: `/${locale}/contact?topic=${topic.topicKey}`, variant: "pill", className: "cta-pill" }]}
          />
        ))}
      </div>
    </Section>
  );
}


