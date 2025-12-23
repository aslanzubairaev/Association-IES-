/* 
 Этот файл содержит блок “Что вам нужно?” на главной странице.
 Он показывает набор карточек-навигации, которые ведут на основные разделы сайта.
 Здесь можно поменять список карточек и их тексты через файл с данными, не трогая верстку.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { homeNavCards } from "@/content/homeNav";

type QuickNavProps = {
  locale: "ru" | "fr";
};

// Карточки навигации: тексты берём из общего файла данных.
export function QuickNav({ locale }: QuickNavProps) {
  const title = locale === "fr" ? "De quoi avez-vous besoin ?" : "Что вам нужно?";
  const subtitle =
    locale === "fr"
      ? "Choisissez un thème — on vous dirige vers la bonne page."
      : "Выберите тему — мы отправим вас в нужный раздел.";

  return (
    <section className="section section--soft needs-block">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{title}</h2>
          <p className="muted">{subtitle}</p>
        </div>

        <div className="cards-grid quickNav-grid" aria-label={title}>
          {homeNavCards.map((card) => {
            const href = `/${locale}${card.path}`;

            return (
              <article
                key={card.id}
                className="card card--paper accent-left accent--blue quickNav-card"
              >
                <h3 className="h3 h3--blue">{card.title[locale]}</h3>

                <p className="p">{card.description[locale]}</p>

                <div style={{ marginTop: 12 }}>
                  <Link className="btn btn--pill btn--outline-blue" href={href}>
                    {locale === "fr" ? "Aller" : "Перейти"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


