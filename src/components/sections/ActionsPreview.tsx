/* 
 Этот файл содержит короткий обзор действий организации на главной странице.
 Он показывает несколько примеров активностей и кнопку, ведущую на страницу “Действия”.
 Здесь можно поменять список пунктов и ссылку, не затрагивая остальную страницу.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";

type ActionsPreviewProps = {
  locale: "ru" | "fr";
};

// Короткий обзор действий: небольшой список и переход на подробную страницу.
export function ActionsPreview({ locale }: ActionsPreviewProps) {
  const title = locale === "fr" ? "Nos actions (en bref)" : "Наши действия (кратко)";
  const subtitle =
    locale === "fr"
      ? "Un aperçu rapide de nos programmes et activités."
      : "Короткий обзор программ и активностей ассоциации.";

  const items =
    locale === "fr"
      ? [
          "Consultations administratives",
          "Accompagnement vers l’emploi",
          "Ateliers de langue",
          "Rencontres et sorties",
        ]
      : [
          "Административные консультации",
          "Сопровождение к работе",
          "Языковые занятия",
          "Культурные встречи и выезды",
        ];

  return (
    <section className="section section--pink-2 actions-short-block">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{title}</h2>
          <p className="muted">{subtitle}</p>
        </div>

        <div className="grid-2">
          <div className="card card--paper card-list">
            <ul className="bullet-list">
              {items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>

          <div className="card card--paper card--highlight card-summary">
            <h3 className="h3 h3--blue">
              {locale === "fr" ? "Voir tout" : "Посмотреть все"}
            </h3>
            <p className="p" style={{ marginTop: 10 }}>
              {locale === "fr"
                ? "Ouvrez la page avec les programmes et les formats."
                : "Откройте страницу с программами и форматами."}
            </p>
            <div style={{ marginTop: 14 }}>
              <Link className="btn btn--pill btn--blue" href={`/${locale}/actions`}>
                {locale === "fr" ? "Aller aux actions" : "Перейти к действиям"}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}





