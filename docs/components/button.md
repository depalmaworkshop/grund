---
component: Button
category: forms-and-input
status: in-progress
priority: high
version: wip-3
created: 2025-12-27
updated: 2026-06-22
cedar_url: https://cedar.rei.com/components/button
carbon_url: https://carbondesignsystem.com/components/button/usage
atlassian_url: https://atlassian.design/components/button
website_path: TBD
uses_tokens: true
has_variants: true
responsive: true
token_prefix: gds-button
token_categories:
  - spacing
  - color
  - typography
  - radius
  - elevation
  - motion
---

# Button

> [!NOTE]
> **Implemented (2026-06-22):** the `primary` and `ghost` variants ship as a real
> React component in the playground, consuming the `--gds-button-*` tokens
> (colours at **candidate** maturity, structural values **set**). It is the
> trigger for the [options-popover pattern](../patterns/options-popover.md). The
> remaining variants (secondary / tertiary / danger), sizes, and the loading
> state below are still planned — the sections that follow are the design
> backlog, not the current surface.

## Overview

> [!TODO]
> Review Cedar, Carbon, and Atlassian button documentation to refine this overview

**Purpose:** Triggers actions and events with a single click or tap
**Use cases:**
- Form submissions
- Triggering actions (add to cart, delete item)
- Navigation to new pages/views
- Opening modals/dialogs

---

## Anatomy

> [!TODO]
> Define exact button structure and optional elements

```
┌──────────────────────────────┐
│ ┌────┐  Button Text   ┌────┐ │
│ │Icon│                │Icon│ │
│ └────┘                └────┘ │
└──────────────────────────────┘
```

**Elements:**
- Container (required)
- Label text (required)
- Leading icon (optional)
- Trailing icon (optional)
- Loading indicator (optional)

---

## Variants

> [!TODO]
> Review what variants Cedar, Carbon, and Atlassian support
> Decide which ones DePalma Workshop needs

### By Style/Hierarchy
- **Primary** - Main call-to-action (Add to Cart, Checkout)
- **Secondary** - Less prominent actions (Cancel, Back)
- **Tertiary** - Subtle actions (Edit, View Details)
- **Danger/Destructive** - Dangerous actions (Delete, Remove)
- **Ghost** - Minimal visual weight (Close, Dismiss)

### By Size
- **Small** - Compact spaces, secondary actions
- **Medium** - Default size, most common
- **Large** - Prominent CTAs, hero sections

### By State
- Default
- Hover
- Active/Pressed
- Focus
- Disabled
- Loading

### By Width
- **Hug** - Width fits content
- **Fill** - Full width of container

### By Theme
- Light (for dark backgrounds)
- Dark (for light backgrounds)

---

## Tokens

> [!TODO]
> Define exact tokens needed in src/tokens.ts
> Match to Select component pattern from existing implementation

### Foundation Tokens

| Token                                 | Value | Purpose                     |
| ------------------------------------- | ----- |:--------------------------- |
| `gds-spacing-button-padding-x-sm`    | TBD   | Horizontal padding (small)  |
| `gds-spacing-button-padding-x-md`    | TBD   | Horizontal padding (medium) |
| `gds-spacing-button-padding-x-lg`    | TBD   | Horizontal padding (large)  |
| `gds-spacing-button-padding-y-sm`    | TBD   | Vertical padding (small)    |
| `gds-spacing-button-padding-y-md`    | TBD   | Vertical padding (medium)   |
| `gds-spacing-button-padding-y-lg`    | TBD   | Vertical padding (large)    |
| `gds-spacing-button-gap`             | TBD   | Gap between icon and text   |
| `gds-radius-button`                  | TBD   | Border radius               |
| `gds-typography-button-font-size-sm` | TBD   | Font size (small)           |
| `gds-typography-button-font-size-md` | TBD   | Font size (medium)          |
| `gds-typography-button-font-size-lg` | TBD   | Font size (large)           |
| `gds-typography-button-font-weight`  | TBD   | Font weight                 |
| `gds-elevation-button-shadow`        | TBD   | Box shadow                  |
| `gds-motion-button-transition`       | TBD   | State transition timing     |

### Component-Specific Tokens

> [!TODO]
> Organize like Select component: base + variants structure

```typescript
button: {
  base: {
    borderRadius: string
    padding: string
    transition: string
    fontWeight: string
  },
  variants: {
    dark: {
      primary: { bg, bgHover, color, border },
      secondary: { bg, bgHover, color, border },
      tertiary: { bg, bgHover, color, border },
      danger: { bg, bgHover, color, border },
      ghost: { bg, bgHover, color, border }
    },
    light: {
      // Same structure as dark
    }
  },
  sizes: {
    small: { padding, fontSize, iconSize },
    medium: { padding, fontSize, iconSize },
    large: { padding, fontSize, iconSize }
  },
  states: {
    disabled: { opacity, cursor },
    loading: { opacity, cursor }
  }
}
```

---

## Props/API

