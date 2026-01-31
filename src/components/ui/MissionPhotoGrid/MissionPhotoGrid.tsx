/*
 Этот файл определяет сетку с двумя карточками фотографий.
 Он показывает фото миссии с подписью под каждым снимком.
 Он используется в блоке доверия для аккуратного расположения фото.
*/

import { PhotoCaptionCard } from "@/components/ui/PhotoCaptionCard/PhotoCaptionCard";
import styles from "./MissionPhotoGrid.module.css";

export type MissionPhoto = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  priority?: boolean;
  objectPosition?: string;
};

type MissionPhotoGridProps = {
  left: MissionPhoto;
  right: MissionPhoto;
};

// Сетка из двух карточек, которая складывается в колонку на мобильных.
export function MissionPhotoGrid({ left, right }: MissionPhotoGridProps) {
  return (
    <div className={styles.grid}>
      {/* Левая карточка с фотографией и подписью. */}
      <PhotoCaptionCard
        src={left.src}
        alt={left.alt}
        title={left.title}
        description={left.description}
        priority={left.priority}
        objectPosition={left.objectPosition}
      />
      {/* Правая карточка с фотографией и подписью. */}
      <PhotoCaptionCard
        src={right.src}
        alt={right.alt}
        title={right.title}
        description={right.description}
        priority={right.priority}
        objectPosition={right.objectPosition}
      />
    </div>
  );
}
