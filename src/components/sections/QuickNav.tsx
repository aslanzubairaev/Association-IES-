/* 
 Этот файл содержит блок “Что вам нужно?” на главной странице.
 Он показывает набор карточек-навигации, которые ведут на основные разделы сайта.
 Здесь можно поменять список карточек и их тексты через файл с данными, не трогая верстку.
*/

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { homeNavCards, quickNavCopy } from "@/content/actions";

type QuickNavProps = {
  locale: "ru" | "fr";
};

// Карточки навигации: тексты берём из общего файла данных.
export function QuickNav({ locale }: QuickNavProps) {
  const copy = quickNavCopy[locale];

  return (
    <section className="section section--soft needs-block">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{copy.title}</h2>
          <p className="muted">{copy.subtitle}</p>
        </div>

        <div className="cards-grid quickNav-grid" aria-label={copy.title}>
          {homeNavCards.map((card) => {
            const href = `/${locale}${card.path}`;

            return (
              <Card key={card.id} as="article" className="accent-left accent--blue quickNav-card">
                <h3 className="h3 h3--blue">{card.title[locale]}</h3>

                <p className="p">{card.description[locale]}</p>

                <div style={{ marginTop: 12 }}>
                  <Button variant="secondary" href={href}>
                    {copy.ctaLabel}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


