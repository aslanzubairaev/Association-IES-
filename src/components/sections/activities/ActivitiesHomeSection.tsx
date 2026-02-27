/*
 Этот файл показывает блок активностей на главной странице.
 Он выводит максимум 6 карточек и кнопку перехода к полной странице каталога.
 Человек может сразу открыть интересную активность из главной страницы.
*/

import Image from "next/image";
import { Section } from "@/components/ui/Section/Section";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { activitiesHomeCopy, activitiesPageCopy } from "@/content/activitiesCatalog";
import { activityRepository } from "@/lib/activities/repository";
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
          <Card key={activity.id} href={`/${locale}/activites/${activity.slug}`} className={styles.card}>
            <CardContent className={styles.cardContent}>
              <div className={styles.imageWrap}>
                <Image
                  className={styles.image}
                  src={activity.coverImage.src}
                  alt={activity.coverImage.alt}
                  width={640}
                  height={360}
                />
              </div>
              <h3 className="h3 h3--blue">{activity.cardTitle}</h3>
              <p className="p">{activity.cardPitch}</p>
              <p className={`fineprint ${styles.location}`}>
                <strong>{pageCopy.locationLabel}</strong> {activity.location}
              </p>
            </CardContent>
          </Card>
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
