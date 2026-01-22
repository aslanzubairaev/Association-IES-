/* 
 Этот файл задаёт страницу-алиас “Contacts / Контакты”.
 Он нужен, чтобы ссылка /[язык]/contacts работала так же, как /[язык]/contact.
 Человек может перейти по ссылке и попасть на страницу контактов, сохранив выбранную тему из query.
*/

import { redirect } from "next/navigation";

export default function ContactsAliasPage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // Мы сохраняем query-параметры (например topic=...) и переадресуем на реальную страницу контактов.
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


