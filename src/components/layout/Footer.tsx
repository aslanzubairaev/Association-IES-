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

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-inner">
          <div>{copy.copyright}</div>
          <div className="footer-links">
            <Link href={`/${locale}/about`}>
              {copy.aboutLabel}
            </Link>
            <Link href={`/${locale}/contact`}>
              {copy.contactLabel}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
