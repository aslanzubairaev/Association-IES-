/* Этот файл задаёт страницу “Политика конфиденциальности / Politique de confidentialité” (RU/FR). */

import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { buildGmailComposeUrl } from "@/lib/emailCompose";
import { privacyPageCopy } from "@/content/actions";
import styles from "./page.module.css";

export function generateMetadata({
  params,
}: {
  params: { locale: "ru" | "fr" };
}): Metadata {
  const copy = privacyPageCopy[params.locale];

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
  };
}

export default function PrivacyPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;
  const copy = privacyPageCopy[locale];
  const contactHref = `/${locale}/contact`;
  const email = copy.contactEmail;
  const emailComposeUrl = buildGmailComposeUrl({
    to: email,
    subject: copy.contactSubject,
    body: copy.contactBody,
  });

  return (
    <div className={styles.privacyScope}>
      <Section
        as="main"
        className="page--purple privacy-page"
        title={copy.title}
        subtitle={copy.lead}
      >
        <ContentCard
          className="card--paper"
          footerText={`${copy.updatedLabel} ${copy.updatedDate}`}
          hoverable={false}
        >
          <div className={styles.privacyContent}>
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.whoTitle}</h2>
              <p className="p">{copy.whoText}</p>
            </section>

            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.dataTitle}</h2>
              <IesList className="list">
                {copy.dataItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
            </section>

            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.purposeTitle}</h2>
              <p className="p">{copy.purposeText}</p>
            </section>

            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.legalTitle}</h2>
              <p className="p">{copy.legalText}</p>
            </section>

            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.shareTitle}</h2>
              <p className="p">{copy.shareText}</p>
            </section>

            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.rightsTitle}</h2>
              <IesList className="list">
                {copy.rightsItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
            </section>

            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.contactTitle}</h2>
              <p className="p">
                {copy.contactTextBefore}
                <Link href={contactHref}>{copy.contactLinkLabel}</Link>
                {copy.contactTextAfter}
                <a
                  className={styles.privacyEmailLink}
                  href={emailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {email}
                </a>
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.cookiesTitle}</h2>
              <p className="p">{copy.cookiesText}</p>
            </section>
          </div>
        </ContentCard>
      </Section>
    </div>
  );
}
