/*
 This file defines the selected contact topic block.
 It displays a heading, a list of examples, and a short note.
 The block helps the user understand what to include in their message.
*/

import { IesList, IesListItem } from "@/components/ui/IesList";
import styles from "./ContactContextBlock.module.css";

// Props for the topic block: heading, examples, and note.
type ContactContextBlockProps = {
  bullets?: string[];
  fineprint?: string;
  extraInfo?: string[];
  className?: string;
};

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ContactContextBlock({ bullets, fineprint, extraInfo, className }: ContactContextBlockProps) {
  return (
    <div className={cn(styles.root, className)}>
      {/* Example list: only shown when items are provided. */}
      {bullets && bullets.length > 0 ? (
        <IesList className={styles.list}>
          {bullets.map((item) => (
            <IesListItem key={item}>{item}</IesListItem>
          ))}
        </IesList>
      ) : null}
      {/* Short footnote below the list, if provided. */}
      {fineprint ? (
        fineprint.includes("Когда / где: Уточняется при записи") ? null : <p className={styles.fineprint}>{fineprint}</p>
      ) : null}
      {extraInfo && extraInfo.length > 0 ? (
        <IesList className={styles.extraList}>
          {extraInfo.map((item) => (
            <IesListItem key={item}>{item}</IesListItem>
          ))}
        </IesList>
      ) : null}
    </div>
  );
}
