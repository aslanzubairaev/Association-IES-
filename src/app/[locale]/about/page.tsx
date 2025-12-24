/* Этот файл задаёт страницу “À propos / О нас” и показывает кто мы, цели, сильные стороны и ссылки для связи/поддержки. */

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { aboutPageCopy } from "@/content/actions";

export default function AboutPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  const copy = aboutPageCopy[locale];

  // Кнопки на странице: только общие ссылки без личных контактов.
  const contactLabel = copy.contactLabel;
  const contactHref = `/${locale}/contact`;
  const supportLabel = copy.supportLabel;
  const supportHref = `/${locale}/soutenir`;
  const ctaTitle = copy.ctaTitle;
  const ctaList = copy.ctaList;

  return (
    <main className="section section--purple">
      <Container>
        <div className="section-head">
          <h1 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
            {copy.title}
          </h1>
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {copy.heroLines[0]}
            <br />
            {copy.heroLines[1]}
            <br />
            {copy.heroLines[2]}
          </p>
        </div>

        {/* Верхний блок: “кто мы” и “наши цели” в двух карточках рядом. */}
        <div className="grid-2">
          <div className="card card--paper about-card accent-left accent--blue" id="who">
            {/* Основной текст: три абзаца, как в новом копирайте. */}
            <p className="p">{copy.mainParagraphs[0]}</p>
            <p className="p" style={{ marginTop: 10 }}>
              {copy.mainParagraphs[1]}
            </p>
            <p className="p" style={{ marginTop: 10 }}>
              {copy.mainParagraphs[2]}
            </p>
          </div>

          <div className="card card--paper card--highlight about-card accent-left accent--blue">
            {/* Список целей: три пункта, чтобы человек сразу понял направления работы. */}
            <h2 className="h3 h3--blue">{copy.goalsTitle}</h2>
            <ul className="list" style={{ marginTop: 10 }}>
              {copy.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижний блок: “сила IES” и понятный призыв к действию в двух карточках рядом. */}
        <div className="grid-2" style={{ marginTop: 18 }}>
            <div className="card card--paper about-card accent-left accent--blue">
            {/* Сильные стороны: короткий список, который объясняет, почему подход работает. */}
            <h2 className="h3 h3--blue">{copy.strengthTitle}</h2>
            <ul className="list" style={{ marginTop: 10 }}>
              {copy.strengthItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card card--paper card--highlight about-card accent-left accent--blue">
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




