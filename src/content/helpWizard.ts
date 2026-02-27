import { aideCopy } from "@/content/actions";
import type { HelpLocale } from "@/lib/helpFlow/types";

export type HelpPrimaryOption = {
  id: string;
  label: string;
  examples: string[];
  prepareLine: string;
};

type HelpWizardLocaleCopy = {
  pageTitle: string;
  pageSubtitle: string;
  stepLabel: (current: number, total: number) => string;
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
  summaryTitle: string;
  summaryPrimary: string;
  summaryDetail: string;
};

export const helpWizardCopy: Record<HelpLocale, HelpWizardLocaleCopy> = {
  fr: {
    pageTitle: "Aide pas à pas",
    pageSubtitle:
      "On avance ensemble, question par question. Choisissez une bulle ou écrivez simplement votre situation.",
    stepLabel: (current, total) => `Étape ${current} sur ${total}`,
    continueLabel: "Continuer",
    backLabel: "Retour",
    sendLabel: "Envoyer ma demande",
    sendingLabel: "Envoi en cours...",
    doneTitle: "Votre demande est envoyée",
    doneText: "Merci. Nous avons bien reçu vos informations et vos documents.",
    choosePrimary: "Quel est votre problème principal ?",
    chooseDetail: "Quelle précision correspond le mieux ?",
    cantFindLabel: "Je ne trouve pas ma situation",
    freeTextPlaceholderPrimary: "Expliquez en une phrase ce qui vous bloque.",
    freeTextPlaceholderDetail: "Ajoutez une précision utile (optionnel).",
    freeTextHint: "Pas besoin d'écrire parfaitement. Quelques mots suffisent.",
    aiProposedLabel: "Proposition",
    aiConfirmQuestion: "Est-ce que cette bulle vous correspond ?",
    aiConfirmYes: "Oui, c'est ça",
    aiConfirmNo: "Non, je garde mon texte",
    yourDetailsTitle: "Vos informations de contact",
    fullNameLabel: "Nom et prénom",
    fullNamePlaceholder: "Ex: Amina Idriss",
    emailLabel: "Email",
    emailPlaceholder: "Ex: nom@email.com",
    phoneLabel: "Téléphone (optionnel)",
    phonePlaceholder: "Ex: +33 ...",
    messageLabel: "Message complémentaire (optionnel)",
    messagePlaceholder: "Indiquez ce que vous avez déjà fait ou ce que vous attendez.",
    docsTitle: "Documents à transmettre",
    docsHint: "Ajoutez vos documents pour accélérer le traitement.",
    docsUploadLabel: "Choisir des documents",
    docsAllowedLabel: "Formats: PDF, JPG, PNG, WEBP, HEIC",
    docsLimitLabel: "Max 5 fichiers, 7 MB/fichier, 20 MB total",
    customFallbackLabel: "Autre sujet",
    requiredFieldText: "Ce champ est obligatoire.",
    invalidEmailText: "Veuillez saisir un email valide.",
    noChoiceText: "Choisissez une bulle ou écrivez votre situation.",
    submitErrorText: "Impossible d'envoyer pour le moment. Réessayez.",
    classifyErrorText: "Impossible de proposer une bulle automatiquement. Continuez avec votre texte.",
    summaryTitle: "Résumé avant envoi",
    summaryPrimary: "Sujet principal",
    summaryDetail: "Précision",
  },
  ru: {
    pageTitle: "Помощь шаг за шагом",
    pageSubtitle:
      "Двигаемся вместе, по одному вопросу. Выберите пузырь или просто опишите ситуацию.",
    stepLabel: (current, total) => `Шаг ${current} из ${total}`,
    continueLabel: "Продолжить",
    backLabel: "Назад",
    sendLabel: "Отправить запрос",
    sendingLabel: "Отправляем...",
    doneTitle: "Ваш запрос отправлен",
    doneText: "Спасибо. Мы получили вашу информацию и документы.",
    choosePrimary: "Какая основная проблема у вас сейчас?",
    chooseDetail: "Что лучше всего уточняет ваш запрос?",
    cantFindLabel: "Не нахожу подходящий вариант",
    freeTextPlaceholderPrimary: "Опишите коротко, что именно не получается.",
    freeTextPlaceholderDetail: "Добавьте уточнение (необязательно).",
    freeTextHint: "Не нужно писать идеально. Достаточно пары слов.",
    aiProposedLabel: "Предложение",
    aiConfirmQuestion: "Эта тема вам подходит?",
    aiConfirmYes: "Да, подходит",
    aiConfirmNo: "Нет, оставлю свой текст",
    yourDetailsTitle: "Ваши контактные данные",
    fullNameLabel: "Имя и фамилия",
    fullNamePlaceholder: "Например: Амина Идрисс",
    emailLabel: "Email",
    emailPlaceholder: "Например: name@email.com",
    phoneLabel: "Телефон (необязательно)",
    phonePlaceholder: "Например: +33 ...",
    messageLabel: "Дополнительное сообщение (необязательно)",
    messagePlaceholder: "Напишите, что уже пробовали и какую помощь ждёте.",
    docsTitle: "Документы для отправки",
    docsHint: "Добавьте документы, чтобы мы быстрее обработали запрос.",
    docsUploadLabel: "Выбрать документы",
    docsAllowedLabel: "Форматы: PDF, JPG, PNG, WEBP, HEIC",
    docsLimitLabel: "Макс 5 файлов, 7 MB на файл, 20 MB всего",
    customFallbackLabel: "Другая тема",
    requiredFieldText: "Это поле обязательно.",
    invalidEmailText: "Введите корректный email.",
    noChoiceText: "Выберите тему или опишите ситуацию текстом.",
    submitErrorText: "Сейчас не удалось отправить. Попробуйте ещё раз.",
    classifyErrorText: "Не удалось автоматически предложить тему. Продолжайте с вашим текстом.",
    summaryTitle: "Проверка перед отправкой",
    summaryPrimary: "Основная тема",
    summaryDetail: "Уточнение",
  },
};

export function getHelpPrimaryOptions(locale: HelpLocale): HelpPrimaryOption[] {
  return aideCopy[locale].topics.items.map((item) => ({
    id: item.topicKey,
    label: item.title,
    examples: item.examples,
    prepareLine: item.prepareLine,
  }));
}

