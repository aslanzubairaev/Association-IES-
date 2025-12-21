/* 
 Этот файл содержит блок “Comment ça marche / Как это работает” для страницы помощи.
 Он показывает 3 простых шага: написать нам, уточнить детали, получить сопровождение.
 Человек читает шаги и понимает, чего ожидать, затем может перейти к контактам.
*/

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
              {/* Заголовок карточки: номер шага, чтобы читать сверху вниз было проще. */}
              <header className="card-top">
                <h3 className="h3 h3--blue">{locale === "fr" ? `Étape ${idx + 1}` : `Шаг ${idx + 1}`}</h3>
                <span className="tag tag--red">{idx + 1}</span>
              </header>

              {/* Сначала короткий заголовок шага, затем 1–2 предложения: что именно происходит. */}
              <p className="p" style={{ fontWeight: 900, marginBottom: 8 }}>
                {step.title}
              </p>
              <p className="p">{step.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


