/* 
 Этот файл содержит секцию “О нас / À propos” для главной страницы.
 Он показывает короткое объяснение миссии, список целей и кнопку “Написать / Nous écrire”.
 Человек может прочитать, чем занимается Association IES, и перейти на страницу контактов.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IesList, IesListItem } from "@/components/ui/IesList";
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
    <section
      className={`${styles.aboutIntroScope} section section--yellow section-seam-bottom seam-to-pink`}
    >
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{copy.title}</h2>
        </div>

        <div className="grid-2">
          <div className="card card--paper">
            <p className="p">{copy.paragraph1}</p>
            <p className="p" style={{ marginTop: 10 }}>
              {copy.paragraph2}
            </p>
          </div>

          <div className="card card--paper card--highlight">
            <h3 className="h3 h3--blue">{copy.goalsTitle}</h3>
            <IesList className="list" style={{ marginTop: 10 }}>
              {copy.goals.map((goal) => (
                <IesListItem key={goal}>{goal}</IesListItem>
              ))}
            </IesList>

            <div style={{ marginTop: 14 }}>
              <Link className="btn btn--pill btn--blue" href={ctaHref}>
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}



