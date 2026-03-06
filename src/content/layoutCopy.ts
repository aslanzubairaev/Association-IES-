type Locale = "ru" | "fr";

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

export const footerCopy: Record<Locale, FooterCopy> = {
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
  langMenuItems: { locale: Locale; code: string; name: string }[];
};

export const headerCopy: Record<Locale, HeaderCopy> = {
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

export const siteMetadata = {
  title: "Association IES",
  description:
    "Association IES: accompagnement social, actions educatives, sport, culture et integration pour les familles.",
};
