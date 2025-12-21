/* Этот файл задаёт страницу “Soutenir / Поддержать” и показывает способы поддержки (донат/взнос/волонтёрство). */

import { Container } from "@/components/ui/Container";
import { SupportCard } from "@/components/support/SupportCard";
import { BankTransferDetails } from "@/components/support/BankTransferDetails";

export default function SoutenirPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Все тексты страницы зависят от языка, который выбран в адресе (/ru или /fr).
  const text =
    locale === "fr"
      ? {
          heroTitle: "SOUTENIR L’ASSOCIATION",
          heroLead:
            "Votre contribution nous aide à organiser des rencontres, des ateliers et des projets d’accompagnement. Choisissez une option : don, cotisation ou bénévolat.",
          donateTitle: "DONS / COTISATIONS",
          donateLead:
            "Les liens HelloAsso et CotizUp peuvent changer — écrivez-nous via le formulaire et nous vous enverrons le lien à jour.",
          ctaWriteUs: "Demander le lien",
          helloAssoTitle: "HelloAsso",
          helloAssoText: "Don en ligne via HelloAsso. Lien envoyé sur demande.",
          cotizUpTitle: "CotizUp",
          cotizUpText: "Cotisation / soutien via CotizUp. Lien envoyé sur demande.",
          bankTitle: "VIREMENT BANCAIRE",
          bankText: "IBAN + BIC (La Banque Postale)",
          importantTitle: "À SAVOIR",
          importantText: "Besoin d’un reçu / justificatif ? Écrivez-nous — nous vous répondrons par e-mail.",
          volunteerTitle: "DEVENIR BÉNÉVOLE",
          volunteerText:
            "Vous souhaitez aider lors des rencontres, pour la traduction ou l’organisation ? Écrivez-nous via le formulaire — réponse par e-mail.",
          volunteerCta: "JE VEUX AIDER",
          howToHelpTitle: "COMMENT AIDER",
          howToHelpItems: [
            "Aide lors des rencontres",
            "Traduction et rédaction",
            "Organisation et logistique",
            "Photo/vidéo et médias",
          ],
        }
      : {
          heroTitle: "ПОДДЕРЖАТЬ АССОЦИАЦИЮ",
          heroLead:
            "Ваш вклад помогает нам проводить встречи, занятия и проекты поддержки. Выберите удобный способ: донат, взнос или волонтёрство.",
          donateTitle: "ДОНАТ / ВЗНОСЫ",
          donateLead:
            "Ссылки HelloAsso и CotizUp могут обновляться — напишите нам через форму, и мы пришлём актуальную.",
          ctaWriteUs: "Запросить ссылку",
          helloAssoTitle: "HelloAsso",
          helloAssoText: "Онлайн-пожертвование через HelloAsso. Ссылку пришлём по запросу.",
          cotizUpTitle: "CotizUp",
          cotizUpText: "Взнос/поддержка через CotizUp. Ссылку пришлём по запросу.",
          bankTitle: "БАНКОВСКИЙ ПЕРЕВОД",
          bankText: "IBAN + BIC (La Banque Postale)",
          importantTitle: "ВАЖНО ЗНАТЬ",
          importantText: "Если вам нужен чек/подтверждение — напишите нам, и мы ответим по e-mail.",
          volunteerTitle: "СТАТЬ ВОЛОНТЁРОМ",
          volunteerText:
            "Хотите помочь со встречами, переводом или организацией? Напишите нам через форму — мы ответим по e-mail.",
          volunteerCta: "ХОЧУ ПОМОЧЬ",
          howToHelpTitle: "КАК МОЖНО ПОМОЧЬ",
          howToHelpItems: ["Помощь на встречах", "Перевод и тексты", "Организация и логистика", "Фото/видео и медиа"],
        };

  const helloAssoHref = `/${locale}/contacts?topic=donation_helloasso`;
  const cotizUpHref = `/${locale}/contacts?topic=donation_cotizup`;
  const volunteerHref = `/${locale}/contacts?topic=volunteer`;

  return (
    <main className="page--purple">
      {/* HERO / Вступление: коротко объясняем, зачем нужна поддержка. */}
      <section className="section section--purple">
        <Container>
          <div className="section-head">
            <h1 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
              {text.heroTitle}
            </h1>
            <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
              {text.heroLead}
            </p>
          </div>
        </Container>
      </section>

      {/* Донат / Dons: три понятных способа, без выдуманных ссылок и реквизитов. */}
      <section className="section section--purple">
        <Container>
          <div className="section-head">
            <h2 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
              {text.donateTitle}
            </h2>
            <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
              {text.donateLead}
            </p>
          </div>

          {/* Сетка из трёх карточек: одинаковая структура помогает быстро сравнить варианты. */}
          <div className="actions-cards-grid">
            <SupportCard
              title={text.helloAssoTitle}
              text={text.helloAssoText}
              ctaLabel={text.ctaWriteUs}
              ctaHref={helloAssoHref}
              className="support-card support-card--pink"
            />
            <SupportCard
              title={text.cotizUpTitle}
              text={text.cotizUpText}
              ctaLabel={text.ctaWriteUs}
              ctaHref={cotizUpHref}
              className="support-card support-card--pink"
            />
            <SupportCard
              title={text.bankTitle}
              text={text.bankText}
              className="support-card support-card--pink"
            >
              {/* Реквизиты перевода: человек может нажать и быстро скопировать IBAN/BIC для приложения банка. */}
              <BankTransferDetails
                locale={locale}
                iban="FR89 2004 1010 1509 6137 7K03 615"
                bic="PSSTFRPPSTR"
              />
            </SupportCard>
          </div>

          {/* Важное сообщение: короткий блок как “Важно знать”, чтобы не терять эту деталь. */}
          <article
            className="card card--paper accent-left accent--blue"
            style={{ marginTop: 16 }}
          >
            <h3 className="h3 h3--blue">{text.importantTitle}</h3>
            <p className="p" style={{ marginTop: 10 }}>
              {text.importantText}
            </p>
          </article>
        </Container>
      </section>

      {/* Волонтёрство / Bénévolat: отдельный блок с призывом написать нам. */}
      <section className="section section--purple">
        <Container>
          <div className="section-head">
            <h2 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
              {text.volunteerTitle}
            </h2>
          </div>

          <div className="grid-2">
            <SupportCard
              title={text.volunteerTitle}
              text={text.volunteerText}
              ctaLabel={text.volunteerCta}
              ctaHref={volunteerHref}
              className="support-card"
            />

            <SupportCard title={text.howToHelpTitle} className="support-card">
              <ul className="list" style={{ marginTop: 10 }}>
                {text.howToHelpItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SupportCard>
          </div>
        </Container>
      </section>
    </main>
  );
}




