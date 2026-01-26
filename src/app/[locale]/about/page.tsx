import { Container } from "@/components/ui/Container";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { aboutPageCopy } from "@/content/actions";
import styles from "./page.module.css";

export default function AboutPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  const copy = aboutPageCopy[locale];

  // Кнопки на странице: только общие ссылки без личных контактов.
  const contactLabel = copy.contactLabel;
  const contactHref = `/${locale}/contact`;
  const supportLabel = copy.supportLabel;
  const supportHref = `/${locale}/soutenir`;
  const ctaTitle = copy.ctaTitle;
  const ctaList = copy.ctaList;

  return (
    <div className={styles.aboutScope}>
      <main className="section page--purple about-page">
        <Container>
          <div className="section-head">
            <h1 className="h2">
              {copy.title}
            </h1>
            <p className="muted-on-dark">
              {copy.heroLines[0]}
              <br />
              {copy.heroLines[1]}
              <br />
              {copy.heroLines[2]}
            </p>
          </div>

          {/* Верхний блок: “кто мы” и “наши цели” в двух карточках рядом. */}
          <div className="grid-2">
            <ContentCard
              className="about-card"
              id="who"
              description={copy.mainParagraphs}
            />

            <ContentCard
              className="about-card"
              highlight
              title={copy.goalsTitle}
              listItems={copy.goals}
            />
          </div>

          {/* Нижний блок: “сила IES” и понятный призыв к действию в двух карточках рядом. */}
          <div className="grid-2">
            <ContentCard
              className="about-card"
              title={copy.strengthTitle}
              listItems={copy.strengthItems}
            />

            <ContentCard
              className="about-card"
              highlight
              title={ctaTitle}
              listItems={ctaList}
              actions={[
                { label: contactLabel, href: contactHref, variant: "pill" }, // Blue default
                { label: supportLabel, href: supportHref, variant: "mint" }
              ]}
            />
          </div>
        </Container>
      </main>
    </div>
  );
}




