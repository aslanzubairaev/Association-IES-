/*
 Этот файл определяет карточку с фотографией и подписью.
 Он показывает фото в натуральных цветах и подпись под ним.
 Он используется для показа историй и моментов ассоциации.
*/

import Image from "next/image";
import styles from "./PhotoCaptionCard.module.css";

export type PhotoCaptionCardProps = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  priority?: boolean;
  objectPosition?: string;
};

// Карточка с фото и подписью, предназначенная для секций миссии и доверия.
export function PhotoCaptionCard({
  src,
  alt,
  title,
  description,
  priority,
  objectPosition,
}: PhotoCaptionCardProps) {
  return (
    <div className={styles.card}>
      {/* Верхняя зона с фотографией в оригинальных цветах. */}
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 900px) 50vw, 92vw"
          priority={priority}
          style={{ objectPosition: objectPosition || "center" }}
        />
      </div>
      {/* Нижняя зона с подписью и коротким описанием. */}
      <div className={styles.caption}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
    </div>
  );
}
