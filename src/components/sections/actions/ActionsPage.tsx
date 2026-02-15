/* Этот файл содержит основной контент страницы “Actions / Действия” и показывает каталог направлений с карточками (RU/FR). */

import { Container } from "@/components/ui/Container";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { actionsCopy, actionsPageCopy } from "@/content/actions";

type ActionsPageProps = {
  locale: "ru" | "fr";
};

export default function ActionsPage({ locale }: ActionsPageProps) {
  // Тексты страницы и список направлений: единый источник, чтобы RU/FR были синхронны.
  const copy = actionsCopy[locale];

  return (
    <main className="section page--purple">
      <Container>
        {/* Верхний блок раздела “Направления”, чтобы сразу показать смысл каталога. */}
        <div
          id="directions"
          className="section-head actions-directions-head"
          style={{ scrollMarginTop: "calc(var(--site-header-height) + 18px)" }}
        >
          <h2 className="h2">
            {copy.directions.title}
          </h2>
          <p className="muted-on-dark">
            {copy.directions.subtitle}
          </p>
        </div>

        {/* Сетка карточек с направлениями и кнопкой перехода на страницу контактов с выбранной темой. */}
        <div
          className="actions-cards-grid"
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
                  href: `/${locale}/contact?intent=${encodeURIComponent(it.intentId)}`,
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
                  {it.frequency?.trim() && (
                    <IesListItem>
                      <strong>{copy.directions.frequencyLabel}:</strong> {it.frequency}
                    </IesListItem>
                  )}
                </IesList>
                <p className="fineprint muted" style={{ marginTop: 14 }}>
                  <strong>{copy.directions.whenWhereLabel}</strong> {copy.directions.whenWhereText}
                </p>
              </ContentCard>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
