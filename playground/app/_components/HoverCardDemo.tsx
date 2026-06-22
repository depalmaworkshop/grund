"use client";

import { HoverCard } from "./HoverCard";

// Exercises the hover-card Pattern: inline links that preview on hover/focus.
export function HoverCardDemo() {
  return (
    <p className="max-w-prose text-sm leading-7">
      Grund is built from{" "}
      <HoverCard
        title="Design tokens"
        preview="Named values — colour, spacing, type — that are the single source of truth the components consume."
      >
        design tokens
      </HoverCard>{" "}
      that flow into{" "}
      <HoverCard
        title="Components"
        preview="Reusable React pieces, like Button, styled entirely from the --gds-* tokens."
      >
        components
      </HoverCard>{" "}
      and{" "}
      <HoverCard
        title="Patterns"
        preview="Content-less compositions — the options popover and this hover card — built on a shared FloatingLayer primitive."
      >
        patterns
      </HoverCard>
      . Hover or focus a dotted link to preview it.
    </p>
  );
}
