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
  const title = locale === "fr" ? "Confiance" : "доверие";
  const subtitle =
    locale === "fr"
      ? "Des repères simples et un accompagnement humain."
      : "Понятные шаги и человеческая поддержка.";

  const points =
    locale === "fr"
      ? [
          "Un prochain pas clair, sans jargon.",
          "Présence locale à Strasbourg.",
          "Soutien sur les documents, l’emploi et l’éducation.",
          "Réseau de bénévoles et partenaires.",
        ]
      : [
          "Понятный следующий шаг без сложных слов.",
          "Локальная работа в Страсбурге.",
          "Поддержка по документам, работе и обучению.",
          "Сеть волонтёров и партнёров.",
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
                : "“Наша миссия — открыть пути. Помочь каждому найти своё место, здесь и сейчас.”"}
            </p>
            <p className="quote-card__sign">Association IES</p>
          </div>
        </div>
      </Container>
    </section>
  );
}


