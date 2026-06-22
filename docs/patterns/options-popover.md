---
title: Options popover
description: A trigger button that opens a floating, dismissable menu of option rows
status: draft
order: 6
created: 2026-06-22
updated: 2026-06-22
---

# Options popover

The first real Grund pattern: a **content-less** composition. A trigger
[Button](../components/button.md) (ghost variant) opens a floating panel of
option rows — used, for example, as a **Share** menu (Copy link / Email / Embed).

It is deliberately generic: the pattern owns the trigger, positioning, and
dismiss behaviour; the consumer supplies the label and the list of options.

## Anatomy

```
┌─ trigger (ghost Button) ─┐
│  ⌗ Share              ▾  │
└──────────────────────────┘
        │ click
        ▼
   ┌──────────────────┐   ← floating panel (portal, position: fixed)
   │  Copy link       │   ← option row (menuitem)
   │  Email           │
   │  Embed           │
   └──────────────────┘
```

- **Trigger** — a ghost Button with `aria-haspopup="menu"` and `aria-expanded`.
- **Panel** — rendered in a portal on `document.body`, `position: fixed`,
  anchored below the trigger (`+8px`), clamped into the viewport (flips above
  when there is no room below).
- **Option rows** — `role="menuitem"` buttons; selecting one fires its handler
  and closes the panel.

## Tokens consumed

All visual values come from Grund's `--gds-*` custom properties — no hard-coded
colours or spacing.

| Element | Tokens |
| --- | --- |
| Panel | `--gds-popover-background`, `--gds-popover-border-color`, `--gds-popover-text-color`, `--gds-popover-radius`, `--gds-popover-padding`, `--gds-popover-shadow`, `--gds-space-popover-gap`, `--gds-font-popover-size` |
| Option row | `--gds-popover-item-padding-x`, `--gds-popover-item-padding-y`, `--gds-popover-item-radius`, `--gds-popover-item-hover-bg`, `--gds-font-popover-weight` |
| Focus ring | `--gds-color-focus-ring` |

Colour tokens are currently **candidate** maturity (harvested from the live
sites, under review); the structural values (radius, spacing, type) are **set**.
Light and dark are handled entirely by the tokens — the pattern carries no
scheme logic.

## Behaviour

The dismiss contract is lifted from the source hover-card mechanics, adapted
from hover to **click + menu** semantics:

- **Toggle** on trigger click.
- **Dismiss** on: outside pointer-down, `Escape`, window scroll, window resize.
- **Focus** moves to the first option on open and returns to the trigger on
  close. Arrow keys / `Home` / `End` move a roving focus between options.
- **Touch** works directly (a tap opens it) — there is no touch opt-out, because
  unlike a hover card the menu is click-driven.

## Usage

```tsx
<OptionsPopover
  label="Share"
  icon={<ShareIcon />}
  options={[
    { label: "Copy link", onSelect: copyLink },
    { label: "Email", onSelect: emailLink },
    { label: "Embed", onSelect: openEmbed },
  ]}
/>
```

The pattern is exercised live in the playground (Patterns section).

## Notes / future

- Section-level wrappers (a real Share section with its own content) belong to
  the consuming app, not Grund — this pattern stays content-less.
- A richer popover with a title + muted preview line would use
  `--gds-popover-text-muted` (defined, not yet exercised here).
