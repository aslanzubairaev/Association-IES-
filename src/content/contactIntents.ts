import { actionsCopy, aideCopy, soutenirCopy } from "@/content/actions";

// Описывает один повод для обращения: идентификатор, заголовок, подсказки и текст темы.
export type ContactIntent = {
  id: string;
  source: "aide" | "actions" | "support";
  title: { ru: string; fr: string };
  bullets?: { ru: string[]; fr: string[] };
  fineprint?: { ru: string; fr: string };
  extraInfo?: { ru: string[]; fr: string[] };
  topicValue: string;
  messagePlaceholder?: { ru: string; fr: string };
};

// Хранит значения сразу на русском и французском.
type LocalePair<T> = { ru: T; fr: T };

const aidePrefecturePlaceholder: LocalePair<string> = {
  ru:
    "Кратко опишите ситуацию: даты, что уже сделали, какие есть сроки/письма. Если есть — номер досье, ANEF, récépissé.",
  fr:
    "Décrivez brièvement la situation : dates, démarches déjà faites, délais/courriers. Si possible — numéro de dossier, ANEF, récépissé.",
};

const aideCafPlaceholder: LocalePair<string> = {
  ru:
    "Кратко опишите ситуацию: даты, что уже сделали, какие есть сроки/письма. Укажите номер allocataire, письма CAF и что уже отправляли.",
  fr:
    "Décrivez brièvement la situation : dates, démarches déjà faites, délais/courriers. Indiquez le numéro allocataire, les courriers CAF et ce que vous avez déjà envoyé.",
};

const aideCpamPlaceholder: LocalePair<string> = {
  ru:
    "Кратко опишите ситуацию: даты, что уже сделали, какие есть сроки/письма. Укажите numéro de sécurité sociale, attestation и письма CPAM.",
  fr:
    "Décrivez brièvement la situation : dates, démarches déjà faites, délais/courriers. Indiquez le numéro de sécurité sociale, l’attestation et les courriers CPAM.",
};

const aideFranceTravailPlaceholder: LocalePair<string> = {
  ru:
    "Кратко опишите ситуацию: даты, что уже сделали, какие есть сроки/письма. Укажите identifiant, статусы/уведомления и письма France Travail.",
  fr:
    "Décrivez brièvement la situation : dates, démarches déjà faites, délais/courriers. Indiquez votre identifiant, statuts/notifications et courriers France Travail.",
};

const aideHousingPlaceholder: LocalePair<string> = {
  ru:
    "Опишите вопрос по жилью/школе/повседневным делам: город/район, что нужно, есть ли письма или сроки.",
  fr:
    "Décrivez la demande logement/école/quotidien : ville/quartier, ce dont vous avez besoin, courriers ou délais s’il y en a.",
};

const aideUnsurePlaceholder: LocalePair<string> = {
  ru:
    "Опишите ситуацию простыми словами и укажите, что уже пробовали. Если есть письмо — приложите фото/скан.",
  fr:
    "Décrivez simplement la situation et ce que vous avez déjà essayé. S’il y a un courrier, joignez une photo/scan.",
};

const actionsMessagePlaceholder: LocalePair<string> = {
  ru:
    "Для записи укажите: кто будет участвовать и возраст, сколько человек.",
  fr:
    "Pour l’inscription, indiquez : qui participe et l’âge, ville/quartier, jours/heures possibles, nombre de personnes.",
};

const aidePlaceholderById: Record<string, LocalePair<string>> = {
  aide_prefecture_vnj: aidePrefecturePlaceholder,
  aide_caf: aideCafPlaceholder,
  aide_cpam_sante: aideCpamPlaceholder,
  aide_france_travail: aideFranceTravailPlaceholder,
  aide_logement_ecole_quotidien: aideHousingPlaceholder,
  aide_dont_know: aideUnsurePlaceholder,
};

const actionPlaceholderById: Record<string, LocalePair<string>> = {
  action_lang: {
    ru: "Опишите: кто будет заниматься и возраст, какой язык (FR/RU/чеченский), уровень/цель.",
    fr: "Précisez : qui participe et l’âge, quelle langue (FR/RU/tchétchène), niveau/objectif, ville/quartier, jours et horaires.",
  },
  action_sport: {
    ru: "Укажите: кто участвует и возраст, формат/уровень, есть ли ограничения по здоровью (если важно).",
    fr: "Indiquez : qui participe et l’âge, format/niveau, ville/quartier, jours/horaires, contraintes de santé si important.",
  },
  action_garden_workshops: {
    ru: "Напишите: кто участвует и возраст, что интересует (сад/мастерская/прогулка), предпочтительные даты/время, сколько человек.",
    fr: "Écrivez : qui participe et l’âge, ce qui vous intéresse (jardin/atelier/sortie), ville/quartier, dates/horaires souhaités, nombre de personnes.",
  },
  action_culture_trips: {
    ru: "Для записи укажите: кто будет участвовать и возраст, сколько человек, есть ли предпочтения (место/тип мероприятия).",
    fr: "Pour l’inscription : participants et âge, ville/quartier, jours/horaires, nombre de personnes, préférences (lieu/type d’activité).",
  },
  action_youth_forums: {
    ru: "Укажите: возраст, интересы/сфера (учёба/работа/бизнес), что хотите получить (контакты/наставничество/инфо).",
    fr: "Indiquez : âge, centres d’intérêt/domaine (études/travail/business), objectif (contacts/mentorats/info), ville/quartier, disponibilités.",
  },
  action_meetings_community: {
    ru: "Опишите: кратко о себе, что ищете (общение/поддержка/активности), сколько человек (если не один).",
    fr: "Décrivez : brièvement vous, ce que vous cherchez (échange/soutien/activités), ville/quartier, jours/horaires, nombre de personnes si plusieurs.",
  },
};

