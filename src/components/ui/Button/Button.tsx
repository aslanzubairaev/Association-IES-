/* This file contains a universal button for links and actions. */

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "accent" | "pill" | "mint";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

// Button: renders as a Link if href is provided; otherwise as a plain button.
export function Button({
  children,
  className,
  href,
  type = "button",
  variant = "primary",
  ...rest
}: ButtonProps) {
  const isLegacyPill = variant === "pill" || variant === "mint";
  const classes = isLegacyPill
    ? ["btn", "btn--pill", variant === "mint" ? "btn--mint" : "btn--blue", className]
        .filter(Boolean)
        .join(" ")
    : [styles.button, styles[variant], className].filter(Boolean).join(" ");

  if (href) {
    const linkProps = { ...rest };
    delete (linkProps as { type?: ButtonProps["type"] }).type;
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
