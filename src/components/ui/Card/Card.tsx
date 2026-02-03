/* Этот файл содержит универсальную карточку для секций главной страницы. */

import type { ComponentPropsWithoutRef, ElementType, HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./Card.module.css";

type CommonCardProps = {
  children: ReactNode;
  className?: string;
  surface?: boolean;
  hoverable?: boolean;
};

type LinkCardProps = CommonCardProps & {
  href: string;
  as?: undefined;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

type ElementCardProps<T extends ElementType> = CommonCardProps & {
  href?: undefined;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "children">;

type CardProps<T extends ElementType = "div"> = LinkCardProps | ElementCardProps<T>;

// Карточка: по умолчанию задаём общий surface-слой, но можно отключить для особых вариантов (hero/quote).
export function Card<T extends ElementType = "div">(props: CardProps<T>) {
  const { children, className, surface = true, hoverable = true } = props;
  const classes = ["card", surface ? styles.surface : null, className].filter(Boolean).join(" ");

  // Если передан href, используем Link.
  if ("href" in props && typeof props.href === "string") {
    const { href } = props as LinkCardProps;
    const linkRest = { ...(props as LinkCardProps) } as Record<string, unknown>;
    delete linkRest.className;
    delete linkRest.children;
    delete linkRest.surface;
    delete linkRest.hoverable;
    delete linkRest.as;
    delete linkRest.href;
    return (
      <Link
        className={classes}
        data-hover={hoverable ? undefined : "false"}
        href={href}
        {...(linkRest as Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">)}
      >
        {children}
      </Link>
    );
  }

  // Иначе используем as (div, article...)
  const Component = (props as ElementCardProps<T>).as ?? "div";
  const elementRest = { ...(props as ElementCardProps<T>) } as Record<string, unknown>;
  delete elementRest.className;
  delete elementRest.children;
  delete elementRest.surface;
  delete elementRest.hoverable;
  delete elementRest.href;
  delete elementRest.as;
  return (
    <Component
      className={classes}
      data-hover={hoverable ? undefined : "false"}
      {...(elementRest as Omit<ComponentPropsWithoutRef<T>, "className" | "children">)}
    >
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
