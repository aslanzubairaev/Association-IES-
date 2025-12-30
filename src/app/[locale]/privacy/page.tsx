/* Этот файл задаёт страницу “Политика конфиденциальности / Politique de confidentialité” (RU/FR). */

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { buildGmailComposeUrl } from "@/lib/emailCompose";
import { privacyPageCopy } from "@/content/actions";

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
    <main className="section section--soft privacy-page">
      <Container>
        <div className="section-head">
          <h1 className="h2 h2--blue privacy-title">{copy.title}</h1>
          <p className="lead">{copy.lead}</p>
        </div>

        <article className="card card--paper">
          <div style={{ display: "grid", gap: 18 }}>
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
              <h2 className="h3 h3--blue">{copy.retentionTitle}</h2>
              <p className="p">{copy.retentionText}</p>
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
                  className="privacy-email-link"
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

          <p className="muted" style={{ marginTop: 16 }}>
            {copy.updatedLabel} {copy.updatedDate}
          </p>
        </article>
      </Container>
    </main>
  );
}
