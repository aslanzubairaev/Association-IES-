/* 
 Этот файл содержит верхний блок страницы “Aide / Помощь”.
 Он показывает заголовок, короткое объяснение, важную строку про ответ по e-mail и приём по записи.
 Человек может нажать кнопку и перейти на страницу контактов, чтобы описать ситуацию.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";

type AideHeroProps = {
  locale: "ru" | "fr";
};

// Верхний блок страницы: объясняет, что делать, и ведёт на контакты (без телефонов и личных контактов).
export function AideHero({ locale }: AideHeroProps) {
  const title = locale === "fr" ? "Aide" : "Помощь";
  const lead =
    locale === "fr"
      ? "Expliquez votre situation — nous vous orientons et proposons un rendez-vous."
      : "Опишите ситуацию — мы подскажем шаги и предложим запись.";
  const note =
    locale === "fr" ? "Réponse par e-mail. Accueil sur rendez-vous." : "Ответим по e-mail. Приём — по записи.";
  const ctaLabel = locale === "fr" ? "Nous contacter" : "Написать";

  return (
    <section className="section section--purple section-seam-bottom seam-to-pink">
      <Container>
        {/* Заголовок и подзаголовок: человек должен сразу понять смысл страницы. */}
        <div className="section-head">
          <h1 className="h2 h2--blue">{title}</h1>
          {/* Подзаголовок на тёмном фоне делаем светлее, чтобы он читался уверенно. */}
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {lead}
          </p>
          {/* Важная короткая строка: обещаем только ответ по e-mail и приём по записи. */}
          <p className="fineprint" style={{ opacity: 0.9, color: "rgba(255,255,255,.88)" }}>
            {note}
          </p>

          {/* Главная кнопка: всегда ведёт на страницу контактов выбранного языка. */}
          <div className="btn-row" style={{ marginTop: 10, marginBottom: 0 }}>
            <Link className="btn btn--pill btn--yellow" href={`/${locale}/contact`}>
              {ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}


