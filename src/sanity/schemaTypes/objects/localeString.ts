import { defineField, defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({
      name: "ru",
      title: "Russian (RU)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fr",
      title: "French (FR)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});

