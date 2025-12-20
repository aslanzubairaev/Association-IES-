/* 
 Этот файл задаёт страницу “Soutenir / Поддержать”.
 Он объясняет, как можно поддержать ассоциацию (донат/взнос/волонтёрство).
 Он помогает выбрать способ поддержки и при необходимости ведёт на страницу контактов для уточнения деталей.
*/

import { Container } from "@/components/ui/Container";
import { SupportCard } from "@/components/support/SupportCard";
import { BankTransferDetails } from "@/components/support/BankTransferDetails";
import Link from "next/link";

export default function SoutenirPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Все тексты страницы зависят от языка, который выбран в адресе (/ru или /fr).
  const text =
    locale === "fr"
      ? {
          heroTitle: "Soutenir l’association",
          heroLead:
            "Votre soutien nous aide à organiser des actions et des rencontres. Nous vous guidons pour choisir le bon moyen.",
          donateTitle: "Dons",
          donateLead:
            "Choisissez un moyen de soutien. Les liens HelloAsso et CotizUp sont à préciser — en cas de doute, écrivez-nous.",
          helloAssoTitle: "HelloAsso",
          helloAssoText: "Don en ligne via HelloAsso (lien à préciser)",
          cotizUpTitle: "CotizUp",
          cotizUpText: "Cotisation / soutien via CotizUp (lien à préciser)",
          bankTitle: "Virement bancaire",
          bankText: "Virement bancaire (La Banque Postale)",
          linkToConfirm: "Lien à préciser",
          transparency: "Si vous avez besoin d’un reçu/justificatif, écrivez-nous.",
          volunteerTitle: "Devenir bénévole",
          volunteerText:
            "Si vous souhaitez aider (événements, traduction, accueil, organisation), écrivez-nous.",
          volunteerCta: "Je veux aider",
        }
      : {
          heroTitle: "Поддержать ассоциацию",
          heroLead:
            "Ваш вклад помогает нам проводить встречи и проекты поддержки. Мы подскажем подходящий способ.",
          donateTitle: "Донат / Взносы",
          donateLead:
            "Выберите способ поддержки. Ссылки HelloAsso и CotizUp уточняются — если есть вопросы, напишите нам.",
          helloAssoTitle: "HelloAsso",
          helloAssoText: "Онлайн-пожертвование через HelloAsso (ссылка уточняется)",
          cotizUpTitle: "CotizUp",
          cotizUpText: "Взнос/поддержка через CotizUp (ссылка уточняется)",
          bankTitle: "Банковский перевод",
          bankText: "Банковский перевод (La Banque Postale)",
          linkToConfirm: "Ссылка уточняется",
          transparency: "Если вам нужен чек/подтверждение — напишите нам.",
          volunteerTitle: "Стать волонтёром",
          volunteerText:
            "Если вы хотите помочь с мероприятиями, переводом, встречами или организацией — напишите нам.",
          volunteerCta: "Хочу помочь",
        };

  return (
    <main>
      {/* HERO / Вступление: коротко объясняем, зачем нужна поддержка, и ведём на контакты. */}
      <section className="section section--yellow section-seam-bottom seam-to-pink">
        <Container>
          <div className="section-head">
            <h1 className="h2 h2--blue">{text.heroTitle}</h1>
            <p className="muted">{text.heroLead}</p>
          </div>
        </Container>
      </section>

      {/* Донат / Dons: три понятных способа, без выдуманных ссылок и реквизитов. */}
      <section className="section section--pink section-seam-bottom seam-to-purple">
        <Container>
          <div className="section-head">
            <h2 className="h2 h2--blue">{text.donateTitle}</h2>
            <p className="muted">{text.donateLead}</p>
          </div>

          {/* Сетка из трёх карточек: одинаковая структура помогает быстро сравнить варианты. */}
          <div className="cards-grid">
            <SupportCard
              title={text.helloAssoTitle}
              text={text.helloAssoText}
              ctaLabel={text.linkToConfirm}
              ctaHref={`/${locale}/contact`}
              className="support-card support-card--pink"
            />
            <SupportCard
              title={text.cotizUpTitle}
              text={text.cotizUpText}
              ctaLabel={text.linkToConfirm}
              ctaHref={`/${locale}/contact`}
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

          {/* Прозрачность: короткая строка о подтверждении/чеке. */}
          <p className="muted" style={{ marginTop: 12 }}>
            {text.transparency}
          </p>
        </Container>
      </section>

      {/* Волонтёрство / Bénévolat: отдельный блок с призывом написать нам. */}
      <section className="section section--purple">
        <Container>
          <div className="grid-2">
            <div className="card card--paper support-panel support-panel--purple">
              <h2 className="h2 h2--blue">{text.volunteerTitle}</h2>
              <p className="p" style={{ marginTop: 10 }}>
                {text.volunteerText}
              </p>
              <div style={{ marginTop: 14 }}>
                <Link className="btn btn--pill btn--mint volunteer-cta" href={`/${locale}/contact`}>
                  {text.volunteerCta}
                </Link>
              </div>
            </div>

            {/* Дополнительное место под будущие примеры задач/проектов: пока оставляем нейтральным. */}
            <div className="card card--paper support-panel support-panel--purple">
              <h3 className="h3 h3--blue">{locale === "fr" ? "Comment aider" : "Как можно помочь"}</h3>
              <ul className="list" style={{ marginTop: 10 }}>
                <li>{locale === "fr" ? "Accueil lors des rencontres" : "Помощь на встречах"}</li>
                <li>{locale === "fr" ? "Traduction et rédaction" : "Перевод и тексты"}</li>
                <li>{locale === "fr" ? "Organisation et logistique" : "Организация и логистика"}</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}




