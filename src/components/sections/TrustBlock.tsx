/* 
 Этот файл содержит блок доверия на главной странице.
 Он показывает короткие причины, почему организации можно доверять, и что человек получит.
 Здесь можно поменять формулировки и список пунктов, не меняя общий стиль.
*/

import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";

type TrustBlockProps = {
  locale: "ru" | "fr";
};

const slantPinkStyle = { "--next": "var(--pink-2)" } as CSSProperties;

// Блок доверия: простой список тезисов, двуязычный.
export function TrustBlock({ locale }: TrustBlockProps) {
  const title = locale === "fr" ? "Confiance" : "Доверие";
  const subtitle =
    locale === "fr"
      ? "Des étapes claires et un soutien humain."
      : "Понятные шаги и человеческая поддержка.";

  const points =
    locale === "fr"
      ? [
          "Une prochaine étape claire, sans jargon",
          "Une action locale à Strasbourg",
          "Un appui pour démarches, emploi et apprentissage",
          "Un réseau de bénévoles et partenaires",
        ]
      : [
          "Понятный следующий шаг без сложных слов",
          "Локальная работа в Страсбурге",
          "Поддержка по документам, работе и обучению",
          "Сеть волонтёров и партнёров",
        ];

  return (
    <section className="section section--purple slant" style={slantPinkStyle}>
      <Container>
        <div className="section-head section-head--on-dark">
          <h2 className="h2">{title}</h2>
          <p className="muted-on-dark">{subtitle}</p>
        </div>

        <div className="grid-2">
          <div className="card card--glass accent-left">
            <h3 className="h3">{locale === "fr" ? "Ce que vous obtenez" : "что вы получаете"}</h3>
            <ul className="list">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="quote-card" role="note" aria-label="цитата">
            <p className="quote-card__text">
              {locale === "fr"
                ? "« Notre mission — ouvrir des chemins. Aider chacun à trouver sa place, ici et maintenant. »"
                : "«Наша миссия — открыть пути. Помочь каждому найти своё место, здесь и сейчас.»"}
            </p>
            <p className="quote-card__sign">ASSOCIATION IES</p>
          </div>
        </div>
      </Container>
    </section>
  );
}





