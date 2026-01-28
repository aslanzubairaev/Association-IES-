import { PhotoCard } from "@/components/ui/PhotoCard/PhotoCard";
import styles from "./MissionPhotoRow.module.css";

export type Photo = {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  objectPosition?: string;
};

type MissionPhotoRowProps = {
  left: Photo;
  right: Photo;
};

export function MissionPhotoRow({ left, right }: MissionPhotoRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.item}>
        <PhotoCard
          src={left.src}
          alt={left.alt}
          label={left.label}
          priority={left.priority}
          objectPosition={left.objectPosition}
        />
      </div>
      <div className={styles.item}>
        <PhotoCard
          src={right.src}
          alt={right.alt}
          label={right.label}
          priority={right.priority}
          objectPosition={right.objectPosition}
        />
      </div>
    </div>
  );
}
