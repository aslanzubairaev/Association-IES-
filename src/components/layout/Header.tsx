/* 
 Этот файл содержит шапку сайта.
 Он показывает название “Association IES”, меню основных разделов и переключатель языка FR | RU.
 Здесь можно поменять пункты меню и ссылки, когда появится финальная структура страниц.
*/

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Container } from "@/components/ui/Container";

type HeaderProps = {
  locale: "ru" | "fr";
};

// Шапка сайта: общая для всех страниц выбранного языка.
export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();

  // Уникальный идентификатор для мобильного меню, чтобы кнопка могла быть связана с меню.
  const mobileMenuId = useId();

  // Флаг, который хранит: открыто ли мобильное меню прямо сейчас.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Флаг, который хранит: открыт ли переключатель языка на десктопе.
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuDesktopId = useId();
  const langMenuMobileId = useId();

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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    return undefined;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleScroll() {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      if (isLangMenuOpen) {
        setIsLangMenuOpen(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen, isLangMenuOpen]);

  // Действие по нажатию на “бургер”: открыть или закрыть мобильное меню.
  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  // Действие по нажатию на затемнение вокруг меню: закрыть меню.
  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function toggleLangMenu() {
    setIsLangMenuOpen((current) => !current);
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
            <Link
              href={`/${locale}/about`}
              aria-current={isActive(`/${locale}/about`) ? "page" : undefined}
            >
              {labels.about}
            </Link>
            <Link
              href={`/${locale}/aide`}
              aria-current={isActive(`/${locale}/aide`) ? "page" : undefined}
            >
              {labels.aide}
            </Link>
            <Link
              href={`/${locale}/actions`}
              aria-current={isActive(`/${locale}/actions`) ? "page" : undefined}
            >
              {labels.actions}
            </Link>
            <Link
              href={`/${locale}/soutenir`}
              aria-current={isActive(`/${locale}/soutenir`) ? "page" : undefined}
            >
              {labels.soutenir}
            </Link>
            <Link
              href={`/${locale}/contact`}
              aria-current={isActive(`/${locale}/contact`) ? "page" : undefined}
            >
              {labels.contact}
            </Link>
          </nav>

          {/* Переключатель языка для больших экранов: одна кнопка с выпадающим меню. */}
          <div className="header-cta header-cta-desktop header-lang" aria-label="Переключатель языка">
            <button
              type="button"
              className="btn btn--pill btn--outline-white lang-toggle"
              aria-expanded={isLangMenuOpen}
              aria-controls={langMenuDesktopId}
              onClick={toggleLangMenu}
            >
              {locale.toUpperCase()}
            </button>

            {isLangMenuOpen ? (
              <div className="lang-menu" id={langMenuDesktopId} role="menu">
                <Link
                  className="lang-menu-item"
                  href="/fr"
                  role="menuitem"
                  aria-current={locale === "fr" ? "page" : undefined}
                  onClick={() => setIsLangMenuOpen(false)}
                >
                  <span className="lang-menu-code">FR</span>
                  <span className="lang-menu-name">Français</span>
                </Link>
                <Link
                  className="lang-menu-item"
                  href="/ru"
                  role="menuitem"
                  aria-current={locale === "ru" ? "page" : undefined}
                  onClick={() => setIsLangMenuOpen(false)}
                >
                  <span className="lang-menu-code">RU</span>
                  <span className="lang-menu-name">Русский</span>
                </Link>
              </div>
            ) : null}
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
            <div className="header-lang" aria-label="Переключатель языка">
              <button
                type="button"
                className="lang-pill lang-pill--active lang-toggle"
                aria-expanded={isLangMenuOpen}
                aria-controls={langMenuMobileId}
                onClick={toggleLangMenu}
                aria-label={
                  locale === "fr" ? "Changer de langue" : "Переключить язык"
                }
              >
                {locale.toUpperCase()}
              </button>

              {isLangMenuOpen ? (
                <div className="lang-menu" id={langMenuMobileId} role="menu">
                  <Link
                    className="lang-menu-item"
                    href="/fr"
                    role="menuitem"
                    aria-current={locale === "fr" ? "page" : undefined}
                    onClick={() => setIsLangMenuOpen(false)}
                  >
                    <span className="lang-menu-code">FR</span>
                    <span className="lang-menu-name">Français</span>
                  </Link>
                  <Link
                    className="lang-menu-item"
                    href="/ru"
                    role="menuitem"
                    aria-current={locale === "ru" ? "page" : undefined}
                    onClick={() => setIsLangMenuOpen(false)}
                  >
                    <span className="lang-menu-code">RU</span>
                    <span className="lang-menu-name">Русский</span>
                  </Link>
                </div>
              ) : null}
            </div>
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
              <Link
                href={`/${locale}/about`}
                aria-current={isActive(`/${locale}/about`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {labels.about}
              </Link>
              <Link
                href={`/${locale}/aide`}
                aria-current={isActive(`/${locale}/aide`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {labels.aide}
              </Link>
              <Link
                href={`/${locale}/actions`}
                aria-current={isActive(`/${locale}/actions`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {labels.actions}
              </Link>
              <Link
                href={`/${locale}/soutenir`}
                aria-current={isActive(`/${locale}/soutenir`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {labels.soutenir}
              </Link>
              <Link
                href={`/${locale}/contact`}
                aria-current={isActive(`/${locale}/contact`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {labels.contact}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
