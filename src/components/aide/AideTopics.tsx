/* Этот файл содержит блок “Частые темы / Sujets fréquents” и показывает 6 карточек тем, чтобы быстро выбрать направление. */

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { aideCopy } from "@/content/actions";

type AideTopicsProps = {
  locale: "ru" | "fr";
};

// Блок с карточками тем: короткие формулировки, чтобы не перегружать новоприбывших.
export function AideTopics({ locale }: AideTopicsProps) {
  // Тексты и список тем: чтобы RU/FR были синхронны и легко редактировались.
  const copy = aideCopy[locale].topics;

  return (
    <section
      className="section section--purple aide-topics-section"
      id="topics"
      style={{ scrollMarginTop: "calc(var(--site-header-height) + 18px)" }}
    >
      <Container>
        <div className="section-head">
          <h2 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
            {copy.title}
          </h2>
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {copy.subtitle}
          </p>
        </div>

        {/* Карточки тем: на десктопе 3 колонки, на мобильных — 1 колонка (это уже в стилях). */}
        <div className="cards-grid aide-topics-grid" aria-label={copy.title}>
          {copy.items.map((topic) => (
            <article
              key={topic.topicParam}
              className="card card--paper aide-card aide-card--topic"
            >
              {/* Заголовок карточки: название темы, чтобы быстро “сканировать” взглядом. */}
              <h3 className="h3 h3--blue">{topic.title}</h3>

              {/* Короткие примеры: помогают человеку понять “это про меня?” за 3–5 секунд. */}
              <IesList className="list">
                {topic.examples.map((example) => (
                  <IesListItem key={example}>{example}</IesListItem>
                ))}
              </IesList>

              {/* Одна практичная строка: что приложить к сообщению. */}
              <p className="fineprint aide-fineprint">
                {copy.preparePrefix} {topic.prepareLine}
              </p>

              {/* Кнопка: сразу ведёт в контакты с выбранной темой. */}
              <div className="aide-cta">
                <Link className="btn btn--pill btn--blue" href={`/${locale}/contacts?topic=${topic.topicParam}`}>
                  {copy.chooseLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


