/* 
 Этот файл задаёт общий каркас страниц для выбранного языка (/ru или /fr).
 Он показывает шапку сайта и оборачивает содержимое страницы в общий каркас.
 Человек может использовать меню и переключать язык в шапке.
*/

import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./layout.module.css";

// Общая оболочка для страниц /ru и /fr: проверяем язык и показываем переключатель.
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Язык, который пришёл из адреса страницы.
  const locale = params.locale;

  // Если язык неизвестен — показываем страницу “не найдено”.
  if (locale !== "ru" && locale !== "fr") {
    notFound();
  }

  return (
    <div className={`${styles.localeScope} locale-shell`}>
      <div id="top" aria-hidden="true" />
      {/* Верхняя шапка, которая остаётся видимой при прокрутке. */}
      <Header locale={locale} />
      {/* Отступ под шапку, чтобы содержимое страницы не уходило под неё. */}
      <div className="locale-content">{children}</div>
      <Footer locale={locale} />
    </div>
  );
}

