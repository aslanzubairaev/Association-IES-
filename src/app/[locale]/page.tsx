/*
 This file defines the landing page for the selected locale (/ru or /fr).
 It renders the hero section, quick navigation cards, and the association history section.
 Users can learn about the association and navigate to other sections via the cards.
*/

import { Hero } from "@/components/sections/Hero";
import { QuickNav } from "@/components/sections/QuickNav";
import { ActivitiesHomeSection } from "@/components/sections/activities/ActivitiesHomeSection";
import { HistorySection } from "@/components/sections/HistorySection";


// Locale landing page: new structure only, no legacy landing.
export default function LocalePage({ params }: { params: { locale: "ru" | "fr" } }) {
  const locale = params.locale;

  return (
    <main>
      <div className="page--purple">
        {/* Main set of sections for the locale landing page. */}
        <Hero locale={locale} />
        <QuickNav locale={locale} />
        <ActivitiesHomeSection locale={locale} />
        <HistorySection locale={locale} />
      </div>
    </main>
  );
}
