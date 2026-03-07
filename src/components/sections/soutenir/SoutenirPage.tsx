/* This file contains the main content of the "Support" page. */

import { BankTransferDetails } from "@/components/support/BankTransferDetails";
import { soutenirCopy } from "@/content/actions";
import { Section } from "@/components/ui/Section/Section";
import styles from "./SoutenirPage.module.css";

type SoutenirPageProps = {
  locale: "ru" | "fr";
};

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20.5s-7-4.4-7-10a4.2 4.2 0 0 1 7-3 4.2 4.2 0 0 1 7 3c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7m0 0H7m10 0v10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BankIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 10.5V18m4-7.5V18m4-7.5V18m4-7.5V18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3.5 18H20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4.5 8.5 12 4l7.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 8V6a2 2 0 1 0-4 0v2m0-2V4a2 2 0 1 0-4 0v4m0-2a2 2 0 1 0-4 0v6c0 4.418 3.582 8 8 8h0a8 8 0 0 0 8-8v-4a2 2 0 1 0-4 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5L6.5 11.5L12.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SoutenirPage({ locale }: SoutenirPageProps) {
  const text = soutenirCopy[locale];

  const helloAssoHref =
    "https://www.helloasso.com/associations/association-pour-l-education-et-l-insertion-sociale-integration-education-synergie";
  const cotizUpHref = "https://www.cotizup.com/soutien-ies";
  const volunteerHref = `/${locale}/contact?topic=volunteer`;

  return (
    <main className={`page--purple ${styles.page}`}>
      {/* Donate section */}
      <Section
        eyebrow={locale === "fr" ? "Contribuer" : "Поддержка"}
        title={text.donateTitle}
        titleAs="h1"
        subtitle={text.donateLead}
      >
        <div className={styles.cardsGrid}>
          {/* HelloAsso */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconWrap}>
                <HeartIcon className={styles.icon} />
              </span>
              <h3 className={styles.cardTitle}>{text.helloAssoTitle}</h3>
            </div>
            <p className={styles.cardDesc}>{text.helloAssoText}</p>
            <ul className={styles.benefitsList}>
              {text.helloAssoBenefits.map((item) => (
                <li key={item}><CheckIcon />{item}</li>
              ))}
            </ul>
            <a
              href={helloAssoHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardCta}
            >
              {text.helloAssoCta}
              <ArrowUpRightIcon className={styles.ctaArrow} />
            </a>
          </div>

          {/* CotizUp */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconWrap}>
                <ArrowUpRightIcon className={styles.icon} />
              </span>
              <h3 className={styles.cardTitle}>{text.cotizUpTitle}</h3>
            </div>
            <p className={styles.cardDesc}>{text.cotizUpText}</p>
            <ul className={styles.benefitsList}>
              {text.cotizUpBenefits.map((item) => (
                <li key={item}><CheckIcon />{item}</li>
              ))}
            </ul>
            <a
              href={cotizUpHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardCta}
            >
              {text.cotizUpCta}
              <ArrowUpRightIcon className={styles.ctaArrow} />
            </a>
          </div>

          {/* Bank transfer */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconWrap}>
                <BankIcon className={styles.icon} />
              </span>
              <h3 className={styles.cardTitle}>{text.bankTitle}</h3>
            </div>
            <p className={styles.cardDesc}>{text.bankText}</p>
            <BankTransferDetails locale={locale} iban="FR89 2004 1010 1509 6137 7K03 615" bic="PSSTFRPPSTR" />
          </div>
        </div>

        {/* Important note */}
        <div className={styles.noteCard}>
          <strong className={styles.noteTitle}>{text.importantTitle}</strong>
          <p className={styles.noteText}>{text.importantText}</p>
        </div>
      </Section>

      {/* Volunteer section */}
      <Section
        eyebrow={locale === "fr" ? "S'engager" : "Участие"}
        title={text.volunteerTitle}
      >
        <div className={styles.volunteerGrid}>
          <div className={styles.volunteerCard}>
            <span className={styles.iconWrap}>
              <HandIcon className={styles.icon} />
            </span>
            <p className={styles.volunteerText}>{text.volunteerText}</p>
            <a href={volunteerHref} className={styles.volunteerCta}>
              {text.volunteerCta}
            </a>
          </div>

          <div className={styles.volunteerCard}>
            <strong className={styles.howTitle}>{text.howToHelpTitle}</strong>
            <ul className={styles.howList}>
              {text.howToHelpItems.map((item) => (
                <li key={item}><CheckIcon />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </main>
  );
}
