/* This file contains the “Frequent topics” block and displays 6 topic cards for quick selection. */

import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { ContactIntentButton } from "@/components/contacts/ContactIntentButton";
import { aideCopy } from "@/content/actions";
import styles from "./AideTopics.module.css";

type AideTopicsProps = {
  locale: "ru" | "fr";
};

// Topic cards block: short descriptions to avoid overwhelming newcomers.
export function AideTopics({ locale }: AideTopicsProps) {
  // Texts and topic list: kept in sync for RU/FR and easy to edit.
  const copy = aideCopy[locale].topics;

  return (
    <Section
      className={`aide-topics-section ${styles.topicsScope}`}
      id="topics"
      style={{ scrollMarginTop: "calc(var(--site-header-height) + 18px)" }}
      title={copy.title}
      subtitle={copy.subtitle}
    >
      {/* Topic cards: 3 columns on desktop, 1 column on mobile (handled in styles). */}
      <div className="cards-grid aide-topics-grid" aria-label={copy.title}>
        {copy.items.map((topic) => (
          <ContentCard
            key={topic.topicKey}
            className="aide-card aide-card--topic"
            title={topic.title}
            listItems={topic.examples}
            footerText={`${topic.preparePrefix ?? copy.preparePrefix} ${topic.prepareLine}`}
            actionsNode={
              <ContactIntentButton
                locale={locale}
                intentId={topic.intentId}
                label={copy.chooseLabel}
                className="cta-pill"
              />
            }
          />
        ))}
      </div>
    </Section>
  );
}


