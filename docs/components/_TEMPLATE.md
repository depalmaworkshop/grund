---
component: ComponentName
category: forms-and-input | navigation | feedback | content-display | layout | overlays | media | status
status: planning | active | built | needs-migration
priority: high | medium | low
version: wip-1
created: 2025-MM-DD
updated: 2026-01-21T13:27
cedar_url: https://cedar.rei.com/components/component-name
carbon_url: https://carbondesignsystem.com/components/component-name
atlassian_url: https://atlassian.design/components/component-name
website_path: src/components/ComponentName.tsx
uses_tokens: true | false
has_variants: true | false
responsive: true | false
token_prefix: gds-component-name
token_categories:
  - spacing
  - color
  - typography
  - radius
  - etc
---

# ComponentName

## Overview

> [!TODO]
> Write brief description of the component and its primary purpose

**Purpose:** [What problem does this solve?]
**Use cases:** [When should this be used?]

---

## Anatomy

> [!TODO]
> Describe the parts/structure of the component
> - Can include a diagram or list of sub-elements
> - Identify clickable/interactive areas
> - Note any required vs optional elements

```
┌─────────────────────────┐
│  [Component Structure]  │
│                         │
│  - Element 1            │
│  - Element 2            │
│  - Element 3 (optional) │
└─────────────────────────┘
```

---

## Variants

> [!TODO]
> Document all variants this component supports

### By Style
- Variant 1
- Variant 2
- Variant 3

### By Size
- Small
- Medium
- Large

### By State
- Default
- Hover
- Active/Pressed
- Focus
- Disabled
- Loading (if applicable)
- Error (if applicable)

### By Theme
- Light
- Dark

---

## Tokens

> [!TODO]
> List all design tokens used by this component
> Reference from src/tokens.ts

### Foundation Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `gds-spacing-component-padding` | TBD | Internal padding |
| `gds-color-component-bg` | TBD | Background color |
| `gds-radius-component` | TBD | Border radius |

### Component-Specific Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `gds-component-property` | TBD | Specific property |

### Variant Tokens

**Dark Variant:**
```typescript
{
  bg: 'gds-color-component-bg-dark',
  text: 'gds-color-component-text-dark',
  border: 'gds-color-component-border-dark'
}
```

**Light Variant:**
```typescript
{
  bg: 'gds-color-component-bg-light',
  text: 'gds-color-component-text-light',
  border: 'gds-color-component-border-light'
}
```

---

## Props/API

> [!TODO]
> Define the component API (TypeScript interface)

```typescript
interface ComponentNameProps {
  // Required props
  value: string
  onChange: (value: string) => void

  // Optional props
  placeholder?: string
  disabled?: boolean
  variant?: 'dark' | 'light'
  size?: 'small' | 'medium' | 'large'
  className?: string
}
```

---

## Behavior

> [!TODO]
> Describe interactive behaviors

### Interactions
- Click/Tap behavior
- Keyboard navigation
- Focus management
- State transitions

### Edge Cases
- What happens when [scenario]?
- How does it handle [edge case]?

---

## Responsive Behavior

> [!TODO]
> How component adapts across breakpoints

| Breakpoint | Behavior Changes |
|------------|------------------|
| XS (0-639px) | TBD |
| SM (640-767px) | TBD |
| MD (768-1023px) | TBD |
| LG (1024-1279px) | TBD |
| XL (1280+px) | TBD |

---

## Accessibility

> [!TODO]
> Document accessibility requirements and implementation

### ARIA Attributes
- `role=""` - Purpose
- `aria-label=""` - When to use
- `aria-describedby=""` - For error messages

### Keyboard Support
- `Tab` - Focus navigation
- `Enter/Space` - Activation
- `Escape` - Close/cancel (if applicable)
- Arrow keys - Navigation (if applicable)

### Screen Readers
- Announcement text for state changes
- Label requirements
- Error message handling

### Focus Management
- Focus ring styling (`gds-focus-*` tokens)
- Focus trap (for modals/dialogs)
- Focus restoration

---

## Usage Guidelines

> [!TODO]
> When to use vs when NOT to use

### When to Use
- ✅ Use case 1
- ✅ Use case 2
- ✅ Use case 3

### When NOT to Use
- ❌ Don't use for [scenario] - use [alternative] instead
- ❌ Avoid when [condition]

### Best Practices
- Do this
- Don't do that
- Consider this

---

## Examples

> [!TODO]
> Add code examples and visual examples

### Basic Usage
```tsx
<ComponentName
  value={value}
  onChange={handleChange}
/>
```

### With Variants
```tsx
<ComponentName
  value={value}
  onChange={handleChange}
  variant="dark"
  size="large"
/>
```

### Real-World Example
```tsx
// Example from actual use case
```

---

## Design Decisions

> [!TODO]
> Document WHY choices were made

### Token Choices
- Why we chose these specific tokens
- Alternative approaches considered
- Trade-offs made

### Variant Strategy
- Why these variants?
- Why not other variants?
- Future variant considerations

### Implementation Approach
- Why this pattern?
- What alternatives were considered?
- Performance considerations

---

## Related Components

> [!TODO]
> Link to related components

- [Component A] - Similar but for [use case]
- [Component B] - Often used together
- [Component C] - Alternative for [scenario]

---

## References

> [!TODO]
> Add links to design system references

### External Design Systems
- [Cedar Documentation](cedar_url)
- [Carbon Documentation](carbon_url)
- [Atlassian Documentation](atlassian_url)

### Internal Resources
- Implementation: `website_path`
- Tokens: `src/tokens.ts` → `gds-component-name-*`
- Tests: TBD
- Storybook: TBD
- Figma: TBD

---

## Status & Todo

> [!TODO]
> Track what's done and what's pending

### Completed
- [ ] Token requirements defined
- [ ] Component designed
- [ ] Implementation complete
- [ ] Tests written
- [ ] Documentation complete
- [ ] Accessibility verified
- [ ] Responsive tested

### Pending
- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

---

**Last Updated:** 2025-MM-DD
