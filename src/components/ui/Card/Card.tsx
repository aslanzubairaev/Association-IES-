/* Этот файл содержит универсальную карточку для секций главной страницы. */

import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
  surface?: boolean;
  hoverable?: boolean;
  as?: "div" | "article" | "section" | "aside";
} & HTMLAttributes<HTMLElement>;

// Карточка: по умолчанию задаём общий surface-слой, но можно отключить для особых вариантов (hero/quote).
export function Card({
  children,
  className,
  surface = true,
  hoverable = true,
  as = "div",
  ...rest
}: CardProps) {
  const classes = ["card", surface ? styles.surface : null, className].filter(Boolean).join(" ");
  const Component = as;

  return (
    <Component className={classes} data-hover={hoverable ? undefined : "false"} {...rest}>
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
