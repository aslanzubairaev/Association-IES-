/* 
 Этот файл содержит универсальную карточку для страницы “Поддержать / Soutenir”.
 Он показывает один способ поддержки (заголовок, короткий текст, опциональная кнопка и дополнительное содержимое).
 Человек может прочитать описание и при необходимости нажать кнопку, чтобы перейти на страницу контактов.
*/

import Link from "next/link";
import type { ReactNode } from "react";

// Данные карточки: заголовок обязателен, остальное можно не показывать (например, если внутри есть реквизиты).
type SupportCardProps = {
  title: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaTarget?: string;
  ctaRel?: string;
  badgeLabel?: string;
  className?: string;
  children?: ReactNode;
};

// Карточка поддержки: одинаковая форма помогает быстро сравнивать варианты помощи.
export function SupportCard({
  title,
  text,
  ctaLabel,
  ctaHref,
  ctaTarget,
  ctaRel,
  badgeLabel,
  className,
  children,
}: SupportCardProps) {
  const isExternal = Boolean(ctaHref && /^https?:\/\//.test(ctaHref));
  const linkTarget = ctaTarget ?? (isExternal ? "_blank" : undefined);
  const linkRel = ctaRel ?? (isExternal ? "noreferrer" : undefined);

  return (
    <article className={`card card--paper support-card ${className ?? ""}`.trim()}>
      {/* Заголовок: главный ориентир, чтобы сразу понять способ поддержки. */}
      <div className="support-card-head">
        <h3 className="h3 h3--blue">{title}</h3>
        {badgeLabel ? <span className="support-card-badge">{badgeLabel}</span> : null}
      </div>

      {/* Короткое описание: объясняем смысл карточки одной фразой, без лишних деталей. */}
      {text ? (
        <p className="p support-text">
          {text}
        </p>
      ) : null}

      {/* Дополнительное содержимое: сюда можно вставить реквизиты, список или другие детали. */}
      {children ? <div className="support-body">{children}</div> : null}

      {/* Кнопка: ведёт на страницу контактов, чтобы запросить актуальную ссылку или задать вопрос. */}
      {ctaLabel && ctaHref ? (
        <div className="support-cta">
          <Link className="btn btn--pill support-cta-button" href={ctaHref} target={linkTarget} rel={linkRel}>
            {ctaLabel}
          </Link>
        </div>
      ) : (
        <div className="support-cta" />
      )}
    </article>
  );
}

