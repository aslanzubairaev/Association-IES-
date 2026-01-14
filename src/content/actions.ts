export type ActionsLocale = "ru" | "fr";

export type ActionDirection = {
  slug: string;
  topicKey: string;
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
      hint: "Нажмите «Записаться» — мы ответим по e-mail и предложим следующий шаг.",
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
      cta: "ЗАПИСАТЬСЯ",
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
        slug: "langues-ateliers",
        topicKey: "language_development",
        title: "ЯЗЫКОВЫЕ ЗАНЯТИЯ И РАЗВИТИЕ (ВКЛ. ЧЕЧЕНСКИЙ И РУССКИЙ)",
        forWho: "Для детей и взрослых, кто хочет укрепить язык и навыки общения.",
        benefit: "Практика языка, уверенность в общении и участие в жизни города.",
        frequency: "Регулярно • по группам / мастерские (по проекту)",
      },
      {
        slug: "sport",
        topicKey: "sport_regular",
        title: "СПОРТ И РЕГУЛЯРНАЯ АКТИВНОСТЬ",
        forWho: "Для детей, подростков и взрослых.",
        benefit: "Здоровая активность, дисциплина, командный дух и вовлечённость.",
        frequency: "Регулярно • в течение года",
      },
      {
        slug: "jardin-ateliers-nature",
        topicKey: "garden_workshops_nature",
        title: "САД, МАСТЕРСКИЕ И ВСТРЕЧИ НА ПРИРОДЕ",
        forWho: "Для семей, детей и всех, кому важны совместные дела и общение.",
        benefit: "Совместная деятельность, навыки и тёплые встречи вне формальностей.",
        frequency: "Сезонно / по событиям",
      },
      {
        slug: "sorties-culturelles",
        topicKey: "cultural_outings_trips",
        title: "КУЛЬТУРНЫЕ ВЫХОДЫ И ПОЕЗДКИ",
        forWho: "Для семей, подростков и взрослых.",
        benefit: "Открытие города и региона, новые знакомства, расширение кругозора.",
        frequency: "По событиям • в течение года",
      },
      {
        slug: "forums-jeunesse-entrepreneuriat",
        topicKey: "youth_forums_entrepreneurship",
        title: "ФОРУМЫ МОЛОДЁЖИ И ПРЕДПРИНИМАТЕЛЬСТВА",
        forWho: "Для молодёжи и тех, кто интересуется инициативами и проектами.",
        benefit: "Встречи, вдохновение, полезные контакты и ориентация по возможностям.",
        frequency: "По событиям (форумы / встречи)",
      },
      {
        slug: "rencontres-cohesion",
        topicKey: "community_meetings_cohesion",
        title: "ВСТРЕЧИ И СПЛОЧЕНИЕ СООБЩЕСТВА",
        forWho: "Для всех, кто хочет общаться, поддерживать друг друга и интегрироваться.",
        benefit: "Обмен опытом, поддержка, участие и чувство принадлежности.",
        frequency: "Регулярно и по событиям",
      },
    ],
  },
  fr: {
    hero: {
      title: "ACTIVITÉ",
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
      cta: "S’INSCRIRE",
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
        slug: "langues-ateliers",
        topicKey: "language_development",
        title: "ATELIERS LINGUISTIQUES & DÉVELOPPEMENT (DONT TCHÉTCHÈNE ET RUSSE)",
        forWho: "Enfants et adultes qui souhaitent renforcer la langue et la communication.",
        benefit: "Pratique, confiance à l’oral et participation à la vie locale.",
        frequency: "Régulier • groupes / ateliers (selon le projet)",
      },
      {
        slug: "sport",
        topicKey: "sport_regular",
        title: "SPORT & ACTIVITÉ RÉGULIÈRE",
        forWho: "Enfants, ados et adultes.",
        benefit: "Activité saine, discipline, esprit d’équipe et engagement.",
        frequency: "Régulier • toute l’année",
      },
      {
        slug: "jardin-ateliers-nature",
        topicKey: "garden_workshops_nature",
        title: "JARDIN, ATELIERS & RENCONTRES NATURE",
        forWho: "Familles, enfants et toute personne qui aime faire ensemble et échanger.",
        benefit: "Activités partagées, apprentissages et rencontres conviviales.",
        frequency: "Saisonnier / selon les événements",
      },
      {
        slug: "sorties-culturelles",
        topicKey: "cultural_outings_trips",
        title: "SORTIES CULTURELLES & EXCURSIONS",
        forWho: "Familles, ados et adultes.",
        benefit: "Découvrir la ville et la région, faire des rencontres, élargir l’horizon.",
        frequency: "Selon les événements • toute l’année",
      },
      {
        slug: "forums-jeunesse-entrepreneuriat",
        topicKey: "youth_forums_entrepreneurship",
        title: "FORUMS JEUNESSE & ENTREPRENEURIAT",
        forWho: "Jeunes et personnes intéressées par les initiatives et les projets.",
        benefit: "Rencontres, inspiration, contacts utiles et repères sur les opportunités.",
        frequency: "Selon événements (forums / rencontres)",
      },
      {
        slug: "rencontres-cohesion",
        topicKey: "community_meetings_cohesion",
        title: "RENCONTRES & COHÉSION DU LIEN SOCIAL",
        forWho: "Toute personne souhaitant échanger, se soutenir et s’intégrer.",
        benefit: "Partage d’expérience, soutien, participation et sentiment d’appartenance.",
        frequency: "Régulier et selon les événements",
      },
    ],
  },
};

type ContactCopy = {
  pageTitle: string;
  pageLead: string;
  whenTitle: string;
  whenItems: string[];
  subjectLabel: string;
};
export const baseContactTopicKeys = [
  "prefecture_vnj",
  "caf_cpam_francetravail",
  "housing_school_health",
  "work_orientation",
  "projects_events",
] as const;

const baseContactTopicLabels: Record<(typeof baseContactTopicKeys)[number], { ru: string; fr: string }> = {
  prefecture_vnj: { ru: "Префектура / ВНЖ", fr: "Préfecture / titre de séjour" },
  caf_cpam_francetravail: { ru: "CAF / CPAM / France Travail", fr: "CAF / CPAM / France Travail" },
  housing_school_health: { ru: "Жильё / школа / здоровье", fr: "Logement / école / santé" },
  work_orientation: { ru: "CV / работа / ориентация", fr: "CV / emploi / orientation" },
  projects_events: { ru: "Проекты и мероприятия ассоциации", fr: "Projets et événements de l’association" },
};

