type Locale = "ru" | "fr";

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

export const soutenirCopy: Record<Locale, SoutenirCopy> = {
  fr: {
    donateTitle: "DONS / COTISATIONS",
    donateLead:
      "Votre contribution nous aide à organiser des rencontres, des ateliers et des projets de soutien. Choisissez la manière qui vous convient : don, cotisation ou bénévolat.",
    donateNote: "",
    officialBadge: "Lien officiel",
    recommendedBadge: "Recommandé",
    externalCtaNote: "S'ouvre dans un nouvel onglet",
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
      "Page officielle de l'association",
    ],
    bankTitle: "VIREMENT BANCAIRE",
    bankText: "IBAN + BIC (La Banque Postale)",
    importantTitle: "À SAVOIR",
    importantText: "Besoin d'un reçu / justificatif ? Écrivez-nous — nous vous répondrons par e-mail.",
    volunteerTitle: "DEVENIR BÉNÉVOLE",
    volunteerText:
      "Vous souhaitez aider lors des rencontres, pour la traduction ou l'organisation ? Écrivez-nous via le formulaire — réponse par e-mail.",
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
    helloAssoText: "Пожертвование через HelloAsso. Прямая ссылка для оплаты.",
    helloAssoCta: "Перейти на HelloAsso",
    helloAssoBadge: "Официальная ссылка",
    helloAssoBenefits: [
      "Оплата картой за 1 минуту",
      "Квитанция после оплаты",
      "Безопасная платформа для ассоциаций",
    ],
    cotizUpTitle: "CotizUp",
    cotizUpText: "Взнос/поддержка через CotizUp. Прямая ссылка для оплаты онлайн.",
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

export const bankTransferCopy: Record<Locale, BankTransferCopy> = {
  fr: {
    copyAllLabel: "Copier (IBAN + BIC)",
    copyIbanLabel: "COPIER IBAN",
    copyBicLabel: "COPIER BIC",
    copiedLabel: "Copié",
    copiedIbanStatus: "Copié ✓",
    copiedBicStatus: "Copié ✓",
    copyFailedLabel: "Impossible de copier automatiquement",
    cardTitle: "Coordonnées bancaires",
    hint: "Cliquez pour copier l'IBAN ou le BIC.",
  },
  ru: {
    copyAllLabel: "Скопировать (IBAN + BIC)",
    copyIbanLabel: "Копировать IBAN",
    copyBicLabel: "Копировать BIC",
    copiedLabel: "Скопировано",
    copiedIbanStatus: "Скопировано ✓",
    copiedBicStatus: "Скопировано ✓",
    copyFailedLabel: "Не удалось скопировать автоматически",
    cardTitle: "Банковские реквизиты",
    hint: "Нажмите, чтобы скопировать IBAN или BIC.",
  },
};
