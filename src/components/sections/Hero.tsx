/* Этот файл показывает верхний блок главной страницы: заголовок, описание, кнопки и компактную форму связи. */

import Link from "next/link";
import type { CSSProperties } from "react";
import { QuickContactForm } from "@/components/contacts/QuickContactForm";
import { Container } from "@/components/ui/Container";

type HeroProps = {
  locale: "ru" | "fr";
};

const slantPurpleStyle = { "--next": "var(--purple)" } as CSSProperties;

// Верхний блок: тексты и кнопки зависят от выбранного языка.
export function Hero({ locale }: HeroProps) {
  const title =
    locale === "fr"
      ? "Notre objectif — aider chacun\nà s’adapter en France"
      : "Наша цель — помочь людям\nадаптироваться во Франции";

  const lead =
    locale === "fr"
      ? "Démarches, emploi, apprentissage et soutien à Strasbourg — on vous indique la prochaine étape, simplement."
      : "Документы, работа, обучение и поддержка в Страсбурге — подскажем понятный следующий шаг без лишней бюрократии.";

  const ctaPrimary = locale === "fr" ? "Demander de l’aide" : "Получить помощь";
  const ctaSecondary = locale === "fr" ? "Nos actions" : "Наши действия";
  const ctaTertiary = locale === "fr" ? "Contact" : "Контакты";

  return (
    <section className="section section--purple slant" style={slantPurpleStyle}>
      <Container>
        <div className="hero-grid">
          <div className="card card--glass hero-left">
            <div className="chips">
              <span className="chip">Strasbourg • France</span>
              <span className="chip">{locale === "fr" ? "Local" : "Локально"}</span>
              <span className="chip">
                {locale === "fr" ? "Expérience & expertise" : "Опыт и экспертиза"}
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
                {locale === "fr" ? "Intégration" : "Интеграция"}
              </span>
              <span className="pill">
                {locale === "fr" ? "Éducation" : "Образование"}
              </span>
              <span className="pill">
                {locale === "fr" ? "Synergie" : "Синергия"}
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


