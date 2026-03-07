# Sanity Setup (Activities + Contact Intents CMS)

This project now supports editing activities and contact-form intents from Sanity Studio.

## 1) Create a Sanity project

1. Go to https://www.sanity.io/manage
2. Create a project
3. Keep the `projectId` and dataset name (usually `production`)

## 2) Configure environment variables

In `.env.local` add:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-03-01
```

## 3) Start the app + Studio

```bash
npm run dev
```

Open Studio at:

```text
http://localhost:3000/studio
```

## 4) Manage contact intents (first)

In Studio, open **Contact intents** and create the entries used by the contact form:
- fill only **Name (RU/FR)** (required)
- `intentId` and `topicKey` are auto-generated when empty
- all technical/extra fields are in **Advanced (optional)** (collapsed by default)

## 5) Manage activities

In Studio, use **Activities** documents to:
- fill only **Name (RU/FR)** (required)
- slug/intent/topic technical params are auto-generated from name if empty
- content fields (subtitle, description, images, gallery, CTA, SEO) are visible directly
- if needed, link an existing **Contact intent** in Advanced

## Notes

- If Sanity env vars are missing, the site automatically falls back to local TypeScript catalog data.
- Sanity images are supported via `cdn.sanity.io` in `next.config.js`.
