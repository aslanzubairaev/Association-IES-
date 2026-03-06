/*
 This file contains the site header.
 It displays the "Association IES" brand, the main navigation menu, and the FR | RU language switcher.
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

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header({ locale, copy }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();

  const mobileMenuId = useId();
  const langMenuDesktopId = useId();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const langDesktopRef = useRef<HTMLDivElement | null>(null);
  const burgerButtonRef = useRef<HTMLButtonElement | null>(null);

  const navItems = [
    { id: "aide", href: `/${locale}/aide`, label: copy.navLabels.aide },
    { id: "actions", href: `/${locale}/activites`, label: copy.navLabels.actions },
    { id: "soutenir", href: `/${locale}/soutenir`, label: copy.navLabels.soutenir },
    { id: "contact", href: `/${locale}/contact`, label: copy.navLabels.contact },
  ] as const;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  function resolveLocalePath(targetLocale: "ru" | "fr") {
    const querySuffix = searchParamsKey ? `?${searchParamsKey}` : "";
    const basePath = pathname
      ? pathname.replace(/^\/(ru|fr)(?=\/|$)/, `/${targetLocale}`)
      : `/${targetLocale}`;
    const normalizedPath = basePath === pathname ? `/${targetLocale}` : basePath;
    return `${normalizedPath}${querySuffix}`;
  }

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isMobileMenuOpen]);

  // Close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangMenuOpen(false);
  }, [pathname, searchParamsKey]);

  // Close mobile menu when resizing past the breakpoint
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const mql = window.matchMedia("(min-width: 981px)");
    function handleChange(e: MediaQueryListEvent) {
      if (e.matches) setIsMobileMenuOpen(false);
    }
    mql.addEventListener("change", handleChange);
    if (mql.matches) setIsMobileMenuOpen(false);
    return () => mql.removeEventListener("change", handleChange);
  }, [isMobileMenuOpen]);

  // Close lang menu on outside click
  useEffect(() => {
    if (!isLangMenuOpen) return undefined;
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (langDesktopRef.current?.contains(target)) return;
      setIsLangMenuOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isLangMenuOpen]);

  // Escape closes menus
  useEffect(() => {
    if (!isMobileMenuOpen && !isLangMenuOpen) return undefined;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      setIsLangMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isLangMenuOpen]);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((c) => {
      if (!c) setIsLangMenuOpen(false);
      return !c;
    });
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    burgerButtonRef.current?.focus();
  }

  const otherLocale = locale === "fr" ? "ru" : "fr";
  const otherLocaleLabel = locale === "fr" ? "Русский" : "Français";

  return (
    <header className={styles.siteHeader}>
      <Container>
        <div className={styles.headerInner}>
          {/* Brand */}
          <Link className={styles.brand} href={`/${locale}`} aria-label={copy.brandLabel}>
            <span className={styles.brandWordmark}>IES</span>
            <span className={styles.brandDivider} aria-hidden="true" />
            <span className={styles.brandName}>{copy.brandName}</span>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.headerNavDesktop} aria-label={copy.navAriaLabel}>
            {navItems.map((item) => (
              <Link key={item.id} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop language switcher */}
          <div className={`${styles.headerLang} ${styles.desktopLang}`} ref={langDesktopRef}>
            <button
              onClick={() => setIsLangMenuOpen((c) => !c)}
              type="button"
              className={styles.langToggle}
              aria-expanded={isLangMenuOpen}
              aria-controls={langMenuDesktopId}
              aria-label={copy.langSwitcherAriaLabel}
            >
              {locale.toUpperCase()}
            </button>
            {isLangMenuOpen && (
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
            )}
          </div>

          {/* Mobile controls */}
          <div className={styles.headerMobileControls}>
            <button
              ref={burgerButtonRef}
              onClick={toggleMobileMenu}
              type="button"
              className={`${styles.burgerButton} ${isMobileMenuOpen ? styles.burgerOpen : ""}`}
              aria-label={isMobileMenuOpen ? copy.burgerCloseLabel : copy.burgerOpenLabel}
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
            >
              <span className={styles.burgerLines} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu overlay */}
      <div
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayVisible : ""}`}
        onClick={(event) => { if (event.target === event.currentTarget) closeMobileMenu(); }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`${styles.mobileSheet} ${isMobileMenuOpen ? styles.mobileSheetVisible : ""}`}
          id={mobileMenuId}
          role="dialog"
          aria-modal="true"
        >
          {/* Nav links */}
          <nav className={styles.mobileNav} aria-label={copy.mobileNavAriaLabel}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                onClick={closeMobileMenu}
                href={item.href}
                className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.mobileNavLinkActive : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <span className={styles.mobileNavLabel}>{item.label}</span>
                <ChevronRight className={styles.mobileNavChevron} />
              </Link>
            ))}
          </nav>

          {/* Language switch */}
          <div className={styles.mobileLangRow}>
            <Link
              href={resolveLocalePath(otherLocale)}
              onClick={closeMobileMenu}
              className={styles.mobileLangLink}
              scroll={false}
            >
              <span className={styles.mobileLangCode}>{otherLocale.toUpperCase()}</span>
              <span className={styles.mobileLangName}>{otherLocaleLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
