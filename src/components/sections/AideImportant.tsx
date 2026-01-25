/* Этот файл содержит блок “Важно знать / À savoir” и показывает 3 пункта ожиданий про ответ по e-mail и запись. */

import { Container } from "@/components/ui/Container";
import { IesList, IesListItem } from "@/components/ui/IesList";
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
        <div className="card card--paper aide-card aide-card--wide">
          <IesList className="list">
            {copy.items.map((item) => (
              <IesListItem key={item}>{item}</IesListItem>
            ))}
          </IesList>
        </div>
      </Container>
    </section>
  );
}


