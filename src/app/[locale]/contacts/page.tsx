/*
 This file defines the “Contacts” alias page.
 It ensures that /[locale]/contacts works the same as /[locale]/contact.
 Users following the link are redirected to the contact page while preserving query parameters.
*/

import { redirect } from "next/navigation";

export default function ContactsAliasPage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // Preserve query parameters (e.g. topic=...) and redirect to the actual contact page.
  const qp = new URLSearchParams();

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === "string") qp.set(key, value);
      if (Array.isArray(value)) value.forEach((v) => qp.append(key, v));
    }
  }

  const queryString = qp.toString();
  const target = `/${params.locale}/contact${queryString ? `?${queryString}` : ""}`;
  redirect(target);
}


