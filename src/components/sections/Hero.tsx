/* Этот файл показывает верхний блок главной страницы: заголовок, описание, кнопки и компактную форму связи. */

import Link from "next/link";
import type { CSSProperties } from "react";
import { QuickContactForm } from "@/components/contacts/QuickContactForm";
import { InstagramBadge } from "@/components/social/InstagramBadge";
import { Container } from "@/components/ui/Container";

type HeroProps = {
  locale: "ru" | "fr";
};

const slantPurpleStyle = { "--next": "var(--purple)" } as CSSProperties;

// Верхний блок: тексты и кнопки зависят от выбранного языка.
export function Hero({ locale }: HeroProps) {
  const title =
    locale === "fr"
      ? "Nous aidons les personnes\nà s’intégrer à Strasbourg"
      : "Помогаем людям\nадаптироваться в Страсбурге";

  const lead =
    locale === "fr"
      ? "Démarches, emploi, apprentissage et soutien à Strasbourg — on vous indique la prochaine étape, simplement."
      : "Документы, работа, обучение и поддержка в Страсбурге — подскажем понятный следующий шаг без лишней бюрократии.";

  const ctaPrimary = locale === "fr" ? "Demander de l’aide" : "Получить помощь";
  const ctaSecondary = locale === "fr" ? "Nos actions" : "Наши действия";

  return (
    <section className="section section--purple slant" style={slantPurpleStyle}>
      <Container>
        <div className="hero-grid">
          <div className="card card--glass hero-left hero-left--mobile-plain">
            {/* Крупный заголовок: кратко объясняет, что ассоциация помогает адаптироваться именно в Страсбурге. */}
            <h1 className="h1">
              {title.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx === 0 ? <br /> : null}
                </span>
              ))}
            </h1>

            {/* Описание: уточняет, какие темы мы закрываем и что человек получит дальше. */}
            <p className="lead hero-lead">{lead}</p>

            {/* Основные кнопки: ведут в раздел помощи и в список действий ассоциации. */}
            <div className="actions hero-actions">
              <Link className="btn btn--pill btn--yellow" href={`/${locale}/aide`}>
                {ctaPrimary}
              </Link>
              <Link className="btn btn--pill btn--mint" href={`/${locale}/actions`}>
                {ctaSecondary}
              </Link>
            </div>

            {/* Ключевые слова: помогают быстро понять, про что наши направления (без кликов). */}
            <div className="pill-row hero-pillRow" aria-label="ключевые слова">
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

            {/* Ссылка на Instagram: быстрый канал связи и новости ассоциации. */}
            <div className="info-stack" style={{ marginTop: 12 }}>
              <InstagramBadge href="https://instagram.com/ies_info" handle="@ies_info" />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}


