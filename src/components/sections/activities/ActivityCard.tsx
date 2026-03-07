import Image from "next/image";
import Link from "next/link";
import type { LocalizedActivity } from "@/lib/activities/types";
import styles from "./ActivityCard.module.css";

type ActivityCardProps = {
  activity: LocalizedActivity;
  detailsHref: string;
  className?: string;
};

export function ActivityCard({ activity, detailsHref, className }: ActivityCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ");

  return (
    <Link className={classes} href={detailsHref}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={activity.coverImage.src}
          alt={activity.coverImage.alt}
          width={720}
          height={450}
        />
      </div>

      <div className={styles.copyBlock}>
        <h3 className={styles.title}>{activity.cardTitle}</h3>

        <div className={styles.metaLine}>
          <span>{activity.periodLabel}</span>
          <span>{activity.location}</span>
        </div>

        <p className={styles.pitch}>{activity.cardPitch}</p>
      </div>
    </Link>
  );
}
