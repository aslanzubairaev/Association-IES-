/* 
 Этот файл содержит секцию “О нас / À propos” для главной страницы.
 Он показывает короткое объяснение миссии, список целей и кнопку “Написать / Nous écrire”.
 Человек может прочитать, чем занимается Association IES, и перейти на страницу контактов.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";

type AboutIntroProps = {
  locale: "ru" | "fr";
};

// Секция “О нас”: тексты и подписи зависят от выбранного языка страницы.
export function AboutIntro({ locale }: AboutIntroProps) {
  // Заголовок и два коротких абзаца с описанием того, чем занимается ассоциация.
  const title = locale === "fr" ? "À propos" : "О нас";
  const paragraph1 =
    locale === "fr"
      ? "L’association IES aide les personnes récemment arrivées à Strasbourg à s’orienter dans les premières démarches."
      : "Association IES помогает людям, которые недавно приехали в Страсбург, разобраться в первых шагах и административных вопросах.";
  const paragraph2 =
    locale === "fr"
      ? "Nous répondons par e-mail et proposons un accueil sur rendez-vous. Notre objectif est de donner des repères clairs et un soutien dans le parcours d’intégration."
      : "Мы отвечаем по email и принимаем по предварительной записи. Наша цель — дать понятные ориентиры и поддержать вас в процессе адаптации.";

  // Подзаголовок и список целей: коротко и по делу, без выдуманных деталей.
  const goalsTitle = locale === "fr" ? "Nos objectifs" : "Наши цели";
  const goals =
    locale === "fr"
      ? [
          "Rendre l’information plus claire et accessible",
          "Aider à s’orienter dans les démarches administratives",
          "Favoriser l’intégration via des rencontres et activités",
          "Mettre en lien avec des ressources et initiatives utiles",
        ]
      : [
          "Сделать информацию понятной и доступной",
          "Помогать с ориентацией в административных процедурах",
          "Поддерживать интеграцию через встречи и активности",
          "Соединять людей с полезными ресурсами и инициативами",
        ];

  // Кнопка действия: ведёт на страницу контактов выбранного языка.
  const ctaLabel = locale === "fr" ? "Nous écrire" : "Написать";
  const ctaHref = `/${locale}/contact`;

  return (
    <section className="section section--yellow section-seam-bottom seam-to-pink">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{title}</h2>
        </div>

        <div className="grid-2">
          <div className="card card--paper">
            <p className="p">{paragraph1}</p>
            <p className="p" style={{ marginTop: 10 }}>
              {paragraph2}
            </p>
          </div>

          <div className="card card--paper card--highlight">
            <h3 className="h3 h3--blue">{goalsTitle}</h3>
            <ul className="list" style={{ marginTop: 10 }}>
              {goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>

            <div style={{ marginTop: 14 }}>
              <Link className="btn btn--pill btn--blue" href={ctaHref}>
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


