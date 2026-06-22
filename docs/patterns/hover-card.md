---
title: Hover card
description: A link-preview card shown on hover or focus
status: draft
order: 7
created: 2026-06-22
updated: 2026-06-22
---

# Hover card

A **link-preview** pattern: hovering (or focusing) an inline link shows a small
floating card with a title and a muted preview line. Non-blocking — it never
traps focus or interaction, unlike a [modal](../components/modal.md).

It shares the `FloatingLayer` primitive with the
[options popover](./options-popover.md); only the trigger, timing, and content
differ.

## Anatomy

```
… built from design tokens that flow …
                  └─ trigger (dotted link)
                     │ hover / focus (120ms)
                     ▼
              ┌─────────────────────────┐
              │ Design tokens           │  ← title
              │ Named values that are   │  ← preview (muted)
              │ the single source of …  │
              └─────────────────────────┘
```

## Tokens consumed

Reuses the popover token set — and is the **first consumer of
`--gds-popover-text-muted`** (the preview line).

| Element | Tokens |
| --- | --- |
| Card | `--gds-popover-background`, `--gds-popover-border-color`, `--gds-popover-text-color`, `--gds-popover-radius`, `--gds-popover-padding`, `--gds-popover-shadow`, `--gds-font-popover-size` |
| Title | `--gds-font-popover-weight`, `--gds-popover-text-color` |
| Preview | `--gds-popover-text-muted` |
| Focus ring | `--gds-color-focus-ring` |

## Behaviour

- **Open** on pointer-enter after a short delay (~120ms), or immediately on
  keyboard focus.
- **Close** after a grace period (~150ms) on pointer-leave — the delay lets the
  pointer cross from the trigger into the card without dismissing it. Entering
  the card cancels the pending close.
- **Touch opt-out:** a tap navigates the link rather than previewing it.
- **Dismiss** also on `Escape`, scroll, and resize (shared with the options
  popover). Outside-click dismissal is off — hover/leave governs this pattern.

## Usage

```tsx
<HoverCard title="Design tokens" preview="Named values that are the single source of truth." href="/docs/tokens">
  design tokens
</HoverCard>
```

## Notes

- The shared `FloatingLayer` owns the portal, positioning (anchor + clamp +
  flip), and the scroll/resize/Escape/outside dismissers; the hover-specific
  timing and touch handling live in the pattern.
- Section-level composition (which links get a preview, where the content comes
  from) belongs to the consuming app.
