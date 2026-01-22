/* Этот файл задаёт страницу “Контакты / Contact” и показывает, как быстро связаться с ассоциацией (форма + e-mail). */

import { Container } from "@/components/ui/Container";
import { QuickContactForm } from "@/components/contacts/QuickContactForm";
import { ContactEmailBox } from "@/components/contacts/ContactEmailBox";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { contactCopy, resolveContactTopicKey } from "@/content/actions";
import styles from "./page.module.css";

export default function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: { topic?: string };
}) {
  const locale = params.locale;
  const email = "contact@associationies.fr";

  const initialTopic = resolveContactTopicKey(searchParams?.topic);

  // Тексты страницы меняются в зависимости от языка.
  const pageTitle = contactCopy[locale].pageTitle;
  const pageLead = contactCopy[locale].pageLead;
  const whenTitle = contactCopy[locale].whenTitle;
  const whenItems = contactCopy[locale].whenItems;
  const helperTextRu =
    "Опишите ситуацию по пунктам: даты, что уже сделано и какие есть сроки/письма. Так мы ответим быстрее и точнее.";
  const helperTextFr =
    "Décrivez la situation de façon structurée : dates, démarches déjà faites, délais/courriers. Cela nous aide à répondre plus vite et plus précisément.";

  return (
    <main className={`section section--purple contact-page ${styles.contactScope}`}>
      <Container>
        <div className="section-head">
          <h1 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
            {pageTitle}
          </h1>
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {pageLead}
          </p>
        </div>

        <div className="grid-2 contact-grid">
          <div className="card card--paper contact-card contact-card--info">
            {/* Общий e-mail ассоциации: без личных телефонов и персональных контактов. */}
            <ContactEmailBox locale={locale} email={email} />

            {/* Подсказка “когда писать”: помогает человеку понять, подходит ли вопрос. */}
            <h2 className="h3 h3--blue">{whenTitle}</h2>
            <IesList className="list contact-list">
              {whenItems.map((item) => (
                <IesListItem key={item}>{item}</IesListItem>
              ))}
            </IesList>
          </div>

          <div className="card card--paper contact-card contact-card--yellow contact-card--form">
            {/* Форма обращения: визуально как в Hero, но с кнопкой “Отправить сообщение / Envoyer un message”. */}
            <div className="contact-form-wrap">
              <p className={styles.formNote}>{locale === "ru" ? helperTextRu : helperTextFr}</p>
              <QuickContactForm locale={locale} variant="page" initialTopic={initialTopic} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}




