/*
 Этот файл задаёт страницу контактов.
 Он показывает заголовок, карточку с подсказками и форму для обращения.
 Здесь можно заполнить поля и отправить сообщение в ассоциацию.
*/

import { ContactPageContent } from "@/components/contacts/ContactPageContent";

export default function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: { topic?: string; intent?: string };
}) {
  return (
    <>
      {/* Контент страницы контактов — клиентский, чтобы реагировать на выбор темы в списке. */}
      <ContactPageContent
        locale={params.locale}
        initialTopic={searchParams?.topic}
        initialIntentId={searchParams?.intent}
      />
    </>
  );
}