const aideTopicLabels: Record<string, { ru: string; fr: string }> = {
  caf_support: { ru: "CAF (пособия, письма, личный кабинет)", fr: "CAF (allocations, courriers, compte)" },
  cpam_health: { ru: "CPAM / здоровье (письма, CARTE VITALE)", fr: "CPAM / santé (courriers, CARTE VITALE)" },
  france_travail: { ru: "France Travail / поиск работы", fr: "France Travail / recherche d’emploi" },
  housing_school_everyday: { ru: "Жильё / школа / повседневные вопросы", fr: "Logement / école / questions du quotidien" },
  not_sure: { ru: "Не знаете куда?", fr: "Vous ne savez pas où ?" },
};

const supportTopicLabels: Record<string, { ru: string; fr: string }> = {
  donation_helloasso: { ru: "Донат через HelloAsso", fr: "Don via HelloAsso" },
  donation_cotizup: { ru: "Взнос через CotizUp", fr: "Cotisation via CotizUp" },
  volunteer: { ru: "Волонтёрство", fr: "Bénévolat" },
};

const otherTopicLabels = { ru: "Другое", fr: "Autre" };

const actionTopicLabels: Record<string, { ru: string; fr: string }> = Object.fromEntries(
  actionsCopy.ru.items.map((ruItem) => {
    const frItem = actionsCopy.fr.items.find((x) => x.slug === ruItem.slug);
    return [
      ruItem.topicKey,
      {
        ru: ruItem.title,
        fr: frItem?.title ?? ruItem.title,
      },
    ];
  }),
);

export const contactTopicLabels: Record<string, { ru: string; fr: string }> = {
  ...baseContactTopicLabels,
  ...aideTopicLabels,
  ...actionTopicLabels,
  ...supportTopicLabels,
  other: otherTopicLabels,
};

export const actionContactTopicKeys = actionsCopy.ru.items.map((item) => item.topicKey);

export const contactTopicSelectKeys = [
  ...baseContactTopicKeys,
  ...actionContactTopicKeys,
  "other",
];

export const contactCopy: Record<ActionsLocale, ContactCopy> = {
  ru: {
    pageTitle: "Контакты",
    pageLead: "Напишите через форму или на e-mail — ответим по e-mail. Встреча возможна только по записи.",
    whenTitle: "С какими вопросами писать?",
    whenItems: baseContactTopicKeys.map((key) => baseContactTopicLabels[key].ru),
    subjectLabel: "Тема",
  },
  fr: {
    pageTitle: "Contact",
    pageLead:
      "Écrivez via le formulaire ou par e-mail — nous répondrons par e-mail. Rendez-vous uniquement sur inscription.",
    whenTitle: "Pour quels sujets écrire ?",
    whenItems: baseContactTopicKeys.map((key) => baseContactTopicLabels[key].fr),
    subjectLabel: "Sujet",
  },
};

const actionTopicAliases: Record<string, string> = Object.fromEntries(
  actionsCopy.ru.items.map((item) => [`actions_${item.slug}`, item.topicKey]),
);

const topicKeyAliases: Record<string, string> = {
  "prefecture-vnz": "prefecture_vnj",
  "prefecture-vnj": "prefecture_vnj",
  caf: "caf_support",
  cpam: "cpam_health",
  "france-travail": "france_travail",
  everyday: "housing_school_everyday",
  "not-sure": "not_sure",
  work_support: "work_cv_support",
  language_classes: "language_development",
  sports_activity: "sport_regular",
  nature_workshops: "garden_workshops_nature",
  cultural_meetings: "cultural_outings_trips",
  youth_forums: "youth_forums_entrepreneurship",
  community_meetings: "community_meetings_cohesion",
  ...actionTopicAliases,
};

export function getContactTopicLabel(locale: ActionsLocale, topicKey: string) {
  return contactTopicLabels[topicKey]?.[locale] ?? topicKey;
}

export function resolveContactTopicKey(rawTopic?: string | null) {
  if (!rawTopic) return "";
  const trimmed = rawTopic.trim();
  if (!trimmed) return "";
  const normalized = trimmed.toLowerCase();
  const aliased = topicKeyAliases[normalized];
  if (aliased) return aliased;
  if (contactTopicLabels[normalized]) return normalized;
  return trimmed;
}



type LocaleText = { fr: string; ru: string };

export type HomeNavCard = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  // Куда ведёт карточка (часть пути без языка, например "/aide")
  path: string;
};

export const homeNavCards: HomeNavCard[] = [
  {
    id: "about",
    title: { fr: "À propos", ru: "О нас" },
    description: {
      fr: "Qui nous sommes et comment nous travaillons.",
      ru: "Кто мы и как мы работаем.",
    },
    path: "/about",
  },
  {
    id: "aide",
    title: { fr: "Aide", ru: "Чем помогаем" },
    description: {
      fr: "Comprendre les démarches et avancer.",
      ru: "Разобраться с шагами и получить поддержку.",
    },
    path: "/aide",
  },
  {
    id: "actions",
    title: { fr: "Activité", ru: "Действия" },
    description: {
      fr: "Programmes, activités et accompagnement.",
      ru: "Программы, активности и сопровождение.",
    },
    path: "/actions",
  },
  {
    id: "soutenir",
    title: { fr: "Soutenir", ru: "Поддержать" },
    description: {
      fr: "Bénévolat, dons et partenariats.",
      ru: "Волонтёрство, пожертвования и партнёрства.",
    },
    path: "/soutenir",
  },
  {
    id: "contact",
    title: { fr: "Contact", ru: "Контакты" },
    description: {
      fr: "Écrire via le formulaire ou par e-mail.",
      ru: "Написать через форму или по e-mail.",
    },
    path: "/contact",
  },
];

export type AideLocale = ActionsLocale;

type AideHowItWorksStep = {
  title: string;
  text: string;
};

type AideTopic = {
  topicKey: string;
  title: string;
  examples: string[];
  prepareLine: string;
};

type AideCopy = {
  hero: {
    title: string;
    line1: string;
    line2: string;
    badge: string;
    ctaScroll: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: AideHowItWorksStep[];
  };
  topics: {
    title: string;
    subtitle: string;
    preparePrefix: string;
    chooseLabel: string;
    items: AideTopic[];
  };
  beforeYouWrite: {
    title: string;
    subtitle: string;
    items: string[];
  };
  important: {
    title: string;
    items: string[];
  };
};

