/* 
 Этот файл задаёт страницу “Contact / Контакты”.
 Он показывает заголовок и простые блоки-заглушки для будущих способов связи и карты.
 Здесь можно будет добавить форму, ссылки на соцсети и реальные фото.
*/

import { Container } from "@/components/ui/Container";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export default function ContactPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main className="section section--yellow">
      <Container>
        <div className="section-head">
          <h1 className="h2 h2--blue">
            {locale === "fr" ? "Contact" : "Контакты"}
          </h1>
          <p className="muted">
            {locale === "fr"
              ? "Page en construction. Les contacts seront ajoutés ici."
              : "Страница в разработке. Контакты появятся здесь."}
          </p>
        </div>

        <div className="grid-2">
          <div className="card card--paper">
            <h2 className="h3 h3--blue">
              {locale === "fr" ? "Coordonnées" : "Связь"}
            </h2>
            <p className="p" style={{ marginTop: 10 }}>
              {locale === "fr"
                ? "Téléphone, réseaux sociaux, formulaire."
                : "Телефон, соцсети, форма."}
            </p>
          </div>

          <div className="card card--paper">
            <MediaPlaceholder
              title={locale === "fr" ? "Carte / photo (à venir)" : "Карта / фото (будет позже)"}
              height={240}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}




