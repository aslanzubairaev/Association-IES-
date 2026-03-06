type Locale = "ru" | "fr";

type LocaleText = { fr: string; ru: string };

export type HomeNavCard = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  path: string;
  icon: string;
};

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
    id: "aide-step-by-step",
    title: { fr: "Aide pas à pas (IA)", ru: "Помощь пошагово (ИИ)" },
    description: {
      fr: "Un assistant qui pose des questions et vous guide étape par étape.",
      ru: "Помощник задаёт вопросы и подсказывает шаг за шагом.",
    },
    path: "/aide#wizard",
    icon: "/05.png",
  },
  {
    id: "actions",
    title: { fr: "M'inscrire à une activité", ru: "Записаться на активность" },
    description: {
      fr: "Programmes, activités et accompagnement.",
      ru: "Программы, активности и сопровождение.",
    },
    path: "/activites",
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

type HeroCopy = {
  title: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pills: string[];
  pillsAriaLabel: string;
};

export const heroCopy: Record<Locale, HeroCopy> = {
  ru: {
    title: "ПОМОЩЬ, ИНТЕГРАЦИЯ, СТРАСБУРГ",
    lead: "Документы, работа, обучение и поддержка в Страсбурге — подскажем понятный следующий шаг без лишней бюрократии.",
    ctaPrimary: "Получить помощь",
    ctaSecondary: "Наши активности",
    pills: ["Интеграция", "Образование", "Синергия"],
    pillsAriaLabel: "ключевые слова",
  },
  fr: {
    title: "AIDE, INTÉGRATION, STRASBOURG",
    lead: "Démarches, emploi, apprentissage et soutien à Strasbourg — on vous indique la prochaine étape, simplement.",
    ctaPrimary: "Obtenir de l'aide",
    ctaSecondary: "Nos activités",
    pills: ["Intégration", "Éducation", "Synergie"],
    pillsAriaLabel: "mots-clés",
  },
};

type QuickNavCopy = {
  title: string;
  subtitle: string;
  ctaLabel: string;
};

export const quickNavCopy: Record<Locale, QuickNavCopy> = {
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

export const actionsPreviewCopy: Record<Locale, ActionsPreviewCopy> = {
  ru: {
    items: ["Административные консультации", "Сопровождение к работе", "Языковые занятия", "Культурные встречи и выезды"],
    cardTitle: "Посмотреть все",
    cardParagraphs: [
      "Откройте страницу с программами и форматами.",
      "Там будут форматы, расписания, регистрация и адреса по активностям.",
    ],
    ctaLabel: "Смотреть все активности",
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
    items: ["Consultations administratives", "Accompagnement vers l'emploi", "Ateliers de langue", "Rencontres et sorties"],
    cardTitle: "Voir tout",
    cardParagraphs: [
      "Ouvrez la page avec les programmes et les formats.",
      "Vous y trouverez les formats, les horaires, l'inscription et les adresses.",
    ],
    ctaLabel: "Voir toutes les activités",
    photos: [
      {
        src: "/3.JPG",
        alt: "Bénévoles au jardin de l'association IES",
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

type HistoryCopy = {
  title: string;
  paragraph1: string;
  paragraph2: string;
};

export const historyCopy: Record<Locale, HistoryCopy> = {
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
      "Association IES est née à Strasbourg en 2019, portée par celles et ceux qui connaissent l'expérience de l'exil. Notre mission : rendre l'intégration plus simple et plus humaine, étape par étape, dans le respect des cultures et du vivre-ensemble.",
    paragraph2:
      "Nous accompagnons les familles et les jeunes dans leur insertion sociale et professionnelle, et nous favorisons les rencontres entre habitants, cultures et générations. Car une cohésion durable se construit avec humanité, solidarité et synergie — quand les liens deviennent vrais.",
  },
};

type InstagramBadgeCopy = {
  label: string;
  description: string;
};

export const instagramBadgeCopy: Record<Locale, InstagramBadgeCopy> = {
  fr: {
    label: "Instagram",
    description: "Actus et annonces",
  },
  ru: {
    label: "Instagram",
    description: "Новости и анонсы",
  },
};
