export type AideLocale = "ru" | "fr";

type AideHowItWorksStep = {
  title: string;
  text: string;
};

type AideTopic = {
  topicParam: string;
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
      line2:
        "Напишите через форму — сообщение придёт на наш e-mail. Мы ответим по e-mail и предложим запись, если нужна встреча.",
      badge: "Бесплатно • По записи • Ответ по e-mail",
    },
    howItWorks: {
      title: "Как это работает",
      subtitle: "Коротко и по делу — чтобы вы понимали, что будет дальше.",
      steps: [
        {
          title: "ШАГ 1 — ВЫ ОТПРАВЛЯЕТЕ ЗАПРОС",
          text: "Форма на сайте (она приходит к нам на e-mail). Если есть — приложите фото/сканы писем и документов.",
        },
        {
          title: "Шаг 2 — Уточняем детали и предлагаем запись",
          text: "Задаём 2–3 вопроса и предлагаем вариант. Место и время зависят от проекта — согласуем по e-mail.",
        },
        {
          title: "Шаг 3 — Разбираем ситуацию и даём шаги",
          text: "По переписке или на встрече объясняем, что делать дальше: куда подать, что приложить, как ответить, какие сроки учитывать.",
        },
      ],
    },
    topics: {
      title: "Частые темы",
      subtitle: "Выберите тему — так нам проще быстро понять запрос.",
      preparePrefix: "Что подготовить:",
      chooseLabel: "Выбрать тему",
      items: [
        {
          topicParam: "prefecture-vnz",
          title: "Префектура / ВНЖ",
          examples: ["Список документов", "Запись/загрузка документов", "Письма из префектуры", "Сроки и что делать дальше"],
          prepareLine: "письма/уведомления, документы, номера dossier (если есть)",
        },
        {
          topicParam: "caf",
          title: "CAF (пособия, письма, личный кабинет)",
          examples: ["Создать/войти в аккаунт", "Письмо “document manquant”", "Отправить документы", "Понять статус заявки"],
          prepareLine: "номер allocataire (если есть), письма CAF, список отправленных документов",
        },
        {
          topicParam: "cpam",
          title: "CPAM / здоровье (письма, CARTE VITALE)",
          examples: ["Открыть права (droits)", "Письма/запрос документов", "Carte Vitale / attestation", "Куда обратиться по ситуации"],
          prepareLine: "письма CPAM, документы, номер sécurité sociale (если есть)",
        },
        {
          topicParam: "france-travail",
          title: "France Travail / поиск работы",
          examples: ["Регистрация/аккаунт", "Письма и требования", "Какие шаги сейчас важны", "Куда идти дальше"],
          prepareLine: "письма France Travail, ваш статус/документы, что уже сделали",
        },
        {
          topicParam: "everyday",
          title: "Жильё / школа / повседневные вопросы",
          examples: ["Куда обращаться (город/службы)", "Школа/сад: что нужно", "Медицина: базовая ориентация", "Письма и формальности"],
          prepareLine: "город/район, письма/документы, кратко цель (что хотите получить)",
        },
        {
          topicParam: "not-sure",
          title: "Не знаете куда?",
          examples: ["Опишите ситуацию простыми словами", "Покажите письмо, которое пугает", "Скажете, что уже пробовали", "Мы подскажем направление"],
          prepareLine: "1–2 предложения о ситуации + фото/скан письма (если есть)",
        },
      ],
    },
    beforeYouWrite: {
      title: "Перед тем как написать",
      subtitle: "Если есть — добавьте это в сообщение. Так мы быстрее сориентируемся.",
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
        "Мы отвечаем по e-mail и работаем по предварительной записи.",
        "Место и время зависят от проекта — уточняем при записи.",
        "Мы объясняем шаги и помогаем разобраться в письмах/процедурах, но не заменяем администрацию и не даём юридических гарантий.",
      ],
    },
  },
  fr: {
    hero: {
      title: "AIDE / CE QUE NOUS FAISONS",
      line1: "Aide administrative gratuite pour les nouveaux arrivants et les familles.",
      line2:
        "Écrivez via le formulaire : votre message arrive sur notre e-mail. Nous vous répondrons par e-mail et proposerons un rendez-vous si nécessaire.",
      badge: "Gratuit • Sur rendez-vous • Réponse par e-mail",
    },
    howItWorks: {
      title: "Comment ça marche",
      subtitle: "Concret, simple, sans blabla — pour savoir à quoi vous attendre.",
      steps: [
        {
          title: "ÉTAPE 1 — VOUS ENVOYEZ VOTRE DEMANDE",
          text: "Formulaire du site (il arrive sur notre e-mail). Joignez si possible des photos/scans de courriers et documents.",
        },
        {
          title: "Étape 2 — Nous précisons et proposons un rendez-vous",
          text: "Nous posons 2–3 questions et proposons la suite. Le lieu et l’horaire dépendent du projet — confirmation par e-mail.",
        },
        {
          title: "Étape 3 — On clarifie la situation et les étapes",
          text: "Par e-mail ou lors d’un rendez-vous, nous expliquons quoi faire : où déposer, quoi joindre, comment répondre, quels délais suivre.",
        },
      ],
    },
    topics: {
      title: "Sujets fréquents",
      subtitle: "Choisissez un sujet — ça nous aide à traiter votre demande plus vite.",
      preparePrefix: "À préparer :",
      chooseLabel: "Choisir ce sujet",
      items: [
        {
          topicParam: "prefecture-vnz",
          title: "Préfecture / titre de séjour",
          examples: ["Liste des pièces", "Prise de rendez‑vous / dépôt en ligne", "Courriers de la préfecture", "Délais et prochaines étapes"],
          prepareLine: "courriers, documents, numéros de dossier (si vous en avez)",
        },
        {
          topicParam: "caf",
          title: "CAF (droits, courriers, compte)",
          examples: ["Créer/se connecter au compte", "Courrier “document manquant”", "Envoyer des pièces", "Comprendre l’avancement"],
          prepareLine: "numéro allocataire (si vous en avez), courriers CAF, pièces déjà envoyées",
        },
        {
          topicParam: "cpam",
          title: "CPAM / Santé (courriers, Carte Vitale)",
          examples: ["Ouvrir les droits", "Courriers / demande de pièces", "Carte Vitale / attestation", "À qui s’adresser selon la situation"],
          prepareLine: "courriers CPAM, documents, numéro de sécurité sociale (si possible)",
        },
        {
          topicParam: "france-travail",
          title: "France Travail / recherche d’emploi",
          examples: ["Inscription / compte", "Courriers et obligations", "Les étapes prioritaires", "Où aller ensuite"],
          prepareLine: "courriers France Travail, votre statut/documents, ce que vous avez déjà fait",
        },
        {
          topicParam: "everyday",
          title: "Logement / école / questions du quotidien",
          examples: ["Vers qui se tourner (services)", "École/crèche: quoi préparer", "Santé: première orientation", "Courriers et formalités"],
          prepareLine: "ville/quartier, courriers/documents, objectif en 1 phrase",
        },
        {
          topicParam: "not-sure",
          title: "Vous ne savez pas où ?",
          examples: ["Décrivez la situation simplement", "Montrez le courrier qui vous inquiète", "Dites ce que vous avez déjà tenté", "On vous oriente"],
          prepareLine: "1–2 phrases + photo/scan du courrier (si possible)",
        },
      ],
    },
    beforeYouWrite: {
      title: "Avant d’écrire",
      subtitle: "Si possible, mettez ça dans votre message — on ira plus vite.",
      items: [
        "Nom et prénom",
        "Langue de préférence",
        "Votre situation (bref)",
        "Ce que vous avez déjà fait",
        "Délais/échéances (si vous en avez)",
        "Ville/quartier (Strasbourg / alentours)",
        "Photos/scans de courriers et documents (si possible)",
        "Votre question en une phrase",
      ],
    },
    important: {
      title: "À savoir",
      items: [
        "Nous répondons par e-mail et travaillons sur rendez-vous.",
        "Le lieu et l’horaire dépendent du projet — précisés lors de la prise de rendez-vous.",
        "Nous expliquons les démarches et aidons à comprendre les courriers/procédures, mais nous ne remplaçons pas l’administration et ne fournissons pas de garanties juridiques.",
      ],
    },
  },
};


