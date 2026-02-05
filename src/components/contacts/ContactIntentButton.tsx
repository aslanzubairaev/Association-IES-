/*
 Этот файл описывает кнопку выбора темы обращения.
 Она ведёт на страницу контактов и передаёт выбранную тему через адресную строку.
 Нажатие помогает быстрее заполнить форму с нужной подсказкой.
*/

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";

type ContactIntentButtonProps = {
  locale: "ru" | "fr";
  intentId: string;
  label: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "pill" | "mint";
};

export function ContactIntentButton({ locale, intentId, label, className, variant = "pill" }: ContactIntentButtonProps) {
  const router = useRouter();

  // По нажатию открываем страницу контактов с выбранной темой.
  function handleClick() {
    router.push(`/${locale}/contacts?intent=${encodeURIComponent(intentId)}`);
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
