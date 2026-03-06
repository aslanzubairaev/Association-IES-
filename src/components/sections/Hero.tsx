/* This file renders the hero block of the home page: heading, description, buttons, and a compact contact form. */

import { Button } from "@/components/ui/Button/Button";
import { heroCopy } from "@/content/actions";
import styles from "./Hero.module.css";

type HeroProps = {
  locale: "ru" | "fr";
};

// Hero block: texts and buttons depend on the selected locale.
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
          {/* Main heading: briefly explains that the association helps with integration in Strasbourg. */}
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


          {/* Primary buttons: link to the help section and the association's activities list. */}
          <div
            className={`actions hero-actions ${locale === "ru" ? styles.heroActionsRu : ""}`}
          >
            <Button className={`hero-button ${styles.heroButtonPrimary}`} variant="accent" href={`/${locale}/aide`}>
              {copy.ctaPrimary}
            </Button>
            <Button className={`hero-button ${styles.heroButtonSecondary}`} variant="secondary" href={`/${locale}/activites`}>
              {copy.ctaSecondary}
            </Button>
          </div>

          {/* Keywords: help visitors quickly understand our focus areas without clicking. */}
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
