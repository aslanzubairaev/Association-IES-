/* Этот файл задаёт страницу “Контакты / Contact” и показывает, как быстро связаться с ассоциацией (форма + e-mail). */

import { Container } from "@/components/ui/Container";
import { QuickContactForm } from "@/components/contacts/QuickContactForm";
import { ContactEmailBox } from "@/components/contacts/ContactEmailBox";
import { contactCopy, contactTopicLabels, getActionTopicLabels } from "@/content/actions";

export default function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: { topic?: string };
}) {
  const locale = params.locale;
  const email = "contact@associationies.fr";

  // Этот словарь нужен, чтобы по параметру topic подставить понятную строку в начале сообщения.
  const topicLabels = contactTopicLabels;

  // Этот словарь нужен для “Действия / Actions”: тема должна выглядеть как “Действия — <направление>”.
  const actionTopicLabels = getActionTopicLabels();

  // Если тема пришла из другой страницы, добавляем её в начало текста — так человеку проще написать.
  const rawTopic = searchParams?.topic;
  const topicLabel = rawTopic ? topicLabels[rawTopic] : null;
  const actionTopicLabel = rawTopic ? actionTopicLabels[rawTopic] : null;
  const subjectLabel = contactCopy[locale].subjectLabel;
  const prefillMessage =
    actionTopicLabel && rawTopic
      ? `${subjectLabel}: ${locale === "fr" ? actionTopicLabel.fr : actionTopicLabel.ru}\n\n`
      : topicLabel && rawTopic
        ? `${subjectLabel}: ${locale === "fr" ? topicLabel.fr : topicLabel.ru}\n\n`
        : rawTopic
          ? `${subjectLabel}: ${rawTopic}\n\n`
          : undefined;

  // Тексты страницы меняются в зависимости от языка.
  const pageTitle = contactCopy[locale].pageTitle;
  const pageLead = contactCopy[locale].pageLead;
  const whenTitle = contactCopy[locale].whenTitle;
  const whenItems = contactCopy[locale].whenItems;

  return (
    <main className="section section--purple">
      <Container>
        <div className="section-head">
          <h1 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
            {pageTitle}
          </h1>
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {pageLead}
          </p>
        </div>

        <div className="grid-2">
          <div className="card card--paper contact-card accent-left accent--blue">
            {/* Общий e-mail ассоциации: без личных телефонов и персональных контактов. */}
            <ContactEmailBox locale={locale} email={email} />

            {/* Подсказка “когда писать”: помогает человеку понять, подходит ли вопрос. */}
            <h2 className="h3 h3--blue">{whenTitle}</h2>
            <ul className="list" style={{ marginTop: 10 }}>
              {whenItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card card--paper contact-card contact-card--yellow">
            {/* Форма обращения: визуально как в Hero, но с кнопкой “Отправить сообщение / Envoyer un message”. */}
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <QuickContactForm locale={locale} variant="page" prefillMessage={prefillMessage} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}




