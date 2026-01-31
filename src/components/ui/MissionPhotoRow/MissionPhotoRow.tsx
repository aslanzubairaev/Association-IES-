/*
 Этот файл определяет ряд из двух фотокарточек.
 Он показывает фото с подписью рядом друг с другом или в колонку.
 Он используется там, где нужно компактно показать пару снимков.
*/

import { PhotoCard } from "@/components/ui/PhotoCard/PhotoCard";
import styles from "./MissionPhotoRow.module.css";

export type Photo = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type MissionPhotoRowProps = {
  left: Photo;
  right: Photo;
};

// Ряд из двух карточек с фотографиями и подписями.
export function MissionPhotoRow({ left, right }: MissionPhotoRowProps) {
  return (
    <div className={styles.row}>
      {/* Левая фотокарточка. */}
      <div className={styles.item}>
        <PhotoCard
          imageSrc={left.src}
          imageAlt={left.alt}
          title={left.title}
          description={left.description}
        />
      </div>
      {/* Правая фотокарточка. */}
      <div className={styles.item}>
        <PhotoCard
          imageSrc={right.src}
          imageAlt={right.alt}
          title={right.title}
          description={right.description}
        />
      </div>
    </div>
  );
}
