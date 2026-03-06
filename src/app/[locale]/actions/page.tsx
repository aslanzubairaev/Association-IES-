/*
 This file maintains backward compatibility with the legacy /actions route.
 It performs a permanent redirect to the new /activites catalog while preserving query parameters.
 Users following old links are sent to the current page without losing context.
*/

import { permanentRedirect } from "next/navigation";

export default function ActionsLegacyRoutePage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // Rebuild the query string so intent/topic and other parameters from legacy links are preserved.
  const qp = new URLSearchParams();

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === "string") qp.set(key, value);
      if (Array.isArray(value)) value.forEach((v) => qp.append(key, v));
    }
  }

  const query = qp.toString();
  const target = `/${params.locale}/activites${query ? `?${query}` : ""}`;
  permanentRedirect(target);
}
