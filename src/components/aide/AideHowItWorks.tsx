/* Этот файл содержит блок “Как это работает / Comment ça marche” и показывает 3 шага, что происходит после сообщения. */

import { Container } from "@/components/ui/Container";
import { aideCopy } from "@/content/aide";

type AideHowItWorksProps = {
  locale: "ru" | "fr";
};

// Блок из трёх шагов: коротко и без обещаний “магии” — только понятный процесс.
export function AideHowItWorks({ locale }: AideHowItWorksProps) {
  // Тексты для блока “Как это работает”: шаги и подписи для RU/FR лежат в одном месте.
  const copy = aideCopy[locale].howItWorks;

  return (
    <section className="section section--pink" id="how">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{copy.title}</h2>
          <p className="muted">{copy.subtitle}</p>
        </div>

        {/* Список шагов: карточки одинакового размера, на мобильном складываются в 1 колонку. */}
        <div className="cards-grid" aria-label={copy.title}>
          {copy.steps.map((step, idx) => (
            <article key={step.title} className="card card--paper accent-left accent--blue">
              {/* Заголовок карточки: “Шаг 1/2/3 …” или “Étape 1/2/3 …”, без дополнительных значков. */}
              <h3 className="h3 h3--blue">{step.title}</h3>

              {/* 1–3 предложения: что именно происходит на этом шаге. */}
              <p className="p">{step.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