export const aideCopy: Record<AideLocale, AideCopy> = {
  ru: {
    hero: {
      title: "ЧЕМ ПОМОГАЕМ",
      line1: "Бесплатная административная помощь для новоприбывших и семей.",
      line2: "Напишите через форму — мы ответим по e-mail. Если нужна встреча, предложим запись.",
      badge: "Бесплатно • По записи • Ответ по e-mail",
      ctaScroll: "Выбрать тему",
    },
    howItWorks: {
      title: "Как это работает",
      subtitle: "Понятно и по шагам — чтобы вы знали, что будет дальше.",
      steps: [
        {
          title: "ШАГ 1 — ВЫ ОТПРАВЛЯЕТЕ ЗАПРОС",
          text: "Заполните форму на сайте — сообщение приходит нам на e-mail. Если есть, приложите фото/сканы писем и документов.",
        },
        {
          title: "Шаг 2 — Уточняем детали и предлагаем запись",
          text: "Задаём 2–3 вопроса и предлагаем следующий шаг. Место и время зависят от проекта — подтвердим по e-mail.",
        },
        {
          title: "ШАГ 3 — РАЗБИРАЕМ СИТУАЦИЮ И ДАЁМ ПЛАН",
          text: "По e-mail или на встрече объясняем, что делать: куда подать, что приложить, как ответить и какие сроки учесть.",
        },
      ],
    },
    topics: {
      title: "Частые темы",
      subtitle: "Выберите тему — так мы быстрее поймём запрос.",
      preparePrefix: "Что подготовить:",
      chooseLabel: "ЗАПИСАТЬСЯ",
      items: [
        {
          topicKey: "prefecture_vnj",
          title: "Префектура / ВНЖ",
          examples: ["Список документов", "Запись/загрузка документов", "Письма из префектуры", "Сроки и что делать дальше"],
          prepareLine: "письма/уведомления, документы, номер досье (если есть)",
        },
        {
          topicKey: "caf_support",
          title: "CAF (пособия, письма, личный кабинет)",
          examples: ["Создать/войти в аккаунт", "Письмо «document manquant»", "Отправить документы", "Понять статус заявки"],
          prepareLine: "номер allocataire (если есть), письма CAF, список отправленных документов",
        },
        {
          topicKey: "cpam_health",
          title: "CPAM / здоровье (письма, CARTE VITALE)",
          examples: ["Открыть права (droits)", "Письма/запрос документов", "Carte Vitale / attestation", "Куда обратиться по ситуации"],
          prepareLine: "письма CPAM, документы, номер sécurité sociale (если есть)",
        },
        {
          topicKey: "france_travail",
          title: "France Travail / поиск работы",
          examples: ["Регистрация/аккаунт", "Письма и требования", "Какие шаги сейчас важны", "Куда идти дальше"],
          prepareLine: "письма France Travail, ваш статус/документы, что уже сделали",
        },
        {
          topicKey: "housing_school_everyday",
          title: "Жильё / школа / повседневные вопросы",
          examples: ["Куда обращаться (город/службы)", "Школа/сад: что нужно", "Медицина: базовая ориентация", "Письма и формальности"],
          prepareLine: "город/район, письма/документы, кратко цель (что хотите получить)",
        },
        {
          topicKey: "not_sure",
          title: "Не знаете куда?",
          examples: [
            "Опишите ситуацию простыми словами",
            "Покажите письмо, которое вас тревожит",
            "Скажете, что уже пробовали",
            "Мы подскажем направление",
          ],
          prepareLine: "1–2 предложения о ситуации + фото/скан письма (если есть)",
        },
      ],
    },
    beforeYouWrite: {
      title: "Перед тем как написать",
      subtitle: "Если можете — добавьте это в сообщение. Так мы быстрее поможем.",
      items: [
        "Имя и фамилия",
        "Язык, на котором удобно общаться",
        "Ваша ситуация (кратко)",
        "Что уже сделали",
        "Сроки/дедлайны (если есть)",
        "Ваш город/район (Страсбург/окрестности)",
        "Фото/сканы писем и документов (если есть)",
        "Ваш вопрос одним предложением",
      ],
    },
    important: {
      title: "Важно знать",
      items: [
        "Отвечаем по e-mail. Встречи — только по предварительной записи.",
        "Место и время зависят от проекта — сообщим при записи.",
        "Мы помогаем понять письма и шаги, но не заменяем администрацию и не оказываем юридические услуги.",
      ],
    },
  },
  fr: {
    hero: {
      title: "AIDE — CE QUE NOUS FAISONS",
      line1: "Aide administrative gratuite pour les nouveaux arrivants et les familles.",
      line2:
        "Écrivez via le formulaire — nous recevons votre message par e-mail. Nous répondons par e-mail et, si besoin, proposons un rendez-vous.",
      badge: "Gratuit • Sur rendez-vous • Réponse par e-mail",
      ctaScroll: "Choisir le thème",
    },
    howItWorks: {
      title: "Comment ça marche",
      subtitle: "Clair et simple — pour savoir à quoi vous attendre.",
      steps: [
        {
          title: "ÉTAPE 1 — VOUS ENVOYEZ VOTRE DEMANDE",
          text: "Remplissez le formulaire — nous recevons votre message par e-mail. Joignez, si possible, des photos/scans de courriers et de documents.",
        },
        {
          title: "Étape 2 — Nous précisons et proposons un rendez-vous",
          text: "On pose 2–3 questions et on propose la suite. Lieu et horaire dépendent du projet — confirmés par e-mail.",
        },
        {
          title: "ÉTAPE 3 — ON ANALYSE LA SITUATION ET ON DONNE UN PLAN",
          text: "Par e-mail ou en rendez-vous, on explique quoi faire : où déposer, quoi joindre, comment répondre et quels délais prendre en compte.",
        },
      ],
    },
    topics: {
      title: "Thèmes fréquents",
      subtitle: "Choisissez un thème — nous comprendrons plus vite votre demande.",
      preparePrefix: "À préparer :",
      chooseLabel: "S’INSCRIRE",
      items: [
        {
          topicKey: "prefecture_vnj",
          title: "Préfecture / titre de séjour",
          examples: ["Liste de documents", "Prise de rendez-vous / dépôt", "Courriers de la préfecture", "Délais et suite"],
          prepareLine: "courriers/notifications, documents, numéro de dossier (si disponible)",
        },
        {
          topicKey: "caf_support",
          title: "CAF (allocations, courriers, espace perso)",
          examples: ["Créer/se connecter au compte", "Courrier « document manquant »", "Envoyer des pièces", "Comprendre le statut"],
          prepareLine: "numéro allocataire (si disponible), courriers CAF, liste des documents envoyés",
        },
        {
          topicKey: "cpam_health",
          title: "CPAM / santé (courriers, CARTE VITALE)",
          examples: ["Ouvrir des droits", "Courriers / demandes", "Carte Vitale / attestation", "Où s’adresser"],
          prepareLine: "courriers CPAM, documents, numéro de sécurité sociale (si disponible)",
        },
        {
          topicKey: "france_travail",
          title: "France Travail / recherche d’emploi",
          examples: ["Inscription/compte", "Courriers et exigences", "Quelles étapes maintenant", "Où aller ensuite"],
          prepareLine: "courriers France Travail, votre statut/documents, ce que vous avez déjà fait",
        },
        {
          topicKey: "housing_school_everyday",
          title: "Logement / école / quotidien",
          examples: ["Où s’adresser (ville/services)", "École/crèche : quoi préparer", "Santé : orientation de base", "Courriers et formalités"],
          prepareLine: "ville/quartier, courriers/documents, objectif en bref (ce que vous voulez obtenir)",
        },
        {
          topicKey: "not_sure",
          title: "Vous ne savez pas où ?",
          examples: [
            "Décrivez la situation simplement",
            "Montrez le courrier qui vous inquiète",
            "Dites ce que vous avez déjà essayé",
            "On vous orientera",
          ],
          prepareLine: "1–2 phrases sur la situation + photo/scan du courrier (si possible)",
        },
      ],
    },
    beforeYouWrite: {
      title: "Avant d’écrire",
      subtitle: "Si possible, ajoutez ces infos à votre message. Cela nous aidera à répondre plus vite.",
      items: [
        "Nom et prénom",
        "Langue de communication",
        "Votre situation (bref)",
        "Ce que vous avez déjà fait",
        "Délais / échéances (si disponibles)",
        "Votre ville/quartier (Strasbourg/alentours)",
        "Photos/scans de courriers et documents (si possible)",
        "Votre question en une phrase",
      ],
    },
    important: {
      title: "À savoir",
      items: [
        "Nous répondons par e-mail. Rendez-vous uniquement sur inscription.",
        "Lieu et horaire dépendent du projet — précisés lors de l’inscription.",
        "Nous aidons à comprendre les courriers et les démarches, sans remplacer l’administration ni fournir de services juridiques.",
      ],
    },
  },
};

