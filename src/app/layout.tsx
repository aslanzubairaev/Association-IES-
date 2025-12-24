/* 
 Этот файл задаёт общий каркас сайта.
 Он показывает базовую разметку страницы (HTML/Body) и подключает общие стили.
 Человек может переходить по страницам, а этот файл обеспечивает единый внешний вид.
*/

import type { Metadata } from "next";
import "../legacy/styles.css";
import "./globals.css";
import { siteMetadata } from "@/content/actions";

// Информация, которую браузер и поисковики видят как название и описание сайта.
export const metadata: Metadata = siteMetadata;

// Общая оболочка для всех страниц: сюда подставляется содержимое текущей страницы.
export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  // Язык страницы для браузера: берём его из адреса (/ru или /fr), а если его нет — ставим французский.
  const lang =
    params?.locale === "ru" || params?.locale === "fr" ? params.locale : "fr";

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
