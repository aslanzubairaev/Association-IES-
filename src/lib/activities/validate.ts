/*
 This file validates the integrity of the activities catalog on load.
 It prevents hidden errors (duplicate slug/intent/topic/order and empty texts).
*/

import type { Activity, ActivityImage, LocaleText, LocalizedStringList } from "@/lib/activities/types";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[activitiesCatalog] ${message}`);
  }
}

function isNonEmptyString(value: string) {
  return value.trim().length > 0;
}

function validateLocaleText(fieldPath: string, value: LocaleText) {
  assert(isNonEmptyString(value.fr), `${fieldPath}.fr must be a non-empty string`);
  assert(isNonEmptyString(value.ru), `${fieldPath}.ru must be a non-empty string`);
}

function validateLocalizedList(fieldPath: string, value: LocalizedStringList) {
  assert(value.fr.length > 0, `${fieldPath}.fr must contain at least one item`);
  assert(value.ru.length > 0, `${fieldPath}.ru must contain at least one item`);
  value.fr.forEach((item, index) => {
    assert(isNonEmptyString(item), `${fieldPath}.fr[${index}] must be a non-empty string`);
  });
  value.ru.forEach((item, index) => {
    assert(isNonEmptyString(item), `${fieldPath}.ru[${index}] must be a non-empty string`);
  });
}

function validateImage(fieldPath: string, image: ActivityImage) {
  assert(isNonEmptyString(image.src), `${fieldPath}.src must be a non-empty string`);
  validateLocaleText(`${fieldPath}.alt`, image.alt);
  if (image.caption) {
    validateLocaleText(`${fieldPath}.caption`, image.caption);
  }
}

export function validateActivitiesCatalog(activities: Activity[]) {
  assert(activities.length > 0, "catalog must contain at least one activity");

  const slugSet = new Set<string>();
  const intentSet = new Set<string>();
  const topicSet = new Set<string>();
  const displayOrderSet = new Set<number>();
  const legacyIntentSet = new Set<string>();

  activities.forEach((activity, index) => {
    const path = `activities[${index}]`;

    assert(isNonEmptyString(activity.id), `${path}.id must be a non-empty string`);
    assert(isNonEmptyString(activity.slug), `${path}.slug must be a non-empty string`);
    assert(isNonEmptyString(activity.topicKey), `${path}.topicKey must be a non-empty string`);
    assert(isNonEmptyString(activity.intentId), `${path}.intentId must be a non-empty string`);
    assert(activity.status === "draft" || activity.status === "published", `${path}.status is invalid`);
    assert(Number.isInteger(activity.displayOrder), `${path}.displayOrder must be an integer`);

    assert(!slugSet.has(activity.slug), `duplicate slug: ${activity.slug}`);
    slugSet.add(activity.slug);

    assert(!intentSet.has(activity.intentId), `duplicate intentId: ${activity.intentId}`);
    intentSet.add(activity.intentId);

    assert(!topicSet.has(activity.topicKey), `duplicate topicKey: ${activity.topicKey}`);
    topicSet.add(activity.topicKey);

    assert(!displayOrderSet.has(activity.displayOrder), `duplicate displayOrder: ${activity.displayOrder}`);
    displayOrderSet.add(activity.displayOrder);

    validateLocaleText(`${path}.location`, activity.location);
    validateLocaleText(`${path}.periodLabel`, activity.periodLabel);
    validateLocaleText(`${path}.cardTitle`, activity.cardTitle);
    validateLocaleText(`${path}.cardPitch`, activity.cardPitch);
    validateImage(`${path}.coverImage`, activity.coverImage);
    validateLocaleText(`${path}.detailTitle`, activity.detailTitle);
    validateLocaleText(`${path}.detailSubtitle`, activity.detailSubtitle);
    validateLocalizedList(`${path}.introParagraphs`, activity.introParagraphs);
    validateLocaleText(`${path}.offerTitle`, activity.offerTitle);
    validateLocaleText(`${path}.offerLead`, activity.offerLead);
    validateLocalizedList(`${path}.offerItems`, activity.offerItems);
    validateLocaleText(`${path}.galleryTitle`, activity.galleryTitle);
    validateLocaleText(`${path}.galleryLead`, activity.galleryLead);
    assert(activity.gallery.length > 0, `${path}.gallery must contain at least one image`);
    activity.gallery.forEach((image, imageIndex) => validateImage(`${path}.gallery[${imageIndex}]`, image));
    validateLocaleText(`${path}.audienceTitle`, activity.audienceTitle);
    validateLocalizedList(`${path}.audienceItems`, activity.audienceItems);
    validateLocalizedList(`${path}.practicalBadges`, activity.practicalBadges);
    validateLocaleText(`${path}.ctaParticipateLabel`, activity.ctaParticipateLabel);
    validateLocaleText(`${path}.seoTitle`, activity.seoTitle);
    validateLocaleText(`${path}.seoDescription`, activity.seoDescription);

    if (activity.ctaSupportLabel) {
      validateLocaleText(`${path}.ctaSupportLabel`, activity.ctaSupportLabel);
      assert(
        typeof activity.ctaSupportHref === "string" && isNonEmptyString(activity.ctaSupportHref),
        `${path}.ctaSupportHref must be provided when ctaSupportLabel is set`,
      );
    }

    if (activity.contactPlaceholder) {
      validateLocaleText(`${path}.contactPlaceholder`, activity.contactPlaceholder);
    }

    if (activity.contactExtraInfo) {
      validateLocalizedList(`${path}.contactExtraInfo`, activity.contactExtraInfo);
    }

    activity.legacyIntentIds?.forEach((legacyIntent, legacyIndex) => {
      assert(isNonEmptyString(legacyIntent), `${path}.legacyIntentIds[${legacyIndex}] must be non-empty`);
      assert(!intentSet.has(legacyIntent), `legacy intent duplicates canonical intentId: ${legacyIntent}`);
      assert(!legacyIntentSet.has(legacyIntent), `duplicate legacy intentId: ${legacyIntent}`);
      legacyIntentSet.add(legacyIntent);
    });

    activity.legacySlugs?.forEach((legacySlug, legacyIndex) => {
      assert(isNonEmptyString(legacySlug), `${path}.legacySlugs[${legacyIndex}] must be non-empty`);
      assert(!slugSet.has(legacySlug), `legacy slug duplicates canonical slug: ${legacySlug}`);
    });
  });
}
