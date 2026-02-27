/*
 Этот файл содержит единый доступ к каталогу активностей.
 Сейчас данные читаются из локального TypeScript каталога, позже сюда можно подключить Supabase.
*/

import {
  activitiesCatalog,
  activityLegacyIntentAliasMap,
  activityLegacySlugAliasMap,
} from "@/content/activitiesCatalog";
import type {
  Activity,
  ActivityRepository,
  ActivitiesLocale,
  ActivityImage,
  LocalizedActivity,
  LocalizedActivityImage,
  LocaleText,
} from "@/lib/activities/types";
import { validateActivitiesCatalog } from "@/lib/activities/validate";

/*
 План SQL-структуры для будущего адаптера Supabase:
 - activities(id, slug, topic_key, intent_id, status, is_featured, display_order, cover_image_src, cta_support_href)
 - activity_translations(activity_id, locale, location, card_title, card_pitch, detail_title, detail_subtitle,
   offer_title, offer_lead, gallery_title, gallery_lead, audience_title, cta_participate_label,
   cta_support_label, seo_title, seo_description, intro_paragraphs_json, offer_items_json,
   audience_items_json, practical_badges_json, contact_placeholder, contact_extra_info_json)
 - activity_gallery_items(id, activity_id, display_order, src, alt_ru, alt_fr, caption_ru, caption_fr)
*/

validateActivitiesCatalog(activitiesCatalog);

const sortedCatalog = [...activitiesCatalog].sort((a, b) => a.displayOrder - b.displayOrder);

function localizeText(value: LocaleText, locale: ActivitiesLocale) {
  return value[locale];
}

function localizeImage(image: ActivityImage, locale: ActivitiesLocale): LocalizedActivityImage {
  return {
    src: image.src,
    alt: localizeText(image.alt, locale),
    caption: image.caption ? localizeText(image.caption, locale) : undefined,
  };
}

function localizeActivity(activity: Activity, locale: ActivitiesLocale): LocalizedActivity {
  return {
    id: activity.id,
    slug: activity.slug,
    topicKey: activity.topicKey,
    intentId: activity.intentId,
    status: activity.status,
    isFeatured: activity.isFeatured,
    displayOrder: activity.displayOrder,
    location: localizeText(activity.location, locale),
    cardTitle: localizeText(activity.cardTitle, locale),
    cardPitch: localizeText(activity.cardPitch, locale),
    coverImage: localizeImage(activity.coverImage, locale),
    detailTitle: localizeText(activity.detailTitle, locale),
    detailSubtitle: localizeText(activity.detailSubtitle, locale),
    introParagraphs: activity.introParagraphs[locale],
    offerTitle: localizeText(activity.offerTitle, locale),
    offerLead: localizeText(activity.offerLead, locale),
    offerItems: activity.offerItems[locale],
    galleryTitle: localizeText(activity.galleryTitle, locale),
    galleryLead: localizeText(activity.galleryLead, locale),
    gallery: activity.gallery.map((image) => localizeImage(image, locale)),
    audienceTitle: localizeText(activity.audienceTitle, locale),
    audienceItems: activity.audienceItems[locale],
    practicalBadges: activity.practicalBadges[locale],
    ctaParticipateLabel: localizeText(activity.ctaParticipateLabel, locale),
    ctaSupportLabel: activity.ctaSupportLabel ? localizeText(activity.ctaSupportLabel, locale) : undefined,
    ctaSupportHref: activity.ctaSupportHref,
    seoTitle: localizeText(activity.seoTitle, locale),
    seoDescription: localizeText(activity.seoDescription, locale),
  };
}

function toPublished(activities: Activity[]) {
  return activities.filter((activity) => activity.status === "published");
}

const activityRepositoryImpl: ActivityRepository = {
  listPublished(locale) {
    return toPublished(sortedCatalog).map((activity) => localizeActivity(activity, locale));
  },

  listFeatured(locale, limit) {
    const normalizedLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 0;
    if (normalizedLimit === 0) {
      return [];
    }

    const published = toPublished(sortedCatalog);
    const featured = published.filter((activity) => activity.isFeatured);
    const rest = published.filter((activity) => !activity.isFeatured);

    const result = [...featured, ...rest].slice(0, normalizedLimit);
    return result.map((activity) => localizeActivity(activity, locale));
  },

  getBySlug(locale, slug) {
    const normalizedSlug = slug.trim().toLowerCase();
    const match = toPublished(sortedCatalog).find((activity) => activity.slug === normalizedSlug);
    return match ? localizeActivity(match, locale) : null;
  },

  getByIntentId(intentId) {
    const normalizedIntentId = intentId.trim().toLowerCase();

    const canonicalIntent = activityLegacyIntentAliasMap[normalizedIntentId] ?? normalizedIntentId;
    const byIntent = sortedCatalog.find((activity) => activity.intentId === canonicalIntent);
    if (byIntent) {
      return byIntent;
    }

    const canonicalSlug = activityLegacySlugAliasMap[normalizedIntentId] ?? normalizedIntentId;
    return sortedCatalog.find((activity) => activity.slug === canonicalSlug) ?? null;
  },
};

export const activityRepository: ActivityRepository = activityRepositoryImpl;

export const canonicalActivityIntentAliases = activityLegacyIntentAliasMap;
export const canonicalActivitySlugAliases = activityLegacySlugAliasMap;
