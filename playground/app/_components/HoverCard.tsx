"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { FloatingLayer } from "./FloatingLayer";
import styles from "./HoverCard.module.css";

const SHOW_DELAY = 120; // ms — matches the harvested hover-card timing
const HIDE_DELAY = 150; // ms — grace period to cross from trigger to card

export interface HoverCardProps {
  /** Inline trigger content (e.g. link text). */
  children: ReactNode;
  title: string;
  preview: string;
  href?: string;
}

// Grund Pattern: a link-preview hover card. Shares FloatingLayer with the options
// popover; the hover-specific behaviour lives here — show/hide delays, the grace
// period crossing from trigger to card, and a touch opt-out (a tap should navigate,
// not preview). Opens on focus too, for keyboard users.
export function HoverCard({ children, title, preview, href }: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    showTimer.current = null;
    hideTimer.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]); // clear on unmount

  const openSoon = (e: ReactPointerEvent) => {
    if (e.pointerType === "touch") return; // tap navigates, doesn't preview
    clearTimers();
    showTimer.current = setTimeout(() => setOpen(true), SHOW_DELAY);
  };
  const closeSoon = () => {
    clearTimers();
    hideTimer.current = setTimeout(() => setOpen(false), HIDE_DELAY);
  };
  const close = useCallback(() => {
    clearTimers();
    setOpen(false);
  }, [clearTimers]);

  return (
    <>
      <a
        ref={triggerRef}
        href={href}
        tabIndex={href ? undefined : 0}
        className={styles.trigger}
        onPointerEnter={openSoon}
        onPointerLeave={closeSoon}
        onFocus={() => setOpen(true)}
        onBlur={close}
      >
        {children}
      </a>
      <FloatingLayer
        anchorRef={triggerRef}
        open={open}
        onDismiss={close}
        dismiss={{ scroll: true, resize: true, escape: true, outside: false }}
        role="dialog"
        aria-label={title}
        className={styles.card}
        onPointerEnter={clearTimers}
        onPointerLeave={closeSoon}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.preview}>{preview}</span>
      </FloatingLayer>
    </>
  );
}
