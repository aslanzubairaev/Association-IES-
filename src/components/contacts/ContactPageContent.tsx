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

function resolveIntentIdFromRegistry(rawIntent: string | undefined, intentsById: Record<string, ContactIntent>) {
  const canonicalId = resolveContactIntentId(rawIntent);
  if (canonicalId && intentsById[canonicalId]) {
    return canonicalId;
  }

  if (!rawIntent) {
    return "";
  }

  const trimmed = rawIntent.trim();
  if (!trimmed) {
    return "";
  }

  const normalized = trimmed.toLowerCase();
  if (intentsById[normalized]) {
    return normalized;
  }

  if (intentsById[trimmed]) {
    return trimmed;
  }

  return "";
}

export function ContactPageContent({ locale, initialTopic, initialIntentId, sanityIntents }: ContactPageContentProps) {
  const searchParams = useSearchParams();
  // List of all known topics for quick lookup by key.
  const allIntents = useMemo(() => {
    const enabledSources = new Set((sanityIntents ?? []).map((intent) => intent.source));
    const merged = new Map<string, ContactIntent>();
    Object.values(contactIntents).forEach((intent) => {
      if (enabledSources.has(intent.source)) {
        return;
      }
      merged.set(intent.id, intent);
    });
    (sanityIntents ?? []).forEach((intent) => merged.set(intent.id, intent));
    return [...merged.values()];
  }, [sanityIntents]);
  const intentsById = useMemo(() => Object.fromEntries(allIntents.map((intent) => [intent.id, intent])), [allIntents]);
  const intentFromUrl = searchParams?.get("intent") ?? initialIntentId ?? undefined;
  const normalizedIntentId = resolveIntentIdFromRegistry(intentFromUrl, intentsById);
  const topicFromUrl = searchParams?.get("topic") ?? initialTopic ?? undefined;
  const intentFromId = normalizedIntentId ? intentsById[normalizedIntentId] : undefined;
  const normalizedInitialTopic = resolveContactTopicKey(topicFromUrl);
  const initialResolvedIntent = intentFromId ?? findIntentByTopic(allIntents, normalizedInitialTopic);
  const initialTopicValue = intentFromId?.topicValue ?? normalizedInitialTopic ?? "";

  // The currently selected topic is needed to update the heading and hints on selection.
  const [selectedTopic, setSelectedTopic] = useState(initialTopicValue);
  const [selectedIntent, setSelectedIntent] = useState<ContactIntent | undefined>(initialResolvedIntent);

  // When the URL changes, update the selected topic and its content.
  useEffect(() => {
    const nextIntent = intentFromId ?? findIntentByTopic(allIntents, normalizedInitialTopic);
    const nextTopic = intentFromId?.topicValue ?? normalizedInitialTopic ?? "";
    setSelectedTopic(nextTopic);
    setSelectedIntent(nextIntent);
  }, [allIntents, intentFromId, normalizedInitialTopic]);

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
