import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Association IES",
  description: "Association IES",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
