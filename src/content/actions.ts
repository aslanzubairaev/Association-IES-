export type ActionsLocale = "ru" | "fr";

export type ActionDirection = {
  slug: string;
  title: string;
  forWho: string;
  benefit: string;
  frequency: string;
};

type ActionsCopy = {
  hero: {
    title: string;
    lead: string;
    hint: string;
    ctaScroll: string;
    ctaWrite: string;
  };
  directions: {
    title: string;
    subtitle: string;
    forWhoLabel: string;
    benefitLabel: string;
    frequencyLabel: string;
    whenWhereLabel: string;
    whenWhereText: string;
    cta: string;
  };
  participate: {
    title: string;
    steps: string[];
    ctaToContacts: string;
  };
  important: {
    title: string;
    items: string[];
  };
  finalCta: {
    text: string;
    button: string;
  };
  items: ActionDirection[];
};

export const actionsCopy: Record<ActionsLocale, ActionsCopy> = {
  ru: {
    hero: {
      title: "Действия",
      lead:
        "Проекты, встречи и программы ассоциации IES: образование, спорт, культура, поддержка и интеграция. Выберите направление — расскажем детали и предложим запись.",
      hint: "Выберите направление ниже и нажмите «Узнать детали / записаться» — мы ответим и подскажем следующий шаг.",
      ctaScroll: "Посмотреть направления",
      ctaWrite: "Записаться / Написать",
    },
    directions: {
      title: "Направления",
      subtitle: "Коротко: для кого каждое направление, что даёт и как записаться.",
      forWhoLabel: "Для кого",
      benefitLabel: "Что даёт",
      frequencyLabel: "Формат / частота",
      whenWhereLabel: "Когда / где:",
      whenWhereText: "Уточняется при записи",
      cta: "Узнать детали / Записаться",
    },
    participate: {
      title: "Как участвовать",
      steps: [
        "Выберите направление выше (в списке).",
        "Напишите через форму или на e‑mail на странице контактов.",
        "Мы ответим и предложим вариант записи.",
        "Время и место зависят от проекта — уточняются при записи.",
      ],
      ctaToContacts: "Перейти к контактам",
    },
    important: {
      title: "ВАЖНО ЗНАТЬ",
      items: [
        "Участие и помощь — по записи и по конкретному проекту (без общего расписания).",
        "Время и место уточняются при записи — мы не публикуем единый адрес/график.",
        "Запись и вопросы — через форму и e-mail на странице “Контакты”.",
        "Личные телефоны/WhatsApp руководителей не публикуются.",
      ],
    },
    finalCta: {
      text: "Есть вопрос по проектам ассоциации? Напишите — подскажем, с чего начать.",
      button: "Написать",
    },
    items: [
      {
        slug: "permanences-administratives",
        title: "Административные консультации (по записи)",
        forWho: "Для семей, новоприбывших и жителей, у кого есть вопросы по документам и письмам",
        benefit: "Понятные шаги и список того, что подготовить для следующего действия",
        frequency: "По записи • в течение года",
      },
      {
        slug: "emploi-cv",
        title: "Сопровождение к работе и CV",
        forWho: "Для тех, кто ищет работу, стажировку или хочет улучшить CV",
        benefit: "Ориентиры по поиску, оформление CV и подготовка к следующему шагу",
        frequency: "Регулярно • по группам и индивидуально (по проекту)",
      },
      {
        slug: "langues-ateliers",
        title: "Языковые занятия и развитие (вкл. чеченский и русский)",
        forWho: "Для детей и взрослых, кто хочет укрепить язык и навыки общения",
        benefit: "Практика языка, уверенность в общении и участие в жизни города",
        frequency: "Регулярно • по группам / мастерские (по проекту)",
      },
      {
        slug: "sport",
        title: "Спорт и регулярная активность",
        forWho: "Для детей, подростков и взрослых",
        benefit: "Здоровая активность, дисциплина, командный дух и включённость",
        frequency: "Регулярно • в течение года",
      },
      {
        slug: "jardin-ateliers-nature",
        title: "Сад, мастерские и встречи на природе",
        forWho: "Для семей, детей и всех, кому важны совместные дела и общение",
        benefit: "Совместная деятельность, навыки и тёплые встречи вне формальностей",
        frequency: "Сезонно / по событиям",
      },
      {
        slug: "sorties-culturelles",
        title: "Культурные выходы и поездки",
        forWho: "Для семей, подростков и взрослых",
        benefit: "Открытие города и региона, новые знакомства, расширение кругозора",
        frequency: "По событиям • в течение года",
      },
      {
        slug: "forums-jeunesse-entrepreneuriat",
        title: "Форумы молодёжи и предпринимательства",
        forWho: "Для молодёжи и тех, кто интересуется инициативами и проектами",
        benefit: "Встречи, вдохновение, полезные контакты и ориентация по возможностям",
        frequency: "По событиям (форумы / встречи)",
      },
      {
        slug: "rencontres-cohesion",
        title: "Встречи и сплочение сообщества",
        forWho: "Для всех, кто хочет общаться, поддерживать друг друга и интегрироваться",
        benefit: "Обмен опытом, поддержка, участие и чувство принадлежности",
        frequency: "Регулярно и по событиям",
      },
    ],
  },
  fr: {
    hero: {
      title: "Nos actions",
      lead:
        "Projets, rencontres et programmes de l’association IES : éducation, sport, culture, accompagnement et intégration. Choisissez un axe — on vous précise les détails et propose une inscription.",
      hint: "Choisissez un axe ci-dessous et cliquez sur « Détails / inscription » — on vous répond et on vous indique la prochaine étape.",
      ctaScroll: "Voir les actions",
      ctaWrite: "S’inscrire / Écrire",
    },
    directions: {
      title: "Axes",
      subtitle: "En 30 secondes : pour qui, ce que ça apporte, et comment s’inscrire.",
      forWhoLabel: "Pour qui",
      benefitLabel: "Ce que ça apporte",
      frequencyLabel: "Format / fréquence",
      whenWhereLabel: "Quand / où :",
      whenWhereText: "À préciser lors de l’inscription",
      cta: "Détails / inscription",
    },
    participate: {
      title: "Comment participer",
      steps: [
        "Choisissez un axe ci‑dessus.",
        "Écrivez via le formulaire ou par e‑mail sur la page Contacts.",
        "On vous répond et on propose une inscription.",
        "Lieu et horaire dépendent du projet — précisés lors de l’inscription.",
      ],
      ctaToContacts: "Aller à la page Contact",
    },
    important: {
      title: "À SAVOIR",
      items: [
        "Participation et accompagnement : sur inscription et selon le projet (pas d’horaire unique).",
        "Lieu et horaire : précisés lors de l’inscription — nous ne publions pas une adresse/un planning unique.",
        "Questions et inscription : via le formulaire et l’e-mail sur la page “Contact”.",
        "Nous ne publions pas de numéros personnels / WhatsApp des responsables.",
      ],
    },
    finalCta: {
      text: "Une question sur nos actions ? Écrivez‑nous — on vous oriente.",
      button: "Écrire",
    },
    items: [
      {
        slug: "permanences-administratives",
        title: "Permanences administratives (sur inscription)",
        forWho: "Familles, nouveaux arrivants, habitants : questions de courriers et de démarches",
        benefit: "Des repères clairs et le prochain pas à faire, sans se perdre",
        frequency: "Sur inscription • toute l’année",
      },
      {
        slug: "emploi-cv",
        title: "Accompagnement vers l’emploi & CV",
        forWho: "Personnes en recherche d’emploi, de stage ou souhaitant améliorer leur CV",
        benefit: "Méthode, conseils CV et préparation du prochain pas",
        frequency: "Régulier • groupes et/ou individuel (selon projet)",
      },
      {
        slug: "langues-ateliers",
        title: "Cours de langues & ateliers (dont tchétchène et russe)",
        forWho: "Enfants et adultes souhaitant renforcer la langue et la communication",
        benefit: "Pratique, confiance et participation à la vie locale",
        frequency: "Régulier • en groupes / ateliers (selon projet)",
      },
      {
        slug: "sport",
        title: "Activités sportives & activité régulière",
        forWho: "Enfants, jeunes et adultes",
        benefit: "Bouger, créer du lien, esprit d’équipe et bien‑être",
        frequency: "Régulier • toute l’année",
      },
      {
        slug: "jardin-ateliers-nature",
        title: "Jardin, ateliers & rencontres nature",
        forWho: "Familles et toutes les personnes qui aiment les activités collectives",
        benefit: "Faire ensemble, apprendre et se retrouver dans un cadre convivial",
        frequency: "Saisonnier / selon événements",
      },
      {
        slug: "sorties-culturelles",
        title: "Sorties culturelles & déplacements",
        forWho: "Familles, jeunes et adultes",
        benefit: "Découvrir la ville/la région, rencontrer d’autres personnes, s’ouvrir",
        frequency: "Selon événements • sur l’année",
      },
      {
        slug: "forums-jeunesse-entrepreneuriat",
        title: "Forums jeunesse & entrepreneuriat",
        forWho: "Jeunes et personnes intéressées par les initiatives et projets",
        benefit: "Rencontres, idées, contacts utiles et orientation",
        frequency: "Selon événements (forums / rencontres)",
      },
      {
        slug: "rencontres-cohesion",
        title: "Rencontres & cohésion",
        forWho: "Pour toutes celles et ceux qui veulent échanger et s’intégrer",
        benefit: "Partage d’expérience, soutien, lien social et participation",
        frequency: "Régulier et selon événements",
      },
    ],
  },
};

export function getActionsTopicParam(slug: string) {
  return `actions_${slug}`;
}


