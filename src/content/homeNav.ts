export type HomeNavCard = {
  id: string;
  title: { fr: string; ru: string };
  description: { fr: string; ru: string };
  // Куда ведёт карточка (часть пути без языка, например "/aide")
  path: string;
};

export const homeNavCards: HomeNavCard[] = [
  {
    id: "about",
    title: { fr: "À propos", ru: "О нас" },
    description: {
      fr: "Qui nous sommes et comment nous travaillons.",
      ru: "Кто мы и как мы работаем.",
    },
    path: "/about",
  },
  {
    id: "aide",
    title: { fr: "Aide", ru: "Чем помогаем" },
    description: {
      fr: "Comprendre les démarches et avancer.",
      ru: "Разобраться с шагами и получить поддержку.",
    },
    path: "/aide",
  },
  {
    id: "actions",
    title: { fr: "Actions", ru: "Действия" },
    description: {
      fr: "Programmes, activités et accompagnement.",
      ru: "Программы, активности и сопровождение.",
    },
    path: "/actions",
  },
  {
    id: "soutenir",
    title: { fr: "Soutenir", ru: "Поддержать" },
    description: {
      fr: "Bénévolat, dons et partenariats.",
      ru: "Волонтёрство, пожертвования и партнёрства.",
    },
    path: "/soutenir",
  },
  {
    id: "contact",
    title: { fr: "Contact", ru: "Контакты" },
    description: {
      fr: "Écrire via le formulaire ou par e-mail.",
      ru: "Написать через форму или по e-mail.",
    },
    path: "/contact",
  },
];


