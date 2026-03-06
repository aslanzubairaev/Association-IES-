/*
 This file defines the site root page.
 It does not render its own content but immediately redirects the user to the locale-prefixed version.
 Currently it redirects to the French version by default (/fr).
*/

import { redirect } from "next/navigation";

// On visiting / we immediately redirect to the locale-prefixed path.
export default function Home() {
  redirect("/fr");
}
