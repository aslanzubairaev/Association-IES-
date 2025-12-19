/* 
 Этот файл задаёт общий каркас сайта.
 Он показывает базовую разметку страницы (HTML/Body) и подключает общие стили.
 Человек может переходить по страницам, а этот файл обеспечивает единый внешний вид.
*/

import type { Metadata } from "next";
import "./globals.css";

// Информация, которую браузер и поисковики видят как название и описание сайта.
export const metadata: Metadata = {
  title: "Association IES",
  description: "Association IES",
};

// Общая оболочка для всех страниц: сюда подставляется содержимое текущей страницы.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
