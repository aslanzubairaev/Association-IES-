import { activityType } from "./documents/activityType";
import { contactIntentType } from "./documents/contactIntentType";
import { localeImage } from "./objects/localeImage";
import { localeString } from "./objects/localeString";
import { localeStringArray } from "./objects/localeStringArray";

export const schemaTypes = [
  localeString,
  localeStringArray,
  localeImage,
  contactIntentType,
  activityType,
];
