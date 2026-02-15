/* Этот файл задаёт страницу “Soutenir / Поддержать” и показывает способы поддержки (донат/взнос/волонтёрство). */

import SoutenirPage from "@/components/sections/soutenir/SoutenirPage";
import styles from "./page.module.css";

export default function SoutenirRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Передаём выбранный язык в основной компонент, чтобы файл маршрута оставался коротким.
  return (
    <div className={styles.supportScope}>
      <SoutenirPage locale={locale} />
    </div>
  );
}
