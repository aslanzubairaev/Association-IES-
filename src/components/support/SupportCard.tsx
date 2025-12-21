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
  className?: string;
  children?: ReactNode;
};

// Карточка поддержки: одинаковая форма помогает быстро сравнивать варианты помощи.
export function SupportCard({ title, text, ctaLabel, ctaHref, className, children }: SupportCardProps) {
  return (
    <article className={`card card--paper ${className ?? ""}`.trim()} style={{ display: "flex", flexDirection: "column" }}>
      {/* Заголовок: главный ориентир, чтобы сразу понять способ поддержки. */}
      <h3 className="h3 h3--blue">{title}</h3>

      {/* Короткое описание: объясняем смысл карточки одной фразой, без лишних деталей. */}
      {text ? (
        <p className="p" style={{ marginTop: 10 }}>
          {text}
        </p>
      ) : null}

      {/* Дополнительное содержимое: сюда можно вставить реквизиты, список или другие детали. */}
      {children ? <div style={{ marginTop: 12 }}>{children}</div> : null}

      {/* Кнопка: ведёт на страницу контактов, чтобы запросить актуальную ссылку или задать вопрос. */}
      {ctaLabel && ctaHref ? (
        <div style={{ marginTop: "auto", paddingTop: 14 }}>
          <Link className="btn btn--pill btn--outline-blue" href={ctaHref}>
            {ctaLabel}
          </Link>
        </div>
      ) : (
        <div style={{ marginTop: "auto" }} />
      )}
    </article>
  );
}