const actionExtraInfoById: Record<string, LocalePair<string[]>> = {
  action_lang: {
    ru: [
      "Расписание: Сб 10:00–17:00; Ср 18:00–21:00",
      "Период: октябрь–май (перерыв на школьные каникулы)",
      "Адрес: уточняется при записи",
    ],
    fr: [
      "Horaires : Samedi 10:00–17:00 ; Mercredi 18:00–21:00",
      "Période : octobre–mai (pause pendant les vacances scolaires)",
      "Lieu : à préciser lors de l’inscription",
    ],
  },
  action_sport: {
    ru: [
      "Расписание: Вт/Чт/Пт 20:00–21:30; Сб 16:30–19:00",
      "Регистрация: на месте, при наличии мест",
      "Адрес: Centre sportif des Poteries, Rue Colette, 67200 Strasbourg",
    ],
    fr: [
      "Horaires : Mar/Jeu/Ven 20:00–21:30 ; Samedi 16:30–19:00",
      "Inscription : sur place, selon les places disponibles",
      "Adresse : Centre sportif des Poteries, Rue Colette, 67200 Strasbourg",
    ],
  },
};

// Формирует повод для обращения из раздела поддержки (волонтёрство).
const supportIntents: ContactIntent[] = [
  {
    id: "support_volunteer",
    source: "support",
    title: {
      ru: soutenirCopy.ru.volunteerTitle,
      fr: soutenirCopy.fr.volunteerTitle,
    },
    bullets: {
      ru: soutenirCopy.ru.howToHelpItems,
      fr: soutenirCopy.fr.howToHelpItems,
    },
    fineprint: {
      ru: soutenirCopy.ru.volunteerText,
      fr: soutenirCopy.fr.volunteerText,
    },
    topicValue: "volunteer",
  },
];

// Формирует поводы для обращения из раздела помощи.
const aideIntents: ContactIntent[] = aideCopy.ru.topics.items
  .map((ruTopic) => {
    const frTopic = aideCopy.fr.topics.items.find((item) => item.intentId === ruTopic.intentId);
    if (!frTopic) return null;
    const bullets: LocalePair<string[]> = {
      ru: ruTopic.examples,
      fr: frTopic.examples,
    };
    const fineprint: LocalePair<string> = {
      ru: `${aideCopy.ru.topics.preparePrefix} ${ruTopic.prepareLine}`,
      fr: `${aideCopy.fr.topics.preparePrefix} ${frTopic.prepareLine}`,
    };
    return {
      id: ruTopic.intentId,
      source: "aide",
      title: { ru: ruTopic.title, fr: frTopic.title },
      bullets,
      fineprint,
      topicValue: ruTopic.topicKey,
      messagePlaceholder: aidePlaceholderById[ruTopic.intentId] ?? aidePrefecturePlaceholder,
    };
  })
  .filter((intent): intent is ContactIntent => Boolean(intent));

// Формирует поводы для обращения из раздела действий.
const actionIntents: ContactIntent[] = actionsCopy.ru.items
  .map((ruItem) => {
    const frItem = actionsCopy.fr.items.find((item) => item.intentId === ruItem.intentId);
    if (!frItem) return null;
    const bullets: LocalePair<string[]> = {
      ru: [
        `${actionsCopy.ru.directions.forWhoLabel}: ${ruItem.forWho}`,
        `${actionsCopy.ru.directions.benefitLabel}: ${ruItem.benefit}`,
        `${actionsCopy.ru.directions.frequencyLabel}: ${ruItem.frequency}`,
      ],
      fr: [
        `${actionsCopy.fr.directions.forWhoLabel}: ${frItem.forWho}`,
        `${actionsCopy.fr.directions.benefitLabel}: ${frItem.benefit}`,
        `${actionsCopy.fr.directions.frequencyLabel}: ${frItem.frequency}`,
      ],
    };
    const fineprint: LocalePair<string> = {
      ru: `${actionsCopy.ru.directions.whenWhereLabel} ${actionsCopy.ru.directions.whenWhereText}`,
      fr: `${actionsCopy.fr.directions.whenWhereLabel} ${actionsCopy.fr.directions.whenWhereText}`,
    };
    return {
      id: ruItem.intentId,
      source: "actions",
      title: { ru: ruItem.title, fr: frItem.title },
      bullets,
      fineprint,
      extraInfo: actionExtraInfoById[ruItem.intentId],
      topicValue: ruItem.topicKey,
      messagePlaceholder: actionPlaceholderById[ruItem.intentId] ?? actionsMessagePlaceholder,
    };
  })
  .filter((intent): intent is ContactIntent => Boolean(intent));

// Собирает все поводы в справочник по идентификатору для быстрого поиска.
export const contactIntents: Record<string, ContactIntent> = Object.fromEntries(
  [...aideIntents, ...actionIntents, ...supportIntents].map((intent) => [intent.id, intent]),
);
