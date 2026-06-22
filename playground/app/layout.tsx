import type { Metadata } from "next";
import "./globals.css";
// Grund's generated CSS custom properties (--gds-*). Imported here so the real
// components (Button, OptionsPopover) can consume the tokens, not just the gallery.
import "@grund/tokens.css";

// Resolves the saved colour-scheme preference (light/dark, or auto → OS) and sets
// the [data-color-scheme] attribute before first paint, so there's no flash.
const SCHEME_INIT = `(function(){try{var p=localStorage.getItem('gds-scheme');var d=p==='dark'||((!p||p==='auto')&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-color-scheme',d?'dark':'light');}catch(e){}})();`;

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: SCHEME_INIT }} />
        {children}
      </body>
    </html>
  );
}
