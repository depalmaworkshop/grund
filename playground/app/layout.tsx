import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grund Playground",
  description:
    "A development surface for the Grund design system — token gallery, components, and patterns.",
  // Development surface — keep it out of search engines entirely for now.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
