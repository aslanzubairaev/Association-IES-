import { groq } from "next-sanity";
import type { ContactIntent } from "@/content/contactIntents";
import { toSnakeId } from "@/lib/slug/id";
import { sanityFetch } from "@/sanity/lib/client";

type LocalizedValue = {
  ru?: string;
  fr?: string;
};

type LocalizedListValue = {
  ru?: string[];
  fr?: string[];
};

type SanityContactIntentDocument = {
  _id: string;
  source?: ContactIntent["source"];
  intentId?: string;
  topicValue?: string;
  topicLabel?: LocalizedValue;
  title?: LocalizedValue;
  bullets?: LocalizedListValue;
  fineprint?: LocalizedValue;
  extraInfo?: LocalizedListValue;
  messagePlaceholder?: LocalizedValue;
};

const contactIntentsQuery = groq`
  *[_type == "contactIntent" && coalesce(isActive, true) == true] | order(coalesce(displayOrder, 9999) asc, _createdAt desc) {
    _id,
    source,
    intentId,
    "topicValue": topicKey,
    topicLabel,
    title,
    bullets,
    fineprint,
    extraInfo,
    messagePlaceholder
  }
`;

function pickText(value: LocalizedValue | undefined, locale: "ru" | "fr") {
  return value?.[locale]?.trim() ?? "";
}

function pickTextPair(value: LocalizedValue | undefined) {
  const ru = pickText(value, "ru") || pickText(value, "fr");
  const fr = pickText(value, "fr") || pickText(value, "ru");
  if (!ru || !fr) {
    return undefined;
  }

  return { ru, fr };
}

function pickList(value: LocalizedListValue | undefined, locale: "ru" | "fr") {
  return (value?.[locale] ?? []).map((item) => item.trim()).filter(Boolean);
}

function pickListPair(value: LocalizedListValue | undefined) {
  const ru = pickList(value, "ru");
  const fr = pickList(value, "fr");
  if (!ru.length && !fr.length) {
    return undefined;
  }

  return {
    ru: ru.length ? ru : fr,
    fr: fr.length ? fr : ru,
  };
}

function normalizeSource(source: string | undefined): ContactIntent["source"] {
  if (source === "aide" || source === "actions" || source === "activities" || source === "support") {
    return source;
  }

  return "activities";
}

function toContactIntent(doc: SanityContactIntentDocument): ContactIntent | null {
  const title = pickTextPair(doc.title);
  if (!title) {
    return null;
  }
  const source = normalizeSource(doc.source);
  const seedFromIntent = doc.intentId?.replace(/^(activity|aide|actions|support)_/i, "");
  const baseSeed = doc.topicValue?.trim() || seedFromIntent || title.fr || title.ru || doc._id;
  const topicValue = toSnakeId(doc.topicValue?.trim(), baseSeed, "intent_topic");
  const autoPrefix = source === "activities" ? "activity" : source;
  const id = doc.intentId?.trim()
    ? toSnakeId(doc.intentId.trim(), baseSeed, `${autoPrefix}_${topicValue}`)
    : `${autoPrefix}_${topicValue}`;

  return {
    id,
    source,
    topicValue,
    topicLabel: pickTextPair(doc.topicLabel) ?? title,
    title,
    bullets: pickListPair(doc.bullets),
    fineprint: pickTextPair(doc.fineprint),
    extraInfo: pickListPair(doc.extraInfo),
    messagePlaceholder: pickTextPair(doc.messagePlaceholder),
  };
}

export async function fetchSanityContactIntents() {
  try {
    const docs = await sanityFetch<SanityContactIntentDocument[]>(contactIntentsQuery);
    if (!docs) {
      return null;
    }

    return docs.map((doc) => toContactIntent(doc)).filter((doc): doc is ContactIntent => doc !== null);
  } catch (error) {
    console.error("Failed to fetch contact intents from Sanity:", error);
    return null;
  }
}
