/* 
 Этот файл содержит блок “Avec quoi on aide / С чем помогаем” для страницы помощи.
 Он показывает набор карточек с темами (документы, CAF/CPAM, жильё/школа/здоровье, CV/работа).
 Человек может быстро найти свою тему и понять, что помощь — по записи (через страницу контактов).
*/

import { Container } from "@/components/ui/Container";

type AideTopicsProps = {
  locale: "ru" | "fr";
};

// Блок с карточками тем: короткие формулировки, чтобы не перегружать новоприбывших.
export function AideTopics({ locale }: AideTopicsProps) {
  const title = locale === "fr" ? "Sur quoi on peut vous aider" : "С чем помогаем";
  const subtitle =
    locale === "fr"
      ? "Des thèmes fréquents — pour comprendre vite et avancer."
      : "Частые темы — чтобы быстро сориентироваться и двигаться дальше.";

  // Данные блока: карточки с темами и кратким описанием (одинаковая структура для RU/FR).
  const topics =
    locale === "fr"
      ? [
          {
            title: "Préfecture & documents",
            text: "Comprendre les étapes, préparer les pièces, organiser votre dossier.",
          },
          {
            title: "CAF / CPAM / France Travail",
            text: "Savoir où déposer, quoi joindre, et comment suivre.",
          },
          {
            title: "Logement, école, santé",
            text: "S’orienter, trouver les bons interlocuteurs, préparer les demandes.",
          },
          {
            title: "CV & emploi",
            text: "Conseils CV, orientation, premières démarches.",
          },
        ]
      : [
          {
            title: "Префектура и документы",
            text: "Подскажем шаги, список документов и как собрать досье.",
          },
          {
            title: "CAF / CPAM / France Travail",
            text: "Поможем понять куда подавать и что приложить.",
          },
          {
            title: "Жильё, школа, здоровье",
            text: "Сориентируем по службам и нужным шагам.",
          },
          {
            title: "CV и работа",
            text: "Советы по CV и маршруту поиска.",
          },
        ];

  const smallLine = locale === "fr" ? "Sur rendez-vous" : "По записи";

  return (
    <section className="section section--pink-2" id="topics">
      <Container>
        <div className="section-head">
          <h2 className="h2 h2--blue">{title}</h2>
          <p className="muted">{subtitle}</p>
        </div>

        {/* Карточки тем: на десктопе 3 колонки, на мобильных — 1 колонка (это уже в стилях). */}
        <div className="cards-grid" aria-label={title}>
          {topics.map((topic) => (
            <article key={topic.title} className="card card--paper accent-left accent--blue">
              {/* Заголовок карточки: название темы, чтобы быстро “сканировать” взглядом. */}
              <h3 className="h3 h3--blue">{topic.title}</h3>

              {/* Короткое описание: 1–2 строки, без лишней бюрократии. */}
              <p className="p" style={{ marginTop: 10 }}>
                {topic.text}
              </p>

              {/* Маленькая строка: подчёркиваем, что приём — по записи. */}
              <p
                className="fineprint"
                style={{ marginTop: 10, opacity: 0.85, color: "rgba(11,27,51,.76)", fontWeight: 800 }}
              >
                {smallLine}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


