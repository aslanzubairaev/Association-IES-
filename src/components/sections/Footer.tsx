/* 
 Этот файл содержит нижний блок сайта.
 Он показывает копирайт и простые ссылки, которые будут вести на юридические страницы и контакты.
 Здесь можно поменять тексты и список ссылок, когда появится финальная структура.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";

type FooterProps = {
  locale: "ru" | "fr";
};

// Низ сайта: минимальная версия, без сложной логики.
export function Footer({ locale }: FooterProps) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-inner">
          <div>© 2025 Association IES</div>
          <div className="footer-links">
            <Link href={`/${locale}/about`}>
              {locale === "fr" ? "À propos" : "о нас"}
            </Link>
            <Link href={`/${locale}/contact`}>
              {locale === "fr" ? "Contact" : "контакты"}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}


