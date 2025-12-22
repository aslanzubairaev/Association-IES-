/* Этот файл содержит блок “Перед тем как написать / Avant d’écrire” и показывает чек-лист, что добавить в сообщение. */

import { Container } from "@/components/ui/Container";
import { aideCopy } from "@/content/aide";

type AideBeforeYouWriteProps = {
  locale: "ru" | "fr";
};

// Этот блок помогает человеку подготовить сообщение, чтобы мы смогли ответить быстрее и точнее.
export function AideBeforeYouWrite({ locale }: AideBeforeYouWriteProps) {
  // Тексты и пункты чеклиста для RU/FR лежат в одном месте.
  const copy = aideCopy[locale].beforeYouWrite;

  return (
    <section className="section section--purple" id="before">
      <Container>
        <div className="section-head">
          <h2 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
            {copy.title}
          </h2>
          <p className="muted-on-dark" style={{ color: "rgba(255,255,255,.90)" }}>
            {copy.subtitle}
          </p>
        </div>

        {/* Чеклист: короткий список, чтобы его можно было прочитать за несколько секунд. */}
        <div className="card card--paper">
          <ul className="list" style={{ marginTop: 0 }}>
            {copy.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}


