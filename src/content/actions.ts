/*
 Этот файл хранит тексты, заголовки и списки для страниц и блоков сайта (RU/FR).
 Он также содержит справочные данные для форм и навигации.
*/

// Доступные языки для текстов на сайте.
export type ActionsLocale = "ru" | "fr";

// Описание одного направления на странице действий.
export type ActionDirection = {
  slug: string;
  topicKey: string;
  intentId: string;
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
  finalCta: {
    text: string;
    button: string;
  };
  items: ActionDirection[];
};

const sharedCtaLabel = {
  ru: "Записаться",
  fr: "S’INSCRIRE",
} as const;

// Тексты и данные для страницы “Действия” на двух языках.
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
      title: "Наша деятельность",
      subtitle:
        "Проекты, встречи и программы Association IES: образование, спорт, культура, поддержка и интеграция. Выберите направление — мы расскажем детали, подскажем формат участия и поможем записаться. Нажмите «Записаться», и мы ответим по e-mail с ближайшим шагом.",
      forWhoLabel: "Для кого",
      benefitLabel: "Что даёт",
      frequencyLabel: "Формат / частота",
      whenWhereLabel: "Когда / где:",
      whenWhereText: "Уточняется при записи",
      cta: sharedCtaLabel.ru,
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
    finalCta: {
      text: "Есть вопрос по проектам ассоциации? Напишите — подскажем, с чего начать.",
      button: "Написать",
    },
    items: [
      {
        slug: "langues-ateliers",
        topicKey: "language_development",
        intentId: "action_lang",
        title: "ЯЗЫКИ И РАЗВИТИЕ",
        forWho: "Для детей и взрослых, кто хочет укрепить язык и навыки общения.",
        benefit:
          "Практика языка, уверенность в общении и участие в жизни города. Включая чеченский и русский.",
        frequency: "Регулярно • по группам / мастерские (по проекту)",
      },
      {
        slug: "sport",
        topicKey: "sport_regular",
        intentId: "action_sport",
        title: "СПОРТ И РЕГУЛЯРНАЯ АКТИВНОСТЬ",
        forWho: "Для детей, подростков и взрослых.",
        benefit: "Здоровая активность, дисциплина, командный дух и вовлечённость.",
        frequency: "Регулярно • в течение года",
      },
      {
        slug: "jardin-ateliers-nature",
        topicKey: "garden_workshops_nature",
        intentId: "action_garden_workshops",
        title: "САД, МАСТЕРСКИЕ И ВСТРЕЧИ НА ПРИРОДЕ",
        forWho: "Для семей, детей и всех, кому важны совместные дела и общение.",
        benefit: "Совместная деятельность, навыки и тёплые встречи вне формальностей.",
        frequency: "Сезонно / по событиям",
      },
      {
        slug: "sorties-culturelles",
        topicKey: "cultural_outings_trips",
        intentId: "action_culture_trips",
        title: "КУЛЬТУРНЫЕ ВЫХОДЫ И ПОЕЗДКИ",
        forWho: "Для семей, подростков и взрослых.",
        benefit: "Открытие города и региона, новые знакомства, расширение кругозора.",
        frequency: "По событиям • в течение года",
      },
      {
        slug: "forums-jeunesse-entrepreneuriat",
        topicKey: "youth_forums_entrepreneurship",
        intentId: "action_youth_forums",
        title: "ФОРУМЫ МОЛОДЁЖИ И ПРЕДПРИНИМАТЕЛЬСТВА",
        forWho: "Для молодёжи и тех, кто интересуется инициативами и проектами.",
        benefit: "Встречи, вдохновение, полезные контакты и ориентация по возможностям.",
        frequency: "По событиям (форумы / встречи)",
      },
      {
        slug: "rencontres-cohesion",
        topicKey: "community_meetings_cohesion",
        intentId: "action_meetings_community",
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
      title: "Nos activités",
      subtitle:
        "Projets, rencontres et programmes de l’Association IES : éducation, sport, culture, accompagnement et intégration. Choisissez un axe — nous vous expliquons les détails, le format de participation et la prochaine étape. Cliquez sur « S’inscrire » : nous vous répondrons par e-mail.",
      forWhoLabel: "Pour qui",
      benefitLabel: "Ce que ça apporte",
      frequencyLabel: "Format / fréquence",
      whenWhereLabel: "Quand / où :",
      whenWhereText: "Précisé lors de l’inscription",
      cta: sharedCtaLabel.fr,
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
    finalCta: {
      text: "Une question sur nos actions ? Écrivez‑nous — on vous oriente.",
      button: "Écrire",
    },
    items: [
      {
        slug: "langues-ateliers",
        topicKey: "language_development",
        intentId: "action_lang",
        title: "LANGUES ET DÉVELOPPEMENT",
        forWho: "Enfants et adultes qui souhaitent renforcer la langue et la communication.",
        benefit:
          "Pratique, confiance à l’oral et participation à la vie locale. Y compris le tchétchène et le russe.",
        frequency: "Régulier • groupes / ateliers (selon le projet)",
      },
      {
        slug: "sport",
        topicKey: "sport_regular",
        intentId: "action_sport",
        title: "SPORT & ACTIVITÉ RÉGULIÈRE",
        forWho: "Enfants, ados et adultes.",
        benefit: "Activité saine, discipline, esprit d’équipe et engagement.",
        frequency: "Régulier • toute l’année",
      },
      {
        slug: "jardin-ateliers-nature",
        topicKey: "garden_workshops_nature",
        intentId: "action_garden_workshops",
        title: "JARDIN, ATELIERS & RENCONTRES NATURE",
        forWho: "Familles, enfants et toute personne qui aime faire ensemble et échanger.",
        benefit: "Activités partagées, apprentissages et rencontres conviviales.",
        frequency: "Saisonnier / selon les événements",
      },
      {
        slug: "sorties-culturelles",
        topicKey: "cultural_outings_trips",
        intentId: "action_culture_trips",
        title: "SORTIES CULTURELLES & EXCURSIONS",
        forWho: "Familles, ados et adultes.",
        benefit: "Découvrir la ville et la région, faire des rencontres, élargir l’horizon.",
        frequency: "Selon les événements • toute l’année",
      },
      {
        slug: "forums-jeunesse-entrepreneuriat",
        topicKey: "youth_forums_entrepreneurship",
        intentId: "action_youth_forums",
        title: "FORUMS JEUNESSE & ENTREPRENEURIAT",
        forWho: "Jeunes et personnes intéressées par les initiatives et les projets.",
        benefit: "Rencontres, inspiration, contacts utiles et repères sur les opportunités.",
        frequency: "Selon événements (forums / rencontres)",
      },
      {
        slug: "rencontres-cohesion",
        topicKey: "community_meetings_cohesion",
        intentId: "action_meetings_community",
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

// Базовые ключи тем для контактов (без тем действий и помощи).
export const baseContactTopicKeys = [
  "prefecture_vnj",
  "caf_cpam_francetravail",
  "housing_school_health",
  "work_orientation",
  "projects_events",
] as const;

// Подписи к базовым темам на двух языках.
const baseContactTopicLabels: Record<(typeof baseContactTopicKeys)[number], { ru: string; fr: string }> = {
  prefecture_vnj: { ru: "Префектура / ВНЖ", fr: "Préfecture / titre de séjour" },
  caf_cpam_francetravail: { ru: "CAF / CPAM / France Travail", fr: "CAF / CPAM / France Travail" },
  housing_school_health: { ru: "Жильё / школа / здоровье", fr: "Logement / école / santé" },
  work_orientation: { ru: "CV / работа / ориентация", fr: "CV / emploi / orientation" },
  projects_events: { ru: "Проекты и мероприятия ассоциации", fr: "Projets et événements de l’association" },
};

// Темы для блока помощи с короткими названиями.
const aideTopicLabels: Record<string, { ru: string; fr: string }> = {
  caf_support: { ru: "CAF (пособия, письма, личный кабинет)", fr: "CAF (allocations, courriers, espace perso)" },
  cpam_health: { ru: "CPAM / здоровье (письма, Carte Vitale)", fr: "CPAM / santé (courriers, Carte Vitale)" },
  france_travail: { ru: "France Travail / поиск работы", fr: "France Travail / recherche d’emploi" },
  housing_school_everyday: { ru: "Жильё / школа / повседневные вопросы", fr: "Logement / école / quotidien" },
  not_sure: { ru: "Не знаете, с чего начать?", fr: "Vous ne savez pas par où commencer ?" },
};

// Темы для поддержки ассоциации.
const supportTopicLabels: Record<string, { ru: string; fr: string }> = {
  donation_helloasso: { ru: "Донат через HelloAsso", fr: "Don via HelloAsso" },
  donation_cotizup: { ru: "Взнос через CotizUp", fr: "Cotisation via CotizUp" },
  volunteer: { ru: "Волонтёрство", fr: "Bénévolat" },
};

// Универсальная метка для прочих вопросов.
const otherTopicLabels = { ru: "Другое", fr: "Autre" };

// Темы, которые берём из списка действий, чтобы они совпадали с карточками.
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

// Общий справочник тем для формы контактов.
export const contactTopicLabels: Record<string, { ru: string; fr: string }> = {
  ...baseContactTopicLabels,
  ...aideTopicLabels,
  ...actionTopicLabels,
  ...supportTopicLabels,
  other: otherTopicLabels,
};

// Ключи тем, связанных с действиями.
export const actionContactTopicKeys = actionsCopy.ru.items.map((item) => item.topicKey);
// Ключи тем, связанных с поддержкой (используем только волонтёрство).
export const supportContactTopicKeys = ["volunteer"];

// Полный список ключей тем для выпадающего списка в форме.

// Тексты для страницы контактов.
export const contactCopy: Record<ActionsLocale, ContactCopy> = {
  ru: {
    pageTitle: "Контакты",
    pageLead: "Напишите через форму — ответим по e-mail.",
    whenTitle: "С какими вопросами писать?",
    whenItems: baseContactTopicKeys.map((key) => baseContactTopicLabels[key].ru),
    subjectLabel: "Тема",
  },
  fr: {
    pageTitle: "Contact",
    pageLead:
      "Écrivez via le formulaire — nous répondrons par e-mail.",
    whenTitle: "Pour quels sujets écrire ?",
    whenItems: baseContactTopicKeys.map((key) => baseContactTopicLabels[key].fr),
    subjectLabel: "Sujet",
  },
};

const actionTopicAliases: Record<string, string> = Object.fromEntries(
  actionsCopy.ru.items.map((item) => [`actions_${item.slug}`, item.topicKey]),
);

// Альтернативные названия тем, которые встречаются в старых ссылках или внешних источниках.
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

// Возвращает подпись темы на выбранном языке.
export function getContactTopicLabel(locale: ActionsLocale, topicKey: string) {
  return contactTopicLabels[topicKey]?.[locale] ?? topicKey;
}

// Нормализует ключ темы из строки (адресной или пользовательской).
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

// Карточка для навигации на главной странице.
export type HomeNavCard = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  // Куда ведёт карточка (часть пути без языка, например "/aide")
  path: string;
  icon: string;
};

// Список карточек навигации для главной страницы.
export const homeNavCards: HomeNavCard[] = [
  {
    id: "aide",
    title: { fr: "Obtenir de l'aide", ru: "Получить помощь" },
    description: {
      fr: "Comprendre les démarches et avancer.",
      ru: "Разобраться с шагами и получить поддержку.",
    },
    path: "/aide",
    icon: "/02.png",
  },
  {
    id: "actions",
    title: { fr: "M'inscrire a une activité", ru: "Записаться на занятие" },
    description: {
      fr: "Programmes, activités et accompagnement.",
      ru: "Программы, активности и сопровождение.",
    },
    path: "/actions",
    icon: "/03.png",
  },
  {
    id: "soutenir",
    title: { fr: "Soutenir l'association", ru: "Поддержать ассоциацию" },
    description: {
      fr: "Bénévolat, dons et partenariats.",
      ru: "Волонтёрство, пожертвования и партнёрства.",
    },
    path: "/soutenir",
    icon: "/04.png",
  },
];

// Язык для данных раздела помощи.
export type AideLocale = ActionsLocale;

// Описание одной темы помощи: ключ, заголовок и примеры.
type AideTopic = {
  topicKey: string;
  intentId: string;
  title: string;
  examples: string[];
  prepareLine: string;
  preparePrefix?: string;
};

type AideCopy = {
  hero: {
    title: string;
    line1: string;
    line2: string;
    badge: string;
    ctaScroll: string;
  };
  topics: {
    title: string;
    subtitle: string;
    preparePrefix: string;
    chooseLabel: string;
    items: AideTopic[];
  };
};

// Тексты и данные для страницы помощи.
export const aideCopy: Record<AideLocale, AideCopy> = {
  ru: {
    hero: {
      title: "Чем можем помочь?",
      line1: "Выберите тему — так мы быстрее поймём запрос.",
      line2: "Заполните форму, и мы ответим по email.",
      badge: "Бесплатно • По записи • Ответ по e-mail",
      ctaScroll: "Выбрать тему",
    },
    topics: {
      title: "Чем можем помочь?",
      subtitle: "Выберите тему — так мы быстрее поймём запрос. Заполните форму, и мы ответим по email.",
      preparePrefix: "Что подготовить:",
      chooseLabel: sharedCtaLabel.ru,
      items: [
        {
          topicKey: "prefecture_vnj",
          intentId: "aide_prefecture_vnj",
          title: "Префектура / ВНЖ",
          examples: [
            "Список документов: что именно нужно в вашем случае",
            "Запись и подача документов: как и куда подать",
            "Письма из префектуры: что означает и что отвечать",
            "Сроки, статусы, следующий шаг",
          ],
          prepareLine: "письма/уведомления, документы, номер досье (если есть)",
        },
        {
          topicKey: "caf_support",
          intentId: "aide_caf",
          title: "CAF (пособия, письма, личный кабинет)",
          examples: [
            "Создать аккаунт / войти в личный кабинет",
            "Письмо «document manquant»: что не хватает и что отправить",
            "Отправка документов: что важно приложить и сохранить",
            "Статус заявки: как читать и что делать дальше",
          ],
          prepareLine: "номер allocataire (если есть), письма CAF, список уже отправленных документов",
        },
        {
          topicKey: "cpam_health",
          intentId: "aide_cpam_sante",
          title: "CPAM / здоровье (письма, Carte Vitale)",
          examples: [
            "Открыть права в CPAM: с чего начать",
            "Письма и запросы документов: что отвечать",
            "Carte Vitale и attestation: как получить",
            "Куда обратиться по вашей ситуации",
          ],
          prepareLine: "письма CPAM, документы, номер sécurité sociale (если есть)",
        },
        {
          topicKey: "france_travail",
          intentId: "aide_france_travail",
          title: "France Travail / поиск работы",
          examples: [
            "Регистрация и доступ в аккаунт",
            "Письма, требования, приглашения: что это значит",
            "Какие шаги важны сейчас",
            "Куда обращаться дальше",
          ],
          prepareLine: "письма France Travail, ваш статус/документы, что уже сделали",
        },
        {
          topicKey: "housing_school_everyday",
          intentId: "aide_logement_ecole_quotidien",
          title: "Жильё / школа / повседневные вопросы",
          examples: [
            "Куда обращаться (город, службы, учреждения)",
            "Школа/сад: что подготовить и какие шаги",
            "Медицина: базовые ориентиры и действия",
            "Письма и формальности: как разобраться",
          ],
          prepareLine: "город/район, письма/документы, кратко цель (что хотите получить)",
        },
        {
          topicKey: "not_sure",
          intentId: "aide_dont_know",
          title: "Другая тема",
          examples: [
            "Опишите ситуацию в 1–2 предложениях",
            "Пришлите/вставьте письмо, которое беспокоит (если есть)",
            "Напишите, что уже пробовали",
            "Подскажем понятный следующий шаг",
          ],
          prepareLine: "1–2 предложения о ситуации + краткое описание письма (если есть)",
        },
      ],
    },
  },
  fr: {
    hero: {
      title: "Comment vous aider ?",
      line1: "Choisissez un thème — nous comprendrons plus vite votre demande.",
      line2: "Remplissez le formulaire : nous vous répondrons par e-mail.",
      badge: "Gratuit • Sur rendez-vous • Réponse par e-mail",
      ctaScroll: "Choisir le thème",
    },
    topics: {
      title: "Comment vous aider ?",
      subtitle: "Choisissez un thème — nous comprendrons plus vite votre demande. Remplissez le formulaire : nous vous répondrons par e-mail.",
      preparePrefix: "À préparer :",
      chooseLabel: sharedCtaLabel.fr,
      items: [
        {
          topicKey: "prefecture_vnj",
          intentId: "aide_prefecture_vnj",
          title: "Préfecture / titre de séjour",
          examples: [
            "Liste des pièces : quoi fournir dans votre cas",
            "Rendez-vous et dépôt : comment et où déposer",
            "Courriers de la préfecture : quoi comprendre et quoi répondre",
            "Délais, statut, prochaine étape",
          ],
          prepareLine: "courriers/notifications, documents, numéro de dossier (si disponible)",
        },
        {
          topicKey: "caf_support",
          intentId: "aide_caf",
          title: "CAF (allocations, courriers, espace perso)",
          examples: [
            "Créer / se connecter à votre espace",
            "Courrier « document manquant » : quoi envoyer",
            "Envoi des pièces : points clés + preuves à garder",
            "Statut du dossier : comprendre et savoir quoi faire ensuite",
          ],
          prepareLine: "numéro allocataire (si disponible), courriers CAF, liste des documents déjà envoyés",
        },
        {
          topicKey: "cpam_health",
          intentId: "aide_cpam_sante",
          title: "CPAM / santé (courriers, Carte Vitale)",
          examples: [
            "Ouvrir vos droits CPAM : par où commencer",
            "Courriers / demandes de pièces : quoi répondre",
            "Carte Vitale et attestation : comment les obtenir",
            "Où s’adresser selon votre situation",
          ],
          prepareLine: "courriers CPAM, documents, numéro de sécurité sociale (si disponible)",
        },
        {
          topicKey: "france_travail",
          intentId: "aide_france_travail",
          title: "France Travail / recherche d’emploi",
          examples: [
            "Inscription et accès au compte",
            "Courriers, convocations, exigences : comprendre le contenu",
            "Les étapes prioritaires maintenant",
            "Vers qui se tourner ensuite",
          ],
          prepareLine: "courriers France Travail, votre statut/documents, ce que vous avez déjà fait",
        },
        {
          topicKey: "housing_school_everyday",
          intentId: "aide_logement_ecole_quotidien",
          title: "Logement / école / quotidien",
          examples: [
            "Où s’adresser (ville, services, organismes)",
            "École/crèche : quoi préparer et quelles démarches",
            "Santé : repères de base et premières étapes",
            "Courriers et formalités : comment s’y retrouver",
          ],
          prepareLine: "ville/quartier, courriers/documents, objectif en bref (ce que vous voulez obtenir)",
        },
        {
          topicKey: "not_sure",
          intentId: "aide_dont_know",
          title: "Autre sujet",
          examples: [
            "Décrivez la situation en 1–2 phrases",
            "Copiez/joignez le courrier qui vous inquiète (si possible)",
            "Dites ce que vous avez déjà essayé",
            "Nous indiquons une prochaine étape claire",
          ],
          preparePrefix: "À préparer\u00A0:",
          prepareLine: "1–2 phrases sur la situation + bref descriptif du courrier (si possible)",
        },
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

// Тексты и кнопки первого экрана главной страницы.
export const heroCopy: Record<ActionsLocale, HeroCopy> = {
  ru: {
    title: "ПОМОЩЬ, ИНТЕГРАЦИЯ, СТРАСБУРГ",
    lead: "Документы, работа, обучение и поддержка в Страсбурге — подскажем понятный следующий шаг без лишней бюрократии.",
    ctaPrimary: "Получить помощь",
    ctaSecondary: "Наши действия",
    pills: ["Интеграция", "Образование", "Синергия"],
    pillsAriaLabel: "ключевые слова",
  },
  fr: {
    title: "AIDE, INTÉGRATION, STRASBOURG",
    lead: "Démarches, emploi, apprentissage et soutien à Strasbourg — on vous indique la prochaine étape, simplement.",
    ctaPrimary: "Demande d'aide",
    ctaSecondary: "Activités",
    pills: ["Intégration", "Éducation", "Synergie"],
    pillsAriaLabel: "mots-clés",
  },
};

type QuickNavCopy = {
  title: string;
  subtitle: string;
  ctaLabel: string;
};

// Тексты для блока быстрого перехода по темам.
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
  photos: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[];
};

// Тексты и фотографии для блока доверия на главной странице.
export const trustBlockCopy: Record<ActionsLocale, TrustBlockCopy> = {
  ru: {
    title: "ЧЕМ МЫ ЗАНИМАЕМСЯ?",
    photos: [
      {
        src: "/1.jpg",
        alt: "Участники встречи Association IES",
        title: "Ежегодный форум IES",
        description: "Форум, где обсуждаем поддержку, интеграцию и совместные шаги.",
      },
      {
        src: "/2.JPG",
        alt: "Поддержка и общение в Association IES",
        title: "Консультации и поддержка",
        description: "Советы и помощь по документам, работе и обучению.",
      },
      {
        src: "/3.JPG",
        alt: "Волонтёры работают в саду Association IES",
        title: "Сад волонтёров",
        description: "Забота и совместный труд.",
      },
      {
        src: "/4.JPG",
        alt: "Участники вместе собирают фрукты",
        title: "Сбор фруктов",
        description: "Тёплые встречи и помощь.",
      },
      {
        src: "/5.jpg",
        alt: "Футбол и турниры",
        title: "Футбол и турниры",
        description: "Командный дух, активность и участие в спортивных событиях.",
      },
      {
        src: "/6.JPG",
        alt: "Тхэквондо для детей",
        title: "Тхэквондо для детей",
        description: "Дисциплина, уверенность и спорт в безопасной атмосфере.",
      },
    ],
  },
  fr: {
    title: "CE QUE NOUS FAISONS ?",
    photos: [
      {
        src: "/1.jpg",
        alt: "Participants à une rencontre Association IES",
        title: "Forum annuel IES",
        description: "Un forum pour parler du soutien, de l’intégration et des actions communes.",
      },
      {
        src: "/2.JPG",
        alt: "Soutien et échanges au sein de l’Association IES",
        title: "Conseils et soutien",
        description: "Aide pour démarches, emploi et apprentissage.",
      },
      {
        src: "/3.JPG",
        alt: "Bénévoles au jardin de l’association IES",
        title: "Jardin solidaire",
        description: "Soin et travail partagé.",
      },
      {
        src: "/4.JPG",
        alt: "Participants en train de cueillir des fruits",
        title: "Cueillette",
        description: "Rencontres et entraide.",
      },
      {
        src: "/5.jpg",
        alt: "Football et tournois",
        title: "Football et tournois",
        description: "Esprit d’équipe, activité et participation à des événements sportif",
      },
      {
        src: "/6.JPG",
        alt: "Taekwondo pour enfants",
        title: "Taekwondo pour enfants",
        description: "Discipline, confiance et sport dans un cadre bienveillant.",
      },
    ],
  },
};

// Ключи тем, связанных с блоком помощи.
export const aideContactTopicKeys = aideCopy.ru.topics.items.map((item) => item.topicKey);

// Полный список ключей тем для выпадающего списка в форме.
export const contactTopicSelectKeys = [
  ...aideContactTopicKeys,
  ...actionContactTopicKeys,
  ...supportContactTopicKeys,
  "other",
];

type ActionsPreviewCopy = {
  items: string[];
  cardTitle: string;
  cardParagraphs: string[];
  ctaLabel: string;
  photos: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[];
};

// Тексты и карточка‑превью для блока действий на главной странице.
export const actionsPreviewCopy: Record<ActionsLocale, ActionsPreviewCopy> = {
  ru: {
    items: ["Административные консультации", "Сопровождение к работе", "Языковые занятия", "Культурные встречи и выезды"],
    cardTitle: "Посмотреть все",
    cardParagraphs: [
      "Откройте страницу с программами и форматами.",
      "Там будут форматы, расписания, регистрация и адреса по активностям.",
    ],
    ctaLabel: "Перейти к действиям",
    photos: [
      {
        src: "/3.JPG",
        alt: "Волонтёры работают в саду Association IES",
        title: "Сад волонтёров",
        description: "Забота и совместный труд.",
      },
      {
        src: "/4.JPG",
        alt: "Участники вместе собирают фрукты",
        title: "Сбор фруктов",
        description: "Тёплые встречи и помощь.",
      },
    ],
  },
  fr: {
    items: ["Consultations administratives", "Accompagnement vers l’emploi", "Ateliers de langue", "Rencontres et sorties"],
    cardTitle: "Voir tout",
    cardParagraphs: [
      "Ouvrez la page avec les programmes et les formats.",
      "Vous y trouverez les formats, les horaires, l’inscription et les adresses.",
    ],
    ctaLabel: "Aller à l’activité",
    photos: [
      {
        src: "/3.JPG",
        alt: "Bénévoles au jardin de l’association IES",
        title: "Jardin solidaire",
        description: "Soin et travail partagé.",
      },
      {
        src: "/4.JPG",
        alt: "Participants en train de cueillir des fruits",
        title: "Cueillette",
        description: "Rencontres et entraide.",
      },
    ],
  },
};

type FooterCopy = {
  copyright: string;
  contactLabel: string;
  privacyLabel: string;
  legalLabel: string;
  socialLabels: {
    instagram: string;
    facebook: string;
    linkedin: string;
    tiktok: string;
    whatsapp: string;
  };
};

// Подписи и ссылки для футера сайта.
export const footerCopy: Record<ActionsLocale, FooterCopy> = {
  ru: {
    copyright: "© 2025 Association IES",
    contactLabel: "контакты",
    privacyLabel: "Политика конфиденциальности",
    legalLabel: "Правовая информация",
    socialLabels: {
      instagram: "Instagram",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      whatsapp: "WhatsApp группа (рассылка)",
    },
  },
  fr: {
    copyright: "© 2025 Association IES",
    contactLabel: "Contact",
    privacyLabel: "Politique de confidentialité",
    legalLabel: "Mentions légales",
    socialLabels: {
      instagram: "Instagram",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      whatsapp: "Groupe WhatsApp (diffusion)",
    },
  },
};

type HeaderCopy = {
  brandLabel: string;
  brandName: string;
  navAriaLabel: string;
  navLabels: {
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

// Тексты для шапки сайта и мобильного меню.
export const headerCopy: Record<ActionsLocale, HeaderCopy> = {
  ru: {
    brandLabel: "Association IES",
    brandName: "Association",
    navAriaLabel: "Меню сайта",
    navLabels: {
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
  rightsCnilText: string;
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

// Тексты для страницы политики конфиденциальности.
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
      "Законный интерес: обработка обращений и ответы на сообщения, которые вы отправляете через форму контакта.",
    shareTitle: "Получатели данных",
    shareText:
      "Мы не продаём персональные данные. Передаём их только если это требуется законом или для работы почты/хостинга.",
    retentionTitle: "Срок хранения",
    retentionText:
      "Мы храним данные только на срок, необходимый для обработки вашего обращения, либо дольше, если этого требует закон.",
    rightsTitle: "Ваши права",
    rightsItems: [
      "Доступ к данным",
      "Исправление",
      "Удаление",
      "Возражение против обработки",
      "Ограничение обработки",
      "Переносимость данных",
    ],
    rightsCnilText:
      "Если вы считаете, что ваши права нарушены, вы можете подать жалобу в CNIL: https://www.cnil.fr.",
    contactTitle: "Связаться с нами",
    contactTextBefore: "По вопросам конфиденциальности напишите через ",
    contactLinkLabel: "страницу контактов",
    contactTextAfter: " или на e-mail: ",
    contactEmail: "contact@associationies.fr",
    contactSubject: "Сообщение с сайта Association IES (Политика конфиденциальности)",
    contactBody: "Здравствуйте! У меня вопрос по политике конфиденциальности: ...",
    cookiesTitle: "ФАЙЛЫ COOKIE",
    cookiesText:
      "Мы используем только технические cookies, необходимые для работы сайта, и не используем рекламный трекинг.",
    updatedLabel: "Последнее обновление:",
    updatedDate: "31 января 2026",
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
    legalText:
      "Intérêt légitime : traiter les demandes et répondre aux messages envoyés via le formulaire de contact.",
    shareTitle: "Destinataires",
    shareText:
      "Nous ne vendons pas les données. Elles peuvent être transmises uniquement si la loi l’exige ou pour le fonctionnement de la messagerie/l’hébergement.",
    retentionTitle: "Durée de conservation",
    retentionText:
      "Nous conservons les données uniquement pendant la durée nécessaire au traitement de votre demande, ou plus longtemps si la loi l’exige.",
    rightsTitle: "Vos droits",
    rightsItems: [
      "Accès",
      "Rectification",
      "Effacement",
      "Opposition",
      "Limitation du traitement",
      "Portabilité",
    ],
    rightsCnilText:
      "Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la CNIL : https://www.cnil.fr.",
    contactTitle: "Nous contacter",
    contactTextBefore: "Pour toute question, contactez-nous via la ",
    contactLinkLabel: "page Contact",
    contactTextAfter: " ou par e-mail : ",
    contactEmail: "contact@associationies.fr",
    contactSubject: "Message du site Association IES (Politique de confidentialité)",
    contactBody: "Bonjour ! J’ai une question concernant la politique de confidentialité : ...",
    cookiesTitle: "Cookies",
    cookiesText:
      "Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement du site et aucun suivi publicitaire.",
    updatedLabel: "Dernière mise à jour :",
    updatedDate: "31 janvier 2026",
  },
};

type LegalSection = {
  title: string;
  lines: string[];
};

type LegalPageCopy = {
  title: string;
  lead: string;
  metadataTitle: string;
  metadataDescription: string;
  sections: LegalSection[];
  updatedLabel: string;
  updatedDate: string;
};

// Тексты для страницы "Mentions légales / Правовая информация".
export const legalPageCopy: Record<ActionsLocale, LegalPageCopy> = {
  ru: {
    title: "ПРАВОВАЯ ИНФОРМАЦИЯ",
    lead: "Обязательные юридические сведения о сайте Association IES.",
    metadataTitle: "Правовая информация | Association IES",
    metadataDescription:
      "Юридические реквизиты Association IES, информация о публикации, хостинге и правах на контент.",
    sections: [
      {
        title: "Издатель сайта",
        lines: [
          "Association pour l'Éducation et l'Insertion Sociale Intégration, Éducation, Synergie (ASSOCIATION I.E.S.)",
          "Адрес: 117 Route de Schirmeck, 67200 Strasbourg, France",
          "SIREN: 879 060 283",
          "SIRET (siège): 879 060 283 00014",
          "Code APE/NAF: 94.99Z",
          "Форма: Association de droit local (Bas-Rhin, Haut-Rhin et Moselle)",
          "Дата создания: 19/02/2019",
          "Статус / Label: ESS - Économie Sociale et Solidaire",
        ],
      },
      {
        title: "Ответственный за публикацию",
        lines: ["Association I.E.S. - Représentant légal : [À compléter]"],
      },
      {
        title: "Хостинг",
        lines: [
          "Провайдер хостинга: [укажите название провайдера]",
          "Юридическое наименование: [укажите юридическое лицо]",
          "Адрес хостинга: [укажите адрес]",
          "Контакт хостинга: [укажите e-mail/телефон]",
        ],
      },
      {
        title: "Интеллектуальная собственность",
        lines: [
          "Весь контент сайта (тексты, изображения, графика, логотипы, видео и др.) защищён правами интеллектуальной собственности.",
          "Любое полное или частичное воспроизведение, публикация, изменение или адаптация запрещены без предварительного разрешения.",
        ],
      },
      {
        title: "Персональные данные",
        lines: [
          "Данные, переданные через формы сайта, используются только для ответа на запросы.",
          "Мы храним данные только на срок, необходимый для обработки вашего обращения, либо дольше, если этого требует закон.",
          "Данные не передаются третьим лицам, кроме случаев, предусмотренных законом или технической необходимостью хостинга/почты.",
          "Для доступа, исправления или удаления данных свяжитесь с нами по e-mail: contact@associationies.fr.",
        ],
      },
      {
        title: "ФАЙЛЫ COOKIE",
        lines: [
          "Мы используем только технические cookies, необходимые для работы сайта, и не используем рекламный трекинг.",
        ],
      },
    ],
    updatedLabel: "Последнее обновление:",
    updatedDate: "26 февраля 2026",
  },
  fr: {
    title: "Mentions légales",
    lead: "Informations juridiques obligatoires du site de l'Association IES.",
    metadataTitle: "Mentions légales | Association IES",
    metadataDescription:
      "Informations légales de l'Association IES: éditeur, direction de publication, hébergement et droits sur les contenus.",
    sections: [
      {
        title: "Éditeur du site",
        lines: [
          "Association pour l'Éducation et l'Insertion Sociale Intégration, Éducation, Synergie (ASSOCIATION I.E.S.)",
          "Adresse : 117 Route de Schirmeck, 67200 Strasbourg, France",
          "SIREN : 879 060 283",
          "SIRET (siège) : 879 060 283 00014",
          "Code APE/NAF : 94.99Z",
          "Forme juridique : Association de droit local (Bas-Rhin, Haut-Rhin et Moselle)",
          "Date de création : 19/02/2019",
          "Qualité / Label : ESS - Économie Sociale et Solidaire",
        ],
      },
      {
        title: "Directeur / Directrice de la publication",
        lines: ["Association I.E.S. - Représentant légal : [À compléter]"],
      },
      {
        title: "Hébergement",
        lines: [
          "Hébergeur : [indiquer le nom du prestataire]",
          "Raison sociale : [indiquer l'entité juridique]",
          "Adresse : [indiquer l'adresse]",
          "Contact : [indiquer e-mail/téléphone]",
        ],
      },
      {
        title: "Propriété intellectuelle",
        lines: [
          "L'ensemble des contenus du site (textes, images, graphismes, logos, vidéos, etc.) est protégé par le droit de la propriété intellectuelle.",
          "Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, est interdite sans autorisation préalable.",
        ],
      },
      {
        title: "Données personnelles",
        lines: [
          "Les informations transmises via les formulaires du site sont utilisées uniquement pour répondre à votre demande.",
          "Nous conservons les données uniquement pendant la durée nécessaire au traitement de votre demande, ou plus longtemps si la loi l’exige.",
          "Elles ne sont pas cédées à des tiers, sauf obligation légale ou nécessité technique liée à l'hébergement/à la messagerie.",
          "Pour demander l'accès, la rectification ou la suppression de vos données, contactez-nous par e-mail : contact@associationies.fr.",
        ],
      },
      {
        title: "Cookies",
        lines: [
          "Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement du site et aucun suivi publicitaire.",
        ],
      },
    ],
    updatedLabel: "Dernière mise à jour :",
    updatedDate: "26 février 2026",
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

// Тексты для страницы поддержки ассоциации.
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

type HistoryCopy = {
  title: string;
  paragraph1: string;
  paragraph2: string;
};

// Тексты для блока «Наша история».
export const historyCopy: Record<ActionsLocale, HistoryCopy> = {
  ru: {
    title: "Наша история",
    paragraph1:
      "Association IES появилась в Strasbourg в 2019 году — из опыта людей, которые знают, что такое переезд и поиск своего места. Мы рядом, чтобы путь к интеграции был понятным и человеческим: шаг за шагом, с уважением к культурам и с настоящим «вместе».",
    paragraph2:
      "Мы поддерживаем семьи и молодёжь в социальной и профессиональной адаптации, помогаем выстраивать связи, находить опору и участие в жизни города. Потому что сильное сообщество рождается там, где есть гуманность, солидарность и синергия — и где люди встречаются не «по необходимости», а по-настоящему.",
  },
  fr: {
    title: "Notre histoire",
    paragraph1:
      "Association IES est née à Strasbourg en 2019, portée par celles et ceux qui connaissent l’expérience de l’exil. Notre mission : rendre l’intégration plus simple et plus humaine, étape par étape, dans le respect des cultures et du vivre-ensemble.",
    paragraph2:
      "Nous accompagnons les familles et les jeunes dans leur insertion sociale et professionnelle, et nous favorisons les rencontres entre habitants, cultures et générations. Car une cohésion durable se construit avec humanité, solidarité et synergie — quand les liens deviennent vrais.",
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
  messagePlaceholderVolunteer: string;
  pageNoteDefault: string;
  pageNoteVolunteer: string;
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

// Тексты и подсказки для формы быстрого обращения.
export const quickContactFormCopy: Record<ActionsLocale, QuickContactFormCopy> = {
  fr: {
    title: "Écrire à l’association",
    helper:
      "Pour que nous répondions plus vite, faites défiler la page et choisissez la rubrique adaptée. Ensuite, remplissez le formulaire — nous répondrons par e-mail.",
    nameLabel: "Nom et prénom *",
    emailLabel: "E-mail *",
    phoneLabel: "Téléphone",
    topicLabel: "Sujet *",
    messageLabel: "Décrivez votre situation *",
    namePlaceholder: "Votre nom et prénom",
    emailPlaceholder: "Votre e-mail",
    phonePlaceholder: "Numéro de téléphone (optionnel)",
    topicPlaceholder: "Choisissez un thème",
    messagePlaceholderDefault:
      "Décrivez la situation en détail. S’il y a des délais ou un courrier, précisez-le dans le message.",
    messagePlaceholderOther:
      "Décrivez votre demande en détail. S’il y a des délais ou un courrier, précisez-le dans le message.",
    messagePlaceholderVolunteer:
      "Dites-nous comment vous souhaitez aider (rencontres, traductions, organisation, média) et quand vous êtes disponible. Nous répondrons par e-mail.",
    pageNoteDefault:
      "Décrivez la situation de façon structurée : dates, démarches déjà faites, délais/courriers. Cela nous aide à répondre plus vite et plus précisément.",
    pageNoteVolunteer:
      "Dites-nous comment vous souhaitez aider (rencontres, traductions, organisation, média) et quand vous êtes disponible. Nous répondrons par e-mail.",
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
    messageLabel: "Опишите ситуацию *",
    namePlaceholder: "Имя и фамилия",
    emailPlaceholder: "Ваш e-mail",
    phonePlaceholder: "Номер телефона (необязательно)",
    topicPlaceholder: "Выберите тему",
    messagePlaceholderDefault: "Опишите ситуацию подробно. Если есть сроки или письмо — укажите это в тексте.",
    messagePlaceholderOther: "Опишите ваш вопрос подробно. Если есть сроки или письмо — укажите это в тексте.",
    messagePlaceholderVolunteer:
      "Расскажите, чем вы хотите помочь (встречи/переводы/организация/медиа) и когда вам удобно. Мы ответим по e-mail.",
    pageNoteDefault:
      "Опишите ситуацию по пунктам: даты, что уже сделано и какие есть сроки/письма. Так мы ответим быстрее и точнее.",
    pageNoteVolunteer:
      "Расскажите, чем вы хотите помочь (встречи/переводы/организация/медиа) и когда вам удобно. Мы ответим по e-mail.",
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

// Тексты для блока с e-mail и кнопкой копирования.
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

// Тексты для карточки банковских реквизитов.
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

// Подписи для страницы действий, которые используются в доступности.
export const actionsPageCopy: Record<ActionsLocale, ActionsPageCopy> = {
  fr: { catalogAriaLabel: "Catalogue des actions" },
  ru: { catalogAriaLabel: "Каталог направлений" },
};

type InstagramBadgeCopy = {
  label: string;
  description: string;
};

// Тексты для бейджа Instagram.
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

// Базовые метаданные сайта.
export const siteMetadata = {
  title: "Association IES",
  description: "Association IES",
};
