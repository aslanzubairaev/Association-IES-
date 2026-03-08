/*
 This file defines the root layout of the site.
 It renders the base HTML/Body markup and imports global styles.
 It ensures a consistent look as the user navigates between pages.
*/

import type { Metadata, Viewport } from "next";
import "../legacy/styles.css";
import "./globals.css";
import { siteMetadata } from "@/content/actions";

// Site title and description visible to browsers and search engines.
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Shared shell for all pages: the current page content is rendered inside.
export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  // Page language for the browser: taken from the URL (/ru or /fr), defaults to French.
  const lang =
    params?.locale === "ru" || params?.locale === "fr" ? params.locale : "fr";

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