type HeroCopy = {
  title: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pills: string[];
  pillsAriaLabel: string;
};

export const heroCopy: Record<ActionsLocale, HeroCopy> = {
  ru: {
    title: "Помогаем людям\nадаптироваться в Страсбурге",
    lead: "Документы, работа, обучение и поддержка в Страсбурге — подскажем понятный следующий шаг без лишней бюрократии.",
    ctaPrimary: "Получить помощь",
    ctaSecondary: "Наши действия",
    pills: ["Интеграция", "Образование", "Синергия"],
    pillsAriaLabel: "ключевые слова",
  },
  fr: {
    title: "Nous aidons les personnes\nà s’intégrer à Strasbourg",
    lead: "Démarches, emploi, apprentissage et soutien à Strasbourg — on vous indique la prochaine étape, simplement.",
    ctaPrimary: "Demander de l’aide",
    ctaSecondary: "Notre activité",
    pills: ["Intégration", "Éducation", "Synergie"],
    pillsAriaLabel: "mots-clés",
  },
};

type QuickNavCopy = {
  title: string;
  subtitle: string;
  ctaLabel: string;
};

export const quickNavCopy: Record<ActionsLocale, QuickNavCopy> = {
  ru: {
    title: "Что вам нужно?",
    subtitle: "Выберите тему — мы отправим вас в нужный раздел.",
    ctaLabel: "Перейти",
  },
  fr: {
    title: "De quoi avez-vous besoin ?",
    subtitle: "Choisissez un thème — on vous dirige vers la bonne page.",
    ctaLabel: "Aller",
  },
};

type TrustBlockCopy = {
  title: string;
  subtitle: string;
  points: string[];
  benefitsTitle: string;
  quoteText: string;
  quoteSignature: string;
  quoteAriaLabel: string;
};

export const trustBlockCopy: Record<ActionsLocale, TrustBlockCopy> = {
  ru: {
    title: "Доверие",
    subtitle: "Понятные шаги и человеческая поддержка.",
    points: [
      "Понятный следующий шаг без сложных слов",
      "Локальная работа в Страсбурге",
      "Поддержка по документам, работе и обучению",
      "Сеть волонтёров и партнёров",
    ],
    benefitsTitle: "что вы получаете",
    quoteText: "«Наша миссия — открыть пути. Помочь каждому найти своё место, здесь и сейчас.»",
    quoteSignature: "ASSOCIATION IES",
    quoteAriaLabel: "цитата",
  },
  fr: {
    title: "Confiance",
    subtitle: "Des étapes claires et un soutien humain.",
    points: [
      "Une prochaine étape claire, sans jargon",
      "Une action locale à Strasbourg",
      "Un appui pour démarches, emploi et apprentissage",
      "Un réseau de bénévoles et partenaires",
    ],
    benefitsTitle: "Ce que vous obtenez",
    quoteText: "« Notre mission — ouvrir des chemins. Aider chacun à trouver sa place, ici et maintenant. »",
    quoteSignature: "ASSOCIATION IES",
    quoteAriaLabel: "citation",
  },
};

type ActionsPreviewCopy = {
  title: string;
  subtitle: string;
  items: string[];
  cardTitle: string;
  cardParagraphs: string[];
  ctaLabel: string;
};

export const actionsPreviewCopy: Record<ActionsLocale, ActionsPreviewCopy> = {
  ru: {
    title: "Наши действия (кратко)",
    subtitle: "Короткий обзор программ и активностей ассоциации.",
    items: ["Административные консультации", "Сопровождение к работе", "Языковые занятия", "Культурные встречи и выезды"],
    cardTitle: "Посмотреть все",
    cardParagraphs: [
      "Откройте страницу с программами и форматами.",
      "Там будут форматы, расписания, регистрация и адреса по активностям.",
    ],
    ctaLabel: "Перейти к действиям",
  },
  fr: {
    title: "Nos actions (en bref)",
    subtitle: "Un aperçu rapide de nos programmes et activités.",
    items: ["Consultations administratives", "Accompagnement vers l’emploi", "Ateliers de langue", "Rencontres et sorties"],
    cardTitle: "Voir tout",
    cardParagraphs: [
      "Ouvrez la page avec les programmes et les formats.",
      "Vous y trouverez les formats, les horaires, l’inscription et les adresses.",
    ],
    ctaLabel: "Aller à l’activité",
  },
};

