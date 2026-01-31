/* 
 Этот файл содержит блок “Что вам нужно?” на главной странице.
 Он показывает набор карточек-навигации, которые ведут на основные разделы сайта.
 Здесь можно поменять список карточек и их тексты через файл с данными, не трогая верстку.
*/

import { Section } from "@/components/ui/Section/Section";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { homeNavCards, quickNavCopy } from "@/content/actions";
import Image from "next/image";
import styles from "./QuickNav.module.css";

type QuickNavProps = {
  locale: "ru" | "fr";
};

// Карточки навигации: тексты берём из общего файла данных.
export function QuickNav({ locale }: QuickNavProps) {
  const copy = quickNavCopy[locale];

  return (
    <Section
      className={`${styles.quickNavScope} needs-block`}
      title={copy.title}
      subtitle={copy.subtitle}
    >
      <div className="cards-grid quickNav-grid" aria-label={copy.title}>
        {homeNavCards.map((card) => {
          const href = `/${locale}${card.path}`;

          return (
            <Card
              key={card.id}
              href={href}
              className="accent--blue quickNav-card"
            >
              <CardContent>
                {/* Use manual h3 or CardHeader? Original: h3 inside card. */}
                {/* Visuals might depend on padding. CardContent has padding. */}
                <h3 className="h3 h3--blue">{card.title[locale]}</h3>

                <p className="p">{card.description[locale]}</p>

                {card.icon ? (
                  <Image
                    className="quickNav-icon"
                    src={card.icon}
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={120}
                  />
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}


