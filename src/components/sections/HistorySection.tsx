/*
 This file contains the “Our history” section for the home page.
 It displays a heading and two paragraphs of text without cards.
*/

import { Section } from "@/components/ui/Section/Section";
import { historyCopy } from "@/content/actions";
import styles from "./HistorySection.module.css";

type HistorySectionProps = {
  locale: "ru" | "fr";
};

export function HistorySection({ locale }: HistorySectionProps) {
  const copy = historyCopy[locale];

  return (
    <Section className={styles.section} id="history" eyebrow={copy.eyebrow} title={copy.title}>
      <div className={styles.text}>
        <p>{copy.paragraph1}</p>
        <p>{copy.paragraph2}</p>
      </div>
    </Section>
  );
}
