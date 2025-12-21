/* 
 Этот файл содержит блок “Важно знать / À savoir” для страницы помощи.
 Он показывает короткие ожидания: как мы отвечаем, как проходит запись, и какие ограничения есть.
 Человек читает это и понимает, чего ждать и чего мы не обещаем.
*/

import { Container } from "@/components/ui/Container";
import { aideCopy } from "@/content/aide";

type AideImportantProps = {
  locale: "ru" | "fr";
};

// Этот блок задаёт ожидания: чтобы не было недопонимания про график, адрес и “гарантии”.
export function AideImportant({ locale }: AideImportantProps) {
  // Тексты пункта “Важно знать” для RU/FR храним в одном месте.
  const copy = aideCopy[locale].important;

  return (
    <section className="section section--pink-2" id="important">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{copy.title}</h2>
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


