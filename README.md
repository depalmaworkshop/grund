# Grund

DePalma Workshop's design system.

## About

Grund (Swedish for "foundation") provides design tokens, component specifications, and patterns for DePalma Workshop applications.

## Status

🚧 **In Development** - Not yet published

## Structure

```
grund/
├── src/
│   └── tokens.ts      # Design tokens (source of truth)
└── docs/
    ├── getting-started/
    ├── foundations/   # spacing, color, typography, breakpoints, motion, etc.
    ├── components/    # button, select, text-input, modal, toast, etc.
    └── patterns/      # forms, loading-states, navigation, etc.
```

## Token Architecture

**Prefix:** `gds` (Grund Design System)

```
Primitives → Semantics → Components
(raw values)   (meaning)    (specific use)
```

### Foundations (11 categories)
color, typography, spacing, sizing, breakpoints, radius, prominence, motion, zIndex, fluid, iconography

### Components (7 specced)
button, select, text-input, number-input, progress-indicator, toast, modal

> Note: "specced" ≠ implemented. Only token sets exist today (no React code). Doc completeness
> varies widely — see readiness below.

## Ready for consumption?

`tokens.ts` is `wip-3` and **single-brand (DePalma)**. It still contains ~83 `TODO` values, and
the token *shape* is expected to change once multi-brand and DTCG-format work lands. Treat this
as a guide for consumers (e.g. depalmaworkshop.com, Co-Goods) deciding what to import now.

**Stable — import now:** `spacing`, `breakpoints`, `radius`, `zIndex`, `sizing.container`,
`sizing.content`, `motion` (duration/easing/transition); component tokens `toast`, `modal`, `select`.

**Partial — usable, values incomplete:** `color.semantic.*` (dark-mode only, brand TODO),
`typography.fontSize`/`fontWeight`, component tokens `button`, `input`.

**Not ready — do not build against:** `color.brand` & all light-mode color, `typography`
families/line-height/letter-spacing, `prominence`, `fluid`, `iconography.library`,
`sizing.component`/`sizing.icon`, and every Pattern (all placeholder).

A detailed item-by-item readiness inventory is maintained internally by the design-system team.

## Usage

*Coming soon - will be available as NPM package `@depalmaworkshop/grund`*

## Licensing

Grund is dual-licensed by what the file *is*:

- **Code** — `src/` (token definitions, components, build tooling): [MIT](LICENSE)
- **Documentation & design content** — `docs/`: [CC BY-SA 4.0](LICENSE-docs)

In short: import and build on the code freely (MIT); if you reuse the written design
documentation, give attribution and share alike (CC BY-SA 4.0).

---

Built by [DePalma Workshop](https://depalmaworkshop.com)
