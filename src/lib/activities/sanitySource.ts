import { groq } from "next-sanity";
import type { ActivitiesLocale, LocalizedActivity, LocalizedActivityImage } from "@/lib/activities/types";
import { toKebabId, toSnakeId } from "@/lib/slug/id";
import { sanityFetch } from "@/sanity/lib/client";

type LocalizedValue = {
  ru?: string;
  fr?: string;
};

type LocalizedListValue = {
  ru?: string[];
  fr?: string[];
};

type SanityImageValue = {
  src?: string;
  alt?: LocalizedValue;
  caption?: LocalizedValue;
};

type SanityActivityDocument = {
  _id: string;
  slug?: string;
  topicKey?: string;
  intentId?: string;
  contactIntentTitle?: LocalizedValue;
  status?: "draft" | "published";
  isFeatured?: boolean;
  displayOrder?: number;
  location?: LocalizedValue;
  periodLabel?: LocalizedValue;
  cardTitle?: LocalizedValue;
  cardPitch?: LocalizedValue;
  coverImage?: SanityImageValue;
  detailTitle?: LocalizedValue;
  detailSubtitle?: LocalizedValue;
  introParagraphs?: LocalizedListValue;
  offerTitle?: LocalizedValue;
  offerLead?: LocalizedValue;
  offerItems?: LocalizedListValue;
  galleryTitle?: LocalizedValue;
  galleryLead?: LocalizedValue;
  gallery?: SanityImageValue[];
  audienceTitle?: LocalizedValue;
  audienceItems?: LocalizedListValue;
  practicalBadges?: LocalizedListValue;
  ctaParticipateLabel?: LocalizedValue;
  ctaSupportLabel?: LocalizedValue;
  ctaSupportHref?: string;
  seoTitle?: LocalizedValue;
  seoDescription?: LocalizedValue;
};

const FALLBACK_IMAGE_SRC = "/desktop_bg.png";

const activitiesQuery = groq`
  *[_type == "activity" && coalesce(status, "published") == "published"] | order(coalesce(displayOrder, 9999) asc, _createdAt desc) {
    _id,
    "slug": slug.current,
    "topicKey": coalesce(contactIntent->topicKey, topicKey),
    "intentId": coalesce(contactIntent->intentId, intentId),
    "contactIntentTitle": contactIntent->title,
    status,
    isFeatured,
    displayOrder,
    location,
    periodLabel,
    cardTitle,
    cardPitch,
    detailTitle,
    detailSubtitle,
    introParagraphs,
    offerTitle,
    offerLead,
    offerItems,
    galleryTitle,
    galleryLead,
    audienceTitle,
    audienceItems,
    practicalBadges,
    ctaParticipateLabel,
    ctaSupportLabel,
    ctaSupportHref,
    seoTitle,
    seoDescription,
    "coverImage": {
      "src": coverImage.image.asset->url,
      "alt": coverImage.alt,
      "caption": coverImage.caption
    },
    "gallery": gallery[]{
      "src": image.asset->url,
      "alt": alt,
      "caption": caption
    }
  }
`;

function pickDocTitleSeed(doc: SanityActivityDocument) {
  return doc.cardTitle?.fr ?? doc.cardTitle?.ru ?? doc.detailTitle?.fr ?? doc.detailTitle?.ru ?? doc._id;
}

function pickLocaleText(value: LocalizedValue | undefined, locale: ActivitiesLocale) {
  return value?.[locale] ?? value?.ru ?? value?.fr ?? "";
}

function pickLocaleTextOptional(value: LocalizedValue | undefined, locale: ActivitiesLocale) {
  const text = pickLocaleText(value, locale).trim();
  return text ? text : undefined;
}

function pickLocaleList(value: LocalizedListValue | undefined, locale: ActivitiesLocale) {
  const localized = value?.[locale];
  if (localized?.length) {
    return localized.filter((item) => item.trim().length > 0);
  }

  const fallback = value?.ru?.length ? value.ru : value?.fr ?? [];
  return fallback.filter((item) => item.trim().length > 0);
}

function localizeImage(image: SanityImageValue | undefined, locale: ActivitiesLocale): LocalizedActivityImage {
  return {
    src: image?.src ?? FALLBACK_IMAGE_SRC,
    alt: pickLocaleText(image?.alt, locale) || "Activity image",
    caption: pickLocaleTextOptional(image?.caption, locale),
  };
}