type FooterCopy = {
  copyright: string;
  aboutLabel: string;
  contactLabel: string;
  privacyLabel: string;
};

export const footerCopy: Record<ActionsLocale, FooterCopy> = {
  ru: {
    copyright: "© 2025 Association IES",
    aboutLabel: "о нас",
    contactLabel: "контакты",
    privacyLabel: "Политика конфиденциальности",
  },
  fr: {
    copyright: "© 2025 Association IES",
    aboutLabel: "À propos",
    contactLabel: "Contact",
    privacyLabel: "Politique de confidentialité",
  },
};

type HeaderCopy = {
  brandLabel: string;
  brandName: string;
  navAriaLabel: string;
  navLabels: {
    about: string;
    aide: string;
    actions: string;
    soutenir: string;
    contact: string;
  };
  langSwitcherAriaLabel: string;
  mobileControlsAriaLabel: string;
  burgerOpenLabel: string;
  burgerCloseLabel: string;
  langToggleAriaLabel: string;
  mobileMenuTitle: string;
  mobileMenuCloseLabel: string;
  mobileNavAriaLabel: string;
  langMenuItems: { locale: ActionsLocale; code: string; name: string }[];
};

export const headerCopy: Record<ActionsLocale, HeaderCopy> = {
  ru: {
    brandLabel: "Association IES",
    brandName: "Association",
    navAriaLabel: "Меню сайта",
    navLabels: {
      about: "О нас",
      aide: "Чем помогаем",
      actions: "Действия",
      soutenir: "Поддержать",
      contact: "Контакты",
    },
    langSwitcherAriaLabel: "Переключатель языка",
    mobileControlsAriaLabel: "Меню и язык для мобильной версии",
    burgerOpenLabel: "Открыть меню",
    burgerCloseLabel: "Закрыть меню",
    langToggleAriaLabel: "Переключить язык",
    mobileMenuTitle: "Меню",
    mobileMenuCloseLabel: "Закрыть",
    mobileNavAriaLabel: "Навигация",
    langMenuItems: [
      { locale: "fr", code: "FR", name: "Français" },
      { locale: "ru", code: "RU", name: "Русский" },
    ],
  },
  fr: {
    brandLabel: "Association IES",
    brandName: "Association",
    navAriaLabel: "Menu du site",
    navLabels: {
      about: "À propos",
      aide: "Aide",
      actions: "Activité",
      soutenir: "Soutenir",
      contact: "Contact",
    },
    langSwitcherAriaLabel: "Changer de langue",
    mobileControlsAriaLabel: "Menu et langue pour mobile",
    burgerOpenLabel: "Ouvrir le menu",
    burgerCloseLabel: "Fermer le menu",
    langToggleAriaLabel: "Changer de langue",
    mobileMenuTitle: "Menu",
    mobileMenuCloseLabel: "Fermer",
    mobileNavAriaLabel: "Navigation",
    langMenuItems: [
      { locale: "fr", code: "FR", name: "Français" },
      { locale: "ru", code: "RU", name: "Русский" },
    ],
  },
};

type AboutPageCopy = {
  title: string;
  heroLines: string[];
  mainParagraphs: string[];
  goalsTitle: string;
  goals: string[];
  strengthTitle: string;
  strengthItems: string[];
  contactLabel: string;
  supportLabel: string;
  ctaTitle: string;
  ctaList: string[];
};

export const aboutPageCopy: Record<ActionsLocale, AboutPageCopy> = {
  ru: {
    title: "О нас",
    heroLines: [
      "Больше, чем помощь — человеческое участие.",
      "IES — это Intégration, Éducation, Synergie.",
      "Светская некоммерческая ассоциация в Страсбурге. Основана 19 февраля 2019 года.",
    ],
    mainParagraphs: [
      "IES — ассоциация в Страсбурге, которая помогает людям, семьям и молодёжи, недавно приехавшим во Францию, адаптироваться и почувствовать опору.",
      "Мы соединяем людей с возможностями: помогаем сориентироваться и создаём пространство для встреч, обучения и взаимопомощи.",
      "Наша работа строится вокруг двух направлений: социальная интеграция и социально-профессиональная адаптация. Мы поддерживаем уважение культур, солидарность и умение жить вместе.",
    ],
    goalsTitle: "Наши цели",
    goals: [
      "Помогать людям, которые недавно приехали, становиться самостоятельнее и чувствовать себя частью города",
      "Поддерживать социально-профессиональную интеграцию взрослых и молодёжи",
      "Организовывать образовательные, спортивные и культурные активности",
    ],
    strengthTitle: "ЧТО ДЕЛАЕТ IES СИЛЬНОЙ",
    strengthItems: [
      "Человеческий подход и работа рядом с реальными запросами",
      "Активная сеть волонтёров и экспертов",
      "Партнёрства с городскими и местными структурами (Ville/Eurométropole, CeA, État, CSC…)",
      "Сильная вовлечённость в приоритетных районах Страсбурга",
    ],
    contactLabel: "НАПИСАТЬ НАМ",
    supportLabel: "Поддержать",
    ctaTitle: "ХОТИТЕ ДЕЙСТВОВАТЬ ВМЕСТЕ С НАМИ?",
    ctaList: ["Участвовать в мероприятиях", "Стать волонтёром", "Поддержать наши проекты"],
  },
  fr: {
    title: "À propos",
    heroLines: [
      "Plus qu’une aide, un lien humain.",
      "IES signifie Intégration, Éducation, Synergie.",
      "Association laïque à but non lucratif à Strasbourg. Créée le 19 février 2019.",
    ],
    mainParagraphs: [
      "IES est une association strasbourgeoise qui accompagne les personnes, les familles et les jeunes qui viennent d’arriver en France, afin de faciliter l’intégration et l’insertion socio-professionnelle.",
      "Au plus près du terrain, nous créons des passerelles entre habitants, cultures et générations, à travers des actions et des activités collectives.",
      "Notre engagement s’articule autour de deux axes : l’intégration sociale et l’insertion socio-professionnelle. Nous défendons le vivre-ensemble, le respect des cultures et la solidarité.",
    ],
    goalsTitle: "Nos objectifs",
    goals: [
      "Favoriser l’autonomie et l’inclusion des personnes nouvellement arrivées",
      "Soutenir l’insertion sociale et professionnelle des adultes et des jeunes",
      "Proposer des activités éducatives, sportives et culturelles",
    ],
    strengthTitle: "Ce qui fait la force d’IES",
    strengthItems: [
      "Une approche humaine et de terrain, au plus près des besoins réels",
      "Un réseau actif de bénévoles et d’experts engagés",
      "Des partenariats solides (Ville/Eurométropole, CeA, État, CSC…)",
      "Une forte implication dans les quartiers prioritaires",
    ],
    contactLabel: "NOUS CONTACTER",
    supportLabel: "Soutenir",
    ctaTitle: "Envie d’agir avec nous ?",
    ctaList: ["Participer à nos actions", "Devenir bénévole", "Soutenir nos projets"],
  },
};

