/* 
 Этот файл содержит короткий обзор действий организации на главной странице.
 Он показывает несколько примеров активностей и кнопку, ведущую на страницу “Действия”.
 Здесь можно поменять список пунктов и ссылку, не затрагивая остальную страницу.
*/

import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
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
      id="actions"
      title={copy.title}
      subtitle={copy.subtitle}
    >
      <div className="grid-2">
        <ContentCard
          className="card-list"
          hoverable={false}
          listItems={copy.items}
        />

        <ContentCard
          className="card-summary"
          hoverable={false}
          title={copy.cardTitle}
          description={copy.cardParagraphs}
          actions={[{ label: copy.ctaLabel, href: `/${locale}/actions`, variant: "primary" }]}
        />
      </div>
    </Section>
  );
}