function defaultParticipateLabel(locale: ActivitiesLocale) {
  return locale === "ru" ? "Zapisatsya" : "S'inscrire";
}

function localizeActivity(doc: SanityActivityDocument, locale: ActivitiesLocale): LocalizedActivity | null {
  const machineSeed = pickDocTitleSeed(doc);
  const slug = toKebabId(doc.slug?.trim(), `activity-${machineSeed}`, "activity");
  const linkedIntentSeed = doc.contactIntentTitle?.fr ?? doc.contactIntentTitle?.ru;
  const topicKey = toSnakeId(doc.topicKey?.trim(), linkedIntentSeed ?? machineSeed, "activity_topic");
  const intentId = toSnakeId(doc.intentId?.trim(), `activity_${topicKey}`, `activity_${topicKey}`);
  const cardTitle =
    pickLocaleTextOptional(doc.cardTitle, locale) ??
    pickLocaleTextOptional(doc.detailTitle, locale) ??
    slug.replace(/-/g, " ");
  const cardPitch = pickLocaleTextOptional(doc.cardPitch, locale) ?? pickLocaleTextOptional(doc.detailSubtitle, locale) ?? "";
  const detailTitle = pickLocaleTextOptional(doc.detailTitle, locale) ?? cardTitle;
  const detailSubtitle = pickLocaleTextOptional(doc.detailSubtitle, locale) ?? cardPitch;
  const introParagraphs = pickLocaleList(doc.introParagraphs, locale);
  const offerItems = pickLocaleList(doc.offerItems, locale);
  const audienceItems = pickLocaleList(doc.audienceItems, locale);
  const practicalBadges = pickLocaleList(doc.practicalBadges, locale);

  const coverImage = localizeImage(doc.coverImage, locale);
  const galleryImages = (doc.gallery ?? [])
    .map((image) => localizeImage(image, locale))
    .filter((image) => Boolean(image.src));

  return {
    id: doc._id,
    slug,
    topicKey,
    intentId,
    status: "published",
    isFeatured: Boolean(doc.isFeatured),
    displayOrder: Number.isFinite(doc.displayOrder) ? Number(doc.displayOrder) : 9999,
    location: pickLocaleTextOptional(doc.location, locale) ?? "",
    periodLabel: pickLocaleTextOptional(doc.periodLabel, locale) ?? "",
    cardTitle,
    cardPitch,
    coverImage,
    detailTitle,
    detailSubtitle,
    introParagraphs: introParagraphs.length ? introParagraphs : cardPitch ? [cardPitch] : [],
    offerTitle: pickLocaleTextOptional(doc.offerTitle, locale) ?? detailTitle,
    offerLead: pickLocaleTextOptional(doc.offerLead, locale) ?? detailSubtitle,
    offerItems,
    galleryTitle: pickLocaleTextOptional(doc.galleryTitle, locale) ?? detailTitle,
    galleryLead: pickLocaleTextOptional(doc.galleryLead, locale) ?? "",
    gallery: galleryImages.length > 0 ? galleryImages : [coverImage],
    audienceTitle: pickLocaleTextOptional(doc.audienceTitle, locale) ?? detailTitle,
    audienceItems,
    practicalBadges,
    ctaParticipateLabel: pickLocaleTextOptional(doc.ctaParticipateLabel, locale) ?? defaultParticipateLabel(locale),
    ctaSupportLabel: pickLocaleTextOptional(doc.ctaSupportLabel, locale),
    ctaSupportHref: doc.ctaSupportHref?.trim() || undefined,
    seoTitle: pickLocaleTextOptional(doc.seoTitle, locale) ?? detailTitle,
    seoDescription: (pickLocaleTextOptional(doc.seoDescription, locale) ?? cardPitch) || detailSubtitle || detailTitle,
  };
}

export async function fetchSanityActivities(locale: ActivitiesLocale) {
  try {
    const docs = await sanityFetch<SanityActivityDocument[]>(activitiesQuery);
    if (!docs) {
      return null;
    }

    return docs
      .map((doc) => localizeActivity(doc, locale))
      .filter((doc): doc is LocalizedActivity => doc !== null);
  } catch (error) {
    console.error("Failed to fetch activities from Sanity:", error);
    return null;
  }
}
