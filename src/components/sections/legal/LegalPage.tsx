/* Этот файл содержит контент страницы "Mentions légales / Правовая информация" (RU/FR). */

import { buildGmailComposeUrl } from "@/lib/emailCompose";
import { Section } from "@/components/ui/Section/Section";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { legalPageCopy, privacyPageCopy } from "@/content/actions";
import type { ReactNode } from "react";

type LegalPageProps = {
  locale: "ru" | "fr";
};

export default function LegalPage({ locale }: LegalPageProps) {
  const copy = legalPageCopy[locale];
  const email = privacyPageCopy[locale].contactEmail;
  const emailComposeUrl = buildGmailComposeUrl({
    to: email,
    subject: privacyPageCopy[locale].contactSubject,
    body: privacyPageCopy[locale].contactBody,
  });

  function renderLine(line: string) {
    const tokens = [
      {
        token: email,
        render: (key: string) => (
          <a
            key={key}
            className="legal-email-link"
            href={emailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {email}
          </a>
        ),
      },
    ] as const;

    let parts: ReactNode[] = [line];

    tokens.forEach(({ token, render }) => {
      const nextParts: ReactNode[] = [];

      parts.forEach((part, partIndex) => {
        if (typeof part !== "string") {
          nextParts.push(part);
          return;
        }

        const splitParts = part.split(token);
        splitParts.forEach((textPart, textIndex) => {
          if (textPart) {
            nextParts.push(textPart);
          }
          if (textIndex < splitParts.length - 1) {
            nextParts.push(render(`${token}-${partIndex}-${textIndex}`));
          }
        });
      });

      parts = nextParts;
    });

    return (
      <>
        {parts.map((part, idx) => (
          <span key={idx}>{part}</span>
        ))}
      </>
    );
  }

  return (
    <Section as="main" className="page--purple legal-page" title={copy.title} subtitle={copy.lead}>
      <ContentCard
        className="card--paper"
        footerText={`${copy.updatedLabel} ${copy.updatedDate}`}
        hoverable={false}
      >
        <div className="legal-content">
          {copy.sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <h2 className="h3 h3--blue">{section.title}</h2>
              <div className="legal-lines">
                {section.lines.map((line, idx) => (
                  <p className="p" key={`${section.title}-${idx}`}>
                    {renderLine(line)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </ContentCard>
    </Section>
  );
}
