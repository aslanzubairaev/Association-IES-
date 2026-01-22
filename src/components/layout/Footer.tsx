/* 
 Этот файл содержит нижний блок сайта.
 Он показывает копирайт и простые ссылки, которые будут вести на юридические страницы и контакты.
 Здесь можно поменять тексты и список ссылок, когда появится финальная структура.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerCopy } from "@/content/actions";

type FooterProps = {
  locale: "ru" | "fr";
};

// Низ сайта: минимальная версия, без сложной логики.
export default function Footer({ locale }: FooterProps) {
  const copy = footerCopy[locale];
  const socialLinks = [
    {
      id: "instagram",
      className: "footer-social-link--instagram",
      href: "https://instagram.com/ies_info",
      label: copy.socialLabels.instagram,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.25 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
          />
        </svg>
      ),
    },
    {
      id: "facebook",
      className: "footer-social-link--facebook",
      href: "https://www.facebook.com/share/14NHGcdcL1G/?mibextid=wwXlfr",
      label: copy.socialLabels.facebook,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.953.925-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
      ),
    },
    {
      id: "linkedin",
      className: "footer-social-link--linkedin",
      href: "https://linkedin.com/company/association-ies",
      label: copy.socialLabels.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.413v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.266 2.368 4.266 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM6.815 20.452H3.858V9h2.957v11.452zM22.225 0H1.771C.792 0 0 .77 0 1.723v20.554C0 23.23.792 24 1.771 24h20.451C23.2 24 24 23.23 24 22.277V1.723C24 .77 23.2 0 22.222 0z"
          />
        </svg>
      ),
    },
    {
      id: "tiktok",
      className: "footer-social-link--tiktok",
      href: "https://www.tiktok.com/@ies_info?_r=1&_t=ZN-92s2jNqmGJS",
      label: copy.socialLabels.tiktok,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.448v13.672a2.93 2.93 0 1 1-2.921-2.934c.317 0 .629.05.928.145v-3.58a6.5 6.5 0 0 0-1-.083 6.5 6.5 0 1 0 6.5 6.5V9.401a8.168 8.168 0 0 0 4.711 1.486V7.408a4.88 4.88 0 0 1-1-.722z"
          />
        </svg>
      ),
    },
    {
      id: "whatsapp",
      className: "footer-social-link--whatsapp",
      href: "https://chat.whatsapp.com/DLacCPcrQJl7JaQknebB76",
      label: copy.socialLabels.whatsapp,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.56-5.945C.184 5.3 5.5 0 12.057 0c3.181 0 6.167 1.24 8.413 3.488a11.82 11.82 0 0 1 3.48 8.413c-.003 6.557-5.318 11.869-11.877 11.869a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885a9.825 9.825 0 0 0-2.91-6.95 9.84 9.84 0 0 0-6.969-2.91c-5.45 0-9.886 4.434-9.889 9.884a9.85 9.85 0 0 0 1.598 5.216l-.999 3.648 3.757-.999zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479c0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413z"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-inner">
          <div>{copy.copyright}</div>
          <div className="footer-socials">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                className={`footer-social-link ${link.className}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="footer-links">
            <Link href={`/${locale}/about`}>
              {copy.aboutLabel}
            </Link>
            <Link href={`/${locale}/contact`}>
              {copy.contactLabel}
            </Link>
            <Link href={`/${locale}/privacy`}>
              {copy.privacyLabel}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
