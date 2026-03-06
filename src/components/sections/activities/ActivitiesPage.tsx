/*
 Этот файл показывает страницу со всеми активностями.
 Он выводит карточки с изображением, кратким описанием, местом и кнопками действия.
 Человек может открыть детали активности или сразу перейти к записи через контакт.
*/

import { Container } from "@/components/ui/Container";
import { activityRepository } from "@/lib/activities/repository";
import { activitiesPageCopy } from "@/content/activitiesCatalog";
import { ActivityCard } from "./ActivityCard";
import styles from "./ActivitiesPage.module.css";

type ActivitiesPageProps = {
  locale: "ru" | "fr";
};

// Страница каталога активностей: тексты и карточки зависят от выбранного языка.
export async function ActivitiesPage({ locale }: ActivitiesPageProps) {
  const copy = activitiesPageCopy[locale];
  const activities = await activityRepository.listPublished(locale);

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
            <ActivityCard
              key={activity.id}
              className={styles.cardItem}
              activity={activity}
              detailsHref={`/${locale}/activites/${activity.slug}`}
              detailsLabel={copy.detailsCtaLabel}
              participateHref={`/${locale}/contact?intent=${encodeURIComponent(activity.intentId)}`}
              participateLabel={copy.participateCtaLabel}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
