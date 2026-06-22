"use client";

import { useState } from "react";
import { OptionsPopover } from "./OptionsPopover";

// Exercises the options-popover Pattern as a Share menu.
export function OptionsPopoverDemo() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <OptionsPopover
        label="Share"
        icon={<ShareIcon />}
        options={[
          { label: "Copy link", onSelect: () => setLast("Copy link") },
          { label: "Email", onSelect: () => setLast("Email") },
          { label: "Embed", onSelect: () => setLast("Embed") },
        ]}
      />
      <span className="text-[13px] text-muted">
        {last ? `Selected: ${last}` : "Open the popover and pick an option"}
      </span>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
