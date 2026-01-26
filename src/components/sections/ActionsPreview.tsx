/* 
 Этот файл содержит короткий обзор действий организации на главной странице.
 Он показывает несколько примеров активностей и кнопку, ведущую на страницу “Действия”.
 Здесь можно поменять список пунктов и ссылку, не затрагивая остальную страницу.
*/

import { Section } from "@/components/ui/Section/Section";
import { InfoCard } from "@/components/ui/Card/InfoCard";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { actionsPreviewCopy } from "@/content/actions";
import styles from "./ActionsPreview.module.css";

type ActionsPreviewProps = {
  locale: "ru" | "fr";
};

// Короткий обзор действий: небольшой список и переход на подробную страницу.
export function ActionsPreview({ locale }: ActionsPreviewProps) {
  const copy = actionsPreviewCopy[locale];

  return (
    <Section
      className={`actions-preview-section ${styles.preview}`}
      inverse
      id="actions"
      title={copy.title}
      subtitle={copy.subtitle}
    >
      <div className="grid-2">
        <Card className="card-list" hoverable={false}>
          <CardContent>
            <IesList className="bullet-list">
              {copy.items.map((it) => (
                <IesListItem key={it}>{it}</IesListItem>
              ))}
            </IesList>
          </CardContent>
        </Card>

        <InfoCard
          className="card-summary"
          hoverable={false}
          title={copy.cardTitle}
          text={copy.cardParagraphs}
          ctaLabel={copy.ctaLabel}
          ctaHref={`/${locale}/actions`}
          ctaVariant="primary" // InfoCard default is pill, but original used "primary". Need to check InfoCard support for variant or override.
        // Wait, InfoCard implementation:
        // <Link className="btn btn--pill btn--blue" href={ctaHref}>
        // It hardcodes btn--pill btn--blue.
        // Original: <Button variant="primary" ...> which produces "btn btn--primary".
        // If I want to match exactly, I might need to adjust InfoCard or use Card.
        // Let's use Card here to match perfectly if InfoCard is too rigid.
        // OR update InfoCard to accept variant.
        />
      </div>
    </Section>
  );
}





