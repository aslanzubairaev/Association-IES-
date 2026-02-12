/* Этот файл задаёт страницу “Soutenir / Поддержать” и показывает способы поддержки (донат/взнос/волонтёрство). */

import SoutenirPage from "@/components/sections/soutenir/SoutenirPage";

export default function SoutenirRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Передаём выбранный язык в основной компонент, чтобы файл маршрута оставался коротким.
  return <SoutenirPage locale={locale} />;
}
