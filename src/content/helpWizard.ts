import { aideCopy } from "@/content/actions";
import type { HelpLocale } from "@/lib/helpFlow/types";

export type HelpPrimaryOption = {
  id: string;
  label: string;
  examples: string[];
  prepareLine: string;
  documentChecklist: string[];
  resourceLinks: { label: string; url: string; phone?: string }[];
  estimatedTimeline: string;
};

type HelpWizardLocaleCopy = {
  pageTitle: string;
  pageSubtitle: string;
  stepLabel: (current: number, total: number) => string;
  followUpProgressLabel: (current: number, total: number) => string;
  continueLabel: string;
  backLabel: string;
  sendLabel: string;
  sendingLabel: string;
  doneTitle: string;
  doneText: string;
  choosePrimary: string;
  chooseDetail: string;
  cantFindLabel: string;
  freeTextPlaceholderPrimary: string;
  freeTextPlaceholderDetail: string;
  freeTextHint: string;
  aiProposedLabel: string;
  aiConfirmQuestion: string;
  aiConfirmYes: string;
  aiConfirmNo: string;
  yourDetailsTitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  docsTitle: string;
  docsHint: string;
  docsUploadLabel: string;
  docsAllowedLabel: string;
  docsLimitLabel: string;
  customFallbackLabel: string;
  requiredFieldText: string;
  invalidEmailText: string;
  noChoiceText: string;
  submitErrorText: string;
  classifyErrorText: string;
  nextQuestionErrorText: string;
  summaryTitle: string;
  summaryPrimary: string;
  summaryDetail: string;
  summaryFollowUps: string;
  analyzingText: string;
  preparingText: string;
  resumeTitle: string;
  resumeYes: string;
  resumeNo: string;
  responseTimeText: string;
  newRequestLabel: string;
  dropZoneText: string;
  dropZoneClickText: string;
  fileTooLargeText: string;
  fileWrongTypeText: string;
  documentsLabel: string;
  filesCountLabel: (count: number) => string;
  guidanceTitle: string;
  guidanceSubtitle: string;
  urgencyHighLabel: string;
  urgencyMediumLabel: string;
  prepareForLabel: string;
  usefulLinksLabel: string;
  nextStepsLabel: string;
  timelineLabel: string;
  docChecklistTitle: string;
  actionPlanTitle: string;
};