> [!TODO]
> Define complete TypeScript interface

```typescript
interface ButtonProps {
  // Content
  children: React.ReactNode
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode

  // Behavior
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean

  // Style
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  width?: 'hug' | 'fill'
  theme?: 'dark' | 'light'

  // Misc
  className?: string
  ariaLabel?: string
}
```

---

## Behavior

> [!TODO]
> Document exact interaction behaviors

### Interactions
- **Click/Tap:** Triggers `onClick` handler
- **Keyboard:** `Enter` or `Space` activates button
- **Focus:** Shows focus ring on keyboard navigation
- **Loading state:** Disables interaction, shows spinner
- **Disabled state:** No interaction, reduced opacity

### Edge Cases
- What happens when button is clicked during loading?
- How do we handle very long button text?
- Icon-only buttons need aria-label

---

## Responsive Behavior

> [!TODO]
> Define breakpoint-specific changes

| Breakpoint       | Behavior Changes               |
| ---------------- |:------------------------------ |
| XS (0-639px)     | Consider full-width on mobile? |
| SM (640-767px)   | TBD                            |
| MD (768-1023px)  | TBD                            |
| LG (1024-1279px) | TBD                            |
| XL (1280+px)     | TBD                            |

---

## Accessibility

> [!TODO]
> Complete accessibility requirements

### ARIA Attributes
- `role="button"` - Implicit for <button> element
- `aria-label` - Required for icon-only buttons
- `aria-disabled="true"` - When disabled
- `aria-busy="true"` - When loading

### Keyboard Support
- `Tab` - Focus navigation
- `Enter` / `Space` - Activate button
- `Escape` - Cancel action (context dependent)

### Screen Readers
- Announce button label clearly
- Announce state changes (loading, disabled)
- Provide context for icon-only buttons

### Focus Management
- Visible focus ring using `gds-focus-*` tokens
- Focus ring respects theme (light/dark)
- Don't trap focus unless in modal context

---

## Usage Guidelines

> [!TODO]
> Add usage guidelines from Cedar/Carbon/Atlassian

### When to Use
- ✅ Triggering actions (submit, save, delete)
- ✅ Primary navigation within flows
- ✅ Modal/dialog actions (confirm, cancel)

### When NOT to Use
- ❌ Don't use for page navigation - use Link instead
- ❌ Avoid too many buttons in one view - creates decision fatigue
- ❌ Don't use danger variant for non-destructive actions

### Best Practices
- Use sentence case for button labels ("Add to cart" not "Add To Cart")
- Keep labels short and action-oriented ("Save" not "Save the changes")
- Primary button should be the most important action
- Limit one primary button per section
- Put primary button on right in button groups (Western convention)

---

## Examples

> [!TODO]
> Add real examples once implemented

### Basic Usage
```tsx
<Button onClick={handleClick}>
  Click me
</Button>
```

### Primary CTA with Icon
```tsx
<Button
  variant="primary"
  size="large"
  trailingIcon={<HiArrowRight />}
  onClick={handleAddToCart}
>
  Add to cart
</Button>
```

### Loading State
```tsx
<Button
  variant="primary"
  loading={isSubmitting}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

### Danger Action
```tsx
<Button
  variant="danger"
  onClick={handleDelete}
  ariaLabel="Delete item"
>
  Delete
</Button>
```

---

## Design Decisions

> [!TODO]
> Document decisions as we make them

### Token Choices
- Why specific padding values?
- Why specific color choices for variants?
- How do we ensure WCAG contrast ratios?

### Variant Strategy
- Why these 5 style variants?
- Do we need icon-only variant or use ghost + icon?
- Should loading be a prop or a separate variant?

### Implementation Approach
- Native <button> vs custom div?
- How to handle polymorphic button/link?
- Client-side only or server-compatible?

---

## Related Components

- **Link** - For navigation (not actions)
- **Icon Button** - Button with only icon (may be same component with variant)
- **Toggle Button** - For on/off states

---

## References

### External Design Systems
- [Cedar Button](https://cedar.rei.com/components/button)
- [Carbon Button](https://carbondesignsystem.com/components/button/usage)
- [Atlassian Button](https://atlassian.design/components/button)

### Internal Resources
- Implementation: TBD
- Tokens: `src/tokens.ts` → `gds-button-*`
- Tests: TBD
- Storybook: TBD
- Figma: TBD

---

## Status & Todo

### Completed
- [x] Initial component planning
- [x] Token requirements outlined
- [ ] Design review with team
- [ ] Token values defined in src/tokens.ts
- [ ] Component implementation
- [ ] Unit tests
- [ ] Accessibility audit
- [ ] Documentation complete
- [ ] Figma designs
- [ ] Storybook stories

### Pending
- [ ] Review Cedar/Carbon/Atlassian implementations in detail
- [ ] Define exact token values
- [ ] Decide on responsive strategy
- [ ] Build component
- [ ] Test with real use cases

---

**Last Updated:** 2025-12-27
