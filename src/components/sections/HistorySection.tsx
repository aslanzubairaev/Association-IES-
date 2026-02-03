/*
 Этот файл содержит секцию “История / Notre histoire” для главной страницы.
 Он показывает заголовок и два абзаца текста без карточек.
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
    <Section className={styles.section} id="history" title={copy.title}>
      <div className={styles.text}>
        <p>{copy.paragraph1}</p>
        <p>{copy.paragraph2}</p>
      </div>
    </Section>
  );
}
