/*
 This file renders the detail page for a single activity.
 It displays the full description, participation format, gallery, audience, and action buttons.
 The user can sign up directly or go to the support page.
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

// Detail page: all texts are already localized and ready to render.
export function ActivityDetailPage({ locale, activity }: ActivityDetailPageProps) {
  const supportHref = activity.ctaSupportHref ? resolveLocaleHref(locale, activity.ctaSupportHref) : undefined;
  const pageCopy = activitiesPageCopy[locale];

  return (
    <main className={`section page--purple ${styles.scope}`}>
      <Container>
        {/* Activity hero block: title, short description, and cover image. */}
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

        {/* Buttons offer two paths: sign up or support the project. */}
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

        {/* Intro paragraphs explain the context and mission of the activity. */}
        <section className={styles.sectionBlock}>
          {activity.introParagraphs.map((paragraph) => (
            <p key={paragraph} className="p">
              {paragraph}
            </p>
          ))}
        </section>

        {/* "What we offer" block: shows the activity format as a bullet list. */}
        <section className={styles.sectionBlock}>
          <h2 className="h3 h3--blue">{activity.offerTitle}</h2>
          <p className="p">{activity.offerLead}</p>
          <MinimalList items={activity.offerItems} />
        </section>

        {/* Gallery showcases real examples and the atmosphere of the activity. */}
        <section className={styles.sectionBlock}>
          <h2 className="h3 h3--blue">{activity.galleryTitle}</h2>
          <p className="p">{activity.galleryLead}</p>
          <div className={styles.galleryGrid}>
            {activity.gallery.map((image, index) => (
              <figure key={`gallery-${index}`} className={styles.galleryItem}>
                <Image className={styles.galleryImage} src={image.src} alt={image.alt} width={640} height={420} />
                {image.caption ? <figcaption className={styles.caption}>{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>

        {/* Audience and format: helps quickly understand participation availability. */}
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
