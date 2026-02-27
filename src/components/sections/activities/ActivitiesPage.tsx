/*
 Этот файл показывает страницу со всеми активностями.
 Он выводит карточки с изображением, кратким описанием, местом и кнопками действия.
 Человек может открыть детали активности или сразу перейти к записи через контакт.
*/

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { activityRepository } from "@/lib/activities/repository";
import { activitiesPageCopy } from "@/content/activitiesCatalog";
import styles from "./ActivitiesPage.module.css";

type ActivitiesPageProps = {
  locale: "ru" | "fr";
};

// Страница каталога активностей: тексты и карточки зависят от выбранного языка.
export function ActivitiesPage({ locale }: ActivitiesPageProps) {
  const copy = activitiesPageCopy[locale];
  const activities = activityRepository.listPublished(locale);

  return (
    <main className={`section page--purple ${styles.scope}`}>
      <Container>
        {/* Заголовок объясняет, что это полный список программ ассоциации. */}
        <div className="section-head" style={{ marginBottom: 22 }}>
          <h1 className="h2">{copy.title}</h1>
          <p className="muted-on-dark">{copy.subtitle}</p>
        </div>

        {/* Сетка карточек: каждая карточка ведет на детали и на запись в контактах. */}
        <div className={styles.grid} aria-label={copy.listAriaLabel}>
          {activities.map((activity) => (
            <ContentCard
              key={activity.id}
              className={styles.card}
              hoverable={false}
              title={activity.cardTitle}
              actions={[
                {
                  label: copy.detailsCtaLabel,
                  href: `/${locale}/activites/${activity.slug}`,
                  variant: "secondary",
                  className: styles.cardAction,
                },
                {
                  label: activity.ctaParticipateLabel,
                  href: `/${locale}/contact?intent=${encodeURIComponent(activity.intentId)}`,
                  variant: "pill",
                  className: styles.cardAction,
                },
              ]}
            >
              {/* Изображение помогает быстро понять контекст активности прямо в списке. */}
              <div className={styles.coverWrap}>
                <Image
                  className={styles.coverImage}
                  src={activity.coverImage.src}
                  alt={activity.coverImage.alt}
                  width={720}
                  height={420}
                />
              </div>

              {/* Краткое описание и место нужны для быстрого выбора без открытия детали. */}
              <p className="p">{activity.cardPitch}</p>
              <p className={`fineprint ${styles.location}`}>
                <strong>{copy.locationLabel}</strong> {activity.location}
              </p>
            </ContentCard>
          ))}
        </div>
      </Container>
    </main>
  );
}
