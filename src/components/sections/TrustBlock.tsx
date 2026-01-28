/* 
 Этот файл содержит блок доверия на главной странице.
 Он показывает коротлые причины, почему организации можно доверять, и что человек получит.
 Здесь можно поменять формулировки и список пунктов, не меняя общий стиль.
*/

import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { MissionPhotoRow } from "@/components/ui/MissionPhotoRow/MissionPhotoRow";
import { trustBlockCopy } from "@/content/actions";
import styles from "./TrustBlock.module.css";

type TrustBlockProps = {
  locale: "ru" | "fr";
};

// Блок доверения: простой список тезисов, двуязычный.
export function TrustBlock({ locale }: TrustBlockProps) {
  const copy = trustBlockCopy[locale];

  return (
    <Section
      className={styles.section}
      id="trust"
      title={copy.title}
      subtitle={copy.subtitle}
    >
      <div className={styles.cardsRow}>
        <ContentCard
          title={copy.benefitsTitle}
          listItems={copy.points}
          hoverable={false}
        />

        <Card className={styles.quoteCard} surface={false} role="note" aria-label={copy.quoteAriaLabel}>
          <CardContent>
            <p className={styles.quoteCardText}>
              {copy.quoteText}
            </p>
            <p className={styles.quoteCardSign}>{copy.quoteSignature}</p>
          </CardContent>
        </Card>
      </div>
      <div className={styles.photosRow}>
        <MissionPhotoRow
          left={{
            src: copy.photos.left.src,
            alt: copy.photos.left.alt,
          }}
          right={{
            src: copy.photos.right.src,
            alt: copy.photos.right.alt,
          }}
        />
      </div>
    </Section>
  );
}
