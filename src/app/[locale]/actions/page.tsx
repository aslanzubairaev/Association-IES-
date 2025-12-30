/* Этот файл задаёт страницу “Actions / Действия” и показывает каталог направлений с карточками (RU/FR). */

import { Container } from "@/components/ui/Container";
import { ActionCard } from "@/components/actions/ActionCard";
import { actionsCopy, actionsPageCopy } from "@/content/actions";

export default function ActionsPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Тексты страницы и список направлений: единый источник, чтобы RU/FR были синхронны.
  const copy = actionsCopy[locale];

  return (
    <main className="section section--purple actions-page">
      <Container>
        {/* HERO: объясняем, что это за направления, и даём короткую подсказку, что делать дальше. */}
        <div className="section-head">
          <h1 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
            {copy.hero.title}
          </h1>
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {copy.hero.lead}
          </p>
          <p className="p" style={{ marginTop: 10, color: "rgba(255,255,255,.92)" }}>
            {copy.hero.hint}
          </p>
        </div>

        {/* НАПРАВЛЕНИЯ: каталог карточек, чтобы за 30 секунд понять варианты. */}
        <div
          id="directions"
          className="section-head actions-directions-head"
          style={{ scrollMarginTop: "calc(var(--site-header-height) + 18px)" }}
        >
          <h2 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
            {copy.directions.title}
          </h2>
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {copy.directions.subtitle}
          </p>
        </div>

        <div
          className="actions-cards-grid"
          aria-label={actionsPageCopy[locale].catalogAriaLabel}
        >
          {copy.items.map((it) => {
            return (
              <ActionCard
                key={it.slug}
                variant="direction"
                title={it.title}
                forWhoLabel={copy.directions.forWhoLabel}
                forWho={it.forWho}
                benefitLabel={copy.directions.benefitLabel}
                benefit={it.benefit}
                frequencyLabel={copy.directions.frequencyLabel}
                frequency={it.frequency}
                whenWhereLabel={copy.directions.whenWhereLabel}
                whenWhereText={copy.directions.whenWhereText}
                ctaLabel={copy.directions.cta}
                href={`/${locale}/contact?topic=${encodeURIComponent(it.topicKey)}`}
              />
            );
          })}

          {/* ИНФО‑КАРТОЧКА: “Важно знать / À savoir” как 9‑я карточка, чтобы сетка на десктопе была 3×3. */}
          <ActionCard
            variant="info"
            title={copy.important.title}
            items={copy.important.items}
          />
        </div>
      </Container>
    </main>
  );
}




