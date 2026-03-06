import { defineField, defineType } from "sanity";

export const localeStringArray = defineType({
  name: "localeStringArray",
  title: "Localized list",
  type: "object",
  fields: [
    defineField({
      name: "ru",
      title: "Russian (RU)",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "fr",
      title: "French (FR)",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});

