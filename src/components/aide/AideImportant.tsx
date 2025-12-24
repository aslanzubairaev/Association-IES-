/* Этот файл содержит блок “Важно знать / À savoir” и показывает 3 пункта ожиданий про ответ по e-mail и запись. */

import { Container } from "@/components/ui/Container";
import { aideCopy } from "@/content/actions";

type AideImportantProps = {
  locale: "ru" | "fr";
};

// Этот блок задаёт ожидания: чтобы не было недопонимания про график, адрес и “гарантии”.
export function AideImportant({ locale }: AideImportantProps) {
  // Тексты пункта “Важно знать” для RU/FR храним в одном месте.
  const copy = aideCopy[locale].important;

  return (
    <section className="section section--purple" id="important">
      <Container>
        <div className="section-head">
          <h2 className="h2" style={{ color: "rgba(255,255,255,.98)" }}>
            {copy.title}
          </h2>
        </div>

        {/* Список ожиданий: короткие пункты, без длинных абзацев. */}
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


