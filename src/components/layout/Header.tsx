/* 
 Этот файл содержит шапку сайта.
 Он показывает название “Association IES”, меню основных разделов и переключатель языка FR | RU.
 Здесь можно поменять пункты меню и ссылки, когда появится финальная структура страниц.
*/

"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";

type HeaderProps = {
  locale: "ru" | "fr";
};

// Шапка сайта: общая для всех страниц выбранного языка.
export function Header({ locale }: HeaderProps) {
  // Уникальный идентификатор для мобильного меню, чтобы кнопка могла быть связана с меню.
  const mobileMenuId = useId();

  // Флаг, который хранит: открыто ли мобильное меню прямо сейчас.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Язык, на который можно быстро переключиться одной кнопкой.
  const otherLocale = locale === "ru" ? "fr" : "ru";

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

  // Действие по нажатию на “бургер”: открыть или закрыть мобильное меню.
  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  // Действие по нажатию на затемнение вокруг меню: закрыть меню.
  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="site-header siteHeader">
      <Container>
        <div className="header-inner">
          <a className="brand" href={`/${locale}#top`} aria-label="Association IES">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Association IES</span>
          </a>

          {/* Меню для больших экранов: на мобильных оно скрыто, вместо него показывается бургер. */}
          <nav className="nav header-nav-desktop" aria-label="Меню сайта">
            <Link href={`/${locale}/about`}>{labels.about}</Link>
            <Link href={`/${locale}/aide`}>{labels.aide}</Link>
            <Link href={`/${locale}/actions`}>{labels.actions}</Link>
            <Link href={`/${locale}/soutenir`}>{labels.soutenir}</Link>
            <Link href={`/${locale}/contact`}>{labels.contact}</Link>
          </nav>

          {/* Переключатель языка для больших экранов. */}
          <div className="header-cta header-cta-desktop" aria-label="Переключатель языка">
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

          {/* Блок управления для мобильных: бургер и переключатель языка. */}
          <div className="header-mobile-controls" aria-label="Меню и язык для мобильной версии">
            {/* Кнопка “бургер”: открывает и закрывает список страниц. */}
            <button
              type="button"
              className="burger-button"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
              onClick={toggleMobileMenu}
            >
              <span className="burger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>

            {/* Быстрая кнопка смены языка рядом с бургером. */}
            <Link
              className="lang-pill lang-pill--active"
              href={`/${otherLocale}`}
              aria-label={
                locale === "fr" ? "Passer en russe" : "Переключиться на французский"
              }
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>
        </div>
      </Container>

      {/* Мобильное меню: появляется поверх страницы, когда человек нажимает бургер. */}
      {isMobileMenuOpen ? (
        <div
          className="mobile-menu-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeMobileMenu();
            }
          }}
        >
          <div className="mobile-menu-panel" id={mobileMenuId} role="dialog" aria-modal="true">
            <div className="mobile-menu-head">
              <div className="mobile-menu-title">{locale === "fr" ? "Menu" : "Меню"}</div>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label={locale === "fr" ? "Fermer" : "Закрыть"}
                onClick={closeMobileMenu}
              >
                ×
              </button>
            </div>

            <nav className="mobile-menu-links" aria-label={locale === "fr" ? "Navigation" : "Навигация"}>
              <Link href={`/${locale}/about`} onClick={closeMobileMenu}>
                {labels.about}
              </Link>
              <Link href={`/${locale}/aide`} onClick={closeMobileMenu}>
                {labels.aide}
              </Link>
              <Link href={`/${locale}/actions`} onClick={closeMobileMenu}>
                {labels.actions}
              </Link>
              <Link href={`/${locale}/soutenir`} onClick={closeMobileMenu}>
                {labels.soutenir}
              </Link>
              <Link href={`/${locale}/contact`} onClick={closeMobileMenu}>
                {labels.contact}
              </Link>
            </nav>

            <div className="mobile-menu-footer">
              <div className="mobile-menu-footer-label">
                {locale === "fr" ? "Langue" : "Язык"}
              </div>
              <div className="mobile-menu-lang">
                <Link href="/fr" onClick={closeMobileMenu} aria-current={locale === "fr" ? "page" : undefined}>
                  FR
                </Link>
                <Link href="/ru" onClick={closeMobileMenu} aria-current={locale === "ru" ? "page" : undefined}>
                  RU
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}


