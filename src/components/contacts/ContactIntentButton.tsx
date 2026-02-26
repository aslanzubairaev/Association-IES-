/*
 Этот файл описывает кнопку выбора темы обращения.
 Она ведёт на страницу контактов и передаёт выбранную тему через адресную строку.
 Нажатие помогает быстрее заполнить форму с нужной подсказкой.
*/

import { Button } from "@/components/ui/Button/Button";

type ContactIntentButtonProps = {
  locale: "ru" | "fr";
  intentId: string;
  label: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "pill" | "mint";
};

export function ContactIntentButton({ locale, intentId, label, className, variant = "pill" }: ContactIntentButtonProps) {
  const href = `/${locale}/contact?intent=${encodeURIComponent(intentId)}`;

  return (
    <Button
      href={href}
      variant={variant}
      className={className}
    >
      {label}
    </Button>
  );
}
