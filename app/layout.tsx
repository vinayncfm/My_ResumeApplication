import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinay Bandi | Personal Profile",
  description:
    "Personal profile, projects, certifications and 90-day learning notebook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}