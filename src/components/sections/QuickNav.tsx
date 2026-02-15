/* 
 Этот файл содержит блок “Что вам нужно?” на главной странице.
 Он показывает набор карточек-навигации, которые ведут на основные разделы сайта.
 Здесь можно поменять список карточек и их тексты через файл с данными, не трогая верстку.
*/

"use client";

import { useEffect, useRef, type CSSProperties } from "react";
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
  const gridRef = useRef<HTMLDivElement | null>(null);

  // После загрузки отслеживаем карточки в зоне видимости и включаем мягкую подсветку, чтобы направить внимание.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".quickNav-card"));
    if (cards.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("quickNav-card--hint");
            return;
          }
          entry.target.classList.remove("quickNav-card--hint");
        });
      },
      {
        threshold: 0.4,
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      className={`${styles.quickNavScope} needs-block`}
      title={copy.title}
      subtitle={copy.subtitle}
    >
      <div ref={gridRef} className="cards-grid quickNav-grid" aria-label={copy.title}>
        {homeNavCards.map((card, index) => {
          const href = `/${locale}${card.path}`;
          const hintDelay = {
            ["--quick-nav-delay" as string]: `${index * 120}ms`,
          } as CSSProperties;

          return (
            <Card
              key={card.id}
              href={href}
              className="accent--blue quickNav-card"
              style={hintDelay}
            >
              <CardContent>
                {/* Заголовок и текст карточки объясняют, куда ведёт этот пункт навигации. */}
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


