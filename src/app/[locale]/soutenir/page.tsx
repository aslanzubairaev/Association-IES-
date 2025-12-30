/* Этот файл задаёт страницу “Soutenir / Поддержать” и показывает способы поддержки (донат/взнос/волонтёрство). */

import { Container } from "@/components/ui/Container";
import { SupportCard } from "@/components/support/SupportCard";
import { BankTransferDetails } from "@/components/support/BankTransferDetails";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { soutenirCopy } from "@/content/actions";

export default function SoutenirPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Все тексты страницы зависят от языка, который выбран в адресе (/ru или /fr).
  const text = soutenirCopy[locale];

  const helloAssoHref = `/${locale}/contact?topic=donation_helloasso`;
  const cotizUpHref = `/${locale}/contact?topic=donation_cotizup`;
  const volunteerHref = `/${locale}/contact?topic=volunteer`;

  return (
    <main className="page--purple support-page">
      {/* Донат / Dons: три понятных способа, без выдуманных ссылок и реквизитов. */}
      <section className="section section--purple support-donate-section">
        <Container>
          <div className="section-head">
            <h1 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
              {text.donateTitle}
            </h1>
            <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
              {text.donateLead}
            </p>
            <p className="note">{text.donateNote}</p>
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
          <article className="card card--paper support-card accent-left accent--blue support-important">
            <h3 className="h3 h3--blue">{text.importantTitle}</h3>
            <p className="p support-text">
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

          <div className="grid-2 support-volunteer-grid">
            <SupportCard
              title={text.volunteerTitle}
              text={text.volunteerText}
              ctaLabel={text.volunteerCta}
              ctaHref={volunteerHref}
              className="support-card"
            />

            <SupportCard title={text.howToHelpTitle} className="support-card">
              <IesList className="list support-list">
                {text.howToHelpItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
            </SupportCard>
          </div>
        </Container>
      </section>
    </main>
  );
}




