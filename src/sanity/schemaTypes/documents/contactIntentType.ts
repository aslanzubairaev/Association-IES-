import { defineField, defineType } from "sanity";

export const contactIntentType = defineType({
  name: "contactIntent",
  title: "Contact intents",
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
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
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
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "activities",
      options: {
        list: [
          { title: "Activities", value: "activities" },
          { title: "Aide", value: "aide" },
          { title: "Support", value: "support" },
          { title: "Actions", value: "actions" },
        ],
      },
      validation: (rule) => rule.required(),
      fieldset: "advanced",
    }),
    defineField({
      name: "intentId",
      title: "Intent ID (URL param `intent`)",
      type: "string",
      description: "Auto-generated if empty",
      validation: (rule) => rule.regex(/^[a-z0-9_]+$/, {
        name: "intent id",
        invert: false,
      }),
      hidden: true,
    }),
    defineField({
      name: "topicKey",
      title: "Topic key (form value)",
      type: "string",
      description: "Auto-generated if empty",
      validation: (rule) => rule.regex(/^[a-z0-9_]+$/, {
        name: "topic key",
        invert: false,
      }),
      hidden: true,
    }),
    defineField({
      name: "topicLabel",
      title: "Topic label",
      type: "localeString",
      fieldset: "advanced",
    }),
    defineField({
      name: "title",
      title: "Name (RU/FR)",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "localeStringArray",
      fieldset: "advanced",
    }),
    defineField({
      name: "fineprint",
      title: "Fineprint",
      type: "localeString",
      fieldset: "advanced",
    }),
    defineField({
      name: "extraInfo",
      title: "Extra info",
      type: "localeStringArray",
      fieldset: "advanced",
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Message placeholder",
      type: "localeString",
      fieldset: "advanced",
    }),
  ],
  preview: {
    select: {
      title: "title.fr",
      titleRu: "title.ru",
      subtitle: "intentId",
    },
    prepare(selection) {
      const fallbackTitle = selection.titleRu ?? "Untitled intent";
      const title = selection.title ?? fallbackTitle;
      const subtitle = selection.subtitle ? `intent: ${selection.subtitle}` : "intent: auto";
      return {
        title,
        subtitle,
      };
    },
  },
});
