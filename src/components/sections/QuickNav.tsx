/* 
 Этот файл содержит блок “Что вам нужно?” на главной странице.
 Он показывает набор карточек-навигации, которые ведут на основные разделы сайта.
 Здесь можно поменять список карточек и их тексты через файл с данными, не трогая верстку.
*/

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { homeNavCards, quickNavCopy } from "@/content/actions";
import Image from "next/image";
import styles from "./QuickNav.module.css";

type QuickNavProps = {
  locale: "ru" | "fr";
};

// Карточки навигации: тексты берём из общего файла данных.
export function QuickNav({ locale }: QuickNavProps) {
  const copy = quickNavCopy[locale];
  const quickNavIcons = ["/01.png", "/02.png", "/03.png", "/04.png", "/05.png"];

  return (
    <section className={`${styles.quickNavScope} section section--soft needs-block`}>
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{copy.title}</h2>
          <p className="muted">{copy.subtitle}</p>
        </div>

        <div className="cards-grid quickNav-grid" aria-label={copy.title}>
          {homeNavCards.map((card, index) => {
            const href = `/${locale}${card.path}`;
            const iconSrc = quickNavIcons[index];

            return (
              <Card
                key={card.id}
                as="article"
                hoverable={false}
                className="accent--blue quickNav-card"
              >
                <h3 className="h3 h3--blue">{card.title[locale]}</h3>

                <p className="p">{card.description[locale]}</p>

                <div className="quickNav-cta">
                  <Button variant="secondary" href={href}>
                    {copy.ctaLabel}
                  </Button>
                </div>

                {iconSrc ? (
                  <Image
                    className="quickNav-icon"
                    src={iconSrc}
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={120}
                  />
                ) : null}
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


