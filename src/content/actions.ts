// Barrel re-export: all content was split into dedicated modules.
// This file preserves backward compatibility for existing imports.

export { heroCopy, quickNavCopy, actionsPreviewCopy, historyCopy, instagramBadgeCopy, homeNavCards } from "@/content/homeCopy";
export type { HomeNavCard } from "@/content/homeCopy";

export { aideCopy, aideContactTopicKeys } from "@/content/aideCopy";
export type { AideLocale } from "@/content/aideCopy";

export { soutenirCopy, bankTransferCopy } from "@/content/soutenirCopy";

export { footerCopy, headerCopy, siteMetadata } from "@/content/layoutCopy";

export { privacyPageCopy, legalPageCopy } from "@/content/legalCopy";

export {
  actionsCopy,
  actionsPageCopy,
  contactCopy,
  contactTopicLabels,
  contactTopicSelectKeys,
  contactEmailBoxCopy,
  quickContactFormCopy,
  getContactTopicLabel,
  resolveContactTopicKey,
  actionContactTopicKeys,
  activityContactTopicKeys,
  supportContactTopicKeys,
} from "@/content/contactCopy";
export type { ActionsLocale, ActionDirection } from "@/content/contactCopy";
