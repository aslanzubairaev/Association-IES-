/*
 This file contains the “What do you need?” block on the home page.
 It displays a set of navigation cards that link to the main sections of the site.
 The card list and texts can be changed via a data file without touching the layout.
*/

import { Section } from "@/components/ui/Section/Section";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { homeNavCards, quickNavCopy } from "@/content/actions";
import Image from "next/image";
import styles from "./QuickNav.module.css";

type QuickNavProps = {
  locale: "ru" | "fr";
};

// Navigation cards: texts are sourced from a shared data file.
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
                {/* Card title and text explain where this navigation item leads. */}
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


