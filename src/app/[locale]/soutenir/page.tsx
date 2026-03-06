/* This file defines the "Support" page and displays the available support options (donation/membership/volunteering). */

import SoutenirPage from "@/components/sections/soutenir/SoutenirPage";

export default function SoutenirRoutePage({ params }: { params: { locale: "ru" | "fr" } }) {
  return <SoutenirPage locale={params.locale} />;
}
