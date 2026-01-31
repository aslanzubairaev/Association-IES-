/*
 Этот файл определяет карточку с фотографией и подписью.
 Он показывает фото без фильтров и короткий текст под ним.
 Он используется в секции миссии для доверительного визуального блока.
*/

import Image from "next/image";
import styles from "./PhotoCard.module.css";

type PhotoCardProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
  priority?: boolean;
  sizes?: string;
};

// Карточка фото: премиальная подача с подписью поверх изображения.
export function PhotoCard({ src, alt, title, description, priority = false, sizes }: PhotoCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(min-width: 900px) 50vw, 92vw"}
          priority={priority}
        />
        <div className={styles.caption}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}
