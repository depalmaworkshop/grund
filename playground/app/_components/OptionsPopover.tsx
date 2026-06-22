"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "./Button";
import { FloatingLayer } from "./FloatingLayer";
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

// The first Grund Pattern: a content-less options popover. A ghost Button trigger
// opens a floating menu of option rows. Portal + positioning + the hard dismissers
// come from FloatingLayer; this component owns the click trigger and the menu
// semantics (roles, focus-first/return, arrow-key roving focus).
export function OptionsPopover({ label, icon, options }: OptionsPopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Move focus into the menu on open, restore it to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLButtonElement>(`.${styles.item}`);
    first?.focus();
    return () => triggerRef.current?.focus();
  }, [open]);

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
      <FloatingLayer
        anchorRef={triggerRef}
        panelRef={panelRef}
        open={open}
        onDismiss={close}
        role="menu"
        aria-label={label}
        className={styles.panel}
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
      </FloatingLayer>
    </>
  );
}
