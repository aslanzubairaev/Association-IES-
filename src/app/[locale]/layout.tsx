/*
 This file defines the shared layout for the selected locale (/ru or /fr).
 It renders the site header and wraps page content in a common shell.
 Users can use the navigation menu and switch languages via the header.
*/

import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { headerCopy } from "@/content/actions";
import styles from "./layout.module.css";

// Shared shell for /ru and /fr pages: validates the locale and renders the language switcher.
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Locale extracted from the page URL.
  const locale = params.locale;

  // If the locale is unknown, show a 404 page.
  if (locale !== "ru" && locale !== "fr") {
    notFound();
  }

  return (
    <div className={`${styles.localeScope} locale-shell`}>
      <div id="top" aria-hidden="true" />
      {/* Sticky header that stays visible on scroll. */}
      <Header locale={locale} copy={headerCopy[locale]} />
      {/* Content wrapper with offset so page content doesn't slide under the header. */}
      <div className="locale-content">{children}</div>
      <Footer locale={locale} />
    </div>
  );
}

