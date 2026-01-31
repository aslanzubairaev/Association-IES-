/*
 Этот файл определяет карточку с фотографией и подписью.
 Он показывает фото без фильтров и короткий текст под ним.
 Он используется в секции миссии для доверительного визуального блока.
*/

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card/Card";
import styles from "./PhotoCard.module.css";

type PhotoCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

// Карточка фото: сочетает изображение и подпись в едином стиле.
export function PhotoCard({ imageSrc, imageAlt, title, description }: PhotoCardProps) {
  return (
    <Card className={styles.card} hoverable={false}>
      {/* Блок изображения без цветных фильтров. */}
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 900px) 50vw, 92vw"
          priority={false}
        />
        <span className={styles.shine} aria-hidden="true" />
      </div>
      {/* Текстовый блок с заголовком и описанием. */}
      <CardContent className={styles.caption}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </CardContent>
    </Card>
  );
}
