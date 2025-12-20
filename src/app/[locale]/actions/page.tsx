/* 
 Этот файл задаёт страницу “Actions / Действия”.
 Он показывает заголовок и простые блоки-заглушки для будущих программ и описаний.
 Здесь можно будет добавить список программ, расписание и фотографии.
*/

import { Container } from "@/components/ui/Container";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export default function ActionsPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main className="section section--pink-2">
      <Container>
        <div className="section-head">
          <h1 className="h2 h2--blue">
            {locale === "fr" ? "Actions" : "Действия"}
          </h1>
          <p className="muted">
            {locale === "fr"
              ? "Page en construction. Les programmes seront ajoutés ici."
              : "Страница в разработке. Программы будут добавлены здесь."}
          </p>
        </div>

        <div className="grid-2">
          <div className="card card--paper">
            <h2 className="h3 h3--blue">
              {locale === "fr" ? "Programmes" : "Программы"}
            </h2>
            <p className="p" style={{ marginTop: 10 }}>
              {locale === "fr"
                ? "Liste des activités, formats et fréquence."
                : "Список активностей, форматы и частота."}
            </p>
          </div>

          <div className="card card--paper">
            <MediaPlaceholder
              title={locale === "fr" ? "Galerie (à venir)" : "Галерея (будет позже)"}
              height={240}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}


