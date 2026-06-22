import type { ReactNode } from "react";
import { Button } from "./Button";

// Live render of the Button component in both variants and states — the
// interactive counterpart to the button component tokens in the gallery.
export function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-5">
      <Row label="Primary">
        <Button variant="primary">Add to cart</Button>
        <Button variant="primary" trailingIcon={<ArrowIcon />}>
          Continue
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </Row>
      <Row label="Ghost">
        <Button variant="ghost">Cancel</Button>
        <Button variant="ghost" disabled>
          Disabled
        </Button>
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-16 shrink-0 text-[12px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {children}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
