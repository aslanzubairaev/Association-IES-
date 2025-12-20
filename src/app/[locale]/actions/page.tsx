/* 
 Этот файл задаёт страницу “Actions / Действия” в формате каталога направлений.
 Он показывает короткое вступление и сетку карточек с направлениями (для RU и FR).
 Человек может выбрать подходящее направление и перейти на страницу контактов для записи.
*/

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ActionCard } from "@/components/actions/ActionCard";

export default function ActionsPage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  // Тексты вступления: зависят от языка страницы.
  const pageTitle = locale === "fr" ? "Nos actions" : "Наши направления";
  const pageLead =
    locale === "fr"
      ? "Choisissez une action et écrivez-nous — on vous donnera les détails et proposera une inscription."
      : "Выберите направление и напишите нам — расскажем детали и запишем.";
  const heroButtonLabel = locale === "fr" ? "Nous écrire" : "Написать";

  // Список направлений: одинаковая структура карточек, тексты — на RU/FR.
  const items =
    locale === "fr"
      ? [
          {
            title: "Aide administrative",
            forWho: "Nouveaux arrivants et habitants de Strasbourg",
            benefit: "On clarifie les étapes et les documents",
            whenWhere: "À préciser",
          },
          {
            title: "Préfecture et démarches",
            forWho: "Pour vos démarches administratives",
            benefit: "Préparation et repères sur les procédures",
            whenWhere: "À préciser",
          },
          {
            title: "CAF / CPAM / France Travail",
            forWho: "Pour les questions de dossiers et demandes",
            benefit: "On aide à comprendre quoi déposer et où",
            whenWhere: "À préciser",
          },
          {
            title: "Orientation et intégration",
            forWho: "Pour les personnes récemment arrivées",
            benefit: "Premiers pas et ressources utiles",
            whenWhere: "À préciser",
          },
          {
            title: "Emploi et CV",
            forWho: "Pour la recherche d’emploi",
            benefit: "Conseils CV et méthode de recherche",
            whenWhere: "À préciser",
          },
          {
            title: "Rencontres et événements",
            forWho: "Pour tous",
            benefit: "Échanges, soutien, liens",
            whenWhere: "À préciser",
          },
          {
            title: "Sport et activités",
            forWho: "Enfants et adultes",
            benefit: "Activité régulière et participation",
            whenWhere: "À préciser",
          },
          {
            title: "Sessions d’information",
            forWho: "Pour mieux comprendre les démarches",
            benefit: "Explications courtes sur des thèmes utiles",
            whenWhere: "À préciser",
          },
        ]
      : [
          {
            title: "Административная помощь",
            forWho: "Новоприбывшим и жителям Страсбурга",
            benefit: "Разбираем шаги и список документов",
            whenWhere: "Уточняется",
          },
          {
            title: "Префектура и документы",
            forWho: "Тем, кто оформляет документы",
            benefit: "Подготовка и ориентиры по процедурам",
            whenWhere: "Уточняется",
          },
          {
            title: "CAF / CPAM / France Travail",
            forWho: "Всем, у кого вопросы по заявлениям",
            benefit: "Помогаем понять, что и куда подавать",
            whenWhere: "Уточняется",
          },
          {
            title: "Ориентация и адаптация",
            forWho: "Тем, кто только приехал",
            benefit: "Подскажем первые шаги и полезные ресурсы",
            whenWhere: "Уточняется",
          },
          {
            title: "Поиск работы и CV",
            forWho: "Тем, кто ищет работу",
            benefit: "Советы по CV и маршруту поиска",
            whenWhere: "Уточняется",
          },
          {
            title: "Мероприятия и встречи",
            forWho: "Для всех",
            benefit: "Знакомства, обмен опытом, поддержка",
            whenWhere: "Уточняется",
          },
          {
            title: "Спорт и активность",
            forWho: "Дети и взрослые",
            benefit: "Регулярная активность и участие",
            whenWhere: "Уточняется",
          },
          {
            title: "Информационные сессии",
            forWho: "Тем, кому важны разъяснения",
            benefit: "Короткие объяснения по темам и вопросам",
            whenWhere: "Уточняется",
          },
        ];

  return (
    <main className="section section--pink-2">
      <Container>
        {/* Вступление: коротко объясняет, что делать на странице, и ведёт к контакту. */}
        <div className="section-head">
          <h1 className="h2 h2--blue">{pageTitle}</h1>
          <p className="muted">{pageLead}</p>
          <div className="btn-row" style={{ marginTop: 6 }}>
            <Link className="btn btn--pill btn--blue" href={`/${locale}/contact`}>
              {heroButtonLabel}
            </Link>
          </div>
        </div>

        {/* Каталог направлений: сетка карточек, на мобильных складывается в один столбец. */}
        <div className="cards-grid" aria-label={locale === "fr" ? "Catalogue des actions" : "Каталог направлений"}>
          {items.map((it) => (
            <ActionCard
              key={it.title}
              locale={locale}
              title={it.title}
              forWho={it.forWho}
              benefit={it.benefit}
              whenWhere={it.whenWhere}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}




