/*
 This file defines the contact intent button.
 It links to the contact page and passes the selected topic via the URL.
 Clicking it pre-fills the form with the relevant hint.
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
