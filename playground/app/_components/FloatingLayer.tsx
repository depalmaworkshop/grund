"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

// Shared machinery behind Grund's floating patterns (options-popover, hover-card):
// a portal-rendered panel, anchored below a trigger and clamped into the viewport
// (flips above when there's no room), plus the "hard" dismissers. What it does NOT
// own — triggers, focus management, hover delays, content — stays per-pattern.
type DismissConfig = {
  scroll?: boolean;
  resize?: boolean;
  escape?: boolean;
  outside?: boolean;
};

const DEFAULT_DISMISS: Required<DismissConfig> = {
  scroll: true,
  resize: true,
  escape: true,
  outside: true,
};

const Z_INDEX = 5000; // popover layer (matches the popover z-index token)

export interface FloatingLayerProps extends HTMLAttributes<HTMLDivElement> {
  /** Element the panel anchors to. */
  anchorRef: RefObject<HTMLElement | null>;
  /** Panel ref, shared so the consumer can manage focus inside it. */
  panelRef?: RefObject<HTMLDivElement | null>;
  open: boolean;
  onDismiss: () => void;
  /** px below the anchor. */
  gap?: number;
  /** min viewport margin when clamping. */
  margin?: number;
  dismiss?: DismissConfig;
  children: ReactNode;
}

export function FloatingLayer({
  anchorRef,
  panelRef,
  open,
  onDismiss,
  gap = 8,
  margin = 8,
  dismiss,
  children,
  style,
  ...rest
}: FloatingLayerProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = panelRef ?? internalRef;
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Anchor below the trigger, clamp into the viewport, flip above when needed.
  useLayoutEffect(() => {
    if (!open) return;
    const anchor = anchorRef.current;
    const panel = ref.current;
    if (!anchor || !panel) return;
    const a = anchor.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    let top = a.bottom + gap;
    if (top + p.height > window.innerHeight - margin) {
      const above = a.top - gap - p.height;
      top = above >= margin ? above : Math.max(margin, window.innerHeight - margin - p.height);
    }
    const left = Math.min(
      Math.max(margin, a.left),
      Math.max(margin, window.innerWidth - margin - p.width)
    );
    setCoords({ top, left });
  }, [open, gap, margin, anchorRef, ref]);

  // Hard dismissers (each toggleable). Hover/click open-state lives in the consumer.
  useEffect(() => {
    if (!open) return;
    const cfg = { ...DEFAULT_DISMISS, ...dismiss };
    const onScroll = () => onDismiss();
    const onResize = () => onDismiss();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target) || anchorRef.current?.contains(target)) return;
      onDismiss();
    };
    if (cfg.scroll) window.addEventListener("scroll", onScroll, true);
    if (cfg.resize) window.addEventListener("resize", onResize);
    if (cfg.escape) document.addEventListener("keydown", onKey);
    if (cfg.outside) document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open, dismiss, onDismiss, anchorRef, ref]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={ref}
      style={{ position: "fixed", top: coords.top, left: coords.left, zIndex: Z_INDEX, ...style }}
      {...rest}
    >
      {children}
    </div>,
    document.body
  );
}
