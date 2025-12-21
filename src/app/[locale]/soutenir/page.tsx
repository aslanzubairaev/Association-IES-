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
          heroTitle: "Soutenir l’association",
          heroLead:
            "Votre contribution nous aide à organiser des rencontres, des ateliers et des projets de soutien. Choisissez le format qui vous convient : don, cotisation ou bénévolat.",
          donateTitle: "Don / cotisation",
          donateLead:
            "Les liens HelloAsso et CotizUp peuvent changer — pour recevoir le lien actuel, écrivez-nous.",
          ctaWriteUs: "NOUS ÉCRIRE",
          helloAssoTitle: "HelloAsso",
          helloAssoText: "Don en ligne via HelloAsso (lien sur demande).",
          cotizUpTitle: "CotizUp",
          cotizUpText: "Cotisation / soutien via CotizUp (lien sur demande).",
          bankTitle: "Virement bancaire",
          bankText: "IBAN + BIC (La Banque Postale)",
          importantTitle: "À savoir",
          importantText: "Si vous avez besoin d’un justificatif — écrivez-nous.",
          volunteerTitle: "Devenir bénévole",
          volunteerText:
            "Si vous souhaitez aider lors des activités, pour la traduction ou l’organisation — écrivez-nous.",
          volunteerCta: "JE VEUX AIDER",
          howToHelpTitle: "Comment aider",
          howToHelpItems: [
            "Aide lors des rencontres",
            "Traduction et textes",
            "Organisation et logistique",
            "Photo/vidéo et médias",
          ],
        }
      : {
          heroTitle: "Поддержать ассоциацию",
          heroLead:
            "Ваш вклад помогает нам проводить встречи, занятия и проекты поддержки. Выберите удобный способ — донат, взнос или волонтёрство.",
          donateTitle: "Донат / взносы",
          donateLead:
            "Ссылки HelloAsso и CotizUp могут обновляться — если нужна актуальная ссылка, напишите нам.",
          ctaWriteUs: "НАПИСАТЬ НАМ",
          helloAssoTitle: "HelloAsso",
          helloAssoText: "Онлайн-пожертвование через HelloAsso (ссылка по запросу).",
          cotizUpTitle: "CotizUp",
          cotizUpText: "Взнос/поддержка через CotizUp (ссылка по запросу).",
          bankTitle: "Банковский перевод",
          bankText: "IBAN + BIC (La Banque Postale)",
          importantTitle: "Важно знать",
          importantText: "Если вам нужен чек/подтверждение — напишите нам.",
          volunteerTitle: "Стать волонтёром",
          volunteerText: "Если вы хотите помочь со встречами, переводом или организацией — напишите нам.",
          volunteerCta: "ХОЧУ ПОМОЧЬ",
          howToHelpTitle: "Как можно помочь",
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