export const helpWizardCopy: Record<HelpLocale, HelpWizardLocaleCopy> = {
  fr: {
    pageTitle: "Aide pas \u00e0 pas",
    pageSubtitle:
      "On avance ensemble, question par question. Choisissez une bulle ou \u00e9crivez simplement votre situation.",
    stepLabel: (current, total) => `\u00c9tape ${current} sur ${total}`,
    followUpProgressLabel: (current, total) => `Question ${current} sur ${total}`,
    continueLabel: "Continuer",
    backLabel: "Retour",
    sendLabel: "Envoyer ma demande",
    sendingLabel: "Envoi en cours...",
    doneTitle: "Votre demande est envoy\u00e9e",
    doneText: "Merci. Nous avons bien re\u00e7u vos informations et vos documents.",
    choosePrimary: "Quel est votre probl\u00e8me principal\u00a0?",
    chooseDetail: "Quelle pr\u00e9cision correspond le mieux\u00a0?",
    cantFindLabel: "Je ne trouve pas ma situation",
    freeTextPlaceholderPrimary: "Expliquez en une phrase ce qui vous bloque.",
    freeTextPlaceholderDetail: "Ajoutez une pr\u00e9cision utile (optionnel).",
    freeTextHint: "Pas besoin d\u2019\u00e9crire parfaitement. Quelques mots suffisent.",
    aiProposedLabel: "Proposition",
    aiConfirmQuestion: "Est-ce que cette bulle vous correspond\u00a0?",
    aiConfirmYes: "Oui, c\u2019est \u00e7a",
    aiConfirmNo: "Non, je garde mon texte",
    yourDetailsTitle: "Vos informations de contact",
    fullNameLabel: "Nom et pr\u00e9nom",
    fullNamePlaceholder: "Ex: Amina Idriss",
    emailLabel: "Email",
    emailPlaceholder: "Ex: nom@email.com",
    phoneLabel: "T\u00e9l\u00e9phone (optionnel)",
    phonePlaceholder: "Ex: +33 ...",
    messageLabel: "Message compl\u00e9mentaire (optionnel)",
    messagePlaceholder: "Indiquez ce que vous avez d\u00e9j\u00e0 fait ou ce que vous attendez.",
    docsTitle: "Documents \u00e0 transmettre",
    docsHint: "Ajoutez vos documents pour acc\u00e9l\u00e9rer le traitement.",
    docsUploadLabel: "Choisir des documents",
    docsAllowedLabel: "PDF, JPG, PNG, WEBP, HEIC",
    docsLimitLabel: "Max 5 fichiers \u00b7 7\u00a0MB/fichier \u00b7 20\u00a0MB total",
    customFallbackLabel: "Autre sujet",
    requiredFieldText: "Ce champ est obligatoire.",
    invalidEmailText: "Veuillez saisir un email valide.",
    noChoiceText: "Choisissez une bulle ou \u00e9crivez votre situation.",
    submitErrorText: "Impossible d\u2019envoyer pour le moment. R\u00e9essayez.",
    classifyErrorText: "Impossible de proposer une bulle automatiquement. Continuez avec votre texte.",
    nextQuestionErrorText: "Impossible de charger la question suivante. Nous gardons votre r\u00e9ponse.",
    summaryTitle: "R\u00e9sum\u00e9 avant envoi",
    summaryPrimary: "Sujet principal",
    summaryDetail: "Pr\u00e9cision",
    summaryFollowUps: "R\u00e9ponses de suivi",
    analyzingText: "Analyse de votre situation\u2026",
    preparingText: "Pr\u00e9paration de la question suivante\u2026",
    resumeTitle: "Vous avez une demande en cours. Reprendre\u00a0?",
    resumeYes: "Reprendre",
    resumeNo: "Recommencer",
    responseTimeText: "Nous vous r\u00e9pondrons sous 48\u00a0h par e-mail.",
    newRequestLabel: "Nouvelle demande",
    dropZoneText: "Glissez vos fichiers ici",
    dropZoneClickText: "ou cliquez pour s\u00e9lectionner",
    fileTooLargeText: "Trop volumineux (max 7\u00a0MB)",
    fileWrongTypeText: "Format non support\u00e9",
    documentsLabel: "Documents",
    filesCountLabel: (count) => `${count} fichier${count > 1 ? "s" : ""}`,
    guidanceTitle: "Nos conseils pour votre situation",
    guidanceSubtitle: "Voici ce que vous pouvez faire d\u00e8s maintenant, avant m\u00eame notre r\u00e9ponse.",
    urgencyHighLabel: "Situation urgente",
    urgencyMediumLabel: "Attention requise",
    prepareForLabel: "\u00c0 pr\u00e9parer",
    usefulLinksLabel: "Liens utiles",
    nextStepsLabel: "Vos prochaines \u00e9tapes",
    timelineLabel: "D\u00e9lai estim\u00e9",
    docChecklistTitle: "Documents recommand\u00e9s",
    actionPlanTitle: "Votre plan d\u2019action",
  },
  ru: {
    pageTitle: "\u041f\u043e\u043c\u043e\u0449\u044c \u0448\u0430\u0433 \u0437\u0430 \u0448\u0430\u0433\u043e\u043c",
    pageSubtitle:
      "\u0414\u0432\u0438\u0433\u0430\u0435\u043c\u0441\u044f \u0432\u043c\u0435\u0441\u0442\u0435, \u043f\u043e \u043e\u0434\u043d\u043e\u043c\u0443 \u0432\u043e\u043f\u0440\u043e\u0441\u0443. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0443\u0437\u044b\u0440\u044c \u0438\u043b\u0438 \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0438\u0448\u0438\u0442\u0435 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044e.",
    stepLabel: (current, total) => `\u0428\u0430\u0433 ${current} \u0438\u0437 ${total}`,
    followUpProgressLabel: (current, total) => `\u0412\u043e\u043f\u0440\u043e\u0441 ${current} \u0438\u0437 ${total}`,
    continueLabel: "\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c",
    backLabel: "\u041d\u0430\u0437\u0430\u0434",
    sendLabel: "\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441",
    sendingLabel: "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c...",
    doneTitle: "\u0412\u0430\u0448 \u0437\u0430\u043f\u0440\u043e\u0441 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d",
    doneText: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e. \u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0432\u0430\u0448\u0443 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u0438 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b.",
    choosePrimary: "\u041a\u0430\u043a\u0430\u044f \u043e\u0441\u043d\u043e\u0432\u043d\u0430\u044f \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u0443 \u0432\u0430\u0441 \u0441\u0435\u0439\u0447\u0430\u0441?",
    chooseDetail: "\u0427\u0442\u043e \u043b\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043e \u0443\u0442\u043e\u0447\u043d\u044f\u0435\u0442 \u0432\u0430\u0448 \u0437\u0430\u043f\u0440\u043e\u0441?",
    cantFindLabel: "\u041d\u0435 \u043d\u0430\u0445\u043e\u0436\u0443 \u043f\u043e\u0434\u0445\u043e\u0434\u044f\u0449\u0438\u0439 \u0432\u0430\u0440\u0438\u0430\u043d\u0442",
    freeTextPlaceholderPrimary: "\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u043a\u043e\u0440\u043e\u0442\u043a\u043e, \u0447\u0442\u043e \u0438\u043c\u0435\u043d\u043d\u043e \u043d\u0435 \u043f\u043e\u043b\u0443\u0447\u0430\u0435\u0442\u0441\u044f.",
    freeTextPlaceholderDetail: "\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0443\u0442\u043e\u0447\u043d\u0435\u043d\u0438\u0435 (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e).",
    freeTextHint: "\u041d\u0435 \u043d\u0443\u0436\u043d\u043e \u043f\u0438\u0441\u0430\u0442\u044c \u0438\u0434\u0435\u0430\u043b\u044c\u043d\u043e. \u0414\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u043f\u0430\u0440\u044b \u0441\u043b\u043e\u0432.",
    aiProposedLabel: "\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435",
    aiConfirmQuestion: "\u042d\u0442\u0430 \u0442\u0435\u043c\u0430 \u0432\u0430\u043c \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442?",
    aiConfirmYes: "\u0414\u0430, \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442",
    aiConfirmNo: "\u041d\u0435\u0442, \u043e\u0441\u0442\u0430\u0432\u043b\u044e \u0441\u0432\u043e\u0439 \u0442\u0435\u043a\u0441\u0442",
    yourDetailsTitle: "\u0412\u0430\u0448\u0438 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435",
    fullNameLabel: "\u0418\u043c\u044f \u0438 \u0444\u0430\u043c\u0438\u043b\u0438\u044f",
    fullNamePlaceholder: "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: \u0410\u043c\u0438\u043d\u0430 \u0418\u0434\u0440\u0438\u0441\u0441",
    emailLabel: "Email",
    emailPlaceholder: "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: name@email.com",
    phoneLabel: "\u0422\u0435\u043b\u0435\u0444\u043e\u043d (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    phonePlaceholder: "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: +33 ...",
    messageLabel: "\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    messagePlaceholder: "\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435, \u0447\u0442\u043e \u0443\u0436\u0435 \u043f\u0440\u043e\u0431\u043e\u0432\u0430\u043b\u0438 \u0438 \u043a\u0430\u043a\u0443\u044e \u043f\u043e\u043c\u043e\u0449\u044c \u0436\u0434\u0451\u0442\u0435.",
    docsTitle: "\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b \u0434\u043b\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438",
    docsHint: "\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b, \u0447\u0442\u043e\u0431\u044b \u043c\u044b \u0431\u044b\u0441\u0442\u0440\u0435\u0435 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u043b\u0438 \u0437\u0430\u043f\u0440\u043e\u0441.",
    docsUploadLabel: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b",
    docsAllowedLabel: "PDF, JPG, PNG, WEBP, HEIC",
    docsLimitLabel: "\u041c\u0430\u043a\u0441 5 \u0444\u0430\u0439\u043b\u043e\u0432 \u00b7 7\u00a0MB \u043d\u0430 \u0444\u0430\u0439\u043b \u00b7 20\u00a0MB \u0432\u0441\u0435\u0433\u043e",
    customFallbackLabel: "\u0414\u0440\u0443\u0433\u0430\u044f \u0442\u0435\u043c\u0430",
    requiredFieldText: "\u042d\u0442\u043e \u043f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e.",
    invalidEmailText: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 email.",
    noChoiceText: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0435\u043c\u0443 \u0438\u043b\u0438 \u043e\u043f\u0438\u0448\u0438\u0442\u0435 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044e \u0442\u0435\u043a\u0441\u0442\u043e\u043c.",
    submitErrorText: "\u0421\u0435\u0439\u0447\u0430\u0441 \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.",
    classifyErrorText: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0438\u0442\u044c \u0442\u0435\u043c\u0443. \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0439\u0442\u0435 \u0441 \u0432\u0430\u0448\u0438\u043c \u0442\u0435\u043a\u0441\u0442\u043e\u043c.",
    nextQuestionErrorText: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0432\u043e\u043f\u0440\u043e\u0441. \u041e\u0442\u0432\u0435\u0442 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d.",
    summaryTitle: "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043f\u0435\u0440\u0435\u0434 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u043e\u0439",
    summaryPrimary: "\u041e\u0441\u043d\u043e\u0432\u043d\u0430\u044f \u0442\u0435\u043c\u0430",
    summaryDetail: "\u0423\u0442\u043e\u0447\u043d\u0435\u043d\u0438\u0435",
    summaryFollowUps: "\u0423\u0442\u043e\u0447\u043d\u044f\u044e\u0449\u0438\u0435 \u043e\u0442\u0432\u0435\u0442\u044b",
    analyzingText: "\u0410\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u0443\u0435\u043c \u0432\u0430\u0448\u0443 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044e\u2026",
    preparingText: "\u041f\u043e\u0434\u0433\u043e\u0442\u0430\u0432\u043b\u0438\u0432\u0430\u0435\u043c \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0432\u043e\u043f\u0440\u043e\u0441\u2026",
    resumeTitle: "\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044c \u043d\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043d\u043d\u044b\u0439 \u0437\u0430\u043f\u0440\u043e\u0441. \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c?",
    resumeYes: "\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c",
    resumeNo: "\u041d\u0430\u0447\u0430\u0442\u044c \u0437\u0430\u043d\u043e\u0432\u043e",
    responseTimeText: "\u041c\u044b \u043e\u0442\u0432\u0435\u0442\u0438\u043c \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 48\u00a0\u0447\u0430\u0441\u043e\u0432 \u043f\u043e e-mail.",
    newRequestLabel: "\u041d\u043e\u0432\u044b\u0439 \u0437\u0430\u043f\u0440\u043e\u0441",
    dropZoneText: "\u041f\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043b\u044b \u0441\u044e\u0434\u0430",
    dropZoneClickText: "\u0438\u043b\u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u0434\u043b\u044f \u0432\u044b\u0431\u043e\u0440\u0430",
    fileTooLargeText: "\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439 (\u043c\u0430\u043a\u0441 7\u00a0MB)",
    fileWrongTypeText: "\u0424\u043e\u0440\u043c\u0430\u0442 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f",
    documentsLabel: "\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b",
    filesCountLabel: (count) => `${count} \u0444\u0430\u0439\u043b${count === 1 ? "" : count < 5 ? "\u0430" : "\u043e\u0432"}`,
    guidanceTitle: "\u041d\u0430\u0448\u0438 \u0441\u043e\u0432\u0435\u0442\u044b \u043f\u043e \u0432\u0430\u0448\u0435\u0439 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438",
    guidanceSubtitle: "\u0412\u043e\u0442 \u0447\u0442\u043e \u043c\u043e\u0436\u043d\u043e \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u043f\u0440\u044f\u043c\u043e \u0441\u0435\u0439\u0447\u0430\u0441, \u0435\u0449\u0451 \u0434\u043e \u043d\u0430\u0448\u0435\u0433\u043e \u043e\u0442\u0432\u0435\u0442\u0430.",
    urgencyHighLabel: "\u0421\u0440\u043e\u0447\u043d\u0430\u044f \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044f",
    urgencyMediumLabel: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442 \u0432\u043d\u0438\u043c\u0430\u043d\u0438\u044f",
    prepareForLabel: "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u044c\u0442\u0435",
    usefulLinksLabel: "\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",
    nextStepsLabel: "\u0412\u0430\u0448\u0438 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435 \u0448\u0430\u0433\u0438",
    timelineLabel: "\u041e\u0440\u0438\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u043e\u0447\u043d\u044b\u0439 \u0441\u0440\u043e\u043a",
    docChecklistTitle: "\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c\u044b\u0435 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b",
    actionPlanTitle: "\u0412\u0430\u0448 \u043f\u043b\u0430\u043d \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439",
  },
};

export function getHelpPrimaryOptions(locale: HelpLocale): HelpPrimaryOption[] {
  return aideCopy[locale].topics.items.map((item) => ({
    id: item.topicKey,
    label: item.title,
    examples: item.examples,
    prepareLine: item.prepareLine,
    documentChecklist: item.documentChecklist,
    resourceLinks: item.resourceLinks,
    estimatedTimeline: item.estimatedTimeline,
  }));
}
