import { defineField, defineType } from "sanity";

export const activityType = defineType({
  name: "activity",
  title: "Activities",
  type: "document",
  fieldsets: [
    {
      name: "advanced",
      title: "Advanced (optional)",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "published",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Draft", value: "draft" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
      fieldset: "advanced",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured on home",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
      fieldset: "advanced",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
      fieldset: "advanced",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => {
          const typedDoc = doc as { cardTitle?: { fr?: string; ru?: string } };
          return typedDoc.cardTitle?.fr ?? typedDoc.cardTitle?.ru ?? "";
        },
        maxLength: 96,
      },
      description: "Auto-generated if empty",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "contactIntent",
      title: "Contact intent",
      type: "reference",
      to: [{ type: "contactIntent" }],
      options: {
        filter: "source == $source && isActive == true",
        filterParams: { source: "activities" },
      },
    }),
    defineField({
      name: "intentId",
      title: "Legacy intent ID fallback",
      type: "string",
      description: "Use only for migration. New activities should use Contact intent reference.",
      hidden: true,
    }),
    defineField({
      name: "topicKey",
      title: "Legacy topic key fallback",
      type: "string",
      description: "Use only for migration. New activities should use Contact intent reference.",
      hidden: true,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
    }),
    defineField({
      name: "periodLabel",
      title: "Period label",
      type: "localeString",
    }),
    defineField({
      name: "cardTitle",
      title: "Name (RU/FR)",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardPitch",
      title: "Card pitch",
      type: "localeString",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "localeImage",
    }),
    defineField({
      name: "detailTitle",
      title: "Detail page title",
      type: "localeString",
    }),
    defineField({
      name: "detailSubtitle",
      title: "Detail page subtitle",
      type: "localeString",
    }),
    defineField({
      name: "introParagraphs",
      title: "Intro paragraphs",
      type: "localeStringArray",
    }),
    defineField({
      name: "offerTitle",
      title: "Offer section title",
      type: "localeString",
    }),
    defineField({
      name: "offerLead",
      title: "Offer section lead",
      type: "localeString",
    }),
    defineField({
      name: "offerItems",
      title: "Offer items",
      type: "localeStringArray",
    }),
    defineField({
      name: "galleryTitle",
      title: "Gallery title",
      type: "localeString",
    }),
    defineField({
      name: "galleryLead",
      title: "Gallery lead",
      type: "localeString",
    }),
    defineField({
      name: "gallery",
      title: "Gallery images",
      type: "array",
      of: [{ type: "localeImage" }],
    }),
    defineField({
      name: "audienceTitle",
      title: "Audience section title",
      type: "localeString",
    }),
    defineField({
      name: "audienceItems",
      title: "Audience items",
      type: "localeStringArray",
    }),
    defineField({
      name: "practicalBadges",
      title: "Practical badges",
      type: "localeStringArray",
    }),
    defineField({
      name: "ctaParticipateLabel",
      title: "CTA participate label",
      type: "localeString",
    }),
    defineField({
      name: "ctaSupportLabel",
      title: "CTA support label",
      type: "localeString",
    }),
    defineField({
      name: "ctaSupportHref",
      title: "CTA support href",
      type: "string",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "localeString",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "localeString",
    }),
  ],
  preview: {
    select: {
      title: "cardTitle.fr",
      subtitle: "slug.current",
      media: "coverImage.image",
    },
  },
});
