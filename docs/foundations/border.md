---
title: Border
description: Border widths, styles, and radii
status: draft
order: 8
token_prefix: gds-border
created: 2026-01-21T14:00
updated: 2026-01-21T13:25
---
# Border

Border properties for consistent visual definition.

## Border Width

| Token | Value | Use Case |
|-------|-------|----------|
| none | 0 | No border |
| thin | 1px | Default borders |
| medium | 2px | Emphasized borders |
| thick | 4px | Strong emphasis |

## Border Radius

See existing radius tokens in tokens.ts.

| Token | Value | Use Case |
|-------|-------|----------|
| none | 0 | Sharp corners |
| sm | 4px | Subtle rounding |
| md | 8px | Default (buttons, inputs) |
| lg | 12px | Cards, modals |
| xl | 16px | Large containers |
| full | 9999px | Pills, circles |

> [!TODO]
> - [ ] Add border-width tokens to tokens.ts
> - [ ] Document focus ring specifications
> - [ ] Add divider patterns
> - [ ] Document accessibility (focus visible)
