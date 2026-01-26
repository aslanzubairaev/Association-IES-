/* Этот файл показывает верхний блок главной страницы: заголовок, описание, кнопки и компактную форму связи. */

import type { CSSProperties } from "react";
import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { InstagramBadge } from "@/components/social/InstagramBadge";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { heroCopy } from "@/content/actions";
import styles from "./Hero.module.css";
import infoStyles from "@/components/ui/InfoStack.module.css";

type HeroProps = {
  locale: "ru" | "fr";
};

// Переход секции вниз: уводим фиолетовый Hero в общий светлый фон сайта без “третьего” фона.
const slantPurpleStyle = { "--next": "var(--color-bg)" } as CSSProperties;

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

// Верхний блок: тексты и кнопки зависят от выбранного языка.
export function Hero({ locale }: HeroProps) {
  const copy = heroCopy[locale];

  return (
    <section className={cn("section section--purple slant hero-section", styles.heroScope)} style={slantPurpleStyle}>
      <Container>
        <div className="hero-grid">
          <Card className="card--glass hero-left hero-left--mobile-plain" surface={false}>
            {/* Крупный заголовок: кратко объясняет, что ассоциация помогает адаптироваться именно в Страсбурге. */}
            <h1 className="h1">
              {copy.title.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx === 0 ? <br /> : null}
                </span>
              ))}
            </h1>

            {/* Описание: уточняет, какие темы мы закрываем и что человек получит дальше. */}
            <p className="lead hero-lead">{copy.lead}</p>

            {/* Основные кнопки: ведут в раздел помощи и в список действий ассоциации. */}
            <div className="actions hero-actions">
              <Button className="hero-button" variant="accent" href={`/${locale}/aide`}>
                {copy.ctaPrimary}
              </Button>
              <Button className="hero-button" variant="secondary" href={`/${locale}/actions`}>
                {copy.ctaSecondary}
              </Button>
            </div>

            {/* Ключевые слова: помогают быстро понять, про что наши направления (без кликов). */}
            <div className="pill-row hero-pillRow" aria-label={copy.pillsAriaLabel}>
              {copy.pills.map((pill) => (
                <span key={pill} className="pill">
                  {pill}
                </span>
              ))}
            </div>
          </Card>

          <Card as="aside" className="card--yellow hero-right" surface={false}>
            {/* Эта форма позволяет быстро открыть письмо в почте без телефона и личных имён. */}
            <QuickContactForm locale={locale} />

            {/* Ссылка на Instagram: быстрый канал связи и новости ассоциации. */}
            <div className={infoStyles.infoStack} style={{ marginTop: 12 }}>
              <InstagramBadge locale={locale} href="https://instagram.com/ies_info" handle="@ies_info" />
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}


