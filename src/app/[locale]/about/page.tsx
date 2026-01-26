/* Этот файл задаёт страницу “À propos / О нас” и показывает кто мы, цели, сильные стороны и ссылки для связи/поддержки. */

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { aboutPageCopy } from "@/content/actions";
import styles from "./page.module.css";

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
    <div className={styles.aboutScope}>
      <main className="section page--purple about-page">
        <Container>
          <div className="section-head">
            <h1 className="h2">
              {copy.title}
            </h1>
            <p className="muted-on-dark">
              {copy.heroLines[0]}
              <br />
              {copy.heroLines[1]}
              <br />
              {copy.heroLines[2]}
            </p>
          </div>

          {/* Верхний блок: “кто мы” и “наши цели” в двух карточках рядом. */}
          <div className="grid-2">
            <div className="card card--paper about-card" id="who">
              {/* Основной текст: три абзаца, как в новом копирайте. */}
              <p className="p">{copy.mainParagraphs[0]}</p>
              <p className="p">
                {copy.mainParagraphs[1]}
              </p>
              <p className="p">
                {copy.mainParagraphs[2]}
              </p>
            </div>

            <div className="card card--paper card--highlight about-card">
              {/* Список целей: три пункта, чтобы человек сразу понял направления работы. */}
              <h2 className="h3 h3--blue">{copy.goalsTitle}</h2>
              <IesList className="list">
                {copy.goals.map((goal) => (
                  <IesListItem key={goal}>{goal}</IesListItem>
                ))}
              </IesList>
            </div>
          </div>

          {/* Нижний блок: “сила IES” и понятный призыв к действию в двух карточках рядом. */}
          <div className="grid-2" style={{ marginTop: 18 }}>
            <div className="card card--paper about-card">
              {/* Сильные стороны: короткий список, который объясняет, почему подход работает. */}
              <h2 className="h3 h3--blue">{copy.strengthTitle}</h2>
              <IesList className="list">
                {copy.strengthItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
            </div>

            <div className="card card--paper card--highlight about-card">
              {/* Призыв к действию: что можно сделать и куда нажать. */}
              <h2 className="h3 h3--blue">{ctaTitle}</h2>
              <IesList className="list">
                {ctaList.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>

              <div className="about-cta">
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
    </div>
  );
}




