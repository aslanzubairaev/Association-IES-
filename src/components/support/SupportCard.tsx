/* 
 Этот файл содержит универсальную карточку для страницы “Поддержать / Soutenir”.
 Она показывает один способ поддержки (заголовок, короткое объяснение и кнопку действия).
 Человек может прочитать вариант и перейти на страницу контактов, чтобы уточнить детали.
*/

import Link from "next/link";
import type { ReactNode } from "react";

type SupportCardProps = {
  title: string;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
  isCtaDisabled?: boolean;
  children?: ReactNode;
  className?: string;
};

// Карточка способа поддержки: одинаковая структура, чтобы варианты читались быстро.
export function SupportCard({
  title,
  text,
  ctaLabel,
  ctaHref,
  isCtaDisabled,
  children,
  className,
}: SupportCardProps) {
  const shouldShowCta = Boolean(ctaLabel);
  const cardClassName = ["card", "card--paper", "accent-left", "accent--blue", className]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassName}>
      {/* Заголовок карточки: кратко называет способ поддержки. */}
      <h3 className="h3 h3--blue">{title}</h3>

      {/* Пояснение: одно-два предложения, без реквизитов и выдуманных ссылок. */}
      <p className="p" style={{ marginTop: 10 }}>
        {text}
      </p>

      {/* Дополнительные детали (например IBAN/BIC): показываем только когда данные подтверждены. */}
      {children ? <div style={{ marginTop: 12 }}>{children}</div> : null}

      {/* Кнопка: либо ведёт на контакты, либо отключена, если ссылку пока нельзя давать. */}
      {shouldShowCta ? (
        <div style={{ marginTop: 14 }}>
          {isCtaDisabled ? (
            <button
              type="button"
              className="btn btn--pill btn--outline-blue"
              disabled
              aria-disabled="true"
            >
              {ctaLabel}
            </button>
          ) : (
            <Link className="btn btn--pill btn--outline-blue" href={ctaHref ?? "#"}>
              {ctaLabel}
            </Link>
          )}
        </div>
      ) : null}
    </article>
  );
}


