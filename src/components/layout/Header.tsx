/*
 This file contains the site header.
 It displays the “Association IES” brand, the main navigation menu, and the FR | RU language switcher.
 Menu items and links can be updated here once the final page structure is finalized.
*/

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import styles from "./Header.module.css";

type HeaderCopy = {
  brandLabel: string;
  brandName: string;
  navAriaLabel: string;
  navLabels: {
    aide: string;
    actions: string;
    soutenir: string;
    contact: string;
  };
  langSwitcherAriaLabel: string;
  mobileControlsAriaLabel: string;
  burgerOpenLabel: string;
  burgerCloseLabel: string;
  langToggleAriaLabel: string;
  mobileMenuTitle: string;
  mobileMenuCloseLabel: string;
  mobileNavAriaLabel: string;
  langMenuItems: { locale: "ru" | "fr"; code: string; name: string }[];
};

type HeaderProps = {
  locale: "ru" | "fr";
  copy: HeaderCopy;
};

// Site header: shared across all pages for the selected locale.
export function Header({ locale, copy }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();

  // Unique IDs for menu accessibility.
  const mobileMenuId = useId();
  const langMenuDesktopId = useId();
  const langMenuMobileId = useId();

  // Local menu state.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const langDesktopRef = useRef<HTMLDivElement | null>(null);
  const langMobileRef = useRef<HTMLDivElement | null>(null);
  const burgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  const navItems = [
    { id: "aide", href: `/${locale}/aide`, label: copy.navLabels.aide },
    {
      id: "actions",
      href: `/${locale}/activites`,
      label: copy.navLabels.actions,
    },
    {
      id: "soutenir",
      href: `/${locale}/soutenir`,
      label: copy.navLabels.soutenir,
    },
    {
      id: "contact",
      href: `/${locale}/contact`,
      label: copy.navLabels.contact,
    },
  ] as const;

  // Check whether the link matches the current page or a nested route.
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Build the locale-switch path while preserving query params and hash.
  function resolveLocalePath(targetLocale: "ru" | "fr") {
    const querySuffix = searchParamsKey ? `?${searchParamsKey}` : "";
    const basePath = pathname
      ? pathname.replace(/^\/(ru|fr)(?=\/|$)/, `/${targetLocale}`)
      : `/${targetLocale}`;
    const normalizedPath =
      basePath === pathname ? `/${targetLocale}` : basePath;
    return `${normalizedPath}${querySuffix}`;
  }

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isMobileMenuOpen]);

  // Close any open menus on route change.
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangMenuOpen(false);
  }, [pathname, searchParamsKey]);

  // Close the language dropdown when clicking outside of it.
  useEffect(() => {
    if (!isLangMenuOpen) {
      return undefined;
    }

    function handlePointerDown(event: PointerEvent) {
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

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isLangMenuOpen]);

  // Pressing Escape should close any open menus.
  useEffect(() => {
    if (!isMobileMenuOpen && !isLangMenuOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }
      setIsMobileMenuOpen(false);
      setIsLangMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isLangMenuOpen]);

  // Move focus to the close button when the mobile menu opens.
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      mobileCloseButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isMobileMenuOpen]);

  // Burger button handler: toggle the mobile menu.
  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => {
      const next = !current;
      if (next) {
        setIsLangMenuOpen(false);
      }
      return next;
    });
  }

  // Overlay click handler: close the menu.
  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    burgerButtonRef.current?.focus();
  }

  // Language button handler: toggle the language dropdown.
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

          {/* Desktop navigation: hidden on mobile, replaced by the burger menu. */}
          <nav
            className={styles.headerNavDesktop}
            aria-label={copy.navAriaLabel}
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop language switcher: a single button with a dropdown menu. */}
          <div
            className={`${styles.headerLang} ${styles.desktopLang}`}
            aria-label={copy.langSwitcherAriaLabel}
            ref={langDesktopRef}
          >
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
              <div className={styles.langMenu} id={langMenuDesktopId}>
                {copy.langMenuItems.map((item) => (
                  <Link
                    key={item.locale}
                    onClick={() => setIsLangMenuOpen(false)}
                    className={styles.langMenuItem}
                    href={resolveLocalePath(item.locale)}
                    aria-current={locale === item.locale ? "page" : undefined}
                    scroll={false}
                  >
                    <span className={styles.langMenuCode}>{item.code}</span>
                    <span className={styles.langMenuName}>{item.name}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {/* Mobile controls: burger button and language switcher. */}
          <div
            className={styles.headerMobileControls}
            aria-label={copy.mobileControlsAriaLabel}
          >
            <button
              ref={burgerButtonRef}
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

            <div
              className={styles.headerLang}
              aria-label={copy.langSwitcherAriaLabel}
              ref={langMobileRef}
            >
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
                <div className={styles.langMenu} id={langMenuMobileId}>
                  {copy.langMenuItems.map((item) => (
                    <Link
                      key={item.locale}
                      onClick={() => setIsLangMenuOpen(false)}
                      className={styles.langMenuItem}
                      href={resolveLocalePath(item.locale)}
                      aria-current={locale === item.locale ? "page" : undefined}
                      scroll={false}
                    >
                      <span className={styles.langMenuCode}>{item.code}</span>
                      <span className={styles.langMenuName}>{item.name}</span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile menu: appears as an overlay when the user taps the burger button. */}
      {isMobileMenuOpen ? (
        <div
          onClick={(event) => {
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
              <button
                ref={mobileCloseButtonRef}
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
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  onClick={closeMobileMenu}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
