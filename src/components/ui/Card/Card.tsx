/* Этот файл содержит универсальную карточку для секций главной страницы. */

import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
  surface?: boolean;
  hoverable?: boolean;
  as?: any;
  href?: string;
} & HTMLAttributes<HTMLElement>;

// Карточка: по умолчанию задаём общий surface-слой, но можно отключить для особых вариантов (hero/quote).
export function Card({
  children,
  className,
  surface = true,
  hoverable = true,
  as = "div",
  href,
  ...rest
}: CardProps) {
  const classes = ["card", surface ? styles.surface : null, className].filter(Boolean).join(" ");
  const Component = href ? Link : as;

  // Если передан href, используем Link и передаем ему href.
  // Иначе используем as (div, article...)
  const linkProps = href ? { href } : {};

  return (
    // @ts-ignore - Link/Component typing mismatch is common, explicit ignore is safer than complex casting here
    <Component className={classes} data-hover={hoverable ? undefined : "false"} {...linkProps} {...rest}>
      {children}
    </Component>
  );
}

// Заголовок карточки: обычно содержит H3/H4
export function CardHeader({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`card-header ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}

// Основной контент карточки
export function CardContent({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`card-content ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}

// Подвал карточки: для кнопок, подписей и мета-информации
export function CardFooter({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`card-footer ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}
