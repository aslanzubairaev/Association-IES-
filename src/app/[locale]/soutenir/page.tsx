/* 
 Этот файл задаёт страницу “Soutenir / Поддержать”.
 Он показывает заголовок и заглушки для будущей информации о помощи организации.
 Здесь можно будет добавить варианты поддержки, реквизиты и форму связи.
*/

import { Container } from "@/components/ui/Container";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export default function SoutenirPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main className="section section--yellow">
      <Container>
        <div className="section-head">
          <h1 className="h2 h2--blue">
            {locale === "fr" ? "Soutenir" : "Поддержать"}
          </h1>
          <p className="muted">
            {locale === "fr"
              ? "Page en construction. Les options de soutien seront ajoutées ici."
              : "Страница в разработке. Варианты поддержки появятся здесь."}
          </p>
        </div>

        <div className="grid-2">
          <div className="card card--paper">
            <h2 className="h3 h3--blue">
              {locale === "fr" ? "Comment aider" : "Как помочь"}
            </h2>
            <p className="p" style={{ marginTop: 10 }}>
              {locale === "fr"
                ? "Bénévolat, dons, partenariats."
                : "Волонтёрство, пожертвования, партнёрства."}
            </p>
          </div>

          <div className="card card--paper">
            <MediaPlaceholder
              title={locale === "fr" ? "Photo / vidéo (à venir)" : "Фото / видео (будет позже)"}
              height={240}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}


