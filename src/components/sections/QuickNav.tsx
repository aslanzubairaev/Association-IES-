/*
 This file contains the "What do you need?" block on the home page.
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

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickNav({ locale }: QuickNavProps) {
  const copy = quickNavCopy[locale];

  return (
    <Section
      className={`${styles.quickNavScope} needs-block`}
      eyebrow={copy.eyebrow}
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
                {card.icon && (
                  <Image
                    className={styles.cardIcon}
                    src={card.icon}
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={120}
                  />
                )}
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{card.title[locale]}</h3>
                  <p className={styles.cardDesc}>{card.description[locale]}</p>
                </div>
                <ChevronIcon className={styles.cardArrow} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
