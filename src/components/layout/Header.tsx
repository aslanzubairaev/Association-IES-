/* 
 Этот файл содержит шапку сайта.
 Он показывает название “Association IES”, меню основных разделов и переключатель языка FR | RU.
 Здесь можно поменять пункты меню и ссылки, когда появится финальная структура страниц.
*/

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { headerCopy } from "@/content/actions";

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
  const [currentHash, setCurrentHash] = useState("");

  const copy = headerCopy[locale];

  const searchParams = useSearchParams();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  function resolveLocalePath(targetLocale: "ru" | "fr") {
    const queryString = searchParams.toString();
    const querySuffix = queryString ? `?${queryString}` : "";
    const basePath = pathname
      ? pathname.replace(/^\/(ru|fr)(?=\/|$)/, `/${targetLocale}`)
      : `/${targetLocale}`;
    const normalizedPath = basePath === pathname ? `/${targetLocale}` : basePath;
    return `${normalizedPath}${querySuffix}${currentHash}`;
  }

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

  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window.location.hash || "");
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
          <a className="brand" href={`/${locale}#top`} aria-label={copy.brandLabel}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">{copy.brandName}</span>
          </a>

          {/* Меню для больших экранов: на мобильных оно скрыто, вместо него показывается бургер. */}
          <nav className="nav header-nav-desktop" aria-label={copy.navAriaLabel}>
            <Link
              href={`/${locale}/about`}
              aria-current={isActive(`/${locale}/about`) ? "page" : undefined}
            >
              {copy.navLabels.about}
            </Link>
            <Link
              href={`/${locale}/aide`}
              aria-current={isActive(`/${locale}/aide`) ? "page" : undefined}
            >
              {copy.navLabels.aide}
            </Link>
            <Link
              href={`/${locale}/actions`}
              aria-current={isActive(`/${locale}/actions`) ? "page" : undefined}
            >
              {copy.navLabels.actions}
            </Link>
            <Link
              href={`/${locale}/soutenir`}
              aria-current={isActive(`/${locale}/soutenir`) ? "page" : undefined}
            >
              {copy.navLabels.soutenir}
            </Link>
            <Link
              href={`/${locale}/contact`}
              aria-current={isActive(`/${locale}/contact`) ? "page" : undefined}
            >
              {copy.navLabels.contact}
            </Link>
          </nav>

          {/* Переключатель языка для больших экранов: одна кнопка с выпадающим меню. */}
          <div className="header-cta header-cta-desktop header-lang" aria-label={copy.langSwitcherAriaLabel}>
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
                {copy.langMenuItems.map((item) => (
                  <Link
                    key={item.locale}
                    className="lang-menu-item"
                    href={resolveLocalePath(item.locale)}
                    role="menuitem"
                    aria-current={locale === item.locale ? "page" : undefined}
                    scroll={false}
                    onClick={() => setIsLangMenuOpen(false)}
                  >
                    <span className="lang-menu-code">{item.code}</span>
                    <span className="lang-menu-name">{item.name}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {/* Блок управления для мобильных: бургер и переключатель языка. */}
          <div className="header-mobile-controls" aria-label={copy.mobileControlsAriaLabel}>
            {/* Кнопка “бургер”: открывает и закрывает список страниц. */}
            <button
              type="button"
              className="burger-button"
              aria-label={isMobileMenuOpen ? copy.burgerCloseLabel : copy.burgerOpenLabel}
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
            <div className="header-lang" aria-label={copy.langSwitcherAriaLabel}>
              <button
                type="button"
                className="lang-pill lang-pill--active lang-toggle"
                aria-expanded={isLangMenuOpen}
                aria-controls={langMenuMobileId}
                onClick={toggleLangMenu}
                aria-label={copy.langToggleAriaLabel}
              >
                {locale.toUpperCase()}
              </button>

              {isLangMenuOpen ? (
                <div className="lang-menu" id={langMenuMobileId} role="menu">
                  {copy.langMenuItems.map((item) => (
                    <Link
                      key={item.locale}
                      className="lang-menu-item"
                      href={resolveLocalePath(item.locale)}
                      role="menuitem"
                      aria-current={locale === item.locale ? "page" : undefined}
                      scroll={false}
                      onClick={() => setIsLangMenuOpen(false)}
                    >
                      <span className="lang-menu-code">{item.code}</span>
                      <span className="lang-menu-name">{item.name}</span>
                    </Link>
                  ))}
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
              <div className="mobile-menu-title">{copy.mobileMenuTitle}</div>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label={copy.mobileMenuCloseLabel}
                onClick={closeMobileMenu}
              >
                ×
              </button>
            </div>

            <nav className="mobile-menu-links" aria-label={copy.mobileNavAriaLabel}>
              <Link
                href={`/${locale}/about`}
                aria-current={isActive(`/${locale}/about`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {copy.navLabels.about}
              </Link>
              <Link
                href={`/${locale}/aide`}
                aria-current={isActive(`/${locale}/aide`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {copy.navLabels.aide}
              </Link>
              <Link
                href={`/${locale}/actions`}
                aria-current={isActive(`/${locale}/actions`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {copy.navLabels.actions}
              </Link>
              <Link
                href={`/${locale}/soutenir`}
                aria-current={isActive(`/${locale}/soutenir`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {copy.navLabels.soutenir}
              </Link>
              <Link
                href={`/${locale}/contact`}
                aria-current={isActive(`/${locale}/contact`) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {copy.navLabels.contact}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
