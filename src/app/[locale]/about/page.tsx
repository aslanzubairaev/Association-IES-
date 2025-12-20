/* 
 Этот файл задаёт страницу “À propos / О нас”.
 Он показывает текст “кто мы”, наши цели, сильные стороны IES и блок с кнопками для связи и поддержки.
 Человек может быстро понять смысл ассоциации “как по флаеру” и перейти на контакты или страницу поддержки.
*/

import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function AboutPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Заголовок, короткий подзаголовок и текст “кто мы”: показываем на выбранном языке.
  const title = locale === "fr" ? "À propos" : "О нас";

  // Три строки под заголовком: короткий слоган, расшифровка IES и юридическая строка (RU/FR).
  const heroLine1 =
    locale === "fr"
      ? "Plus qu’une aide, un lien humain."
      : "Больше, чем помощь — человеческое участие.";

  // Короткие строки под заголовком: факты, которые должны быть видны сразу (как в документах).
  const heroLine2 =
    locale === "fr"
      ? "IES signifie Intégration, Éducation, Synergie."
      : "IES — это Intégration, Éducation, Synergie.";
  const heroLine3 =
    locale === "fr"
      ? "Association laïque à but non lucratif à Strasbourg. Créée le 19 février 2019."
      : "Светская некоммерческая ассоциация в Страсбурге. Основана 19 февраля 2019 года.";

  // Основной текст в левой карточке: сохраняем разбиение на абзацы ровно как в копирайте.
  const mainParagraph1 =
    locale === "fr"
      ? "IES est une association strasbourgeoise qui accompagne les personnes, les familles et les jeunes qui viennent d’arriver en France, afin de faciliter l’intégration et l’insertion socio-professionnelle."
      : "IES — ассоциация в Страсбурге, которая помогает людям, семьям и молодёжи, недавно приехавшим во Францию, адаптироваться и почувствовать опору.";
  const mainParagraph2 =
    locale === "fr"
      ? "Au plus près du terrain, nous créons des passerelles entre habitants, cultures et générations, à travers des actions et des activités collectives."
      : "Мы соединяем людей с возможностями: помогаем сориентироваться и создаём пространство для встреч, обучения и взаимопомощи.";
  const mainParagraph3 =
    locale === "fr"
      ? "Notre engagement s’articule autour de deux axes : l’intégration sociale et l’insertion socio-professionnelle. Nous défendons le vivre-ensemble, le respect des cultures et la solidarité."
      : "Наша работа строится вокруг двух направлений: социальная интеграция и социально-профессиональная адаптация. Мы поддерживаем уважение культур, солидарность и умение жить вместе.";

  // Блок “Наши цели / Nos objectifs”: три пункта из флаера.
  const goalsTitle = locale === "fr" ? "Nos objectifs" : "Наши цели";
  const goals =
    locale === "fr"
      ? [
          "Favoriser l’autonomie et l’inclusion des personnes nouvellement arrivées",
          "Soutenir l’insertion sociale et professionnelle des adultes et des jeunes",
          "Proposer des activités éducatives, sportives et culturelles",
        ]
      : [
          "Помогать людям, которые недавно приехали, становиться самостоятельнее и чувствовать себя частью города",
          "Поддерживать социально-профессиональную интеграцию взрослых и молодёжи",
          "Организовывать образовательные, спортивные и культурные активности",
        ];

  // Блок “Что делает IES сильнее”: четыре пункта, чтобы объяснить подход и опору.
  const strengthTitle =
    locale === "fr" ? "Ce qui fait la force d’IES" : "ЧТО ДЕЛАЕТ IES СИЛЬНОЙ";
  const strengthItems =
    locale === "fr"
      ? [
          "Une approche humaine et de terrain, au plus près des besoins réels",
          "Un réseau actif de bénévoles et d’experts engagés",
          "Des partenariats solides (Ville/Eurométropole, CeA, État, CSC…)",
          "Une forte implication dans les quartiers prioritaires",
        ]
      : [
          "Человеческий подход и работа рядом с реальными запросами",
          "Активная сеть волонтёров и экспертов",
          "Партнёрства с городскими и местными структурами (Ville/Eurométropole, CeA, État, CSC…)",
          "Сильная вовлечённость в приоритетных районах Страсбурга",
        ];

  // Кнопки на странице: только общие ссылки без личных контактов.
  const contactLabel = locale === "fr" ? "NOUS CONTACTER" : "НАПИСАТЬ НАМ";
  const contactHref = `/${locale}/contact`;
  const supportLabel = locale === "fr" ? "Soutenir" : "Поддержать";
  const supportHref = `/${locale}/soutenir`;

  // Блок CTA внизу: короткий список “как присоединиться”, чтобы не теряться после чтения.
  const ctaTitle = locale === "fr" ? "Envie d’agir avec nous ?" : "ХОТИТЕ ДЕЙСТВОВАТЬ ВМЕСТЕ С НАМИ?";
  const ctaList =
    locale === "fr"
      ? ["Participer à nos actions", "Devenir bénévole", "Soutenir nos projets"]
      : ["Участвовать в мероприятиях", "Стать волонтёром", "Поддержать наши проекты"];

  return (
    <main className="section section--pink">
      <Container>
        <div className="section-head">
          <h1 className="h2 h2--blue">
            {title}
          </h1>
          <p className="muted">
            {heroLine1}
            <br />
            {heroLine2}
            <br />
            {heroLine3}
          </p>
        </div>

        {/* Верхний блок: “кто мы” и “наши цели” в двух карточках рядом. */}
        <div className="grid-2">
          <div className="card card--paper" id="who">
            {/* Основной текст: три абзаца, как в новом копирайте. */}
            <p className="p">{mainParagraph1}</p>
            <p className="p" style={{ marginTop: 10 }}>
              {mainParagraph2}
            </p>
            <p className="p" style={{ marginTop: 10 }}>
              {mainParagraph3}
            </p>
          </div>

          <div className="card card--paper card--highlight">
            {/* Список целей: три пункта, чтобы человек сразу понял направления работы. */}
            <h2 className="h3 h3--blue">{goalsTitle}</h2>
            <ul className="list" style={{ marginTop: 10 }}>
              {goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижний блок: “сила IES” и понятный призыв к действию в двух карточках рядом. */}
        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="card card--paper">
            {/* Сильные стороны: короткий список, который объясняет, почему подход работает. */}
            <h2 className="h3 h3--blue">{strengthTitle}</h2>
            <ul className="list" style={{ marginTop: 10 }}>
              {strengthItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card card--paper card--highlight">
            {/* Призыв к действию: что можно сделать и куда нажать. */}
            <h2 className="h3 h3--blue">{ctaTitle}</h2>
            <ul className="list" style={{ marginTop: 10 }}>
              {ctaList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn btn--pill btn--blue" href={contactHref}>
                {contactLabel}
              </Link>
              <Link className="btn btn--pill btn--mint" href={supportHref}>
                {supportLabel}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}




