/* 
 Этот файл содержит верхний блок страницы “Aide / Помощь”.
 Он показывает заголовок, короткое объяснение, важную строку про ответ по e-mail и приём по записи.
 Человек может нажать кнопку и перейти на страницу контактов, чтобы описать ситуацию.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { aideCopy } from "@/content/aide";

type AideHeroProps = {
  locale: "ru" | "fr";
};

// Верхний блок страницы: объясняет, что делать, и ведёт на контакты (без телефонов и личных контактов).
export function AideHero({ locale }: AideHeroProps) {
  // Тексты для верхнего блока: RU/FR хранятся вместе, чтобы не размазывать переводы по коду.
  const copy = aideCopy[locale].hero;

  return (
    <section className="section section--purple section-seam-bottom seam-to-pink">
      <Container>
        {/* Заголовок и подзаголовок: человек должен сразу понять смысл страницы. */}
        <div className="section-head">
          <h1 className="h2 h2--blue">{copy.title}</h1>
          {/* Подзаголовок на тёмном фоне делаем светлее, чтобы он читался уверенно. */}
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {copy.line1}
            <br />
            {copy.line2}
          </p>
          {/* Важная короткая строка: фиксируем три ожидания — бесплатно, по записи, ответ по e-mail. */}
          <p className="fineprint" style={{ opacity: 0.9, color: "rgba(255,255,255,.88)" }}>
            {copy.badge}
          </p>

          {/* Главная кнопка: всегда ведёт на страницу контактов выбранного языка. */}
          <div className="btn-row" style={{ marginTop: 10, marginBottom: 0 }}>
            <Link className="btn btn--pill btn--yellow" href={`/${locale}/contacts`}>
              {copy.cta}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}


