/* 
 Этот файл задаёт страницу “À propos / О нас”.
 Он показывает заголовок и заглушки, чтобы позже добавить историю, миссию и команду.
 Здесь можно будет заменить блоки на реальные тексты и фото.
*/

import { Container } from "@/components/ui/Container";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export default function AboutPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main className="section section--pink">
      <Container>
        <div className="section-head">
          <h1 className="h2 h2--blue">
            {locale === "fr" ? "À propos" : "О нас"}
          </h1>
          <p className="muted">
            {locale === "fr"
              ? "Page en construction. Nous ajouterons la présentation ici."
              : "Страница в разработке. Презентация будет здесь."}
          </p>
        </div>

        <div className="grid-2">
          <div className="card card--paper">
            <h2 className="h3 h3--blue">
              {locale === "fr" ? "Mission" : "Миссия"}
            </h2>
            <p className="p" style={{ marginTop: 10 }}>
              {locale === "fr"
                ? "Un texte clair sur l’objectif et les valeurs."
                : "Понятный текст о цели и ценностях."}
            </p>
          </div>

          <div className="card card--paper">
            <MediaPlaceholder
              title={locale === "fr" ? "Photo de l’équipe (à venir)" : "Фото команды (будет позже)"}
              height={240}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}


