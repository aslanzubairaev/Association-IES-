/* This file contains the main content of the “Privacy Policy” page and displays all policy sections (RU/FR). */

import Link from "next/link";
import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { buildGmailComposeUrl } from "@/lib/emailCompose";
import { privacyPageCopy } from "@/content/actions";

type PrivacyPageProps = {
  locale: "ru" | "fr";
};

export default function PrivacyPage({ locale }: PrivacyPageProps) {
  // Main page data: section texts and contact links.
  const copy = privacyPageCopy[locale];
  const contactHref = `/${locale}/contact`;
  const email = copy.contactEmail;
  const emailComposeUrl = buildGmailComposeUrl({
    to: email,
    subject: copy.contactSubject,
    body: copy.contactBody,
  });
  const cnilUrl = "https://www.cnil.fr";
  const cnilTextParts = copy.rightsCnilText.split(cnilUrl);

  return (
    <>
      {/* Page header block with the title and a brief policy summary. */}
      <Section
        as="main"
        className="page--purple privacy-page"
        title={copy.title}
        subtitle={copy.lead}
      >
        {/* Main card with policy sections and the last-updated date. */}
        <ContentCard
          className="card--paper"
          footerText={`${copy.updatedLabel} ${copy.updatedDate}`}
          hoverable={false}
        >
          <div className="privacy-content">
            {/* Section about who is responsible for data processing. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.whoTitle}</h2>
              <p className="p">{copy.whoText}</p>
            </section>

            {/* Section listing the categories of data that may be collected. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.dataTitle}</h2>
              <IesList className="list">
                {copy.dataItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
            </section>

            {/* Section on the purposes of data processing. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.purposeTitle}</h2>
              <p className="p">{copy.purposeText}</p>
            </section>

            {/* Section on the legal basis for data processing. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.legalTitle}</h2>
              <p className="p">{copy.legalText}</p>
            </section>

            {/* Section on sharing data with third parties. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.shareTitle}</h2>
              <p className="p">{copy.shareText}</p>
            </section>

            {/* Section on the data retention period. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.retentionTitle}</h2>
              <p className="p">{copy.retentionText}</p>
            </section>

            {/* Section on the individual's rights regarding their data. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.rightsTitle}</h2>
              <IesList className="list">
                {copy.rightsItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
              <p className="p">
                {cnilTextParts[0]}
                <a href={cnilUrl} target="_blank" rel="noopener noreferrer">
                  {cnilUrl}
                </a>
                {cnilTextParts[1] ?? ""}
              </p>
            </section>

            {/* Contact methods section: contact page link and compose-email button. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.contactTitle}</h2>
              <p className="p">
                {copy.contactTextBefore}
                <Link href={contactHref}>{copy.contactLinkLabel}</Link>
                {copy.contactTextAfter}
                <a
                  className="privacy-email-link"
                  href={emailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {email}
                </a>
              </p>
            </section>

            {/* Section on cookies and technical site data. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.cookiesTitle}</h2>
              <p className="p">{copy.cookiesText}</p>
            </section>
          </div>
        </ContentCard>
      </Section>
    </>
  );
}
