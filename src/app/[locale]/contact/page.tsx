import { Container } from "@/components/ui/Container";
import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { ContactEmailBox } from "@/components/forms/ContactEmailBox";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { ContentCard } from "@/components/ui/Card/ContentCard";
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
    <main className={`section page--purple contact-page ${styles.contactScope}`}>
      <Container>
        <div className="section-head">
          <h1 className="h2">
            {pageTitle}
          </h1>
          <p className="muted-on-dark">
            {pageLead}
          </p>
        </div>

        <div className="grid-2 contact-grid">
          <ContentCard className="contact-card contact-card--info" hoverable={false}>
            {/* Общий e-mail ассоциации: без личных телефонов и персональных контактов. */}
            <ContactEmailBox locale={locale} email={email} />

            {/* Подсказка “когда писать”: помогает человеку понять, подходит ли вопрос. */}
            <div style={{ marginTop: 24 }}>
              <h2 className="h3 h3--blue">{whenTitle}</h2>
              <IesList className="list contact-list">
                {whenItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
            </div>
          </ContentCard>

          <ContentCard className="contact-card contact-card--yellow contact-card--form" hoverable={false}>
            {/* Форма обращения: визуально как в Hero, но с кнопкой “Отправить сообщение / Envoyer un message”. */}
            <div className="contact-form-wrap">
              <p className={styles.formNote}>{locale === "ru" ? helperTextRu : helperTextFr}</p>
              <QuickContactForm locale={locale} variant="page" initialTopic={initialTopic} />
            </div>
          </ContentCard>
        </div>
      </Container>
    </main>
  );
}