type PrivacyPageCopy = {
  title: string;
  lead: string;
  metadataTitle: string;
  metadataDescription: string;
  whoTitle: string;
  whoText: string;
  dataTitle: string;
  dataItems: string[];
  purposeTitle: string;
  purposeText: string;
  legalTitle: string;
  legalText: string;
  shareTitle: string;
  shareText: string;
  retentionTitle: string;
  retentionText: string;
  rightsTitle: string;
  rightsItems: string[];
  contactTitle: string;
  contactTextBefore: string;
  contactLinkLabel: string;
  contactTextAfter: string;
  contactEmail: string;
  contactSubject: string;
  contactBody: string;
  cookiesTitle: string;
  cookiesText: string;
  updatedLabel: string;
  updatedDate: string;
};

export const privacyPageCopy: Record<ActionsLocale, PrivacyPageCopy> = {
  ru: {
    title: "Политика конфиденциальности",
    lead: "Мы уважаем вашу приватность и объясняем, какие данные собираем и как используем.",
    metadataTitle: "Политика конфиденциальности | Association IES",
    metadataDescription:
      "Как Association IES собирает и использует данные, ваши права и способы связи.",
    whoTitle: "Кто мы",
    whoText: "Association IES — некоммерческая ассоциация в Страсбурге, Франция.",
    dataTitle: "Какие данные мы собираем",
    dataItems: ["Имя и фамилия", "Адрес электронной почты", "Текст сообщения"],
    purposeTitle: "Зачем мы используем данные",
    purposeText:
      "Чтобы отвечать на обращения, вести коммуникацию с участниками и улучшать работу ассоциации.",
    legalTitle: "Правовое основание (GDPR)",
    legalText:
      "Согласие (когда вы отправляете сообщение) и наш законный интерес обрабатывать обращения.",
    shareTitle: "Передача третьим лицам",
    shareText:
      "Мы не продаём персональные данные. Передаём их только если это требуется законом или для работы почты/хостинга.",
    retentionTitle: "Срок хранения",
    retentionText: "Сообщения храним до 12 месяцев или на разумный срок для обработки обращений.",
    rightsTitle: "Ваши права",
    rightsItems: [
      "Доступ к данным",
      "Исправление",
      "Удаление",
      "Возражение против обработки",
      "Ограничение обработки",
      "Переносимость данных",
    ],
    contactTitle: "Как связаться",
    contactTextBefore: "По вопросам конфиденциальности напишите через ",
    contactLinkLabel: "страницу контактов",
    contactTextAfter: " или на e-mail:",
    contactEmail: "contact@associationies.fr",
    contactSubject: "Сообщение с сайта Association IES (Политика конфиденциальности)",
    contactBody: "Здравствуйте! У меня вопрос по политике конфиденциальности: ...",
    cookiesTitle: "Cookies",
    cookiesText:
      "Мы используем только технические cookies, необходимые для работы сайта, и не используем рекламный трекинг.",
    updatedLabel: "Последнее обновление:",
    updatedDate: "30 декабря 2025",
  },
  fr: {
    title: "Politique de confidentialité",
    lead: "Nous respectons votre vie privée et expliquons quelles données nous collectons et comment nous les utilisons.",
    metadataTitle: "Politique de confidentialité | Association IES",
    metadataDescription:
      "Données collectées, finalités, droits et contact pour la protection des données de l’association.",
    whoTitle: "Qui sommes-nous",
    whoText: "Association IES est une association à Strasbourg, France.",
    dataTitle: "Données collectées",
    dataItems: ["Prénom et nom", "Adresse e-mail", "Contenu du message"],
    purposeTitle: "Finalités",
    purposeText:
      "Répondre aux demandes, maintenir la communication avec les personnes et améliorer le fonctionnement de l’association.",
    legalTitle: "Base légale (RGPD)",
    legalText: "Consentement (envoi du message) et intérêt légitime pour traiter les demandes.",
    shareTitle: "Partage",
    shareText:
      "Nous ne vendons pas les données. Elles peuvent être transmises uniquement si la loi l’exige ou pour le fonctionnement de la messagerie/l’hébergement.",
    retentionTitle: "Durée de conservation",
    retentionText:
      "Nous conservons les messages jusqu’à 12 mois ou pour une durée raisonnable liée au traitement des demandes.",
    rightsTitle: "Vos droits",
    rightsItems: [
      "Accès",
      "Rectification",
      "Effacement",
      "Opposition",
      "Limitation du traitement",
      "Portabilité",
    ],
    contactTitle: "Contact",
    contactTextBefore: "Pour toute question, contactez-nous via la ",
    contactLinkLabel: "page Contact",
    contactTextAfter: " ou par e-mail :",
    contactEmail: "contact@associationies.fr",
    contactSubject: "Message du site Association IES (Politique de confidentialité)",
    contactBody: "Bonjour ! J’ai une question concernant la politique de confidentialité : ...",
    cookiesTitle: "Cookies",
    cookiesText:
      "Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement du site et aucun suivi publicitaire.",
    updatedLabel: "Dernière mise à jour :",
    updatedDate: "30 décembre 2025",
  },
};

type SoutenirCopy = {
  donateTitle: string;
  donateLead: string;
  donateNote: string;
  officialBadge: string;
  recommendedBadge: string;
  externalCtaNote: string;
  benefitsTitle: string;
  ctaWriteUs: string;
  helloAssoTitle: string;
  helloAssoText: string;
  helloAssoCta: string;
  helloAssoBadge: string;
  helloAssoBenefits: string[];
  cotizUpTitle: string;
  cotizUpText: string;
  cotizUpCta: string;
  cotizUpBadge: string;
  cotizUpBenefits: string[];
  bankTitle: string;
  bankText: string;
  importantTitle: string;
  importantText: string;
  volunteerTitle: string;
  volunteerText: string;
  volunteerCta: string;
  howToHelpTitle: string;
  howToHelpItems: string[];
};

