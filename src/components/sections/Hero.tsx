/* 
 Этот файл содержит верхний блок главной страницы.
 Он показывает крупный заголовок, короткое описание и основные кнопки для перехода.
 Здесь можно поменять тексты и ссылки, не трогая общий стиль страницы.
*/

import Link from "next/link";
import type { CSSProperties } from "react";
import { QuickContactForm } from "@/components/contact/QuickContactForm";
import { Container } from "@/components/ui/Container";

type HeroProps = {
  locale: "ru" | "fr";
};

const slantPurpleStyle = { "--next": "var(--purple)" } as CSSProperties;

// Верхний блок: тексты и кнопки зависят от выбранного языка.
export function Hero({ locale }: HeroProps) {
  const title =
    locale === "fr"
      ? "Notre objectif — aider les personnes\nà s’intégrer en France"
      : "Наша цель — помочь людям\nадаптироваться во Франции";

  const lead =
    locale === "fr"
      ? "Documents, emploi, études et soutien à Strasbourg — un prochain pas clair, sans bureaucratie inutile."
      : "Документы, работа, обучение и поддержка в Страсбурге — подскажем понятный следующий шаг без лишней бюрократии.";

  const ctaPrimary = locale === "fr" ? "Demander de l’aide" : "Получить помощь";
  const ctaSecondary = locale === "fr" ? "Nos actions" : "Наши действия";
  const ctaTertiary = locale === "fr" ? "Contacts" : "Контакты";

  return (
    <section className="section section--purple slant" style={slantPurpleStyle}>
      <Container>
        <div className="hero-grid">
          <div className="card card--glass hero-left">
            <div className="chips">
              <span className="chip">Strasbourg • France</span>
              <span className="chip">{locale === "fr" ? "Local" : "Локально"}</span>
              <span className="chip">
                {locale === "fr" ? "Expérience" : "Опыт и экспертиза"}
              </span>
            </div>

            <h1 className="h1">
              {title.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx === 0 ? <br /> : null}
                </span>
              ))}
            </h1>

            <p className="lead">{lead}</p>

            <div className="actions">
              <Link className="btn btn--pill btn--yellow" href={`/${locale}/aide`}>
                {ctaPrimary}
              </Link>
              <Link className="btn btn--pill btn--mint" href={`/${locale}/actions`}>
                {ctaSecondary}
              </Link>
              <Link className="btn btn--pill btn--outline" href={`/${locale}/contact`}>
                {ctaTertiary}
              </Link>
            </div>

            <div className="pill-row" aria-label="ключевые слова">
              <span className="pill">
                {locale === "fr" ? "Intégration" : "интеграция"}
              </span>
              <span className="pill">
                {locale === "fr" ? "Éducation" : "образование"}
              </span>
              <span className="pill">
                {locale === "fr" ? "Synergie" : "синергия"}
              </span>
            </div>
          </div>

          <aside className="card card--yellow hero-right">
            <div className="tag-row">
              <span className="tag tag--blue">+200</span>
              <span className="tag tag--blue">2019</span>
            </div>

            {/* Эта форма позволяет быстро открыть письмо в почте без телефона и личных имён. */}
            <QuickContactForm locale={locale} />

            <div className="info-stack" style={{ marginTop: 12 }}>
              <div className="info">
                <div className="info-k">Instagram</div>
                <div className="info-v">
                  <a href="https://instagram.com/ies_info" target="_blank" rel="noreferrer">
                    @ies_info
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}


