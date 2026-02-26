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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  ...siteMetadata,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.png" }],
    shortcut: [{ url: "/icon.png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: "Association IES",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1587,
        height: 995,
        alt: "Association IES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/og-image.jpg"],
  },
};

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
