/* Этот файл содержит основной контент страницы “Политика конфиденциальности / Politique de confidentialité” и показывает все разделы политики (RU/FR). */

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
  // Основные данные страницы: тексты разделов и ссылки для связи.
  const copy = privacyPageCopy[locale];
  const contactHref = `/${locale}/contact`;
  const email = copy.contactEmail;
  const emailComposeUrl = buildGmailComposeUrl({
    to: email,
    subject: copy.contactSubject,
    body: copy.contactBody,
  });

  return (
    <>
      {/* Верхний блок страницы с заголовком и кратким пояснением о политике. */}
      <Section
        as="main"
        className="page--purple privacy-page"
        title={copy.title}
        subtitle={copy.lead}
      >
        {/* Основная карточка с разделами политики и датой обновления. */}
        <ContentCard
          className="card--paper"
          footerText={`${copy.updatedLabel} ${copy.updatedDate}`}
          hoverable={false}
        >
          <div className="privacy-content">
            {/* Блок о том, кто отвечает за обработку данных. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.whoTitle}</h2>
              <p className="p">{copy.whoText}</p>
            </section>

            {/* Блок со списком категорий данных, которые могут быть получены. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.dataTitle}</h2>
              <IesList className="list">
                {copy.dataItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
            </section>

            {/* Блок с целями обработки данных. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.purposeTitle}</h2>
              <p className="p">{copy.purposeText}</p>
            </section>

            {/* Блок с правовым основанием обработки данных. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.legalTitle}</h2>
              <p className="p">{copy.legalText}</p>
            </section>

            {/* Блок о передаче данных третьим лицам. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.shareTitle}</h2>
              <p className="p">{copy.shareText}</p>
            </section>

            {/* Блок с правами человека в отношении его данных. */}
            <section className="privacy-section">
              <h2 className="h3 h3--blue">{copy.rightsTitle}</h2>
              <IesList className="list">
                {copy.rightsItems.map((item) => (
                  <IesListItem key={item}>{item}</IesListItem>
                ))}
              </IesList>
            </section>

            {/* Блок со способами связи: страница контактов и кнопка написания письма. */}
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

            {/* Блок о cookies и технических данных сайта. */}
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
