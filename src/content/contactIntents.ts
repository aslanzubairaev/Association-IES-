import { activitiesCatalog, activityLegacyIntentAliasMap } from "@/content/activitiesCatalog";
import { aideCopy, soutenirCopy } from "@/content/actions";

// Описывает один повод для обращения: идентификатор, заголовок, подсказки и текст темы.
export type ContactIntent = {
  id: string;
  sanityId?: string;
  source: "aide" | "actions" | "activities" | "support";
  title: { ru: string; fr: string };
  topicLabel?: { ru: string; fr: string };
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
    "Опишите ситуацию простыми словами и укажите, что уже пробовали. Если есть письмо — опишите его кратко.",
  fr:
    "Décrivez simplement la situation et ce que vous avez déjà essayé. S’il y a un courrier, décrivez‑le brièvement.",
};

const activitiesMessagePlaceholder: LocalePair<string> = {
  ru: "Для записи укажите: кто будет участвовать, возраст, удобные дни и количество человек.",
  fr: "Pour l’inscription, indiquez : qui participe, l’âge, vos disponibilités et le nombre de personnes.",
};

const aidePlaceholderById: Record<string, LocalePair<string>> = {
  aide_prefecture_vnj: aidePrefecturePlaceholder,
  aide_caf: aideCafPlaceholder,
  aide_cpam_sante: aideCpamPlaceholder,
  aide_france_travail: aideFranceTravailPlaceholder,
  aide_logement_ecole_quotidien: aideHousingPlaceholder,
  aide_dont_know: aideUnsurePlaceholder,
};

const activitiesMetaLabels = {
  ru: {
    audience: "Для кого",
    location: "Где",
  },
  fr: {
    audience: "Pour qui",
    location: "Lieu",
  },
} as const;

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
    topicLabel: {
      ru: "Волонтёрство",
      fr: "Bénévolat",
    },
    topicValue: "volunteer",
  },
];

// Формирует поводы для обращения из раздела помощи.
const aideIntents: ContactIntent[] = aideCopy.ru.topics.items.flatMap((ruTopic) => {
  const frTopic = aideCopy.fr.topics.items.find((item) => item.intentId === ruTopic.intentId);
  if (!frTopic) return [];
  const bullets: LocalePair<string[]> = {
    ru: ruTopic.examples,
    fr: frTopic.examples,
  };
  const fineprint: LocalePair<string> = {
    ru: `${aideCopy.ru.topics.preparePrefix} ${ruTopic.prepareLine}`,
    fr: `${aideCopy.fr.topics.preparePrefix} ${frTopic.prepareLine}`,
  };
  return [
    {
      id: ruTopic.intentId,
      source: "aide",
      title: { ru: ruTopic.title, fr: frTopic.title },
      topicLabel: { ru: ruTopic.title, fr: frTopic.title },
      bullets,
      fineprint,
      topicValue: ruTopic.topicKey,
      messagePlaceholder: aidePlaceholderById[ruTopic.intentId] ?? aidePrefecturePlaceholder,
    },
  ];
});

// Формирует поводы для обращения из каталога активностей.
const activityIntents: ContactIntent[] = activitiesCatalog
  .filter((activity) => activity.status === "published")
  .map((activity) => {
    const fallbackAudienceRu = activity.audienceItems.ru[0] ?? activity.cardPitch.ru;
    const fallbackAudienceFr = activity.audienceItems.fr[0] ?? activity.cardPitch.fr;

    return {
      id: activity.intentId,
      source: "activities",
      title: {
        ru: activity.detailTitle.ru,
        fr: activity.detailTitle.fr,
      },
      topicLabel: {
        ru: activity.cardTitle.ru,
        fr: activity.cardTitle.fr,
      },
      bullets: {
        ru: [
          `${activitiesMetaLabels.ru.audience}: ${fallbackAudienceRu}`,
          `${activitiesMetaLabels.ru.location}: ${activity.location.ru}`,
        ],
        fr: [
          `${activitiesMetaLabels.fr.audience}: ${fallbackAudienceFr}`,
          `${activitiesMetaLabels.fr.location}: ${activity.location.fr}`,
        ],
      },
      extraInfo: activity.contactExtraInfo,
      topicValue: activity.topicKey,
      messagePlaceholder: activity.contactPlaceholder ?? activitiesMessagePlaceholder,
    };
  });

const canonicalContactIntents: Record<string, ContactIntent> = Object.fromEntries(
  [...aideIntents, ...activityIntents, ...supportIntents].map((intent) => [intent.id, intent]),
);

const legacyActivityIntentEntries = Object.entries(activityLegacyIntentAliasMap).flatMap(([legacyIntent, canonicalIntent]) => {
  const canonical = canonicalContactIntents[canonicalIntent];
  if (!canonical) {
    return [];
  }
  return [[legacyIntent, canonical] as const];
});

// Собирает все поводы в справочник по идентификатору для быстрого поиска.
export const contactIntents: Record<string, ContactIntent> = {
  ...canonicalContactIntents,
  ...Object.fromEntries(legacyActivityIntentEntries),
};

// Нормализует intent из URL с учётом legacy-идентификаторов.
export function resolveContactIntentId(rawIntent?: string | null) {
  if (!rawIntent) return "";
  const trimmed = rawIntent.trim();
  if (!trimmed) return "";

  const normalized = trimmed.toLowerCase();
  const canonical = activityLegacyIntentAliasMap[normalized] ?? normalized;

  if (contactIntents[canonical]) {
    return canonical;
  }

  if (contactIntents[trimmed]) {
    return trimmed;
  }

  return "";
}
