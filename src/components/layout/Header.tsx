"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import styles from "./Header.module.css";

type HeaderProps = {
  locale: "ru" | "fr";
  copy: {
    brandLabel: string;
    brandName: string;
    navAriaLabel: string;
    navLabels: { aide: string; actions: string; soutenir: string; contact: string };
    langSwitcherAriaLabel: string;
    burgerOpenLabel: string;
    burgerCloseLabel: string;
    langToggleAriaLabel: string;
    mobileNavAriaLabel: string;
    langMenuItems: { locale: "ru" | "fr"; code: string; name: string }[];
    [key: string]: unknown;
  };
};

export function Header({ locale, copy }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sp = searchParams.toString();

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const otherLocale: "ru" | "fr" = locale === "fr" ? "ru" : "fr";

  const navItems = [
    { href: `/${locale}/aide`, label: copy.navLabels.aide },
    { href: `/${locale}/activites`, label: copy.navLabels.actions },
    { href: `/${locale}/soutenir`, label: copy.navLabels.soutenir },
    { href: `/${locale}/contact`, label: copy.navLabels.contact },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  function localePath(target: "ru" | "fr") {
    const qs = sp ? `?${sp}` : "";
    const base = pathname
      ? pathname.replace(/^\/(ru|fr)(?=\/|$)/, `/${target}`)
      : `/${target}`;
    return `${base === pathname ? `/${target}` : base}${qs}`;
  }

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, []);

  // Close on route change
  useEffect(() => { closeAll(); }, [pathname, sp, closeAll]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 981px)");
    const handler = () => { if (mql.matches) closeAll(); };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [closeAll]);

  // Lock scroll
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Escape
  useEffect(() => {
    if (!menuOpen && !langOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen, langOpen, closeAll]);

  // Close desktop lang on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(`.${styles.dLang}`)) return;
      setLangOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [langOpen]);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.bar}>
          {/* Brand */}
          <Link className={styles.brand} href={`/${locale}`} aria-label={copy.brandLabel}>
            <span className={styles.brandMark}>IES</span>
            <span className={styles.brandSep} aria-hidden="true" />
            <span className={styles.brandName}>{copy.brandName}</span>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.dNav} aria-label={copy.navAriaLabel}>
            {navItems.map((it) => (
              <Link key={it.href} href={it.href} className={styles.dNavLink} aria-current={isActive(it.href) ? "page" : undefined}>
                {it.label}
              </Link>
            ))}
          </nav>

          {/* Desktop lang */}
          <div className={styles.dLang}>
            <button
              type="button"
              className={styles.langBtn}
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-label={copy.langSwitcherAriaLabel}
            >
              {locale.toUpperCase()}
            </button>
            {langOpen && (
              <div className={styles.langDrop}>
                {copy.langMenuItems.map((it) => (
                  <Link
                    key={it.locale}
                    href={localePath(it.locale)}
                    className={styles.langItem}
                    aria-current={locale === it.locale ? "page" : undefined}
                    scroll={false}
                  >
                    <span className={styles.langCode}>{it.code}</span>
                    <span className={styles.langName}>{it.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: lang + burger */}
          <div className={styles.mRight}>
            <Link
              href={localePath(otherLocale)}
              className={styles.mLangBtn}
              aria-label={copy.langToggleAriaLabel}
              scroll={false}
            >
              {otherLocale.toUpperCase()}
            </Link>
            <button
              type="button"
              className={`${styles.burger} ${menuOpen ? styles.burgerActive : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? copy.burgerCloseLabel : copy.burgerOpenLabel}
            >
              <span className={styles.burgerIcon} aria-hidden="true">
                <span /><span /><span />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile panel — rendered as direct child of <header>, NOT nested */}
      {menuOpen && (
        <div className={styles.mPanel}>
          <nav aria-label={copy.mobileNavAriaLabel}>
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={`${styles.mLink} ${isActive(it.href) ? styles.mLinkActive : ""}`}
                aria-current={isActive(it.href) ? "page" : undefined}
              >
                {it.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mPanelLang}>
            <Link
              href={localePath(otherLocale)}
              className={styles.mPanelLangLink}
              scroll={false}
            >
              <span className={styles.mPanelLangCode}>{otherLocale.toUpperCase()}</span>
              <span>{locale === "fr" ? "Русский" : "Français"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
