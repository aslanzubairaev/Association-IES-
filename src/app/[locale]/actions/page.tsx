/*
 Этот файл сохраняет совместимость со старым адресом /actions.
 Он делает постоянный редирект на новый каталог /activites и сохраняет query-параметры.
 Человек, пришедший по старой ссылке, попадает на актуальную страницу без потери контекста.
*/

import { permanentRedirect } from "next/navigation";

export default function ActionsLegacyRoutePage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // Собираем query заново, чтобы не потерять intent/topic и другие параметры в старых ссылках.
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
