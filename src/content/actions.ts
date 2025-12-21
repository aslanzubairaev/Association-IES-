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
      title: "ДЕЙСТВИЯ",
      lead:
        "Проекты, встречи и программы ассоциации IES: образование, спорт, культура, поддержка и интеграция.\nВыберите направление — расскажем детали и подскажем, как записаться.",
      hint: "Нажмите «Узнать детали / записаться» — мы ответим по e-mail и предложим следующий шаг.",
      ctaScroll: "Посмотреть направления",
      ctaWrite: "Записаться / Написать",
    },
    directions: {
      title: "НАПРАВЛЕНИЯ",
      subtitle: "Коротко: для кого каждое направление, что даёт и как присоединиться.",
      forWhoLabel: "Для кого",
      benefitLabel: "Что даёт",
      frequencyLabel: "Формат / частота",
      whenWhereLabel: "Когда / где:",
      whenWhereText: "Уточняется при записи",
      cta: "УЗНАТЬ ДЕТАЛИ / ЗАПИСАТЬСЯ",
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
        "Запись и вопросы — через форму и e-mail на странице «Контакты».",
      ],
    },
    finalCta: {
      text: "Есть вопрос по проектам ассоциации? Напишите — подскажем, с чего начать.",
      button: "Написать",
    },
    items: [
      {
        slug: "permanences-administratives",
        title: "АДМИНИСТРАТИВНЫЕ КОНСУЛЬТАЦИИ (ПО ЗАПИСИ)",
        forWho: "Для семей, новоприбывших и жителей, у кого есть вопросы по документам и письмам.",
        benefit: "Понятные шаги и список того, что подготовить для следующего действия.",
        frequency: "По записи • индивидуально • в течение года",
      },
      {
        slug: "emploi-cv",
        title: "СОПРОВОЖДЕНИЕ К РАБОТЕ И CV",
        forWho: "Для тех, кто ищет работу/стажировку или хочет улучшить CV и подачу.",
        benefit: "Ориентиры по поиску, оформление CV и подготовка к следующему шагу.",
        frequency: "Регулярно • по группам и индивидуально (по проекту)",
      },
      {
        slug: "langues-ateliers",
        title: "ЯЗЫКОВЫЕ ЗАНЯТИЯ И РАЗВИТИЕ (ВКЛ. ЧЕЧЕНСКИЙ И РУССКИЙ)",
        forWho: "Для детей и взрослых, кто хочет укрепить язык и навыки общения.",
        benefit: "Практика языка, уверенность в общении и участие в жизни города.",
        frequency: "Регулярно • по группам / мастерские (по проекту)",
      },
      {
        slug: "sport",
        title: "СПОРТ И РЕГУЛЯРНАЯ АКТИВНОСТЬ",
        forWho: "Для детей, подростков и взрослых.",
        benefit: "Здоровая активность, дисциплина, командный дух и вовлечённость.",
        frequency: "Регулярно • в течение года",
      },
      {
        slug: "jardin-ateliers-nature",
        title: "САД, МАСТЕРСКИЕ И ВСТРЕЧИ НА ПРИРОДЕ",
        forWho: "Для семей, детей и всех, кому важны совместные дела и общение.",
        benefit: "Совместная деятельность, навыки и тёплые встречи вне формальностей.",
        frequency: "Сезонно / по событиям",
      },
      {
        slug: "sorties-culturelles",
        title: "КУЛЬТУРНЫЕ ВЫХОДЫ И ПОЕЗДКИ",
        forWho: "Для семей, подростков и взрослых.",
        benefit: "Открытие города и региона, новые знакомства, расширение кругозора.",
        frequency: "По событиям • в течение года",
      },
      {
        slug: "forums-jeunesse-entrepreneuriat",
        title: "ФОРУМЫ МОЛОДЁЖИ И ПРЕДПРИНИМАТЕЛЬСТВА",
        forWho: "Для молодёжи и тех, кто интересуется инициативами и проектами.",
        benefit: "Встречи, вдохновение, полезные контакты и ориентация по возможностям.",
        frequency: "По событиям (форумы / встречи)",
      },
      {
        slug: "rencontres-cohesion",
        title: "ВСТРЕЧИ И СПЛОЧЕНИЕ СООБЩЕСТВА",
        forWho: "Для всех, кто хочет общаться, поддерживать друг друга и интегрироваться.",
        benefit: "Обмен опытом, поддержка, участие и чувство принадлежности.",
        frequency: "Регулярно и по событиям",
      },
    ],
  },
  fr: {
    hero: {
      title: "ACTIONS",
      lead:
        "Projets, rencontres et programmes de l’association IES : éducation, sport, culture, soutien et intégration.\nChoisissez un axe — on vous donne les infos et la marche à suivre pour vous inscrire.",
      hint: "Cliquez sur « En savoir plus / s’inscrire » — nous répondons par e-mail et proposons la suite.",
      ctaScroll: "Voir les actions",
      ctaWrite: "S’inscrire / Écrire",
    },
    directions: {
      title: "NOS AXES",
      subtitle: "En bref : pour qui, ce que cela apporte, et comment participer.",
      forWhoLabel: "Pour qui",
      benefitLabel: "Ce que ça apporte",
      frequencyLabel: "Format / fréquence",
      whenWhereLabel: "Quand / où :",
      whenWhereText: "Précisé lors de l’inscription",
      cta: "EN SAVOIR PLUS / S’INSCRIRE",
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
        "Participation et accompagnement : sur inscription et selon le projet (pas d’horaires généraux).",
        "Le lieu et l’horaire dépendent du projet — précisés lors de l’inscription.",
        "Questions et inscription : via le formulaire et par e-mail (page « Contact »).",
        "Les numéros personnels/WhatsApp des responsables ne sont pas publiés.",
      ],
    },
    finalCta: {
      text: "Une question sur nos actions ? Écrivez‑nous — on vous oriente.",
      button: "Écrire",
    },
    items: [
      {
        slug: "permanences-administratives",
        title: "CONSULTATIONS ADMINISTRATIVES (SUR RENDEZ-VOUS)",
        forWho: "Familles, nouveaux arrivants et habitants ayant des questions sur des documents et des courriers.",
        benefit: "Des étapes claires et la liste de ce qu’il faut préparer pour la suite.",
        frequency: "Sur rendez-vous • individuel • toute l’année",
      },
      {
        slug: "emploi-cv",
        title: "ACCOMPAGNEMENT VERS L’EMPLOI & CV",
        forWho: "Personnes en recherche d’emploi/stage ou souhaitant améliorer leur CV.",
        benefit: "Repères pour la recherche, mise en forme du CV et préparation du prochain pas.",
        frequency: "Régulier • en groupe et en individuel (selon le projet)",
      },
      {
        slug: "langues-ateliers",
        title: "ATELIERS LINGUISTIQUES & DÉVELOPPEMENT (DONT TCHÉTCHÈNE ET RUSSE)",
        forWho: "Enfants et adultes qui souhaitent renforcer la langue et la communication.",
        benefit: "Pratique, confiance à l’oral et participation à la vie locale.",
        frequency: "Régulier • groupes / ateliers (selon le projet)",
      },
      {
        slug: "sport",
        title: "SPORT & ACTIVITÉ RÉGULIÈRE",
        forWho: "Enfants, ados et adultes.",
        benefit: "Activité saine, discipline, esprit d’équipe et engagement.",
        frequency: "Régulier • toute l’année",
      },
      {
        slug: "jardin-ateliers-nature",
        title: "JARDIN, ATELIERS & RENCONTRES NATURE",
        forWho: "Familles, enfants et toute personne qui aime faire ensemble et échanger.",
        benefit: "Activités partagées, apprentissages et rencontres conviviales.",
        frequency: "Saisonnier / selon les événements",
      },
      {
        slug: "sorties-culturelles",
        title: "SORTIES CULTURELLES & EXCURSIONS",
        forWho: "Familles, ados et adultes.",
        benefit: "Découvrir la ville et la région, faire des rencontres, élargir l’horizon.",
        frequency: "Selon les événements • toute l’année",
      },
      {
        slug: "forums-jeunesse-entrepreneuriat",
        title: "FORUMS JEUNESSE & ENTREPRENEURIAT",
        forWho: "Jeunes et personnes intéressées par les initiatives et les projets.",
        benefit: "Rencontres, inspiration, contacts utiles et repères sur les opportunités.",
        frequency: "Selon événements (forums / rencontres)",
      },
      {
        slug: "rencontres-cohesion",
        title: "RENCONTRES & COHÉSION DU LIEN SOCIAL",
        forWho: "Toute personne souhaitant échanger, se soutenir et s’intégrer.",
        benefit: "Partage d’expérience, soutien, participation et sentiment d’appartenance.",
        frequency: "Régulier et selon les événements",
      },
    ],
  },
};

export function getActionsTopicParam(slug: string) {
  return `actions_${slug}`;
}


