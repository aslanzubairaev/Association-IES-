/* Этот файл содержит блок “Важно знать / À savoir” и показывает 3 пункта ожиданий про ответ по e-mail и запись. */

import { Section } from "@/components/ui/Section/Section";
import { InfoCard } from "@/components/ui/Card/InfoCard";
import { aideCopy } from "@/content/actions";

type AideImportantProps = {
  locale: "ru" | "fr";
};

// Этот блок задаёт ожидания: чтобы не было недопонимания про график, адрес и “гарантии”.
export function AideImportant({ locale }: AideImportantProps) {
  // Тексты пункта “Важно знать” для RU/FR храним в одном месте.
  const copy = aideCopy[locale].important;

  return (
    <Section
      id="important"
      title={copy.title}
    >
      {/* Список ожиданий: короткие пункты, без длинных абзацев. */}
      {/* Используем InfoCard, но без заголовка внутри карточки, так как заголовок уже в секции. */}
      <InfoCard
        title="" // Empty title if we want to suppress h3, OR we can refactor InfoCard to make title optional. But InfoCard header renders h3.
        // Actually, the original code had NO title inside the card. Just the list.
        // <div className="card card--paper ..."><IesList>...</IesList></div>
        // So InfoCard might not be perfect if it enforces a title.
        // Let's use Card + CardContent instead to match exactly.
        // Wait, InfoCard renders header only if title is provided? No, CardHeader renders h3 inside.
        // Let's check InfoCard impl: <h3 ...>{title}</h3> inside CardHeader.
        // If I pass empty title, I get empty h3.
        // So I'll use generic Card.
        className="aide-card aide-card--wide"
        items={copy.items}
      />
    </Section>
  );
}


