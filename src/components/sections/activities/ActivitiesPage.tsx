/*
 This file renders the page listing all activities.
 It displays cards with an image, short description, location, and action buttons.
 The user can open activity details or go directly to sign up via the contact page.
*/

import { Container } from "@/components/ui/Container";
import { activityRepository } from "@/lib/activities/repository";
import { activitiesPageCopy } from "@/content/activitiesCatalog";
import { ActivityCard } from "./ActivityCard";
import styles from "./ActivitiesPage.module.css";

type ActivitiesPageProps = {
  locale: "ru" | "fr";
};

// Activities catalog page: texts and cards depend on the selected locale.
export async function ActivitiesPage({ locale }: ActivitiesPageProps) {
  const copy = activitiesPageCopy[locale];
  const activities = await activityRepository.listPublished(locale);

  return (
    <main className={`section page--purple ${styles.scope}`}>
      <Container>
        {/* Heading explains that this is the full list of the association's programs. */}
        <div className="section-head" style={{ marginBottom: 22 }}>
          <h1 className="h2">{copy.title}</h1>
          <p className="muted-on-dark">{copy.subtitle}</p>
        </div>

        {/* Card grid: each card links to details and to sign-up via contacts. */}
        <div className={styles.grid} aria-label={copy.listAriaLabel}>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              className={styles.cardItem}
              activity={activity}
              detailsHref={`/${locale}/activites/${activity.slug}`}
              detailsLabel={copy.detailsCtaLabel}
              participateHref={`/${locale}/contact?intent=${encodeURIComponent(activity.contactIntentRef ?? activity.intentId)}`}
              participateLabel={copy.participateCtaLabel}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
