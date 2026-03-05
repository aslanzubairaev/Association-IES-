/*
 Этот файл показывает блок активностей на главной странице.
 Он выводит максимум 6 карточек и кнопку перехода к полной странице каталога.
 Человек может сразу открыть интересную активность из главной страницы.
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

// Блок на главной: показываем только ограниченный набор активностей для быстрого входа.
export function ActivitiesHomeSection({ locale }: ActivitiesHomeSectionProps) {
  const copy = activitiesHomeCopy[locale];
  const pageCopy = activitiesPageCopy[locale];
  const activities = activityRepository.listFeatured(locale, 6);

  return (
    <Section className={styles.scope} title={copy.title} subtitle={copy.subtitle}>
      {/* Карточки можно открыть кликом по всей карточке, чтобы сразу попасть в детали. */}
      <div className={styles.grid} aria-label={copy.listAriaLabel}>
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            className={styles.cardItem}
            activity={activity}
            detailsHref={`/${locale}/activites/${activity.slug}`}
            detailsLabel={pageCopy.detailsCtaLabel}
            participateHref={`/${locale}/contact?intent=${encodeURIComponent(activity.intentId)}`}
            participateLabel={pageCopy.participateCtaLabel}
          />
        ))}
      </div>

      {/* Отдельная кнопка ведет на полную страницу, где доступен весь каталог. */}
      <div className={styles.ctaRow}>
        <Button href={`/${locale}/activites`} variant="pill" className={styles.ctaButton}>
          {copy.ctaAll}
        </Button>
      </div>
    </Section>
  );
}
