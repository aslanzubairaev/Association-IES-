import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import type { LocalizedActivity } from "@/lib/activities/types";
import styles from "./ActivityCard.module.css";

type ActivityCardProps = {
  activity: LocalizedActivity;
  detailsHref: string;
  detailsLabel?: string;
  participateHref?: string;
  participateLabel?: string;
  wholeCardLink?: boolean;
  className?: string;
};

function CardBody({
  activity,
}: {
  activity: LocalizedActivity;
}) {
  return (
    <>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={activity.coverImage.src}
          alt={activity.coverImage.alt}
          width={720}
          height={420}
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
    </>
  );
}

export function ActivityCard({
  activity,
  detailsHref,
  detailsLabel,
  participateHref,
  participateLabel,
  wholeCardLink = false,
  className,
}: ActivityCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ");

  if (wholeCardLink) {
    return (
      <Link className={classes} href={detailsHref}>
        <CardBody activity={activity} />
      </Link>
    );
  }

  return (
    <article className={classes} data-has-footer={participateHref && participateLabel ? "true" : "false"}>
      <Link className={styles.mainLink} href={detailsHref}>
        <CardBody activity={activity} />
      </Link>

      {participateHref && participateLabel ? (
        <div className={styles.footer}>
          <div className={styles.footerActions}>
            <Button variant="pill" href={participateHref} className={styles.actionButton}>
              {participateLabel}
            </Button>

            {detailsLabel ? (
              <Link className={styles.detailsButton} href={detailsHref}>
                {detailsLabel}
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
