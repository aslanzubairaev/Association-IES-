/* 
 Этот файл задаёт страницу “Contact / Контакты”.
 Он показывает понятные способы связаться с ассоциацией: форму и общий e-mail.
 Человек может написать сообщение через форму (она откроет письмо в почте) или нажать на e-mail.
*/

import { Container } from "@/components/ui/Container";
import { QuickContactForm } from "@/components/contact/QuickContactForm";

export default function ContactPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;
  const email = "contact@associationies.fr";
  const mailto = `mailto:${email}`;

  // Тексты страницы меняются в зависимости от языка.
  const pageTitle = locale === "fr" ? "Contact" : "Контакты";
  const pageLead =
    locale === "fr"
      ? "Écrivez-nous via le formulaire ou par e-mail. Réponse par e-mail. Accueil sur rendez-vous."
      : "Напишите нам через форму или по email. Ответим по email. Приём — по записи.";
  const whenTitle = locale === "fr" ? "Quand écrire ?" : "Когда писать?";
  const whenItems =
    locale === "fr"
      ? [
          "Démarches / préfecture",
          "CAF / CPAM / France Travail",
          "Logement / école / santé",
          "CV / recherche d’emploi / orientation",
          "Questions sur nos actions",
        ]
      : [
          "Документы / префектура",
          "CAF / CPAM / France Travail",
          "Жильё / школа / здоровье",
          "CV / работа / ориентация",
          "Вопросы по проектам ассоциации",
        ];

  return (
    <main className="section section--yellow">
      <Container>
        <div className="section-head">
          <h1 className="h2 h2--blue">
            {pageTitle}
          </h1>
          <p className="muted">
            {pageLead}
          </p>
        </div>

        <div className="grid-2">
          <div className="card card--paper">
            {/* Общий e-mail ассоциации: без личных телефонов и персональных контактов. */}
            <div className="contact-box" style={{ marginBottom: 16 }}>
              <div>
                <b>E-mail:</b>{" "}
                <a href={mailto} style={{ textDecoration: "underline" }}>
                  {email}
                </a>
              </div>
            </div>

            {/* Подсказка “когда писать”: помогает человеку понять, подходит ли вопрос. */}
            <h2 className="h3 h3--blue">{whenTitle}</h2>
            <ul className="list" style={{ marginTop: 10 }}>
              {whenItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card card--paper">
            {/* Форма обращения: визуально как в Hero, но с кнопкой “Отправить сообщение / Envoyer un message”. */}
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <QuickContactForm locale={locale} variant="page" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}




