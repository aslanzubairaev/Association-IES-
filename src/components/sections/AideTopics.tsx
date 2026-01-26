/* Этот файл содержит блок “Частые темы / Sujets fréquents” и показывает 6 карточек тем, чтобы быстро выбрать направление. */

import { Section } from "@/components/ui/Section/Section";
import { InfoCard } from "@/components/ui/Card/InfoCard";
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
          <InfoCard
            key={topic.topicKey}
            className="aide-card aide-card--topic"
            surface={true} // Matches "card--paper" logic if defaults align, or we might need className="card--paper"
            // Actually "card--paper" usually means white bg, shadow. 
            // Our Card default surface=true is effectively card--paper.
            // Let's pass card--paper explicitly in className to be safe if it has specific overrides.
            title={topic.title}
            items={topic.examples}
            footerText={`${copy.preparePrefix} ${topic.prepareLine}`}
            ctaLabel={copy.chooseLabel}
            ctaHref={`/${locale}/contact?topic=${topic.topicKey}`}
          />
        ))}
      </div>
    </Section>
  );
}


