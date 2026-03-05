/*
 Этот файл хранит каталог активностей (FR/RU) и общие тексты для страниц активностей.
 Он используется как единый источник данных для списка, деталей, карточек на главной и интеграции с формой контакта.
*/

import type { Activity, ActivityTopicEntry, ActivitiesLocale, LocaleText } from "@/lib/activities/types";

type ActivitiesPageLocaleCopy = {
  title: string;
  subtitle: string;
  detailsCtaLabel: string;
  participateCtaLabel: string;
  listAriaLabel: string;
};

type ActivitiesHomeLocaleCopy = {
  title: string;
  subtitle: string;
  ctaAll: string;
  listAriaLabel: string;
};

export const activitiesPageCopy: Record<ActivitiesLocale, ActivitiesPageLocaleCopy> = {
  fr: {
    title: "Toutes les activités",
    subtitle:
      "Découvrez les activités de l'association, choisissez ce qui vous convient et inscrivez-vous en quelques clics.",
    detailsCtaLabel: "Voir les détails",
    participateCtaLabel: "Participer",
    listAriaLabel: "Liste complète des activités",
  },
  ru: {
    title: "Все активности",
    subtitle:
      "Посмотрите направления ассоциации, выберите подходящий формат и запишитесь через форму контактов.",
    detailsCtaLabel: "Подробнее",
    participateCtaLabel: "Участвовать",
    listAriaLabel: "Полный список активностей",
  },
};

export const activitiesHomeCopy: Record<ActivitiesLocale, ActivitiesHomeLocaleCopy> = {
  fr: {
    title: "Activités",
    subtitle: "Un aperçu des programmes en cours. Ouvrez une fiche pour voir les détails et participer.",
    ctaAll: "Voir toutes les activités",
    listAriaLabel: "Aperçu des activités",
  },
  ru: {
    title: "Активности",
    subtitle: "Краткий обзор текущих программ. Откройте карточку, чтобы посмотреть детали и записаться.",
    ctaAll: "Смотреть все активности",
    listAriaLabel: "Превью активностей",
  },
};

const sharedSupportLabel: LocaleText = {
  fr: "Nous soutenir",
  ru: "Поддержать нас",
};

const sharedSupportHref = "/soutenir";

