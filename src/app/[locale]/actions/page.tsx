/* Этот файл задаёт страницу “Actions / Действия” и показывает каталог направлений с карточками (RU/FR). */

import { Container } from "@/components/ui/Container";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { actionsCopy, actionsPageCopy } from "@/content/actions";
import styles from "./page.module.css";

export default function ActionsPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Тексты страницы и список направлений: единый источник, чтобы RU/FR были синхронны.
  const copy = actionsCopy[locale];

  return (
    <div className={styles.actionsScope}>
      <main className="section page--purple">
        <Container>
          {/* HERO: объясняем, что это за направления, и даём короткую подсказку, что делать дальше. */}
          <div className="section-head">
            <h1 className="h2">
              {copy.hero.title}
            </h1>
            <p className="muted-on-dark">
              {copy.hero.lead}
            </p>
            <p className="p" style={{ marginTop: 10 }}>
              {copy.hero.hint}
            </p>
          </div>

          {/* НАПРАВЛЕНИЯ: каталог карточек, чтобы за 30 секунд понять варианты. */}
          <div
            id="directions"
            className={`section-head ${styles.actionsDirectionsHead}`}
            style={{ scrollMarginTop: "calc(var(--site-header-height) + 18px)" }}
          >
            <h2 className="h2">
              {copy.directions.title}
            </h2>
            <p className="muted-on-dark">
              {copy.directions.subtitle}
            </p>
          </div>

          <div
            className={styles.actionsCardsGrid}
            aria-label={actionsPageCopy[locale].catalogAriaLabel}
          >
            {copy.items.map((it) => {
              return (
                <ContentCard
                  key={it.slug}
                  title={it.title}
                  hoverable={false}
                  actions={[{
                    label: copy.directions.cta,
                    href: `/${locale}/contact?topic=${encodeURIComponent(it.topicKey)}`,
                    variant: "pill",
                    className: "cta-pill"
                  }]}
                >
                  <IesList className="list">
                    <IesListItem>
                      <strong>{copy.directions.forWhoLabel}:</strong> {it.forWho}
                    </IesListItem>
                    <IesListItem>
                      <strong>{copy.directions.benefitLabel}:</strong> {it.benefit}
                    </IesListItem>
                    <IesListItem>
                      <strong>{copy.directions.frequencyLabel}:</strong> {it.frequency}
                    </IesListItem>
                  </IesList>
                  <p className="fineprint muted" style={{ marginTop: 14 }}>
                    <strong>{copy.directions.whenWhereLabel}</strong> {copy.directions.whenWhereText}
                  </p>
                </ContentCard>
              );
            })}
          </div>

          {/* ИНФО‑БЛОК: “Важно знать / À savoir” отдельной широкой карточкой под сеткой. */}
          <div className={styles.actionsImportantBlock}>
            <ContentCard
              title={copy.important.title}
              listItems={copy.important.items}
              hoverable={false}
              className="actions-important-card"
            />
          </div>
        </Container>
      </main>
    </div>
  );
}




