/*
 This file renders the activities block on the home page.
 It displays up to 6 cards and a button linking to the full catalog page.
 The user can open an activity of interest directly from the home page.
*/

import { Section } from "@/components/ui/Section/Section";
import { Button } from "@/components/ui/Button/Button";
import { activitiesHomeCopy, activitiesPageCopy } from "@/content/activitiesCatalog";
import { activityRepository } from "@/lib/activities/repository";
import { ActivityCard } from "./ActivityCard";
import styles from "./ActivitiesHomeSection.module.css";

type ActivitiesHomeSectionProps = {
  locale: "ru" | "fr";
};

// Home page block: shows only a limited set of activities for quick access.
export async function ActivitiesHomeSection({ locale }: ActivitiesHomeSectionProps) {
  const copy = activitiesHomeCopy[locale];
  const pageCopy = activitiesPageCopy[locale];
  const activities = await activityRepository.listFeatured(locale, 6);

  return (
    <Section className={styles.scope} title={copy.title} subtitle={copy.subtitle}>
      {/* Cards are clickable in their entirety, leading directly to the detail page. */}
      <div className={styles.grid} aria-label={copy.listAriaLabel}>
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            className={styles.cardItem}
            activity={activity}
            detailsHref={`/${locale}/activites/${activity.slug}`}
            detailsLabel={pageCopy.detailsCtaLabel}
            participateHref={`/${locale}/contact?intent=${encodeURIComponent(activity.contactIntentRef ?? activity.intentId)}`}
            participateLabel={pageCopy.participateCtaLabel}
          />
        ))}
      </div>

      {/* Separate button links to the full page where the entire catalog is available. */}
      <div className={styles.ctaRow}>
        <Button href={`/${locale}/activites`} variant="pill" className={styles.ctaButton}>
          {copy.ctaAll}
        </Button>
      </div>
    </Section>
  );
}
