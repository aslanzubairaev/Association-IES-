type Locale = "ru" | "fr";

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

export const privacyPageCopy: Record<Locale, PrivacyPageCopy> = {
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
      "Données collectées, finalités, droits et contact pour la protection des données de l'association.",
    whoTitle: "Qui sommes-nous",
    whoText: "Association IES est une association à Strasbourg, France.",
    dataTitle: "Données collectées",
    dataItems: ["Prénom et nom", "Adresse e-mail", "Contenu du message"],
    purposeTitle: "Finalités",
    purposeText:
      "Répondre aux demandes, maintenir la communication avec les personnes et améliorer le fonctionnement de l'association.",
    legalTitle: "Base légale (RGPD)",
    legalText:
      "Intérêt légitime : traiter les demandes et répondre aux messages envoyés via le formulaire de contact.",
    shareTitle: "Destinataires",
    shareText:
      "Nous ne vendons pas les données. Elles peuvent être transmises uniquement si la loi l'exige ou pour le fonctionnement de la messagerie/l'hébergement.",
    retentionTitle: "Durée de conservation",
    retentionText:
      "Nous conservons les données uniquement pendant la durée nécessaire au traitement de votre demande, ou plus longtemps si la loi l'exige.",
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
    contactBody: "Bonjour ! J'ai une question concernant la politique de confidentialité : ...",
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

export const legalPageCopy: Record<Locale, LegalPageCopy> = {
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
          "Nous conservons les données uniquement pendant la durée nécessaire au traitement de votre demande, ou plus longtemps si la loi l'exige.",
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
