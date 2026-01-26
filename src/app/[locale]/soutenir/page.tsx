/* Этот файл задаёт страницу “Soutenir / Поддержать” и показывает способы поддержки (донат/взнос/волонтёрство). */

import { SupportCard } from "@/components/support/SupportCard";
import { BankTransferDetails } from "@/components/support/BankTransferDetails";
import supportCardStyles from "@/components/support/SupportCard.module.css";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { soutenirCopy } from "@/content/actions";
import styles from "./page.module.css";
import { Section } from "@/components/ui/Section/Section";

const helloAssoIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M12 20.5s-7-4.4-7-10a4.2 4.2 0 0 1 7-3 4.2 4.2 0 0 1 7 3c0 5.6-7 10-7 10Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cotizUpIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M5 7.5h9.5A4.5 4.5 0 0 1 19 12v0"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 8.5v3.5h-3.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 16.5H9.5A4.5 4.5 0 0 1 5 12v0"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 15.5v-3.5h3.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const bankIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M4 10.5h16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M6 10.5V18m4-7.5V18m4-7.5V18m4-7.5V18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M3.5 18H20.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M4.5 8.5 12 4l7.5 4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SoutenirPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Все тексты страницы зависят от языка, который выбран в адресе (/ru или /fr).
  const text = soutenirCopy[locale];

  const helloAssoHref =
    "https://www.helloasso.com/associations/association-pour-l-education-et-l-insertion-sociale-integration-education-synergie";
  const cotizUpHref = "https://www.cotizup.com/soutien-ies";
  const volunteerHref = `/${locale}/contact?topic=volunteer`;

  return (
    <div className={styles.supportScope}>
      <main className="page--purple support-page">
        {/* Донат / Dons: три понятных способа, без выдуманных ссылок и реквизитов. */}
        <Section className="support-donate-section"
          title={text.donateTitle}
          titleAs="h1"
          subtitle={text.donateLead}
        >
          {text.donateNote && <p className="note-hero note-center">{text.donateNote}</p>}

          {/* Сетка из трёх карточек: одинаковая структура помогает быстро сравнить варианты. */}
          <div className={styles.supportCardsGrid}>
            <SupportCard
              title={text.helloAssoTitle}
              icon={helloAssoIcon}
              text={text.helloAssoText}
              ctaLabel={text.helloAssoCta}
              ctaHref={helloAssoHref}
              className="support-card support-card--pink"
            >
              <div className="support-info-panel">
                <div className="support-info-title">{text.benefitsTitle}</div>
                <IesList className="list support-info-list">
                  {text.helloAssoBenefits.map((item) => (
                    <IesListItem key={item}>{item}</IesListItem>
                  ))}
                </IesList>
              </div>
            </SupportCard>
            <SupportCard
              title={text.cotizUpTitle}
              icon={cotizUpIcon}
              text={text.cotizUpText}
              ctaLabel={text.cotizUpCta}
              ctaHref={cotizUpHref}
              className="support-card support-card--pink"
            >
              <div className="support-info-panel">
                <div className="support-info-title">{text.benefitsTitle}</div>
                <IesList className="list support-info-list">
                  {text.cotizUpBenefits.map((item) => (
                    <IesListItem key={item}>{item}</IesListItem>
                  ))}
                </IesList>
              </div>
            </SupportCard>
            <SupportCard
              title={text.bankTitle}
              icon={bankIcon}
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
            className={`card card--paper support-card accent-left accent--blue support-important ${supportCardStyles.supportCard}`}
          >
            <h3 className="h3 h3--blue">{text.importantTitle}</h3>
            <p className={`p support-text ${supportCardStyles.supportText}`}>
              {text.importantText}
            </p>
          </article>
        </Section>

        {/* Волонтёрство / Bénévolat: отдельный блок с призывом написать нам. */}
        <Section title={text.volunteerTitle}>
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
        </Section>
      </main>
    </div>
  );
}
