/* Этот файл показывает верхний блок главной страницы: заголовок, описание, кнопки и компактную форму связи. */

import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { heroCopy } from "@/content/actions";
import styles from "./Hero.module.css";

type HeroProps = {
  locale: "ru" | "fr";
};

// Верхний блок: тексты и кнопки зависят от выбранного языка.
// Верхний блок: тексты и кнопки зависят от выбранного языка.
export function Hero({ locale }: HeroProps) {
  const copy = heroCopy[locale];

  return (
    <section className={`hero-section ${styles.heroScope}`}>
      <div className={styles.heroGridWrapper}>
        {/* Desktop Image */}
        <Image
          src="/bgimg_desktop.png"
          alt=""
          width={1920}
          height={1080}
          className={`${styles.heroBg} ${styles.heroBgDesktop}`}
          priority
        />
        {/* Mobile Image */}
        <Image
          src="/bgimg_mobile.jpg"
          alt=""
          width={800}
          height={1200}
          className={`${styles.heroBg} ${styles.heroBgMobile}`}
          priority
        />

        <div className={`hero-left hero-left--mobile-plain ${styles.heroContent}`}>
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
        </div>
      </div>
    </section>
  );
}
