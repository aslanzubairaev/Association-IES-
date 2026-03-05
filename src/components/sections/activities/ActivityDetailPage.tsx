/*
 Этот файл показывает детальную страницу одной активности.
 Он выводит полное описание, формат участия, галерею, аудиторию и кнопки действий.
 Человек может сразу перейти к записи или к поддержке ассоциации.
*/

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button/Button";
import { MinimalList } from "@/components/ui/MinimalList";
import type { LocalizedActivity } from "@/lib/activities/types";
import { activitiesPageCopy } from "@/content/activitiesCatalog";
import styles from "./ActivityDetailPage.module.css";

type ActivityDetailPageProps = {
  locale: "ru" | "fr";
  activity: LocalizedActivity;
};

function resolveLocaleHref(locale: "ru" | "fr", href: string) {
  if (!href.startsWith("/")) {
    return href;
  }

  if (href.startsWith("/ru/") || href.startsWith("/fr/") || href === "/ru" || href === "/fr") {
    return href;
  }

  return `/${locale}${href}`;
}

// Детальная страница: все тексты уже локализованы и готовы к отображению.
export function ActivityDetailPage({ locale, activity }: ActivityDetailPageProps) {
  const supportHref = activity.ctaSupportHref ? resolveLocaleHref(locale, activity.ctaSupportHref) : undefined;
  const pageCopy = activitiesPageCopy[locale];

  return (
    <main className={`section page--purple ${styles.scope}`}>
      <Container>
        {/* Верхний блок активности: название, короткое описание и главное изображение. */}
        <div className={styles.heroBlock}>
          <div className={styles.heroText}>
            <h1 className="h2">{activity.detailTitle}</h1>
            <p className="muted-on-dark">{activity.detailSubtitle}</p>
            <p className={`fineprint ${styles.location}`}>{activity.location}</p>
          </div>

          <div className={styles.heroImageWrap}>
            <Image
              className={styles.heroImage}
              src={activity.coverImage.src}
              alt={activity.coverImage.alt}
              width={1280}
              height={720}
              priority
            />
          </div>
        </div>

        {/* Кнопки сразу дают два сценария: записаться или поддержать проект. */}
        <div className={styles.ctaRow}>
          <Button
            href={`/${locale}/contact?intent=${encodeURIComponent(activity.intentId)}`}
            variant="pill"
            className={styles.ctaButton}
          >
            {pageCopy.participateCtaLabel}
          </Button>
          {activity.ctaSupportLabel && supportHref ? (
            <Button href={supportHref} variant="secondary" className={styles.ctaButton}>
              {activity.ctaSupportLabel}
            </Button>
          ) : null}
        </div>

        {/* Вступительные абзацы объясняют контекст и миссию активности. */}
        <section className={styles.sectionBlock}>
          {activity.introParagraphs.map((paragraph) => (
            <p key={paragraph} className="p">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Блок "Что мы предлагаем" показывает формат активности в пунктовом виде. */}
        <section className={styles.sectionBlock}>
          <h2 className="h3 h3--blue">{activity.offerTitle}</h2>
          <p className="p">{activity.offerLead}</p>
          <MinimalList items={activity.offerItems} />
        </section>

        {/* Галерея показывает живые примеры и атмосферу активности. */}
        <section className={styles.sectionBlock}>
          <h2 className="h3 h3--blue">{activity.galleryTitle}</h2>
          <p className="p">{activity.galleryLead}</p>
          <div className={styles.galleryGrid}>
            {activity.gallery.map((image) => (
              <figure key={`${image.src}-${image.alt}`} className={styles.galleryItem}>
                <Image className={styles.galleryImage} src={image.src} alt={image.alt} width={640} height={420} />
                {image.caption ? <figcaption className={styles.caption}>{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>

        {/* Для кого и в каком формате: это помогает быстро понять доступность участия. */}
        <section className={styles.sectionBlock}>
          <h2 className="h3 h3--blue">{activity.audienceTitle}</h2>
          <MinimalList items={activity.audienceItems} />
          <div className={styles.badges}>
            {activity.practicalBadges.map((badge) => (
              <span key={badge} className={styles.badge}>
                {badge}
              </span>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
