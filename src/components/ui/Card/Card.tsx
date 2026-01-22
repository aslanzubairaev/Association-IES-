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
