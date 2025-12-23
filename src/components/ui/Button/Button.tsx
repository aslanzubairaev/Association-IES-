/* Этот файл содержит универсальную кнопку для ссылок и действий. */

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "accent";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

// Кнопка: если есть href, рендерим ссылку; иначе обычную кнопку.
export function Button({
  children,
  className,
  href,
  type = "button",
  variant = "primary",
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  if (href) {
    const { type: _type, ...linkProps } = rest;
    return (
      <Link className={classes} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  );
}
