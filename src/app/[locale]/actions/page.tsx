/* 
 Этот файл задаёт страницу “Actions / Действия” в формате каталога направлений.
 Он показывает короткое вступление и сетку карточек с направлениями (для RU и FR).
 Человек может выбрать подходящее направление и перейти на страницу контактов для записи.
*/

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ActionCard } from "@/components/actions/ActionCard";
import { actionsCopy, getActionsTopicParam } from "@/content/actions";

export default function ActionsPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Тексты страницы и список направлений: единый источник, чтобы RU/FR были синхронны.
  const copy = actionsCopy[locale];

  return (
    <main className="section section--pink-2">
      <Container>
        {/* HERO: объясняем, что это за направления, и даём короткую подсказку, что делать дальше. */}
        <div className="section-head">
          <h1 className="h2 h2--blue">{copy.hero.title}</h1>
          <p className="muted">{copy.hero.lead}</p>
          <p className="p" style={{ marginTop: 10 }}>
            {copy.hero.hint}
          </p>
        </div>

        {/* НАПРАВЛЕНИЯ: каталог карточек, чтобы за 30 секунд понять варианты. */}
        <div
          id="directions"
          className="section-head"
          style={{ marginTop: 18, scrollMarginTop: "calc(var(--site-header-height) + 18px)" }}
        >
          <h2 className="h2 h2--blue">{copy.directions.title}</h2>
          <p className="muted">{copy.directions.subtitle}</p>
        </div>

        <div
          className="actions-cards-grid"
          aria-label={locale === "fr" ? "Catalogue des actions" : "Каталог направлений"}
        >
          {copy.items.map((it) => {
            const topic = getActionsTopicParam(it.slug);
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
                href={`/${locale}/contacts?topic=${encodeURIComponent(topic)}`}
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




