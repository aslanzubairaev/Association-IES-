/* 
 Этот файл содержит шапку сайта.
 Он показывает название “Association IES”, меню основных разделов и переключатель языка FR | RU.
 Здесь можно поменять пункты меню и ссылки, когда появится финальная структура страниц.
*/

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { headerCopy } from "@/content/actions";
import styles from "./Header.module.css";

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
  const langDesktopRef = useRef<HTMLDivElement | null>(null);
  const langMobileRef = useRef<HTMLDivElement | null>(null);
  const [currentHash, setCurrentHash] = useState("");

  const copy = headerCopy[locale];

  const searchParams = useSearchParams();

  // Проверяем, относится ли ссылка к текущей странице или вложенному разделу.
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Собираем путь для переключения языка так, чтобы сохранить параметры и якорь.
  function resolveLocalePath(targetLocale: "ru" | "fr") {
    const queryString = searchParams.toString();
    const querySuffix = queryString ? `?${queryString}` : "";
    const basePath = pathname
      ? pathname.replace(/^\/(ru|fr)(?=\/|$)/, `/${targetLocale}`)
      : `/${targetLocale}`;
    const normalizedPath =
      basePath === pathname ? `/${targetLocale}` : basePath;
    return `${normalizedPath}${querySuffix}${currentHash}`;
  }

  // Когда открыто мобильное меню, блокируем прокрутку фона, чтобы меню оставалось на месте.
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

  // При прокрутке страницы закрываем открытые меню, чтобы они не перекрывали контент.
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

  // Следим за якорем в адресе, чтобы не потерять его при смене языка.
  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window.location.hash || "");
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Когда открыт список языков, закрываем его при клике или тапе мимо.
  useEffect(() => {
    if (!isLangMenuOpen) {
      return undefined;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      if (
        langDesktopRef.current?.contains(target) ||
        langMobileRef.current?.contains(target)
      ) {
        return;
      }

      setIsLangMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isLangMenuOpen]);

  // Действие по нажатию на “бургер”: открыть или закрыть мобильное меню.
  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => {
      const next = !current;
      if (next) {
        setIsLangMenuOpen(false);
      }
      return next;
    });
  }

  // Действие по нажатию на затемнение вокруг меню: закрыть меню.
  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  // Действие по нажатию на кнопку языка: раскрыть или скрыть список вариантов.
  function toggleLangMenu() {
    setIsLangMenuOpen((current) => {
      const next = !current;
      if (next) {
        setIsMobileMenuOpen(false);
      }
      return next;
    });
  }

  return (
    <header
      className={styles.siteHeader}
      data-mobile-menu-open={isMobileMenuOpen ? "true" : "false"}
      data-lang-menu-open={isLangMenuOpen ? "true" : "false"}
    >
      <Container>
        <div className={styles.headerInner}>
          <Link
            className={styles.brand}
            href={`/${locale}`}
            aria-label={copy.brandLabel}
          >
            <span className={styles.brandWordmark}>IES</span>
            <span className={styles.brandDivider} aria-hidden="true" />
            <span className={styles.brandName}>{copy.brandName}</span>
          </Link>

          {/* Меню для больших экранов: на мобильных оно скрыто, вместо него показывается бургер. */}
          <nav
            className={styles.headerNavDesktop}
            aria-label={copy.navAriaLabel}
          >
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
              aria-current={
                isActive(`/${locale}/soutenir`) ? "page" : undefined
              }
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
          <div
            className={`${styles.headerLang} ${styles.desktopLang}`}
            aria-label={copy.langSwitcherAriaLabel}
            ref={langDesktopRef}
          >
            {/* Кнопка открывает и закрывает меню языков на десктопе. */}
            <button
              onClick={toggleLangMenu}
              type="button"
              className={`btn btn--pill btn--outline-white ${styles.langToggle}`}
              aria-expanded={isLangMenuOpen}
              aria-controls={langMenuDesktopId}
            >
              {locale.toUpperCase()}
            </button>

            {isLangMenuOpen ? (
              <div
                className={styles.langMenu}
                id={langMenuDesktopId}
                role="menu"
              >
                {copy.langMenuItems.map((item) => (
                  <Fragment key={item.locale}>
                    {/* Выбор языка закрывает список на десктопе. */}
                    <Link
                      onClick={() => setIsLangMenuOpen(false)}
                      className={styles.langMenuItem}
                      href={resolveLocalePath(item.locale)}
                      role="menuitem"
                      aria-current={locale === item.locale ? "page" : undefined}
                      scroll={false}
                    >
                      <span className={styles.langMenuCode}>{item.code}</span>
                      <span className={styles.langMenuName}>{item.name}</span>
                    </Link>
                  </Fragment>
                ))}
              </div>
            ) : null}
          </div>

          {/* Блок управления для мобильных: бургер и переключатель языка. */}
          <div
            className={styles.headerMobileControls}
            aria-label={copy.mobileControlsAriaLabel}
          >
            {/* Кнопка “бургер”: открывает и закрывает список страниц. */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className={styles.burgerButton}
              aria-label={
                isMobileMenuOpen ? copy.burgerCloseLabel : copy.burgerOpenLabel
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
            >
              <span className={styles.burgerLines} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>

            {/* Быстрая кнопка смены языка рядом с бургером. */}
            <div
              className={styles.headerLang}
              aria-label={copy.langSwitcherAriaLabel}
              ref={langMobileRef}
            >
              {/* Кнопка открывает и закрывает список языков рядом с бургером. */}
              <button
                onClick={toggleLangMenu}
                type="button"
                className={`${styles.langPill} ${styles.langPillActive} ${styles.langToggle}`}
                aria-expanded={isLangMenuOpen}
                aria-controls={langMenuMobileId}
                aria-label={copy.langToggleAriaLabel}
              >
                {locale.toUpperCase()}
              </button>

              {isLangMenuOpen ? (
                <div
                  className={styles.langMenu}
                  id={langMenuMobileId}
                  role="menu"
                >
                  {copy.langMenuItems.map((item) => (
                    <Fragment key={item.locale}>
                      {/* Выбор языка закрывает список в мобильном меню. */}
                      <Link
                        onClick={() => setIsLangMenuOpen(false)}
                        className={styles.langMenuItem}
                        href={resolveLocalePath(item.locale)}
                        role="menuitem"
                        aria-current={locale === item.locale ? "page" : undefined}
                        scroll={false}
                      >
                        <span className={styles.langMenuCode}>{item.code}</span>
                        <span className={styles.langMenuName}>{item.name}</span>
                      </Link>
                    </Fragment>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>

      {/* Мобильное меню: появляется поверх страницы, когда человек нажимает бургер. */}
      {isMobileMenuOpen ? (
        <div onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeMobileMenu();
          }
        }}
          className={styles.mobileMenuOverlay}
        >
          <div
            className={styles.mobileMenuPanel}
            id={mobileMenuId}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.mobileMenuHead}>
              <div className={styles.mobileMenuTitle}>
                {copy.mobileMenuTitle}
              </div>
              {/* Кнопка закрывает мобильное меню без перехода по ссылкам. */}
              <button
                onClick={closeMobileMenu}
                type="button"
                className={styles.mobileMenuClose}
                aria-label={copy.mobileMenuCloseLabel}
              >
                ×
              </button>
            </div>

            <nav
              className={styles.mobileMenuLinks}
              aria-label={copy.mobileNavAriaLabel}
            >
              {/* Ссылка закрывает меню и ведёт в раздел aide. */}
              <Link
                onClick={closeMobileMenu}
                href={`/${locale}/aide`}
                aria-current={isActive(`/${locale}/aide`) ? "page" : undefined}
              >
                {copy.navLabels.aide}
              </Link>
              {/* Ссылка закрывает меню и ведёт в раздел actions. */}
              <Link
                onClick={closeMobileMenu}
                href={`/${locale}/actions`}
                aria-current={
                  isActive(`/${locale}/actions`) ? "page" : undefined
                }
              >
                {copy.navLabels.actions}
              </Link>
              {/* Ссылка закрывает меню и ведёт в раздел soutenir. */}
              <Link
                onClick={closeMobileMenu}
                href={`/${locale}/soutenir`}
                aria-current={
                  isActive(`/${locale}/soutenir`) ? "page" : undefined
                }
              >
                {copy.navLabels.soutenir}
              </Link>
              {/* Ссылка закрывает меню и ведёт в раздел contact. */}
              <Link
                onClick={closeMobileMenu}
                href={`/${locale}/contact`}
                aria-current={
                  isActive(`/${locale}/contact`) ? "page" : undefined
                }
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
