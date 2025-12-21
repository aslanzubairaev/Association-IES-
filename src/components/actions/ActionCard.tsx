/* 
 Этот файл содержит карточку направления (действия) для страницы “Actions / Действия”.
 Он показывает два варианта карточек: обычную карточку направления и инфо‑карточку.
 Обычная карточка показывает: название, кому подходит, что даёт, формат/частоту, “когда/где” и кнопку записи.
 Инфо‑карточка показывает короткий список “Важно знать / À savoir” без дублирования CTA.
 Человек может быстро понять смысл направления и перейти на страницу контактов.
*/

import Link from "next/link";

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
      <article className="card card--paper accent-left accent--blue actions-card" style={{ display: "flex", flexDirection: "column" }}>
        {/* Заголовок инфо‑карточки: помогает быстро понять, что это “правила участия”. */}
        <h3 className="h3 h3--blue">{title}</h3>

        {/* Список пунктов: делаем небольшой отступ между строками, чтобы текст читался легче. */}
        <ul className="list" style={{ marginTop: 10 }}>
          {items.map((item, idx) => (
            <li key={item} style={{ marginTop: idx === 0 ? 0 : 10 }}>
              {item}
            </li>
          ))}
        </ul>

        {/* Ссылка на контакты: опционально, чтобы не плодить CTA. */}
        {ctaLabel && href ? (
          <div style={{ marginTop: "auto", paddingTop: 14 }}>
            <Link className="btn btn--pill btn--outline-blue" href={href}>
              {ctaLabel}
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: "auto" }} />
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
    <article className="card card--paper accent-left accent--blue actions-card" style={{ display: "flex", flexDirection: "column" }}>
      {/* Название направления: главный ориентир в карточке. */}
      <h3 className="h3 h3--blue">{title}</h3>

      {/* “Для кого”: одна строка, чтобы быстро оценить, подходит ли это направление. */}
      <p className="p" style={{ marginTop: 10 }}>
        <b>{forWhoLabel}:</b> {forWho}
      </p>

      {/* “Что даёт”: одна строка, без обещаний — только нейтральное описание результата. */}
      <p className="p" style={{ marginTop: 10 }}>
        <b>{benefitLabel}:</b> {benefit}
      </p>

      {/* “Формат/частота”: помогает понять, регулярное ли это направление или событийное. */}
      <p className="p" style={{ marginTop: 10 }}>
        <b>{frequencyLabel}:</b> {frequency}
      </p>

      {/* “Когда/где”: на этой странице всегда без общего адреса/графика — уточняется при записи. */}
      <p className="actions-card-meta" style={{ marginTop: 10 }}>
        <span className="actions-card-meta-label">{whenWhereLabel}</span> {whenWhereText}
      </p>

      {/* Кнопка записи: ведёт на страницу контактов, без телефонов и личных контактов. */}
      <div style={{ marginTop: "auto", paddingTop: 14 }}>
        <Link className="btn btn--pill btn--outline-blue" href={href}>
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}