export const activitiesCatalog: Activity[] = [
  {
    id: "activity_jardin_melanie",
    slug: "jardin-melanie",
    topicKey: "garden_workshops_nature",
    intentId: "activity_jardin_melanie",
    legacyIntentIds: ["action_garden_workshops"],
    legacySlugs: ["jardin-ateliers-nature"],
    status: "published",
    isFeatured: true,
    displayOrder: 1,
    location: {
      fr: "Robertsau, Strasbourg",
      ru: "Робертсо, Страсбург",
    },
    periodLabel: {
      fr: "Toute l'année",
      ru: "Круглый год",
    },
    cardTitle: {
      fr: "Jardin Mélanie",
      ru: "Сад Мелани",
    },
    cardPitch: {
      fr: "Jardin pédagogique partagé à la Robertsau.",
      ru: "Общий образовательный сад в районе Робертсо.",
    },
    coverImage: {
      src: "/3.JPG",
      alt: {
        fr: "Bénévoles au Jardin Mélanie",
        ru: "Волонтёры в Саду Мелани",
      },
      caption: {
        fr: "Un ancien verger devenu lieu de rencontres.",
        ru: "Бывший фруктовый сад, ставший местом встреч.",
      },
    },
    detailTitle: {
      fr: "Jardin Mélanie",
      ru: "Сад Мелани",
    },
    detailSubtitle: {
      fr: "Un ancien verger de 75 ares redevenu un lieu de vie, de transmission et de rencontres.",
      ru: "Бывший сад площадью 75 соток снова стал местом жизни, передачи опыта и встреч.",
    },
    introParagraphs: {
      fr: [
        "Le Jardin Mélanie est un verger pédagogique situé à la Robertsau, remis en vie grâce à l'engagement des bénévoles des associations IES et Tunaweza.",
        "Pendant plusieurs années, ce lieu est resté à l'abandon. Depuis 2022, il renaît peu à peu, porté par des habitants, des bénévoles et des personnes venues d'horizons très différents.",
        "Ici, on cultive la terre, mais surtout le lien humain.",
      ],
      ru: [
        "Сад Мелани - это образовательный сад в районе Робертсо, который ожил благодаря волонтёрам ассоциаций IES и Tunaweza.",
        "Несколько лет это место было заброшено. С 2022 года его постепенно восстанавливают жители района, волонтёры и люди с разным жизненным опытом.",
        "Здесь выращивают не только растения, но и человеческие связи.",
      ],
    },
    offerTitle: {
      fr: "Ce que nous proposons",
      ru: "Что мы предлагаем",
    },
    offerLead: {
      fr: "Le Jardin Mélanie est un espace ouvert, accessible et collectif. Chacun participe à son rythme.",
      ru: "Сад Мелани - открытое и доступное место для всех. Каждый участвует в своём ритме.",
    },
    offerItems: {
      fr: [
        "Jardinage collectif et transmission des savoirs",
        "Ateliers nature pour enfants, jeunes et familles",
        "Temps conviviaux et rencontres interculturelles",
        "Temps forts annuels: fête des jardins partagés, 48h de l'agriculture urbaine, semaine des réfugiés",
        "Fête de la cerise et fête de la pomme",
      ],
      ru: [
        "Совместное садоводство и обмен знаниями",
        "Природные мастерские для детей, молодёжи и семей",
        "Тёплые встречи и межкультурное общение",
        "Годовые события: праздник общих садов, 48 часов городского сельского хозяйства, неделя беженцев",
        "Праздник вишни и праздник яблока",
      ],
    },
    galleryTitle: {
      fr: "Le jardin en images",
      ru: "Сад в фотографиях",
    },
    galleryLead: {
      fr: "Quelques moments partagés: jardinage, récoltes, ateliers, fêtes et temps conviviaux.",
      ru: "Несколько общих моментов: садоводство, сбор урожая, мастерские и праздники.",
    },
    gallery: [
      {
        src: "/3.JPG",
        alt: {
          fr: "Réunion au jardin",
          ru: "Встреча в саду",
        },
        caption: {
          fr: "Réunion au jardin",
          ru: "Встреча в саду",
        },
      },
      {
        src: "/4.JPG",
        alt: {
          fr: "Récolte des cerises",
          ru: "Сбор вишни",
        },
        caption: {
          fr: "Récolte des cerises",
          ru: "Сбор вишни",
        },
      },
      {
        src: "/2.JPG",
        alt: {
          fr: "Moment convivial",
          ru: "Тёплый момент вместе",
        },
        caption: {
          fr: "Moment convivial au jardin",
          ru: "Тёплое общение в саду",
        },
      },
      {
        src: "/1.jpg",
        alt: {
          fr: "Groupe de bénévoles",
          ru: "Группа волонтёров",
        },
        caption: {
          fr: "Groupe de bénévoles",
          ru: "Группа волонтёров",
        },
      },
    ],
    audienceTitle: {
      fr: "Qui peut participer ?",
      ru: "Кто может участвовать?",
    },
    audienceItems: {
      fr: [
        "Familles avec enfants",
        "Personnes seules souhaitant créer du lien",
        "Bénévoles passionnés de jardinage ou débutants",
        "Personnes réfugiées ou nouvellement arrivées",
        "Groupes scolaires ou associatifs",
      ],
      ru: [
        "Семьи с детьми",
        "Люди, которые хотят расширить круг общения",
        "Волонтёры: как с опытом, так и без опыта садоводства",
        "Беженцы и недавно приехавшие люди",
        "Школьные и ассоциативные группы",
      ],
    },
    practicalBadges: {
      fr: ["Accès libre et gratuit", "Venez comme vous êtes", "Aucune compétence requise", "On apprend ensemble"],
      ru: ["Свободный и бесплатный доступ", "Приходите как есть", "Опыт не требуется", "Мы учимся вместе"],
    },
    ctaParticipateLabel: {
      fr: "Participer au jardin",
      ru: "Участвовать в саду",
    },
    ctaSupportLabel: sharedSupportLabel,
    ctaSupportHref: sharedSupportHref,
    seoTitle: {
      fr: "Jardin Mélanie | Association IES",
      ru: "Сад Мелани | Association IES",
    },
    seoDescription: {
      fr: "Découvrez le Jardin Mélanie: jardin pédagogique partagé à la Robertsau, ateliers, rencontres et activités pour toutes et tous.",
      ru: "Сад Мелани: общий образовательный сад в Робертсо, мастерские и встречи для всех.",
    },
    contactPlaceholder: {
      fr: "Écrivez : qui participe, ce qui vous intéresse (jardin/atelier), vos disponibilités et le nombre de personnes.",
      ru: "Напишите: кто участвует, что именно интересно (сад/мастерская), удобные дни и количество участников.",
    },
    contactExtraInfo: {
      fr: ["Activité en plein air", "Participation flexible", "Adresse précise confirmée à l'inscription"],
      ru: ["Активность на открытом воздухе", "Гибкий формат участия", "Точный адрес подтверждаем при записи"],
    },
  },
  {
    id: "activity_langues_ateliers",
    slug: "langues-ateliers",
    topicKey: "language_development",
    intentId: "activity_langues_ateliers",
    legacyIntentIds: ["action_lang"],
    status: "published",
    isFeatured: true,
    displayOrder: 2,
    location: {
      fr: "Strasbourg (selon groupe)",
      ru: "Страсбург (по группе)",
    },
    periodLabel: {
      fr: "Sur rendez-vous",
      ru: "По записи",
    },
    cardTitle: {
      fr: "Langues et développement",
      ru: "Языки и развитие",
    },
    cardPitch: {
      fr: "Ateliers de langue et d'expression pour enfants, jeunes et adultes.",
      ru: "Языковые и коммуникативные занятия для детей, подростков и взрослых.",
    },
    coverImage: {
      src: "/2.JPG",
      alt: {
        fr: "Participants pendant un atelier de langue",
        ru: "Участники языкового занятия",
      },
    },
    detailTitle: {
      fr: "Langues et développement",
      ru: "Языки и развитие",
    },
    detailSubtitle: {
      fr: "Renforcer la communication, la confiance et l'autonomie au quotidien.",
      ru: "Укрепить коммуникацию, уверенность и самостоятельность в повседневной жизни.",
    },
    introParagraphs: {
      fr: [
        "Cette activité réunit enfants, jeunes et adultes autour de la pratique des langues et de l'expression orale.",
        "Les ateliers privilégient des situations concrètes pour faciliter les démarches, la vie locale et l'insertion.",
      ],
      ru: [
        "Эта активность объединяет детей, подростков и взрослых вокруг языковой практики и устного общения.",
        "На занятиях используются практические ситуации, полезные для адаптации, общения и повседневных шагов.",
      ],
    },
    offerTitle: {
      fr: "Ce que nous proposons",
      ru: "Что мы предлагаем",
    },
    offerLead: {
      fr: "Des séances régulières, adaptées au niveau et à l'objectif de chaque groupe.",
      ru: "Регулярные занятия, адаптированные под уровень и цели каждой группы.",
    },
    offerItems: {
      fr: [
        "Ateliers de français pratique",
        "Accompagnement en russe et tchétchène selon besoins",
        "Mises en situation: échanges, démarches, vie quotidienne",
        "Formats collectifs avec suivi de progression",
      ],
      ru: [
        "Практические занятия по французскому языку",
        "Поддержка на русском и чеченском при необходимости",
        "Практика через реальные ситуации: общение, документы, повседневные вопросы",
        "Групповой формат с отслеживанием прогресса",
      ],
    },
    galleryTitle: {
      fr: "Ateliers en images",
      ru: "Занятия в фотографиях",
    },
    galleryLead: {
      fr: "Des moments d'apprentissage, d'échanges et de progression.",
      ru: "Моменты обучения, общения и прогресса.",
    },
    gallery: [
      {
        src: "/2.JPG",
        alt: { fr: "Atelier de discussion", ru: "Разговорный мастер-класс" },
      },
      {
        src: "/1.jpg",
        alt: { fr: "Travail de groupe", ru: "Работа в группе" },
      },
      {
        src: "/4.JPG",
        alt: { fr: "Rencontre interculturelle", ru: "Межкультурная встреча" },
      },
    ],
    audienceTitle: {
      fr: "Pour qui ?",
      ru: "Для кого?",
    },
    audienceItems: {
      fr: [
        "Enfants et adolescents",
        "Adultes en parcours d'intégration",
        "Personnes qui souhaitent progresser à l'oral",
      ],
      ru: [
        "Дети и подростки",
        "Взрослые в процессе интеграции",
        "Люди, которые хотят улучшить разговорный язык",
      ],
    },
    practicalBadges: {
      fr: ["Groupes adaptés", "Accompagnement bienveillant", "Inscription par contact"],
      ru: ["Группы по уровню", "Дружелюбное сопровождение", "Запись через контакт"],
    },
    ctaParticipateLabel: {
      fr: "Participer à l'atelier",
      ru: "Записаться на занятие",
    },
    ctaSupportLabel: sharedSupportLabel,
    ctaSupportHref: sharedSupportHref,
    seoTitle: {
      fr: "Langues et développement | Association IES",
      ru: "Языки и развитие | Association IES",
    },
    seoDescription: {
      fr: "Ateliers de langue et d'expression à Strasbourg pour faciliter l'intégration et la communication.",
      ru: "Языковые занятия в Страсбурге для общения, интеграции и уверенности.",
    },
    contactPlaceholder: {
      fr: "Précisez : qui participe, l'âge, la langue visée et vos disponibilités.",
      ru: "Укажите: кто будет участвовать, возраст, желаемый язык и удобное время.",
    },
    contactExtraInfo: {
      fr: ["Horaires indicatifs: mercredi soir et samedi", "Période principale: octobre-mai"],
      ru: ["Ориентировочно: среда вечером и суббота", "Основной период: октябрь-май"],
    },
  },
  {
    id: "activity_sport_regular",
    slug: "sport",
    topicKey: "sport_regular",
    intentId: "activity_sport_regular",
    legacyIntentIds: ["action_sport"],
    status: "published",
    isFeatured: true,
    displayOrder: 3,
    location: {
      fr: "Centres sportifs de Strasbourg",
      ru: "Спортивные центры Страсбурга",
    },
    periodLabel: {
      fr: "Toute l'année",
      ru: "Круглый год",
    },
    cardTitle: {
      fr: "Sport et activité régulière",
      ru: "Спорт и регулярная активность",
    },
    cardPitch: {
      fr: "Des séances sportives pour la santé, la discipline et l'esprit d'équipe.",
      ru: "Регулярные спортивные занятия для здоровья, дисциплины и командного духа.",
    },
    coverImage: {
      src: "/5.jpg",
      alt: {
        fr: "Groupe pendant une activité sportive",
        ru: "Группа на спортивной активности",
      },
    },
    detailTitle: {
      fr: "Sport et activité régulière",
      ru: "Спорт и регулярная активность",
    },
    detailSubtitle: {
      fr: "Bouger ensemble, progresser et créer du lien dans un cadre positif.",
      ru: "Двигаться вместе, развиваться и укреплять связи в позитивной атмосфере.",
    },
    introParagraphs: {
      fr: [
        "L'activité sportive aide les participants à garder un rythme sain et à renforcer la confiance en soi.",
        "Les séances sont organisées avec une attention particulière à la sécurité et à l'inclusion.",
      ],
      ru: [
        "Спортивные активности помогают поддерживать здоровый ритм и уверенность в себе.",
        "Занятия проходят с особым вниманием к безопасности и включённости каждого участника.",
      ],
    },
    offerTitle: {
      fr: "Ce que nous proposons",
      ru: "Что мы предлагаем",
    },
    offerLead: {
      fr: "Des créneaux réguliers et des formats adaptés aux différents profils.",
      ru: "Регулярные расписания и форматы для разных возрастов и уровней.",
    },
    offerItems: {
      fr: [
        "Séances collectives de sport",
        "Encadrement bienveillant",
        "Activités qui valorisent la coopération et la régularité",
        "Participation à des événements sportifs locaux",
      ],
      ru: [
        "Групповые спортивные занятия",
        "Поддерживающее сопровождение",
        "Форматы, развивающие командную работу и регулярность",
        "Участие в локальных спортивных событиях",
      ],
    },
    galleryTitle: {
      fr: "Moments sportifs",
      ru: "Спортивные моменты",
    },
    galleryLead: {
      fr: "Entraînements, tournois et progression collective.",
      ru: "Тренировки, турниры и общий прогресс.",
    },
    gallery: [
      {
        src: "/5.jpg",
        alt: { fr: "Terrain de sport", ru: "Спортивная площадка" },
      },
      {
        src: "/6.JPG",
        alt: { fr: "Séance taekwondo", ru: "Занятие по тхэквондо" },
      },
      {
        src: "/1.jpg",
        alt: { fr: "Équipe après entraînement", ru: "Команда после тренировки" },
      },
    ],
    audienceTitle: {
      fr: "Pour qui ?",
      ru: "Для кого?",
    },
    audienceItems: {
      fr: ["Enfants", "Adolescents", "Adultes"],
      ru: ["Дети", "Подростки", "Взрослые"],
    },
    practicalBadges: {
      fr: ["Régulier", "Encadré", "Accessible selon places"],
      ru: ["Регулярно", "С сопровождением", "По наличию мест"],
    },
    ctaParticipateLabel: {
      fr: "Participer au sport",
      ru: "Присоединиться к спорту",
    },
    ctaSupportLabel: sharedSupportLabel,
    ctaSupportHref: sharedSupportHref,
    seoTitle: {
      fr: "Sport et activité régulière | Association IES",
      ru: "Спорт и регулярная активность | Association IES",
    },
    seoDescription: {
      fr: "Activités sportives régulières à Strasbourg pour enfants, jeunes et adultes.",
      ru: "Регулярные спортивные активности в Страсбурге для детей, молодёжи и взрослых.",
    },
    contactPlaceholder: {
      fr: "Indiquez: qui participe, l'âge, le niveau et vos disponibilités.",
      ru: "Укажите: кто участвует, возраст, уровень и удобное расписание.",
    },
    contactExtraInfo: {
      fr: ["Créneaux fréquents en semaine", "Adresse confirmée selon le groupe"],
      ru: ["Частые слоты в будни", "Адрес подтверждаем по группе"],
    },
  },
  {
    id: "activity_sorties_culturelles",
    slug: "sorties-culturelles",
    topicKey: "cultural_outings_trips",
    intentId: "activity_sorties_culturelles",
    legacyIntentIds: ["action_culture_trips"],
    status: "published",
    isFeatured: true,
    displayOrder: 4,
    location: {
      fr: "Strasbourg et région",
      ru: "Страсбург и регион",
    },
    periodLabel: {
      fr: "Sur rendez-vous",
      ru: "По записи",
    },
    cardTitle: {
      fr: "Sorties culturelles et excursions",
      ru: "Культурные выходы и поездки",
    },
    cardPitch: {
      fr: "Découvrir la ville, son patrimoine et créer de nouveaux liens.",
      ru: "Открывать город, культуру и расширять круг общения.",
    },
    coverImage: {
      src: "/1.jpg",
      alt: {
        fr: "Sortie culturelle en groupe",
        ru: "Культурный выход группой",
      },
    },
    detailTitle: {
      fr: "Sorties culturelles et excursions",
      ru: "Культурные выходы и поездки",
    },
    detailSubtitle: {
      fr: "Explorer ensemble, apprendre et partager des moments de découverte.",
      ru: "Исследовать вместе, узнавать новое и делиться моментами открытия.",
    },
    introParagraphs: {
      fr: [
        "Les sorties culturelles permettent de mieux connaître Strasbourg et sa région.",
        "Elles favorisent la rencontre entre habitants et nouveaux arrivants dans un cadre convivial.",
      ],
      ru: [
        "Культурные выходы помогают лучше узнать Страсбург и регион.",
        "Это также формат для знакомства и общения между жителями и новыми участниками.",
      ],
    },
    offerTitle: {
      fr: "Ce que nous proposons",
      ru: "Что мы предлагаем",
    },
    offerLead: {
      fr: "Des sorties organisées selon la saison et les opportunités locales.",
      ru: "Выезды и посещения, организованные по сезону и локальным возможностям.",
    },
    offerItems: {
      fr: [
        "Visites de lieux culturels",
        "Sorties familiales et intergénérationnelles",
        "Formats découverte de la ville",
        "Excursions ponctuelles dans la région",
      ],
      ru: [
        "Посещение культурных мест",
        "Семейные и межпоколенческие выходы",
        "Форматы знакомства с городом",
        "Периодические поездки по региону",
      ],
    },
    galleryTitle: {
      fr: "Sorties en images",
      ru: "Поездки в фотографиях",
    },
    galleryLead: {
      fr: "Quelques instants de découverte partagée.",
      ru: "Несколько моментов совместного открытия.",
    },
    gallery: [
      {
        src: "/1.jpg",
        alt: { fr: "Visite en groupe", ru: "Групповая экскурсия" },
      },
      {
        src: "/4.JPG",
        alt: { fr: "Sortie conviviale", ru: "Дружеская поездка" },
      },
      {
        src: "/2.JPG",
        alt: { fr: "Rencontre culturelle", ru: "Культурная встреча" },
      },
    ],
    audienceTitle: {
      fr: "Pour qui ?",
      ru: "Для кого?",
    },
    audienceItems: {
      fr: ["Familles", "Adolescents", "Adultes"],
      ru: ["Семьи", "Подростки", "Взрослые"],
    },
    practicalBadges: {
      fr: ["Selon événements", "Convivial", "Inscription recommandée"],
      ru: ["По событиям", "Дружелюбно", "Рекомендуется запись"],
    },
    ctaParticipateLabel: {
      fr: "Participer aux sorties",
      ru: "Участвовать в поездках",
    },
    ctaSupportLabel: sharedSupportLabel,
    ctaSupportHref: sharedSupportHref,
    seoTitle: {
      fr: "Sorties culturelles et excursions | Association IES",
      ru: "Культурные выходы и поездки | Association IES",
    },
    seoDescription: {
      fr: "Sorties culturelles et excursions à Strasbourg pour découvrir, échanger et créer du lien.",
      ru: "Культурные выходы и поездки в Страсбурге: знакомство, общение и новые связи.",
    },
    contactPlaceholder: {
      fr: "Précisez : qui participe, le nombre de personnes et vos préférences de sortie.",
      ru: "Укажите: кто участвует, количество человек и желаемый формат выхода.",
    },
  },
  {
    id: "activity_forums_jeunesse_entrepreneuriat",
    slug: "forums-jeunesse-entrepreneuriat",
    topicKey: "youth_forums_entrepreneurship",
    intentId: "activity_forums_jeunesse_entrepreneuriat",
    legacyIntentIds: ["action_youth_forums"],
    status: "published",
    isFeatured: true,
    displayOrder: 5,
    location: {
      fr: "Strasbourg et partenaires",
      ru: "Страсбург и площадки партнёров",
    },
    periodLabel: {
      fr: "Sur rendez-vous",
      ru: "По записи",
    },
    cardTitle: {
      fr: "Forums jeunesse et entrepreneuriat",
      ru: "Форумы молодёжи и предпринимательства",
    },
    cardPitch: {
      fr: "Rencontres, orientation et inspiration autour des projets d'avenir.",
      ru: "Встречи, ориентация и вдохновение вокруг будущих проектов.",
    },
    coverImage: {
      src: "/1.jpg",
      alt: {
        fr: "Forum jeunesse",
        ru: "Молодёжный форум",
      },
    },
    detailTitle: {
      fr: "Forums jeunesse et entrepreneuriat",
      ru: "Форумы молодёжи и предпринимательства",
    },
    detailSubtitle: {
      fr: "Créer des perspectives par l'échange, le mentorat et les initiatives collectives.",
      ru: "Создавать перспективы через обмен опытом, наставничество и общие инициативы.",
    },
    introParagraphs: {
      fr: [
        "Ces forums donnent aux jeunes des repères concrets pour leurs projets d'études, d'emploi ou d'initiative.",
        "Ils réunissent participants, intervenants et partenaires autour de formats pratiques.",
      ],
      ru: [
        "Эти форумы дают молодёжи практические ориентиры для учёбы, работы и собственных инициатив.",
        "В одном пространстве встречаются участники, спикеры и партнёры.",
      ],
    },
    offerTitle: {
      fr: "Ce que nous proposons",
      ru: "Что мы предлагаем",
    },
    offerLead: {
      fr: "Des formats événementiels autour de l'orientation et de l'entrepreneuriat.",
      ru: "Событийные форматы по теме профориентации и предпринимательства.",
    },
    offerItems: {
      fr: [
        "Rencontres avec intervenants et professionnels",
        "Partage d'expériences et retours terrain",
        "Orientation vers des ressources utiles",
        "Mise en réseau entre participants",
      ],
      ru: [
        "Встречи со спикерами и практиками",
        "Обмен опытом и живые кейсы",
        "Навигация по полезным ресурсам",
        "Нетворкинг между участниками",
      ],
    },
    galleryTitle: {
      fr: "Forums en images",
      ru: "Форумы в фотографиях",
    },
    galleryLead: {
      fr: "Moments d'échanges, de prise de parole et de collaboration.",
      ru: "Моменты обмена, выступлений и совместной работы.",
    },
    gallery: [
      {
        src: "/1.jpg",
        alt: { fr: "Intervention pendant un forum", ru: "Выступление на форуме" },
      },
      {
        src: "/2.JPG",
        alt: { fr: "Discussion entre participants", ru: "Обсуждение участников" },
      },
      {
        src: "/4.JPG",
        alt: { fr: "Atelier collaboratif", ru: "Совместная мастерская" },
      },
    ],
    audienceTitle: {
      fr: "Pour qui ?",
      ru: "Для кого?",
    },
    audienceItems: {
      fr: ["Jeunes", "Étudiants", "Personnes intéressées par l'initiative et les projets"],
      ru: ["Молодёжь", "Студенты", "Люди, интересующиеся инициативами и проектами"],
    },
    practicalBadges: {
      fr: ["Selon agenda", "Intervenants invités", "Réseau local"],
      ru: ["По расписанию событий", "Приглашённые спикеры", "Локальная сеть контактов"],
    },
    ctaParticipateLabel: {
      fr: "Rejoindre le forum",
      ru: "Присоединиться к форуму",
    },
    ctaSupportLabel: sharedSupportLabel,
    ctaSupportHref: sharedSupportHref,
    seoTitle: {
      fr: "Forums jeunesse et entrepreneuriat | Association IES",
      ru: "Форумы молодёжи и предпринимательства | Association IES",
    },
    seoDescription: {
      fr: "Forums pour la jeunesse à Strasbourg: rencontres, orientation et entrepreneuriat.",
      ru: "Молодёжные форумы в Страсбурге: встречи, профориентация и предпринимательство.",
    },
    contactPlaceholder: {
      fr: "Indiquez votre âge, vos centres d'intérêt et l'objectif de votre participation.",
      ru: "Укажите возраст, интересы и цель участия в форуме.",
    },
  },
  {
    id: "activity_rencontres_cohesion",
    slug: "rencontres-cohesion",
    topicKey: "community_meetings_cohesion",
    intentId: "activity_rencontres_cohesion",
    legacyIntentIds: ["action_meetings_community"],
    status: "published",
    isFeatured: true,
    displayOrder: 6,
    location: {
      fr: "Strasbourg (selon rencontre)",
      ru: "Страсбург (по формату встречи)",
    },
    periodLabel: {
      fr: "Sur rendez-vous",
      ru: "По записи",
    },
    cardTitle: {
      fr: "Rencontres et cohésion du lien social",
      ru: "Встречи и сплочение сообщества",
    },
    cardPitch: {
      fr: "Des moments simples pour se rencontrer, échanger et se soutenir.",
      ru: "Простые встречи для общения, взаимной поддержки и интеграции.",
    },
    coverImage: {
      src: "/4.JPG",
      alt: {
        fr: "Rencontre conviviale du collectif",
        ru: "Тёплая встреча сообщества",
      },
    },
    detailTitle: {
      fr: "Rencontres et cohésion du lien social",
      ru: "Встречи и сплочение сообщества",
    },
    detailSubtitle: {
      fr: "Renforcer le vivre-ensemble par des échanges réguliers et ouverts.",
      ru: "Укреплять совместную жизнь через регулярные открытые встречи.",
    },
    introParagraphs: {
      fr: [
        "Cette activité crée un espace de dialogue pour les familles, les jeunes et les personnes nouvellement arrivées.",
        "L'objectif est de rompre l'isolement et d'encourager l'entraide entre participants.",
      ],
      ru: [
        "Эта активность создаёт пространство диалога для семей, молодёжи и недавно приехавших людей.",
        "Главная цель - уменьшить изоляцию и поддержать взаимопомощь между участниками.",
      ],
    },
    offerTitle: {
      fr: "Ce que nous proposons",
      ru: "Что мы предлагаем",
    },
    offerLead: {
      fr: "Des rencontres régulières autour de thèmes utiles et du quotidien.",
      ru: "Регулярные встречи вокруг практических тем и повседневной жизни.",
    },
    offerItems: {
      fr: [
        "Rencontres conviviales",
        "Échanges d'expériences entre participants",
        "Soutien mutuel et orientation vers les ressources adaptées",
        "Temps collectifs favorisant la cohésion",
      ],
      ru: [
        "Тёплые общие встречи",
        "Обмен опытом между участниками",
        "Взаимная поддержка и навигация к нужным ресурсам",
        "Коллективные форматы для укрепления связей",
      ],
    },
    galleryTitle: {
      fr: "Rencontres en images",
      ru: "Встречи в фотографиях",
    },
    galleryLead: {
      fr: "Des moments de partage et de solidarité.",
      ru: "Моменты общения и солидарности.",
    },
    gallery: [
      {
        src: "/4.JPG",
        alt: { fr: "Échange en groupe", ru: "Групповое общение" },
      },
      {
        src: "/2.JPG",
        alt: { fr: "Atelier de discussion", ru: "Дискуссионная мастерская" },
      },
      {
        src: "/1.jpg",
        alt: { fr: "Rencontre ouverte", ru: "Открытая встреча" },
      },
    ],
    audienceTitle: {
      fr: "Pour qui ?",
      ru: "Для кого?",
    },
    audienceItems: {
      fr: [
        "Familles",
        "Personnes seules",
        "Personnes réfugiées ou nouvellement arrivées",
        "Toute personne souhaitant créer du lien",
      ],
      ru: [
        "Семьи",
        "Люди, которые живут одни",
        "Беженцы и недавно приехавшие",
        "Все, кто хочет расширить круг общения",
      ],
    },
    practicalBadges: {
      fr: ["Ouvert à toutes et tous", "Accessible", "Cadre bienveillant"],
      ru: ["Открыто для всех", "Доступно", "Доброжелательная атмосфера"],
    },
    ctaParticipateLabel: {
      fr: "Participer aux rencontres",
      ru: "Участвовать во встречах",
    },
    ctaSupportLabel: sharedSupportLabel,
    ctaSupportHref: sharedSupportHref,
    seoTitle: {
      fr: "Rencontres et cohésion | Association IES",
      ru: "Встречи и сплочение | Association IES",
    },
    seoDescription: {
      fr: "Rencontres de cohésion à Strasbourg pour créer du lien et renforcer l'entraide.",
      ru: "Встречи сплочения в Страсбурге для общения и взаимной поддержки.",
    },
    contactPlaceholder: {
      fr: "Décrivez brièvement votre situation et ce que vous recherchez (échange, soutien, activités).",
      ru: "Кратко опишите вашу ситуацию и что вы ищете (общение, поддержку, активности).",
    },
  },
];

export const activityTopicEntries: ActivityTopicEntry[] = activitiesCatalog.map((activity) => ({
  topicKey: activity.topicKey,
  title: activity.cardTitle,
  slugs: [activity.slug, ...(activity.legacySlugs ?? [])],
}));

export const activityTopicKeys = activityTopicEntries.map((entry) => entry.topicKey);

export const activityTopicAliases: Record<string, string> = Object.fromEntries(
  activityTopicEntries.flatMap((entry) => entry.slugs.map((slug) => [`actions_${slug}`, entry.topicKey])),
);

export const activityLegacyIntentAliasMap: Record<string, string> = Object.fromEntries(
  activitiesCatalog.flatMap((activity) =>
    (activity.legacyIntentIds ?? []).map((legacyIntentId) => [legacyIntentId.toLowerCase(), activity.intentId]),
  ),
);

export const activityLegacySlugAliasMap: Record<string, string> = Object.fromEntries(
  activitiesCatalog.flatMap((activity) =>
    (activity.legacySlugs ?? []).map((legacySlug) => [legacySlug.toLowerCase(), activity.slug]),
  ),
);