export const soutenirCopy: Record<ActionsLocale, SoutenirCopy> = {
  fr: {
    donateTitle: "DONS / COTISATIONS",
    donateLead:
      "Votre contribution nous aide à organiser des rencontres, des ateliers et des projets de soutien. Choisissez la manière qui vous convient : don, cotisation ou bénévolat.",
    donateNote: "",
    officialBadge: "Lien officiel",
    recommendedBadge: "Recommandé",
    externalCtaNote: "S’ouvre dans un nouvel onglet",
    benefitsTitle: "Avantages",
    ctaWriteUs: "Demander le lien",
    helloAssoTitle: "HelloAsso",
    helloAssoText: "Don en ligne via HelloAsso. Lien direct pour contribuer.",
    helloAssoCta: "Accéder à HelloAsso",
    helloAssoBadge: "Lien officiel",
    helloAssoBenefits: [
      "Paiement par carte en 1 minute",
      "Reçu après paiement",
      "Plateforme sécurisée pour les associations",
    ],
    cotizUpTitle: "CotizUp",
    cotizUpText: "Cotisation / soutien via CotizUp. Lien direct pour contribuer en ligne.",
    cotizUpCta: "Accéder à CotizUp",
    cotizUpBadge: "Lien officiel",
    cotizUpBenefits: [
      "Cotisation / soutien en ligne",
      "Adapté au soutien régulier",
      "Page officielle de l’association",
    ],
    bankTitle: "VIREMENT BANCAIRE",
    bankText: "IBAN + BIC (La Banque Postale)",
    importantTitle: "À SAVOIR",
    importantText: "Besoin d’un reçu / justificatif ? Écrivez-nous — nous vous répondrons par e-mail.",
    volunteerTitle: "DEVENIR BÉNÉVOLE",
    volunteerText:
      "Vous souhaitez aider lors des rencontres, pour la traduction ou l’organisation ? Écrivez-nous via le formulaire — réponse par e-mail.",
    volunteerCta: "JE VEUX AIDER",
    howToHelpTitle: "COMMENT AIDER",
    howToHelpItems: ["Aide lors des rencontres", "Traduction et rédaction", "Organisation et logistique", "Photo/vidéo et médias"],
  },
  ru: {
    donateTitle: "ДОНАТ / ВЗНОСЫ",
    donateLead:
      "Ваш вклад помогает нам проводить встречи, занятия и проекты поддержки. Выберите удобный способ: донат, взнос или волонтёрство.",
    donateNote: "",
    officialBadge: "Официальная ссылка",
    recommendedBadge: "Рекомендуем",
    externalCtaNote: "Откроется в новой вкладке",
    benefitsTitle: "Преимущества",
    ctaWriteUs: "Запросить ссылку",
    helloAssoTitle: "HelloAsso",
    helloAssoText: "Пожертвование через HelloAsso",
    helloAssoCta: "Перейти на HelloAsso",
    helloAssoBadge: "Официальная ссылка",
    helloAssoBenefits: [
      "Оплата картой за 1 минуту",
      "Квитанция после оплаты",
      "Безопасная платформа для ассоциаций",
    ],
    cotizUpTitle: "CotizUp",
    cotizUpText: "Взнос/поддержка через CotizUp.",
    cotizUpCta: "Перейти на CotizUp",
    cotizUpBadge: "Официальная ссылка",
    cotizUpBenefits: [
      "Взнос/поддержка онлайн",
      "Для регулярной поддержки",
      "Официальная страница ассоциации",
    ],
    bankTitle: "БАНКОВСКИЙ ПЕРЕВОД",
    bankText: "IBAN + BIC (La Banque Postale)",
    importantTitle: "ВАЖНО ЗНАТЬ",
    importantText: "Если вам нужен чек/подтверждение — напишите нам, и мы ответим по e‑mail.",
    volunteerTitle: "СТАТЬ ВОЛОНТЁРОМ",
    volunteerText:
      "Хотите помочь со встречами, переводом или организацией? Напишите нам через форму — мы ответим по e-mail.",
    volunteerCta: "ХОЧУ ПОМОЧЬ",
    howToHelpTitle: "КАК МОЖНО ПОМОЧЬ",
    howToHelpItems: ["Помощь на встречах", "Перевод и тексты", "Организация и логистика", "Фото/видео и медиа"],
  },
};

type AboutIntroCopy = {
  title: string;
  paragraph1: string;
  paragraph2: string;
  goalsTitle: string;
  goals: string[];
  ctaLabel: string;
};

export const aboutIntroCopy: Record<ActionsLocale, AboutIntroCopy> = {
  ru: {
    title: "О нас",
    paragraph1:
      "Association IES помогает людям, которые недавно приехали в Страсбург, разобраться в первых шагах и административных вопросах.",
    paragraph2:
      "Мы отвечаем по email и принимаем по предварительной записи. Наша цель — дать понятные ориентиры и поддержать вас в процессе адаптации.",
    goalsTitle: "Наши цели",
    goals: [
      "Сделать информацию понятной и доступной",
      "Помогать с ориентацией в административных процедурах",
      "Поддерживать интеграцию через встречи и активности",
      "Соединять людей с полезными ресурсами и инициативами",
    ],
    ctaLabel: "Написать",
  },
  fr: {
    title: "À propos",
    paragraph1:
      "L’association IES aide les personnes récemment arrivées à Strasbourg à s’orienter dans les premières démarches.",
    paragraph2:
      "Nous répondons par e-mail et proposons un accueil sur rendez-vous. Notre objectif est de donner des repères clairs et un soutien dans le parcours d’intégration.",
    goalsTitle: "Nos objectifs",
    goals: [
      "Rendre l’information plus claire et accessible",
      "Aider à s’orienter dans les démarches administratives",
      "Favoriser l’intégration via des rencontres et activités",
      "Mettre en lien avec des ressources et initiatives utiles",
    ],
    ctaLabel: "Nous écrire",
  },
};

type QuickContactFormCopy = {
  title: string;
  helper: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  topicLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  topicPlaceholder: string;
  messagePlaceholderDefault: string;
  messagePlaceholderOther: string;
  buttonLabel: { hero: string; page: string };
  hint: string;
  required: string;
  invalidEmail: string;
  openingGmail: string;
  sendFailed: string;
  copyLetter: string;
  copied: string;
  copyFailed: string;
  openOutlook: string;
  bodyLabels: { name: string; email: string; phone: string; topic: string; message: string };
  subject: string;
};

