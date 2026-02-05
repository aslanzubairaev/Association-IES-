/*
 Этот файл задаёт страницу контактов.
 Он показывает заголовок, карточку с подсказками и форму для обращения.
 Здесь можно заполнить поля и отправить сообщение в ассоциацию.
*/

import { Container } from "@/components/ui/Container";
import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { ContactContextBlock } from "@/components/contacts/ContactContextBlock";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { contactCopy, resolveContactTopicKey } from "@/content/actions";
import { contactIntents } from "@/content/contactIntents";
import styles from "./page.module.css";

export default function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: { topic?: string; intent?: string };
}) {
  const locale = params.locale;

  // Смотрим параметры в адресной строке, чтобы подставить тему и подсказки формы.
  const rawIntent = searchParams?.intent?.trim();
  const intent = rawIntent ? contactIntents[rawIntent] : undefined;
  const initialTopic = intent ? intent.topicValue : resolveContactTopicKey(searchParams?.topic);
  const intentMessagePlaceholder = intent?.messagePlaceholder?.[locale];

  // Заголовок и подзаголовок страницы зависят от языка и выбранной темы.
  const pageTitle = intent?.title[locale] ?? contactCopy[locale].pageTitle;
  const pageLead = contactCopy[locale].pageLead;
  return (
    <main className={`section page--purple contact-page ${styles.contactScope}`}>
      <Container>
        <div className={styles.contactContent}>
          <div className="section-head">
            <h1 className="h2">
              {pageTitle}
            </h1>
            <p className="muted-on-dark">
              {pageLead}
            </p>
          </div>

          {intent ? (
            <ContactContextBlock
              className={styles.contactContext}
              bullets={intent.bullets?.[locale]}
              fineprint={intent.fineprint?.[locale]}
              extraInfo={intent.extraInfo?.[locale]}
            />
          ) : null}

          {/* Карточка контактов: внутри только форма. */}
          <ContentCard className="contact-card contact-card--yellow contact-card--form" hoverable={false}>
            {/* Форма обращения: визуально как в Hero, но с кнопкой “Отправить сообщение / Envoyer un message”. */}
            <div className="contact-form-wrap">
              <QuickContactForm
                locale={locale}
                variant="page"
                initialTopic={initialTopic}
                messagePlaceholderOverride={intentMessagePlaceholder}
              />
            </div>
          </ContentCard>
        </div>
      </Container>
    </main>
  );
}
