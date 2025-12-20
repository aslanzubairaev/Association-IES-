/* 
 Этот файл содержит карточку направления (действия) для страницы “Actions / Действия”.
 Она показывает название, кому подходит, что даёт, когда/где и кнопку “Записаться”.
 Человек может быстро понять смысл направления и перейти на страницу контактов.
*/

import Link from "next/link";

type ActionCardProps = {
  locale: "ru" | "fr";
  title: string;
  forWho: string;
  benefit: string;
  whenWhere: string;
};

// Карточка направления: одинаковая структура, чтобы каталог читался быстро.
export function ActionCard({ locale, title, forWho, benefit, whenWhere }: ActionCardProps) {
  const forWhoLabel = locale === "fr" ? "Pour qui" : "Для кого";
  const benefitLabel = locale === "fr" ? "Ce que ça apporte" : "Что даёт";
  const whenWhereLabel = locale === "fr" ? "Quand / où" : "Когда / где";

  const ctaLabel = locale === "fr" ? "S’inscrire" : "Записаться";

  return (
    <article className="card card--paper accent-left accent--blue">
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

      {/* “Когда/где”: если данных нет — показываем “Уточняется / À préciser”. */}
      <p className="p" style={{ marginTop: 10 }}>
        <b>{whenWhereLabel}:</b> {whenWhere}
      </p>

      {/* Кнопка записи: ведёт на страницу контактов, без телефонов и личных контактов. */}
      <div style={{ marginTop: 14 }}>
        <Link className="btn btn--pill btn--outline-blue" href={`/${locale}/contact`}>
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}


