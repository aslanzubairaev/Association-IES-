import { activityTopicAliases, activityTopicEntries, activityTopicKeys } from "@/content/activitiesCatalog";
import { aideContactTopicKeys } from "@/content/aideCopy";

type Locale = "ru" | "fr";

export type ActionsLocale = Locale;

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

export const actionsCopy: Record<Locale, ActionsCopy> = {
  ru: {
    hero: {
      title: "ДЕЙСТВИЯ",
      lead:
        "Проекты, встречи и программы ассоциации IES: образование, спорт, культура, поддержка и интеграция.\nВыберите направление — расскажем детали и подскажем, как записаться.",
      hint: "Бесплатно • Для семей • Страсбург",
      ctaScroll: "Перейти к каталогу",
      ctaWrite: "Написать нам",
    },
    directions: {
      title: "Направления",
      subtitle: "Выберите направление — расскажем детали и подскажем, как записаться.",
      forWhoLabel: "Для кого",
      benefitLabel: "Что даёт",
      frequencyLabel: "Формат",
      whenWhereLabel: "Когда и где:",
      whenWhereText: "расписания, адреса и детали — по записи.",
      cta: "Записаться",
    },
    participate: {
      title: "Как участвовать",
      steps: [
        "Выберите направление",
        "Оставьте заявку через форму (имя, e-mail, тема)",
        "Мы ответим по e-mail с деталями и датами",
      ],
      ctaToContacts: "Написать нам",
    },
    finalCta: {
      text: "Вопросы, запись или предложения?",
      button: "Написать нам",
    },
    items: [],
  },
  fr: {
    hero: {
      title: "ACTIVITÉS",
      lead:
        "Projets, rencontres et programmes de l'association IES : éducation, sport, culture, soutien et intégration.\nChoisissez un domaine — on vous donne les détails et la marche à suivre.",
      hint: "Gratuit • Pour les familles • Strasbourg",
      ctaScroll: "Voir le catalogue",
      ctaWrite: "Nous écrire",
    },
    directions: {
      title: "Domaines",
      subtitle: "Choisissez un domaine — on vous donne les détails et la marche à suivre.",
      forWhoLabel: "Pour qui",
      benefitLabel: "Ce que ça apporte",
      frequencyLabel: "Format",
      whenWhereLabel: "Quand et où :",
      whenWhereText: "horaires, lieux et détails — sur inscription.",
      cta: "S'inscrire",
    },
    participate: {
      title: "Comment participer",
      steps: [
        "Choisissez un domaine",
        "Envoyez une demande via le formulaire (nom, e-mail, sujet)",
        "Nous vous répondrons par e-mail avec les détails et les dates",
      ],
      ctaToContacts: "Nous écrire",
    },
    finalCta: {
      text: "Questions, inscription ou propositions ?",
      button: "Nous écrire",
    },
    items: [],
  },
};

type ActionsPageCopy = {
  catalogAriaLabel: string;
};

export const actionsPageCopy: Record<Locale, ActionsPageCopy> = {
  fr: { catalogAriaLabel: "Catalogue des actions" },
  ru: { catalogAriaLabel: "Каталог направлений" },
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
  projects_events: { ru: "Проекты и мероприятия ассоциации", fr: "Projets et événements de l'association" },
};

const aideTopicLabels: Record<string, { ru: string; fr: string }> = {
  caf_support: { ru: "CAF (пособия, письма, личный кабинет)", fr: "CAF (allocations, courriers, espace perso)" },
  cpam_health: { ru: "CPAM / здоровье (письма, Carte Vitale)", fr: "CPAM / santé (courriers, Carte Vitale)" },
  france_travail: { ru: "France Travail / поиск работы", fr: "France Travail / recherche d'emploi" },
  housing_school_everyday: { ru: "Жильё / школа / повседневные вопросы", fr: "Logement / école / quotidien" },
  not_sure: { ru: "Не знаете, с чего начать?", fr: "Vous ne savez pas par où commencer ?" },
};

const supportTopicLabels: Record<string, { ru: string; fr: string }> = {
  donation_helloasso: { ru: "Донат через HelloAsso", fr: "Don via HelloAsso" },
  donation_cotizup: { ru: "Взнос через CotizUp", fr: "Cotisation via CotizUp" },
  volunteer: { ru: "Волонтёрство", fr: "Bénévolat" },
};

const otherTopicLabels = { ru: "Другое", fr: "Autre" };

const activityTopicLabels: Record<string, { ru: string; fr: string }> = Object.fromEntries(
  activityTopicEntries.map((entry) => [
    entry.topicKey,
    {
      ru: entry.title.ru,
      fr: entry.title.fr,
    },
  ]),
);

export const contactTopicLabels: Record<string, { ru: string; fr: string }> = {
  ...baseContactTopicLabels,
  ...aideTopicLabels,
  ...activityTopicLabels,
  ...supportTopicLabels,
  other: otherTopicLabels,
};

export const activityContactTopicKeys = [...activityTopicKeys];
export const actionContactTopicKeys = activityContactTopicKeys;
export const supportContactTopicKeys = ["volunteer"];

export const contactTopicSelectKeys = [
  ...aideContactTopicKeys,
  ...actionContactTopicKeys,
  ...supportContactTopicKeys,
  "other",
];

type ContactCopy = {
  pageTitle: string;
  pageLead: string;
  whenTitle: string;
  whenItems: string[];
  subjectLabel: string;
};

export const contactCopy: Record<Locale, ContactCopy> = {
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

const actionTopicAliases: Record<string, string> = {
  ...activityTopicAliases,
};

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

export function getContactTopicLabel(locale: Locale, topicKey: string) {
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

export const quickContactFormCopy: Record<Locale, QuickContactFormCopy> = {
  fr: {
    title: "Écrire à l'association",
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
      "Décrivez la situation en détail. S'il y a des délais ou un courrier, précisez-le dans le message.",
    messagePlaceholderOther:
      "Décrivez votre demande en détail. S'il y a des délais ou un courrier, précisez-le dans le message.",
    messagePlaceholderVolunteer:
      "Dites-nous comment vous souhaitez aider (rencontres, traductions, organisation, média) et quand vous êtes disponible. Nous répondrons par e-mail.",
    pageNoteDefault:
      "Décrivez la situation de façon structurée : dates, démarches déjà faites, délais/courriers. Cela nous aide à répondre plus vite et plus précisément.",
    pageNoteVolunteer:
      "Dites-nous comment vous souhaitez aider (rencontres, traductions, organisation, média) et quand vous êtes disponible. Nous répondrons par e-mail.",
    buttonLabel: { hero: "Envoyer", page: "Envoyer" },
    hint: "Réponse par e-mail. Rendez-vous uniquement sur inscription.",
    required: "Champ requis",
    invalidEmail: "Vérifiez le format de l'e-mail",
    openingGmail: "Message envoyé. Réponse par e-mail.",
    sendFailed: "Échec de l'envoi. Réessayez ou écrivez-nous par e-mail.",
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

export const contactEmailBoxCopy: Record<Locale, ContactEmailBoxCopy> = {
  fr: {
    emailLabel: "E-mail",
    copyLabel: "Copier l'e-mail",
    copiedLabel: "E-mail copié",
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
