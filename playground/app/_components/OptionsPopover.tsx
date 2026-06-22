"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import styles from "./OptionsPopover.module.css";

export type OptionItem = {
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
};

export interface OptionsPopoverProps {
  /** Trigger label. */
  label: string;
  /** Optional leading icon for the trigger. */
  icon?: ReactNode;
  options: OptionItem[];
}

const GAP = 8; // px below the trigger
const MARGIN = 8; // min viewport margin

// The first real Grund Pattern: a content-less options popover. A ghost Button
// trigger opens a floating panel of option rows. Portal + fixed positioning +
// dismiss-on-(scroll/Escape/outside) follow a hover-card's mechanics, adapted
// from hover to click + menu semantics (so touch works without a hover card's
// touch opt-out — a tap just opens it).
export function OptionsPopover({ label, icon, options }: OptionsPopoverProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Position the panel below the trigger, clamped into the viewport (flips above
  // when there isn't room below). Runs before paint and on every open.
  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;
    const t = trigger.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    let top = t.bottom + GAP;
    if (top + p.height > window.innerHeight - MARGIN) {
      const above = t.top - GAP - p.height;
      if (above >= MARGIN) top = above;
      else top = Math.max(MARGIN, window.innerHeight - MARGIN - p.height);
    }
    const left = Math.min(
      Math.max(MARGIN, t.left),
      Math.max(MARGIN, window.innerWidth - MARGIN - p.width)
    );
    setCoords({ top, left });
  }, [open]);

  // Move focus into the menu on open, restore it to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLButtonElement>(`.${styles.item}`);
    first?.focus();
    return () => triggerRef.current?.focus();
  }, [open]);

  // Dismiss on scroll, resize, Escape, and outside pointer — the hover-card
  // dismiss contract, minus the touch opt-out (this is click-driven).
  useEffect(() => {
    if (!open) return;
    const onScroll = () => close();
    const onResize = () => close();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      close();
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open, close]);

  // Roving focus between items with the arrow keys / Home / End.
  function onMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLButtonElement>(`.${styles.item}`) ?? []
    );
    if (!items.length) return;
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(i + 1) % items.length].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1].focus();
    }
  }

  function select(option: OptionItem) {
    option.onSelect?.();
    close();
  }

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        leadingIcon={icon}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </Button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            role="menu"
            aria-label={label}
            className={styles.panel}
            style={{ top: coords.top, left: coords.left }}
            onKeyDown={onMenuKeyDown}
          >
            {options.map((option) => (
              <button
                key={option.label}
                role="menuitem"
                type="button"
                className={styles.item}
                onClick={() => select(option)}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
