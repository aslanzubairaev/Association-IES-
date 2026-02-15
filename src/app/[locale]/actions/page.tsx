/* Этот файл задаёт маршрут страницы “Actions / Действия” и подключает основной контент через отдельный компонент. */

import ActionsPage from "@/components/sections/actions/ActionsPage";
import styles from "./page.module.css";

export default function ActionsRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Передаём выбранный язык в отдельный компонент страницы, чтобы маршрут оставался простым.
  return (
    <div className={styles.actionsScope}>
      <ActionsPage locale={locale} />
    </div>
  );
}




