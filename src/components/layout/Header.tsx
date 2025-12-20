/* 
 Этот файл содержит шапку сайта.
 Он показывает название “Association IES”, меню основных разделов и переключатель языка FR | RU.
 Здесь можно поменять пункты меню и ссылки, когда появится финальная структура страниц.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";

type HeaderProps = {
  locale: "ru" | "fr";
};

// Шапка сайта: общая для всех страниц выбранного языка.
export function Header({ locale }: HeaderProps) {
  const labels =
    locale === "fr"
      ? {
          about: "À propos",
          aide: "Aide",
          actions: "Actions",
          soutenir: "Soutenir",
          contact: "Contact",
        }
      : {
          about: "О нас",
          aide: "Чем помогаем",
          actions: "Действия",
          soutenir: "Поддержать",
          contact: "Контакты",
        };

  return (
    <header className="site-header siteHeader">
      <Container>
        <div className="header-inner">
          <a className="brand" href={`/${locale}#top`} aria-label="Association IES">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Association IES</span>
          </a>

          <nav className="nav" aria-label="Меню сайта">
            <Link href={`/${locale}/about`}>{labels.about}</Link>
            <Link href={`/${locale}/aide`}>{labels.aide}</Link>
            <Link href={`/${locale}/actions`}>{labels.actions}</Link>
            <Link href={`/${locale}/soutenir`}>{labels.soutenir}</Link>
            <Link href={`/${locale}/contact`}>{labels.contact}</Link>
          </nav>

          <div className="header-cta" aria-label="Переключатель языка">
            <Link
              className="btn btn--pill btn--outline-white"
              href="/fr"
              aria-current={locale === "fr" ? "page" : undefined}
            >
              FR
            </Link>
            <Link
              className="btn btn--pill btn--outline-white"
              href="/ru"
              aria-current={locale === "ru" ? "page" : undefined}
            >
              RU
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}