export const quickContactFormCopy: Record<ActionsLocale, QuickContactFormCopy> = {
  fr: {
    title: "Écrire à l’association",
    helper:
      "Pour que nous répondions plus vite, faites défiler la page et choisissez la rubrique adaptée. Ensuite, remplissez le formulaire — nous répondrons par e-mail.",
    nameLabel: "Nom et prénom *",
    emailLabel: "E-mail *",
    phoneLabel: "Téléphone",
    topicLabel: "Sujet *",
    messageLabel: "Message *",
    namePlaceholder: "Votre nom et prénom",
    emailPlaceholder: "Votre e-mail",
    phonePlaceholder: "Numéro de téléphone (optionnel)",
    topicPlaceholder: "Choisissez un thème",
    messagePlaceholderDefault:
      "Décrivez la situation en détail. S’il y a des délais ou un courrier, précisez-le dans le message.",
    messagePlaceholderOther:
      "Décrivez votre demande en détail. S’il y a des délais ou un courrier, précisez-le dans le message.",
    buttonLabel: { hero: "Envoyer", page: "Envoyer" },
    hint: "Réponse par e-mail. Rendez-vous uniquement sur inscription.",
    required: "Champ requis",
    invalidEmail: "Vérifiez le format de l’e-mail",
    openingGmail: "Message envoyé. Réponse par e-mail.",
    sendFailed: "Échec de l’envoi. Réessayez ou écrivez-nous par e-mail.",
    copyLetter: "Copier le texte du message",
    copied: "Copié",
    copyFailed: "Impossible de copier. Copiez manuellement.",
    openOutlook: "Ouvrir Outlook Web",
    bodyLabels: { name: "Nom", email: "E-mail", phone: "Téléphone", topic: "Sujet", message: "Message" },
    subject: "Message depuis le site Association IES",
  },
  ru: {
    title: "Написать в ассоциацию",
    helper:
      "Чтобы мы быстрее разобрались, пролистайте ниже и выберите подходящий раздел. Затем заполните форму — ответим по e-mail.",
    nameLabel: "Имя и фамилия *",
    emailLabel: "E-mail *",
    phoneLabel: "Телефон",
    topicLabel: "Тема *",
    messageLabel: "Сообщение *",
    namePlaceholder: "Имя и фамилия",
    emailPlaceholder: "Ваш e-mail",
    phonePlaceholder: "Номер телефона (необязательно)",
    topicPlaceholder: "Выберите тему",
    messagePlaceholderDefault: "Опишите ситуацию подробно. Если есть сроки или письмо — укажите это в тексте.",
    messagePlaceholderOther: "Опишите ваш вопрос подробно. Если есть сроки или письмо — укажите это в тексте.",
    buttonLabel: { hero: "Отправить", page: "Отправить" },
    hint: "Ответим по e-mail. Встреча — только по записи.",
    required: "Заполните поле",
    invalidEmail: "Проверьте формат e-mail",
    openingGmail: "Сообщение отправлено. Ответим по e-mail.",
    sendFailed: "Не удалось отправить. Попробуйте ещё раз или напишите на e-mail.",
    copyLetter: "Скопировать текст письма",
    copied: "Скопировано",
    copyFailed: "Не удалось скопировать. Скопируйте вручную.",
    openOutlook: "Открыть Outlook Web",
    bodyLabels: { name: "Имя", email: "E-mail", phone: "Телефон", topic: "Тема", message: "Сообщение" },
    subject: "Сообщение с сайта Association IES",
  },
};

type ContactEmailBoxCopy = {
  emailLabel: string;
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
  helperText: string;
};

export const contactEmailBoxCopy: Record<ActionsLocale, ContactEmailBoxCopy> = {
  fr: {
    emailLabel: "E-mail ",
    copyLabel: "Copier l’e-mail",
    copiedLabel: "E-mail copié ",
    failedLabel: "Impossible de copier. Copiez manuellement.",
    helperText: "",
  },
  ru: {
    emailLabel: "E-mail",
    copyLabel: "Скопировать e-mail",
    copiedLabel: "E-mail скопирован",
    failedLabel: "Не удалось скопировать. Скопируйте вручную.",
    helperText: "",
  },
};

type BankTransferCopy = {
  copyAllLabel: string;
  copyIbanLabel: string;
  copyBicLabel: string;
  copiedLabel: string;
  copiedIbanStatus: string;
  copiedBicStatus: string;
  copyFailedLabel: string;
  cardTitle: string;
  hint: string;
};

export const bankTransferCopy: Record<ActionsLocale, BankTransferCopy> = {
  fr: {
    copyAllLabel: "Copier (IBAN + BIC)",
    copyIbanLabel: "COPIER IBAN",
    copyBicLabel: "COPIER BIC",
    copiedLabel: "Copié",
    copiedIbanStatus: "Copié ✓",
    copiedBicStatus: "Copié ✓",
    copyFailedLabel: "Impossible de copier automatiquement",
    cardTitle: "Coordonnées bancaires",
    hint: "Cliquez pour copier l’IBAN ou le BIC.",
  },
  ru: {
    copyAllLabel: "Скопировать (IBAN + BIC)",
    copyIbanLabel: "Копировать IBAN",
    copyBicLabel: "Копировать BIC",
    copiedLabel: "Скопировано",
    copiedIbanStatus: "Скопировано ✓",
    copiedBicStatus: "Скопировано ✓",
    copyFailedLabel: "Не удалось скопировать автоматически",
    cardTitle: "Реквизиты",
    hint: "Нажмите, чтобы скопировать IBAN или BIC.",
  },
};

type ActionsPageCopy = {
  catalogAriaLabel: string;
};

export const actionsPageCopy: Record<ActionsLocale, ActionsPageCopy> = {
  fr: { catalogAriaLabel: "Catalogue des actions" },
  ru: { catalogAriaLabel: "Каталог направлений" },
};

type InstagramBadgeCopy = {
  label: string;
  description: string;
};

export const instagramBadgeCopy: Record<ActionsLocale, InstagramBadgeCopy> = {
  fr: {
    label: "Instagram",
    description: "Actus et annonces",
  },
  ru: {
    label: "Instagram",
    description: "Новости и анонсы",
  },
};

export const siteMetadata = {
  title: "Association IES",
  description: "Association IES",
};
