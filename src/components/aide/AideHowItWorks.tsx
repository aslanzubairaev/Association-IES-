/* 
 Этот файл содержит блок “Comment ça marche / Как это работает” для страницы помощи.
 Он показывает 3 простых шага: написать нам, уточнить детали, получить сопровождение.
 Человек читает шаги и понимает, чего ожидать, затем может перейти к контактам.
*/

import { Container } from "@/components/ui/Container";

type AideHowItWorksProps = {
  locale: "ru" | "fr";
};

// Блок из трёх шагов: коротко и без обещаний “магии” — только понятный процесс.
export function AideHowItWorks({ locale }: AideHowItWorksProps) {
  const title = locale === "fr" ? "Comment ça marche" : "Как это работает";
  const subtitle =
    locale === "fr"
      ? "Trois étapes simples, pour que vous sachiez à quoi vous attendre."
      : "Три простых шага, чтобы было понятно, как всё происходит.";

  // Данные блока: список шагов для выбранного языка (одинаковая структура).
  const steps =
    locale === "fr"
      ? [
          "Vous nous écrivez (formulaire / e-mail)",
          "Nous précisons les détails et proposons un créneau",
          "Nous vous accompagnons dans les démarches",
        ]
      : [
          "Вы пишете нам (форма / e-mail)",
          "Уточняем детали и предлагаем время",
          "Помогаем разобраться в шагах и документах",
        ];

  return (
    <section className="section section--pink" id="how">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{title}</h2>
          <p className="muted">{subtitle}</p>
        </div>

        {/* Список шагов: карточки одинакового размера, на мобильном складываются в 1 колонку. */}
        <div className="cards-grid" aria-label={title}>
          {steps.map((text, idx) => (
            <article key={text} className="card card--paper accent-left accent--blue">
              {/* Заголовок карточки: номер шага, чтобы читать сверху вниз было проще. */}
              <header className="card-top">
                <h3 className="h3 h3--blue">{locale === "fr" ? `Étape ${idx + 1}` : `Шаг ${idx + 1}`}</h3>
                <span className="tag tag--red">{idx + 1}</span>
              </header>

              {/* Текст шага: одна строка, без лишних деталей и обещаний. */}
              <p className="p">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


