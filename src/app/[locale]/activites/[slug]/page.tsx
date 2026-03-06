/*
 Этот файл задаёт маршрут детальной страницы активности.
 Он получает slug из адреса, находит нужную активность и показывает полный контент.
 Если slug не найден или активность не опубликована, человек видит страницу 404.
*/

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityDetailPage } from "@/components/sections/activities/ActivityDetailPage";
import { activityRepository } from "@/lib/activities/repository";
import styles from "./page.module.css";

type ActivityDetailRouteProps = {
  params: {
    locale: "ru" | "fr";
    slug: string;
  };
};

// Метаданные страницы строятся из SEO-полей выбранной активности.
export async function generateMetadata({ params }: ActivityDetailRouteProps): Promise<Metadata> {
  const activity = await activityRepository.getBySlug(params.locale, params.slug);

  if (!activity) {
    return {};
  }

  return {
    title: activity.seoTitle,
    description: activity.seoDescription,
    alternates: {
      canonical: `/${params.locale}/activites/${activity.slug}`,
    },
  };
}

// Роут деталей: если активность найдена, передаём её в компонент отображения.
export default async function ActivityDetailRoutePage({ params }: ActivityDetailRouteProps) {
  const activity = await activityRepository.getBySlug(params.locale, params.slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className={styles.scope}>
      <ActivityDetailPage locale={params.locale} activity={activity} />
    </div>
  );
}
