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
  icon?: ReactNode;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaTarget?: string;
  ctaRel?: string;
  badgeLabel?: string;
  badgeSecondaryLabel?: string;
  ctaNote?: string;
  className?: string;
  children?: ReactNode;
};

// Карточка поддержки: одинаковая форма помогает быстро сравнивать варианты помощи.
export function SupportCard({
  title,
  icon,
  text,
  ctaLabel,
  ctaHref,
  ctaTarget,
  ctaRel,
  badgeLabel,
  badgeSecondaryLabel,
  ctaNote,
  className,
  children,
}: SupportCardProps) {
  const isExternal = Boolean(ctaHref && /^https?:\/\//.test(ctaHref));
  const linkTarget = ctaTarget ?? (isExternal ? "_blank" : undefined);
  const linkRel = ctaRel ?? (isExternal ? "noopener noreferrer" : undefined);
  const hasCta = Boolean(ctaLabel && ctaHref);

  return (
    <article className={`card card--paper support-card ${className ?? ""}`.trim()}>
      <div className="support-card-intro">
        {/* Заголовок: главный ориентир, чтобы сразу понять способ поддержки. */}
        <div className="support-card-head">
          <div className="support-card-title">
            {icon ? <span className="support-card-icon">{icon}</span> : null}
            <h3 className="h3 h3--blue">{title}</h3>
          </div>
          {badgeLabel || badgeSecondaryLabel ? (
            <div className="support-card-badges">
              {badgeLabel ? <span className="support-card-badge">{badgeLabel}</span> : null}
              {badgeSecondaryLabel ? (
                <span className="support-card-badge support-card-badge--muted">{badgeSecondaryLabel}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Короткое описание: объясняем смысл карточки одной фразой, без лишних деталей. */}
        {text ? (
          <p className="p support-text">
            {text}
          </p>
        ) : null}
      </div>

      {/* Дополнительное содержимое: сюда можно вставить реквизиты, список или другие детали. */}
      {children ? <div className="support-card-body">{children}</div> : null}

      {/* Кнопка: ведёт к следующему шагу (ссылка, форма или внешняя платформа). */}
      {hasCta ? (
        <div className="support-cta support-card-footer">
          <div className="support-actions-row support-actions-row--single">
            <Link className="btn btn--pill support-cta-button" href={ctaHref!} target={linkTarget} rel={linkRel}>
              <span className="support-cta-label">{ctaLabel}</span>
              {isExternal ? (
                <span className="support-cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" focusable="false">
                    <path
                      d="M11.5 4h4.5v4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12l8-8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 12.5v2.25A1.25 1.25 0 0 1 14.75 16H5.25A1.25 1.25 0 0 1 4 14.75V5.25A1.25 1.25 0 0 1 5.25 4H7.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
            </Link>
          </div>
          {ctaNote ? <span className="support-cta-note">{ctaNote}</span> : null}
        </div>
      ) : null}
    </article>
  );
}

