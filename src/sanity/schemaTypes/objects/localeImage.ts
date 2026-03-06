import { defineField, defineType } from "sanity";

export const localeImage = defineType({
  name: "localeImage",
  title: "Localized image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "localeString",
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "alt.fr",
      subtitle: "alt.ru",
    },
  },
});

