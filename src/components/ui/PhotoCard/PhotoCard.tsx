import Image from "next/image";
import styles from "./PhotoCard.module.css";

type PhotoCardProps = {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  objectPosition?: string;
};

export function PhotoCard({ src, alt, label, priority, objectPosition }: PhotoCardProps) {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 900px) 50vw, 88vw"
        priority={priority}
        style={{ objectPosition: objectPosition || "center" }}
      />
      <span className={styles.tint} aria-hidden="true" />
      <span className={styles.shine} aria-hidden="true" />
      {label ? <span className={styles.label}>{label}</span> : null}
    </div>
  );
}
