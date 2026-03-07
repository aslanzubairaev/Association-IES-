/*
 This file defines the contact page.
 It renders the heading, hint card, and the contact form.
 Users can fill in the fields and send a message to the association.
*/

import { ContactPageContent } from "@/components/contacts/ContactPageContent";
import { fetchSanityContactIntents } from "@/lib/contact-intents/sanitySource";
import styles from "./page.module.css";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: "ru" | "fr" };
  searchParams?: { topic?: string; intent?: string };
}) {
  const sanityIntents = await fetchSanityContactIntents();

  return (
    <div className={styles.contactScope}>
      {/* Contact page content is a client component to react to topic selection. */}
      <ContactPageContent
        locale={params.locale}
        initialTopic={searchParams?.topic}
        initialIntentId={searchParams?.intent}
        sanityIntents={sanityIntents ?? undefined}
      />
    </div>
  );
}
