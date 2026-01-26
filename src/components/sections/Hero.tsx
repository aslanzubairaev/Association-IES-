/* Этот файл показывает верхний блок главной страницы: заголовок, описание, кнопки и компактную форму связи. */

import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { InstagramBadge } from "@/components/social/InstagramBadge";
import { Section } from "@/components/ui/Section/Section";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { heroCopy } from "@/content/actions";
import styles from "./Hero.module.css";
import infoStyles from "@/components/ui/InfoStack.module.css";

type HeroProps = {
  locale: "ru" | "fr";
};

// Верхний блок: тексты и кнопки зависят от выбранного языка.
export function Hero({ locale }: HeroProps) {
  const copy = heroCopy[locale];

  return (
    <Section
      className={`hero-section ${styles.hero}`}
      inverse
    >
      <div className={styles.heroLayout}>
        <Card className="card--glass hero-left hero-left--mobile-plain" surface={false}>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card as="aside" className="card--yellow hero-right" surface={false}>
          <CardContent>
            {/* Эта форма позволяет быстро открыть письмо в почте без телефона и личных имён. */}
            <QuickContactForm locale={locale} />

            {/* Ссылка на Instagram: быстрый канал связи и новости ассоциации. */}
            <div className={infoStyles.infoStack} style={{ marginTop: 12 }}>
              <InstagramBadge locale={locale} href="https://instagram.com/ies_info" handle="@ies_info" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
