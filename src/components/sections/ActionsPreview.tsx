/* 
 Этот файл содержит короткий обзор действий организации на главной странице.
 Он показывает несколько примеров активностей и кнопку, ведущую на страницу “Действия”.
 Здесь можно поменять список пунктов и ссылку, не затрагивая остальную страницу.
*/

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";

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
          <Card className="card-list" hoverable={false}>
            <ul className="bullet-list">
              {items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>

          <Card className="card-summary" hoverable={false}>
            <h3 className="h3 h3--blue">
              {locale === "fr" ? "Voir tout" : "Посмотреть все"}
            </h3>
            <p className="p" style={{ marginTop: 10 }}>
              {locale === "fr"
                ? "Ouvrez la page avec les programmes et les formats."
                : "Откройте страницу с программами и форматами."}
            </p>
            <p className="p" style={{ marginTop: 10 }}>
              {locale === "fr"
                ? "Vous y trouverez les formats, les horaires, l’inscription et les adresses."
                : "Там будут форматы, расписания, регистрация и адреса по активностям."}
            </p>
            <div style={{ marginTop: 14 }}>
              <Button variant="primary" href={`/${locale}/actions`}>
                {locale === "fr" ? "Aller aux actions" : "Перейти к действиям"}
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}





