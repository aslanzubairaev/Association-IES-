type Locale = "ru" | "fr";

const sharedCtaLabel = {
  ru: "Записаться",
  fr: "S'INSCRIRE",
} as const;

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

export type AideLocale = Locale;

export const aideCopy: Record<Locale, AideCopy> = {
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
            "Où s'adresser selon votre situation",
          ],
          prepareLine: "courriers CPAM, documents, numéro de sécurité sociale (si disponible)",
        },
        {
          topicKey: "france_travail",
          intentId: "aide_france_travail",
          title: "France Travail / recherche d'emploi",
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
            "Où s'adresser (ville, services, organismes)",
            "École/crèche : quoi préparer et quelles démarches",
            "Santé : repères de base et premières étapes",
            "Courriers et formalités : comment s'y retrouver",
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

export const aideContactTopicKeys = aideCopy.ru.topics.items.map((item) => item.topicKey);
