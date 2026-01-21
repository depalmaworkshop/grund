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

### Components (7 documented)
button, select, text-input, number-input, progress-indicator, toast, modal

## Usage

*Coming soon - will be available as NPM package `@depalmaworkshop/grund`*

## License

Proprietary - See [LICENSE](LICENSE)

---

Built by [DePalma Workshop](https://depalmaworkshop.com)
