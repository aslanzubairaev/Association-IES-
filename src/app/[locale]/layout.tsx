/* 
 Этот файл задаёт общий каркас страниц для выбранного языка (/ru или /fr).
 Он показывает шапку сайта и оборачивает содержимое страницы в общий каркас.
 Человек может использовать меню и переключать язык в шапке.
*/

import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";

// Общая оболочка для страниц /ru и /fr: проверяем язык и показываем переключатель.
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  if (locale !== "ru" && locale !== "fr") {
    notFound();
  }

  return (
    <div>
      <div id="top" aria-hidden="true" />
      <Header locale={locale} />
      {children}
    </div>
  );
}


