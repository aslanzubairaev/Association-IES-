/* Этот файл содержит блок “Как это работает / Comment ça marche” и показывает 3 шага после сообщения. */

import { Section } from "@/components/ui/Section/Section";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { aideCopy } from "@/content/actions";
import styles from "./AideHowItWorks.module.css";

type AideHowItWorksProps = {
  locale: "ru" | "fr";
};

// Блок из трёх шагов: коротко и без обещаний “магии” — только понятный процесс.
export function AideHowItWorks({ locale }: AideHowItWorksProps) {
  // Тексты для блока “Как это работает”: шаги и подписи для RU/FR лежат в одном месте.
  const copy = aideCopy[locale].howItWorks;

  return (
    <Section
      inverse
      className={styles.stepsScope}
      id="how"
      title={copy.title}
      subtitle={copy.subtitle}
    >
      {/* Список шагов: карточки одинакового размера, на мобильном складываются в 1 колонку. */}
      <div className="cards-grid aide-steps-grid" aria-label={copy.title}>
        {copy.steps.map((step) => {
          const badge = step.icon;
          const badgeClassName = styles.stepIco;

          return (
            <Card
              key={step.title}
              className="aide-card aide-card--step accent-left accent--blue"
              surface={true} // matches card--paper
            >
              <CardContent>
                {/* Заголовок карточки: “Шаг 1/2/3 …” или “Étape 1/2/3 …”, без дополнительных значков. */}
                <div className={styles.step}>
                  {badge ? <span className={badgeClassName}>{badge}</span> : null}
                  <h3 className="h3 h3--blue">{step.title}</h3>
                </div>

                {/* 1–3 предложения: что именно происходит на этом шаге. */}
                <p className="p">{step.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}


