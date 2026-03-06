/*
 Этот файл задаёт страницу контактов.
 Он показывает заголовок, карточку с подсказками и форму для обращения.
 Здесь можно заполнить поля и отправить сообщение в ассоциацию.
*/

import { ContactPageContent } from "@/components/contacts/ContactPageContent";
import { fetchSanityContactIntents } from "@/lib/contact-intents/sanitySource";
import styles from "./page.module.css";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: { topic?: string; intent?: string };
}) {
  const sanityIntents = await fetchSanityContactIntents();

  return (
    <div className={styles.contactScope}>
      {/* Контент страницы контактов — клиентский, чтобы реагировать на выбор темы в списке. */}
      <ContactPageContent
        locale={params.locale}
        initialTopic={searchParams?.topic}
        initialIntentId={searchParams?.intent}
        sanityIntents={sanityIntents ?? undefined}
      />
    </div>
  );
}
