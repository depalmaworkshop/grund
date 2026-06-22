"use client";

import { useEffect, useState } from "react";

// Light / dark / auto switch for reviewing both colour schemes.
//
// The single source of truth is the [data-color-scheme] attribute on <html>,
// which Tailwind's dark: variant, Grund's tokens.css, and the playground chrome
// all key off. The user's *preference* (including "auto") is stored separately;
// "auto" is resolved to a concrete light/dark attribute value here (and kept in
// sync with the OS while auto is active). An inline script in the layout applies
// the same resolution before first paint, so there's no flash.
type Scheme = "light" | "dark" | "auto";
const OPTIONS: { value: Scheme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];
const KEY = "gds-scheme";

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const resolve = (pref: Scheme): "light" | "dark" =>
  pref === "auto" ? (prefersDark() ? "dark" : "light") : pref;

const applyAttribute = (pref: Scheme) =>
  document.documentElement.setAttribute("data-color-scheme", resolve(pref));

export function SchemeToggle() {
  const [pref, setPref] = useState<Scheme>("auto");

  // Sync the highlighted option from storage after mount (server + first client
  // render are both "auto"; the pre-paint script has already set the attribute).
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    setPref(saved === "light" || saved === "dark" ? saved : "auto");
  }, []);

  // While on "auto", follow live OS changes.
  useEffect(() => {
    if (pref !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyAttribute("auto");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  function choose(next: Scheme) {
    setPref(next);
    if (next === "auto") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
    applyAttribute(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Colour scheme"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-surface/80 p-0.5 text-[12px] font-medium"
    >
      {OPTIONS.map((o) => {
        const active = pref === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => choose(o.value)}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
