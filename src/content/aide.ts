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
    cta: string;
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
  finalCta: {
    text: string;
    button: string;
  };
};

export const aideCopy: Record<AideLocale, AideCopy> = {
  ru: {
    hero: {
      title: "Чем помогаем",
      line1: "Бесплатная помощь по административным вопросам для новоприбывших и семей.",
      line2: "Пишите через форму на сайте или на e‑mail — ответим по e‑mail и предложим запись.",
      badge: "Бесплатно • По записи • Ответ по e-mail",
      cta: "Написать",
    },
    howItWorks: {
      title: "Как это работает",
      subtitle: "Коротко и по делу — чтобы вы понимали, что будет дальше.",
      steps: [
        {
          title: "Вы пишете",
          text: "Форма на сайте или e‑mail. Приложите фото/сканы писем и документов, если они есть.",
        },
        {
          title: "Мы уточняем и предлагаем запись",
          text: "Задаём 2–3 вопроса и предлагаем вариант. Место/время зависят от проекта — уточняем при записи.",
        },
        {
          title: "Разбираем ситуацию",
          text: "На встрече или по переписке объясняем шаги и что делать дальше: куда подавать, что приложить, как ответить.",
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
          title: "CPAM / здоровье (письма, Carte Vitale)",
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
        "Личные телефоны/WhatsApp руководителей не публикуются.",
      ],
    },
    finalCta: {
      text: "Не уверены, с чего начать? Напишите — поможем разложить по шагам.",
      button: "Написать",
    },
  },
  fr: {
    hero: {
      title: "Aide",
      line1: "Aide administrative gratuite pour les personnes récemment arrivées, les familles et les jeunes.",
      line2: "Écrivez via le formulaire du site ou par e‑mail — réponse par e‑mail et rendez‑vous sur demande.",
      badge: "Gratuit • Sur rendez-vous • Réponse par e-mail",
      cta: "Écrire",
    },
    howItWorks: {
      title: "Comment ça marche",
      subtitle: "Concret, simple, sans blabla — pour savoir à quoi vous attendre.",
      steps: [
        {
          title: "Vous écrivez",
          text: "Formulaire du site ou e‑mail. Ajoutez des photos/scans de vos courriers et documents si possible.",
        },
        {
          title: "On précise et on propose un rendez‑vous",
          text: "On vous pose 2–3 questions et on propose un créneau. Le lieu/l’horaire dépendent du projet — précisés lors de la prise de rendez‑vous.",
        },
        {
          title: "On vous guide",
          text: "En rendez‑vous ou par échange e‑mail, on explique les étapes: où déposer, quoi joindre, comment répondre aux courriers.",
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
          title: "CPAM / santé (courriers, Carte Vitale)",
          examples: ["Ouvrir les droits", "Courriers / demande de pièces", "Carte Vitale / attestation", "À qui s’adresser selon la situation"],
          prepareLine: "courriers CPAM, documents, numéro de sécurité sociale (si vous en avez)",
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
        "Réponse par e‑mail et accompagnement sur rendez‑vous.",
        "Le lieu et l’horaire dépendent du projet — précisés lors de la prise de rendez‑vous.",
        "On explique les étapes et on aide à comprendre les courriers/procédures, sans se substituer à l’administration et sans garanties juridiques.",
        "Nous ne publions pas de numéros personnels / WhatsApp de responsables.",
      ],
    },
    finalCta: {
      text: "Vous hésitez par où commencer ? Écrivez‑nous — on vous aide à clarifier les étapes.",
      button: "Écrire",
    },
  },
};


