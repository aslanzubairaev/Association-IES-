/*
 This file defines the client-side content of the contact page.
 It displays a heading, the selected topic block, and the form.
 It updates texts when a topic is selected from the list.
*/

"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { ContactContextBlock } from "@/components/contacts/ContactContextBlock";
import { ContentCard } from "@/components/ui/Card/ContentCard";
import { contactCopy, getContactTopicLabel, resolveContactTopicKey } from "@/content/actions";
import { contactIntents, resolveContactIntentId, type ContactIntent } from "@/content/contactIntents";

type ContactPageContentProps = {
  locale: "ru" | "fr";
  initialTopic?: string;
  initialIntentId?: string;
  sanityIntents?: ContactIntent[];
};

function findIntentByTopic(intents: ContactIntent[], topicKey?: string) {
  if (!topicKey) return undefined;
  return intents.find((intent) => intent.topicValue === topicKey);
}

function findIntentFlexible(rawIntent: string | undefined, allIntents: ContactIntent[], intentsById: Record<string, ContactIntent>) {
  if (!rawIntent) return undefined;
  const trimmed = rawIntent.trim();
  if (!trimmed) return undefined;
  const normalized = trimmed.toLowerCase();

  // 1. Match by Sanity _id (most reliable when activity links via contactIntentRef)
  const bySanityId = allIntents.find((intent) => intent.sanityId === trimmed);
  if (bySanityId) return bySanityId;

  // 2. Try hardcoded registry (legacy compat)
  const canonicalId = resolveContactIntentId(trimmed);
  if (canonicalId && intentsById[canonicalId]) {
    return intentsById[canonicalId];
  }

  // 3. Direct match by id
  if (intentsById[normalized]) return intentsById[normalized];
  if (intentsById[trimmed]) return intentsById[trimmed];

  // 4. Match by topicValue
  const byTopic = allIntents.find((intent) => intent.topicValue === normalized || intent.topicValue === trimmed);
  if (byTopic) return byTopic;

  // 5. Fuzzy: strip common prefixes and match by topicValue
  const stripped = normalized.replace(/^(activity|aide|actions|support)_/, "");
  if (stripped !== normalized) {
    const byStripped = allIntents.find((intent) => intent.topicValue === stripped);
    if (byStripped) return byStripped;
  }

  return undefined;
}

export function ContactPageContent({ locale, initialTopic, initialIntentId, sanityIntents }: ContactPageContentProps) {
  const searchParams = useSearchParams();
  // List of all known topics for quick lookup by key.
  const allIntents = useMemo(() => {
    if (sanityIntents?.length) {
      return sanityIntents;
    }
    return Object.values(contactIntents);
  }, [sanityIntents]);
  const intentsById = useMemo(() => Object.fromEntries(allIntents.map((intent) => [intent.id, intent])), [allIntents]);
  const intentFromUrl = searchParams?.get("intent") ?? initialIntentId ?? undefined;
  const topicFromUrl = searchParams?.get("topic") ?? initialTopic ?? undefined;
  const normalizedInitialTopic = resolveContactTopicKey(topicFromUrl);
  const resolvedIntent = findIntentFlexible(intentFromUrl, allIntents, intentsById)
    ?? findIntentByTopic(allIntents, normalizedInitialTopic);
  const initialTopicValue = resolvedIntent?.topicValue ?? normalizedInitialTopic ?? "";

  // The currently selected topic is needed to update the heading and hints on selection.
  const [selectedTopic, setSelectedTopic] = useState(initialTopicValue);
  const [selectedIntent, setSelectedIntent] = useState<ContactIntent | undefined>(resolvedIntent);

  // When the URL changes, update the selected topic and its content.
  useEffect(() => {
    const nextIntent = findIntentFlexible(intentFromUrl, allIntents, intentsById)
      ?? findIntentByTopic(allIntents, normalizedInitialTopic);
    const nextTopic = nextIntent?.topicValue ?? normalizedInitialTopic ?? "";
    setSelectedTopic(nextTopic);
    setSelectedIntent(nextIntent);
  }, [allIntents, intentsById, intentFromUrl, normalizedInitialTopic]);

  // Update the selected topic when the form dropdown changes.
  function handleTopicChange(value: string) {
    setSelectedTopic(value);
    setSelectedIntent(findIntentByTopic(allIntents, value));
  }

  // Page title depends on the selected topic, if one exists.
  const pageTitle = selectedIntent?.title[locale] ?? contactCopy[locale].pageTitle;
  const pageLead = contactCopy[locale].pageLead;
  const intentMessagePlaceholder = selectedIntent?.messagePlaceholder?.[locale];
  const topicOptions = useMemo(() => {
    const optionsMap = new Map<string, string>();
    allIntents.forEach((intent) => {
      const topicKey = intent.topicValue.trim();
      if (!topicKey || optionsMap.has(topicKey)) {
        return;
      }

      const label = intent.topicLabel?.[locale] ?? intent.title[locale];
      optionsMap.set(topicKey, label);
    });

    if (!optionsMap.has("other")) {
      optionsMap.set("other", getContactTopicLabel(locale, "other"));
    }

    return [...optionsMap.entries()].map(([value, label]) => ({ value, label }));
  }, [allIntents, locale]);
  const topicLabels = useMemo(
    () => Object.fromEntries(topicOptions.map((option) => [option.value, option.label])),
    [topicOptions],
  );

  return (
    <main className="section page--purple contact-page">
      <Container>
        <div className="contact-content">
          {/* Page title and subtitle update together with the selected topic. */}
          <div className="section-head">
            <h1 className="h2">
              {pageTitle}
            </h1>
            <p className="muted-on-dark">
              {pageLead}
            </p>
          </div>

          {/* Show the selected topic block when topic data is available. */}
          {selectedIntent ? (
            <ContactContextBlock
              className="contact-context"
              bullets={selectedIntent.bullets?.[locale]}
              fineprint={selectedIntent.fineprint?.[locale]}
              extraInfo={selectedIntent.extraInfo?.[locale]}
            />
          ) : null}

          {/* Contact card: contains only the form. */}
          <ContentCard className="contact-card contact-card--yellow contact-card--form" hoverable={false}>
            {/* Contact form: topic and placeholder adapt to the user's selection. */}
            <div className="contact-form-wrap">
              <QuickContactForm
                locale={locale}
                variant="page"
                initialTopic={initialTopicValue}
                messagePlaceholderOverride={intentMessagePlaceholder}
                messagePlaceholderTopic={selectedTopic}
                onTopicChange={handleTopicChange}
                topicOptions={topicOptions}
                resolveTopicLabel={(topicKey) => topicLabels[topicKey] ?? getContactTopicLabel(locale, topicKey)}
              />
            </div>
          </ContentCard>
        </div>
      </Container>
    </main>
  );
}
