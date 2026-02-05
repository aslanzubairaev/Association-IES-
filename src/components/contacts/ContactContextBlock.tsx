/*
 Этот файл описывает блок с выбранной темой обращения.
 Он показывает заголовок, список примеров и короткое пояснение.
 Блок помогает человеку понять, что именно написать в сообщении.
*/

import { IesList, IesListItem } from "@/components/ui/IesList";
import styles from "./ContactContextBlock.module.css";

// Данные для блока с темой: заголовок, примеры и пояснение.
type ContactContextBlockProps = {
  title?: string;
  bullets?: string[];
  fineprint?: string;
  extraInfo?: string[];
  className?: string;
};

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ContactContextBlock({ title, bullets, fineprint, extraInfo, className }: ContactContextBlockProps) {
  return (
    <div className={cn(styles.root, className)}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {/* Список примеров: показываем только если есть пункты. */}
      {bullets && bullets.length > 0 ? (
        <IesList className={styles.list}>
          {bullets.map((item) => (
            <IesListItem key={item}>{item}</IesListItem>
          ))}
        </IesList>
      ) : null}
      {/* Короткая приписка под списком, если она задана. */}
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
