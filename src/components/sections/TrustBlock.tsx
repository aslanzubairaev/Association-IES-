/* 
 Этот файл содержит блок доверия на главной странице.
 Он показывает коротлые причины, почему организации можно доверять, и что человек получит.
 Здесь можно поменять формулировки и список пунктов, не меняя общий стиль.
*/

import { Section } from "@/components/ui/Section/Section";
import { PhotoCard } from "@/components/ui/PhotoCard/PhotoCard";
import { trustBlockCopy } from "@/content/actions";
import styles from "./TrustBlock.module.css";

type TrustBlockProps = {
  locale: "ru" | "fr";
};

// Блок доверения: простой список тезисов, двуязычный.
export function TrustBlock({ locale }: TrustBlockProps) {
  // Тексты и подписи для выбранного языка.
  const copy = trustBlockCopy[locale];

  return (
    <Section
      className={styles.section}
      id="trust"
      title={copy.title}
    >
      <div className={styles.contentGrid}>
        <div className={styles.photosRow}>
          {copy.photos.map((photo) => (
            <PhotoCard
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              title={photo.title}
              description={photo.description}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
