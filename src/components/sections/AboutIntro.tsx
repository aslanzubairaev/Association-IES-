/* 
 Этот файл содержит секцию “О нас / À propos” для главной страницы.
 Он показывает короткое объяснение миссии, список целей и кнопку “Написать / Nous écrire”.
 Человек может прочитать, чем занимается Association IES, и перейти на страницу контактов.
*/

import { Section } from "@/components/ui/Section/Section";
import { InfoCard } from "@/components/ui/Card/InfoCard";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { aboutIntroCopy } from "@/content/actions";
import styles from "./AboutIntro.module.css";

type AboutIntroProps = {
  locale: "ru" | "fr";
};

// Секция “О нас”: тексты и подписи зависят от выбранного языка страницы.
export function AboutIntro({ locale }: AboutIntroProps) {
  const copy = aboutIntroCopy[locale];

  // Кнопка действия: ведёт на страницу контактов выбранного языка.
  const ctaLabel = copy.ctaLabel;
  const ctaHref = `/${locale}/contact`;

  return (
    <Section
      className={`about-intro ${styles.aboutIntro} section-seam-bottom seam-to-pink`}
      id="intro"
      title={copy.title}
    >
      <div className="grid-2">
        <Card>
          <CardContent>
            <p className="p">{copy.paragraph1}</p>
            <p className="p" style={{ marginTop: 10 }}>
              {copy.paragraph2}
            </p>
          </CardContent>
        </Card>

        <InfoCard
          className="card--highlight"
          title={copy.goalsTitle}
          items={copy.goals}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </div>
    </Section>
  );
}



