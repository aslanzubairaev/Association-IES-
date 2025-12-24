/* 
 Этот файл содержит короткий обзор действий организации на главной странице.
 Он показывает несколько примеров активностей и кнопку, ведущую на страницу “Действия”.
 Здесь можно поменять список пунктов и ссылку, не затрагивая остальную страницу.
*/

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { actionsPreviewCopy } from "@/content/actions";

type ActionsPreviewProps = {
  locale: "ru" | "fr";
};

// Короткий обзор действий: небольшой список и переход на подробную страницу.
export function ActionsPreview({ locale }: ActionsPreviewProps) {
  const copy = actionsPreviewCopy[locale];

  return (
    <section className="section section--pink-2 actions-short-block">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{copy.title}</h2>
          <p className="muted">{copy.subtitle}</p>
        </div>

        <div className="grid-2">
          <Card className="card-list" hoverable={false}>
            <ul className="bullet-list">
              {copy.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>

          <Card className="card-summary" hoverable={false}>
            <h3 className="h3 h3--blue">{copy.cardTitle}</h3>
            <p className="p" style={{ marginTop: 10 }}>
              {copy.cardParagraphs[0]}
            </p>
            <p className="p" style={{ marginTop: 10 }}>
              {copy.cardParagraphs[1]}
            </p>
            <div style={{ marginTop: 14 }}>
              <Button variant="primary" href={`/${locale}/actions`}>
                {copy.ctaLabel}
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}





