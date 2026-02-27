/*
 Этот файл задаёт маршрут страницы всех активностей.
 Он подключает основной компонент каталога и передаёт выбранный язык.
 Человек видит полный список активностей и может перейти в детали.
*/

import { ActivitiesPage } from "@/components/sections/activities/ActivitiesPage";
import styles from "./page.module.css";

export default function ActivitesRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  return (
    <div className={styles.scope}>
      <ActivitiesPage locale={params.locale} />
    </div>
  );
}
