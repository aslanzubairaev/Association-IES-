/* 
 Этот файл задаёт общий каркас страниц для выбранного языка (/ru или /fr).
 Он показывает переключатель языка и оборачивает содержимое страницы в общий контейнер.
 Человек может переключать язык по двум ссылкам RU и FR.
*/

import Link from "next/link";
import { notFound } from "next/navigation";

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
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 9999,
          display: "flex",
          gap: 8,
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 999,
          padding: "8px 10px",
          fontSize: 12,
          lineHeight: 1,
        }}
        aria-label="Переключатель языка"
      >
        <Link href="/fr" aria-current={locale === "fr" ? "page" : undefined}>
          FR
        </Link>
        <span aria-hidden="true">|</span>
        <Link href="/ru" aria-current={locale === "ru" ? "page" : undefined}>
          RU
        </Link>
      </div>

      {children}
    </div>
  );
}


