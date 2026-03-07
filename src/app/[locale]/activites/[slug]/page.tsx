/*
 This file defines the route for the activity detail page.
 It extracts the slug from the URL, finds the matching activity, and renders its full content.
 If the slug is not found or the activity is unpublished, the user sees a 404 page.
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

// Page metadata is built from the SEO fields of the selected activity.
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

// Detail route: if the activity is found, pass it to the display component.
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
