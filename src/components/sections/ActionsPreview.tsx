/* 
 Этот файл содержит короткий обзор действий организации на главной странице.
 Он показывает несколько примеров активностей и кнопку, ведущую на страницу “Действия”.
 Здесь можно поменять список пунктов и ссылку, не затрагивая остальную страницу.
*/

import Image from "next/image";
import { Section } from "@/components/ui/Section/Section";
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
    >
      <div className={styles.contentGrid}>
        <div className={styles.photoGrid}>
          {copy.photos.map((photo) => (
            <figure key={photo.src} className={styles.photoCard}>
              <div className={styles.photoMedia}>
                <Image
                  className={styles.photoImage}
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 900px) 50vw, 92vw"
                  priority={false}
                />
                <figcaption className={styles.photoCaption}>
                  <p className={styles.photoTitle}>{photo.title}</p>
                  <p className={styles.photoDescription}>{photo.description}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}





