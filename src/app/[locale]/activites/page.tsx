/*
 This file defines the route for the activities listing page.
 It renders the main catalog component and passes the selected locale.
 Users see the full list of activities and can navigate to detail pages.
*/

import { ActivitiesPage } from "@/components/sections/activities/ActivitiesPage";
import styles from "./page.module.css";

export default async function ActivitesRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  return (
    <div className={styles.scope}>
      <ActivitiesPage locale={params.locale} />
    </div>
  );
}
