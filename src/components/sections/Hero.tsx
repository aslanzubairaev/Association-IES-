/* Этот файл показывает верхний блок главной страницы: заголовок, описание, кнопки и компактную форму связи. */

import { Button } from "@/components/ui/Button/Button";
import { heroCopy } from "@/content/actions";
import styles from "./Hero.module.css";

type HeroProps = {
  locale: "ru" | "fr";
};

// Верхний блок: тексты и кнопки зависят от выбранного языка.
export function Hero({ locale }: HeroProps) {
  const copy = heroCopy[locale];
  const titleParts = copy.title.split(",").map((part) => part.trim()).filter(Boolean);
  const shouldSplitCityLine = titleParts.length === 3;
  const titleMain = shouldSplitCityLine ? `${titleParts[0]}, ${titleParts[1]}` : copy.title;
  const titleCity = shouldSplitCityLine ? titleParts[2] : null;

  return (
    <section className={`hero-section ${styles.heroScope}`}>
      <div className={styles.heroGridWrapper}>
        <picture className={`${styles.heroBg} ${styles.heroBgPicture}`}>
          <source media="(max-width: 768px)" srcSet="/bgimg_mobile.png" />
          <img
            src="/desktop_bg.png"
            alt=""
            width={1920}
            height={1080}
            className={styles.heroBgImage}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>

        <div className={`hero-left hero-left--mobile-plain ${styles.heroContent}`}>
          {/* Крупный заголовок: кратко объясняет, что ассоциация помогает адаптироваться именно в Страсбурге. */}
          <h1 className="h1">
            {titleCity ? (
              <>
                <span className={styles.heroTitleMainLine}>{titleMain}</span>
                <br className={styles.heroTitleCityBreak} />
                <span className={styles.heroTitleCityLine}>{titleCity}</span>
              </>
            ) : (
              copy.title
            )}
          </h1>


          {/* Основные кнопки: ведут в раздел помощи и в список действий ассоциации. */}
          <div
            className={`actions hero-actions ${locale === "ru" ? styles.heroActionsRu : ""}`}
          >
            <Button className="hero-button" variant="accent" href={`/${locale}/aide`}>
              {copy.ctaPrimary}
            </Button>
            <Button className="hero-button" variant="secondary" href={`/${locale}/activites`}>
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
