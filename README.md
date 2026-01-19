# Grund

The foundation for DePalma Workshop's design system.

## About

Grund (Swedish for "foundation") is the design token system being built for DePalma Workshop. It will provide a single source of truth for spacing, colors, typography, and component styles across our applications.

## Goals

- **Design Tokens** - Single source of truth for design decisions
- **3-Layer Architecture** - Primitive → Semantic → Component token structure
- **Responsive Support** - Values that adapt across breakpoints
- **Type-Safe** - Full TypeScript support

## Status

🚧 **In Development**

Currently being built as part of project p-006-design-system-tokens.

## Architecture

```
┌─────────────────┐    ┌──────────────────────────┐    ┌─────────────────┐
│   Primitives    │───▶│       Semantics          │───▶│   Components    │
│  (Raw values)   │    │   (Meaningful names)     │    │ (Specific use)  │
└─────────────────┘    └──────────────────────────┘    └─────────────────┘
```

Primitives define raw values. Semantics give meaning. Components specify exact usage.

## Planned Token Categories

### Foundation
- Spacing
- Colors
- Typography
- Radius
- Elevation
- Motion

### Components
- Button
- Select
- Text Input
- Number Input
- Progress Indicator

## License

Proprietary - See [LICENSE](LICENSE) for details.

---

Built by [DePalma Workshop](https://depalmaworkshop.com)
