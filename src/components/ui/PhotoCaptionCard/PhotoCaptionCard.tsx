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
};

// Карточка с фото и подписью, предназначенная для секций миссии и доверия.
export function PhotoCaptionCard({
  src,
  alt,
  title,
  description,
  priority,
}: PhotoCaptionCardProps) {
  return (
    <div className={styles.card}>
      {/* Фотография с подписью поверх изображения. */}
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 900px) 50vw, 92vw"
          priority={priority}
        />
        {(title || description) ? (
          <div className={styles.caption}>
            {title ? <p className={styles.title}>{title}</p> : null}
            {description ? <p className={styles.description}>{description}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
