/*
 This file defines the types for the activities catalog.
 It establishes a unified data contract for the list, detail page, and future database.
*/

export type ActivitiesLocale = "ru" | "fr";

export type LocaleText = {
  ru: string;
  fr: string;
};

export type LocalizedStringList = {
  ru: string[];
  fr: string[];
};

export type ActivityStatus = "draft" | "published";

export type ActivityImage = {
  src: string;
  alt: LocaleText;
  caption?: LocaleText;
};

export type LocalizedActivityImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Activity = {
  id: string;
  slug: string;
  topicKey: string;
  intentId: string;
  status: ActivityStatus;
  isFeatured: boolean;
  displayOrder: number;
  location: LocaleText;
  periodLabel: LocaleText;
  cardTitle: LocaleText;
  cardPitch: LocaleText;
  coverImage: ActivityImage;
  detailTitle: LocaleText;
  detailSubtitle: LocaleText;
  introParagraphs: LocalizedStringList;
  offerTitle: LocaleText;
  offerLead: LocaleText;
  offerItems: LocalizedStringList;
  galleryTitle: LocaleText;
  galleryLead: LocaleText;
  gallery: ActivityImage[];
  audienceTitle: LocaleText;
  audienceItems: LocalizedStringList;
  practicalBadges: LocalizedStringList;
  ctaParticipateLabel: LocaleText;
  ctaSupportLabel?: LocaleText;
  ctaSupportHref?: string;
  seoTitle: LocaleText;
  seoDescription: LocaleText;
  legacyIntentIds?: string[];
  legacySlugs?: string[];
  contactPlaceholder?: LocaleText;
  contactExtraInfo?: LocalizedStringList;
};

export type LocalizedActivity = {
  id: string;
  slug: string;
  topicKey: string;
  intentId: string;
  contactIntentRef?: string;
  status: ActivityStatus;
  isFeatured: boolean;
  displayOrder: number;
  location: string;
  periodLabel: string;
  cardTitle: string;
  cardPitch: string;
  coverImage: LocalizedActivityImage;
  detailTitle: string;
  detailSubtitle: string;
  introParagraphs: string[];
  offerTitle: string;
  offerLead: string;
  offerItems: string[];
  galleryTitle: string;
  galleryLead: string;
  gallery: LocalizedActivityImage[];
  audienceTitle: string;
  audienceItems: string[];
  practicalBadges: string[];
  ctaParticipateLabel: string;
  ctaSupportLabel?: string;
  ctaSupportHref?: string;
  seoTitle: string;
  seoDescription: string;
};

export type ActivityTopicEntry = {
  topicKey: string;
  title: LocaleText;
  slugs: string[];
};

export interface ActivityRepository {
  listPublished(locale: ActivitiesLocale): Promise<LocalizedActivity[]>;
  listFeatured(locale: ActivitiesLocale, limit: number): Promise<LocalizedActivity[]>;
  getBySlug(locale: ActivitiesLocale, slug: string): Promise<LocalizedActivity | null>;
  getByIntentId(intentId: string): Activity | null;
}
