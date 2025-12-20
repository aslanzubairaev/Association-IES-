/* 
 Этот файл задаёт страницу “Aide / Помощь”.
 Он показывает заголовок и несколько простых блоков-заглушек для будущего контента.
 Здесь можно будет заменить заглушки на реальные тексты, формы и изображения.
*/

import { Container } from "@/components/ui/Container";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export default function AidePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main className="section section--pink">
      <Container>
        <div className="section-head">
          <h1 className="h2 h2--blue">
            {locale === "fr" ? "Aide" : "Помощь"}
          </h1>
          <p className="muted">
            {locale === "fr"
              ? "Page en construction. Le contenu sera ajouté progressivement."
              : "Страница в разработке. Контент будет добавляться постепенно."}
          </p>
        </div>

        <div className="grid-2">
          <div className="card card--paper">
            <h2 className="h3 h3--blue">
              {locale === "fr" ? "Étapes" : "Шаги"}
            </h2>
            <p className="p" style={{ marginTop: 10 }}>
              {locale === "fr"
                ? "Ici, nous mettrons une explication simple du processus."
                : "Здесь будет простое объяснение процесса."}
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


