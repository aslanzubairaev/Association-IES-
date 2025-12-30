export type WebmailComposeParams = {
  to: string;
  subject?: string;
  body?: string;
};

export type WebmailProvider = "gmail" | "outlook";

export function buildGmailComposeUrl({ to, subject = "", body = "" }: WebmailComposeParams) {
  return (
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

export function buildOutlookComposeUrl({ to, subject = "", body = "" }: WebmailComposeParams) {
  return (
    "https://outlook.office.com/mail/deeplink/compose" +
    `?to=${encodeURIComponent(to)}` +
    `&subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

export function openWebmailCompose({
  to,
  subject = "",
  body = "",
  provider = "gmail",
}: WebmailComposeParams & { provider?: WebmailProvider }) {
  if (typeof window === "undefined") return false;
  const url =
    provider === "outlook"
      ? buildOutlookComposeUrl({ to, subject, body })
      : buildGmailComposeUrl({ to, subject, body });
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  return Boolean(opened);
}
