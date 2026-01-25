/* 
 Этот файл содержит карточку направления (действия) для страницы “Actions / Действия”.
 Он показывает два варианта карточек: обычную карточку направления и инфо‑карточку.
 Обычная карточка показывает: название, кому подходит, что даёт, формат/частоту, “когда/где” и кнопку записи.
 Инфо‑карточка показывает короткий список “Важно знать / À savoir” без дублирования CTA.
 Человек может быстро понять смысл направления и перейти на страницу контактов.
*/

import Link from "next/link";
import { IesList, IesListItem } from "@/components/ui/IesList";
import styles from "./ActionCard.module.css";

type ActionCardDirectionProps = {
  variant?: "direction";
  title: string;
  forWhoLabel: string;
  forWho: string;
  benefitLabel: string;
  benefit: string;
  frequencyLabel: string;
  frequency: string;
  whenWhereLabel: string;
  whenWhereText: string;
  ctaLabel: string;
  href: string;
};

type ActionCardInfoProps = {
  variant: "info";
  title: string;
  items: string[];
  // Ссылка на контакты можно показывать только если это действительно нужно (без лишних CTA).
  ctaLabel?: string;
  href?: string;
};

type ActionCardProps = ActionCardDirectionProps | ActionCardInfoProps;

// Карточка направления: один и тот же формат для всех пунктов, чтобы сравнивать было легко.
export function ActionCard(props: ActionCardProps) {
  // Инфо‑карточка: список коротких пунктов без повторов “Для кого/Что даёт…”. 
  if (props.variant === "info") {
    const { title, items, ctaLabel, href } = props;

    return (
      <article className={`card card--paper ${styles.card} ${styles.cardStack}`}>
        {/* Заголовок инфо‑карточки: помогает быстро понять, что это “правила участия”. */}
        <h3 className="h3 h3--blue">{title}</h3>

        {/* Список пунктов: делаем небольшой отступ между строками, чтобы текст читался легче. */}
        <IesList className={`list ${styles.cardList}`}>
          {items.map((item) => (
            <IesListItem key={item}>{item}</IesListItem>
          ))}
        </IesList>

        {/* Ссылка на контакты: опционально, чтобы не плодить CTA. */}
        {ctaLabel && href ? (
          <div className={styles.cardCta}>
            <Link className={`btn btn--pill ${styles.cardButton}`} href={href}>
              {ctaLabel}
            </Link>
          </div>
        ) : (
          <div className={styles.cardCta} />
        )}
      </article>
    );
  }

  const {
    title,
    forWhoLabel,
    forWho,
    benefitLabel,
    benefit,
    frequencyLabel,
    frequency,
    whenWhereLabel,
    whenWhereText,
    ctaLabel,
    href,
  } = props;

  return (
    <article
      className={`card card--paper accent-left accent--blue ${styles.card} ${styles.cardStack}`}
    >
      {/* Название направления: главный ориентир в карточке. */}
      <h3 className="h3 h3--blue">{title}</h3>

      {/* “Для кого”: одна строка, чтобы быстро оценить, подходит ли это направление. */}
      <p className={`p ${styles.cardRow}`}>
        <span className={styles.cardLabel}>{forWhoLabel}:</span>{" "}
        <span className={styles.cardValue}>{forWho}</span>
      </p>

      {/* “Что даёт”: одна строка, без обещаний — только нейтральное описание результата. */}
      <p className={`p ${styles.cardRow}`}>
        <span className={styles.cardLabel}>{benefitLabel}:</span>{" "}
        <span className={styles.cardValue}>{benefit}</span>
      </p>

      {/* “Формат/частота”: помогает понять, регулярное ли это направление или событийное. */}
      <p className={`p ${styles.cardRow}`}>
        <span className={styles.cardLabel}>{frequencyLabel}:</span>{" "}
        <span className={styles.cardValue}>{frequency}</span>
      </p>

      {/* “Когда/где”: на этой странице всегда без общего адреса/графика — уточняется при записи. */}
      <p className={styles.cardMeta}>
        <span className={styles.cardMetaLabel}>{whenWhereLabel}</span> {whenWhereText}
      </p>

      {/* Кнопка записи: ведёт на страницу контактов, без телефонов и личных контактов. */}
      <div className={styles.cardCta}>
        <Link className={`btn btn--pill ${styles.cardButton}`} href={href}>
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}



