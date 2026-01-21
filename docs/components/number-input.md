---
component: Number Input
category: forms-and-input
status: needs-migration
priority: high
version: wip-2
created: 2025-12-27
updated: 2026-01-21T13:26
cedar_url: https://cedar.rei.com/components/input
carbon_url: https://carbondesignsystem.com/components/number-input/usage
atlassian_url: https://atlassian.design/components/textfield
website_path: src/app/cart/page.tsx (inline, needs extraction)
uses_tokens: false
has_variants: true
responsive: true
token_prefix: gds-number-input
token_categories:
  - spacing
  - color
  - typography
  - radius
  - elevation
---

# Number Input

## Overview

> [!TODO] Migration from Website
> - [ ] Extract inline implementation from `cart/page.tsx` lines 350-380
> - [ ] Replace hardcoded Tailwind classes with tokens
> - [ ] Create reusable component in `/components/NumberInput.tsx`
> - [ ] Update cart page to import new component
> - [ ] Test quantity adjustment functionality

> [!TODO]
> Review Carbon Number Input specifically - they have good patterns for this

**Purpose:** Input field for numeric values with increment/decrement buttons
**Use cases:**
- Cart quantity adjustment (current implementation)
- Product quantity selection
- Numeric settings (e.g., team size, number of items)
- Age, count, or other number fields

**Current Implementation:** Inline in `cart/page.tsx` - needs extraction to reusable component

---

## Anatomy

> [!TODO]
> Define exact structure - should match Carbon's pattern

```
┌────────────────────────────┐
│  ┌───┐  ┌────────┐  ┌───┐  │
│  │ - │  │  Value │  │ + │  │
│  └───┘  └────────┘  └───┘  │
└────────────────────────────┘
```

**Elements:**
- Container (required)
- Decrement button with minus icon (required)
- Number input field (required)
- Increment button with plus icon (required)
- Label (optional, context-dependent)
- Helper text / Error message (optional)

**Current Website Implementation:**
```tsx
<button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
  <HiMinus className="w-4 h-4 text-white" />
</button>
<input
  type="text"
  defaultValue={item.quantity}
  onBlur={(e) => {
    const newQty = parseInt(e.target.value)
    if (!isNaN(newQty) && newQty > 0) {
      updateItemQuantity(item.id, newQty)
    }
  }}
  className="w-12 text-center bg-gray-700/50 border border-gray-600..."
/>
<button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
  <HiPlus className="w-4 h-4 text-white" />
</button>
```

---

## Variants

> [!TODO]
> Review Carbon Number Input variants

### By Size
- **Small** - Compact for dense UIs (cart item rows)
- **Medium** - Default size
- **Large** - Prominent for primary forms

### By State
- Default
- Hover (buttons)
- Focus (input field)
- Disabled
- Error/Invalid
- Read-only

### By Theme
- Light
- Dark (current cart implementation)

### By Behavior
- **Steppers visible** - Shows +/- buttons (current)
- **Steppers hidden** - Input only, keyboard arrows work
- **Mobile optimized** - Larger touch targets

---

## Tokens

> [!TODO]
> Define tokens matching Button and Text Input patterns

### Foundation Tokens

| Token                                       | Value | Purpose                       |
| ------------------------------------------- | ----- |:----------------------------- |
| `gds-spacing-number-input-button-padding`  | TBD   | Button padding                |
| `gds-spacing-number-input-gap`             | TBD   | Gap between buttons and input |
| `gds-radius-number-input`                  | TBD   | Border radius                 |
| `gds-typography-number-input-font-size-sm` | TBD   | Font size (small)             |
| `gds-typography-number-input-font-size-md` | TBD   | Font size (medium)            |
| `gds-typography-number-input-font-size-lg` | TBD   | Font size (large)             |
| `gds-color-number-input-button-*`          | TBD   | Button colors                 |
| `gds-color-number-input-field-*`           | TBD   | Input field colors            |

### Component-Specific Tokens

```typescript
numberInput: {
  base: {
    borderRadius: string
    transition: string
    gap: string
  },
  field: {
    width: string
    textAlign: 'center'
    padding: string
  },
  button: {
    size: string
    padding: string
  },
  variants: {
    dark: {
      field: { bg, bgFocus, color, border },
      button: { bg, bgHover, color }
    },
    light: {
      field: { bg, bgFocus, color, border },
      button: { bg, bgHover, color }
    }
  },
  sizes: {
    small: { buttonSize, inputWidth, fontSize },
    medium: { buttonSize, inputWidth, fontSize },
    large: { buttonSize, inputWidth, fontSize }
  },
  states: {
    disabled: { opacity, cursor },
    error: { borderColor, bgColor }
  }
}
```

---

## Props/API

> [!TODO]
> Complete interface with all options

```typescript
interface NumberInputProps {
  // Value
  value: number
  onChange: (value: number) => void

  // Constraints
  min?: number
  max?: number
  step?: number

  // Behavior
  disabled?: boolean
  readOnly?: boolean
  allowNegative?: boolean
  allowDecimal?: boolean

  // Style
  size?: 'small' | 'medium' | 'large'
  theme?: 'dark' | 'light'
  showSteppers?: boolean

  // Validation
  error?: boolean
  errorMessage?: string
  helperText?: string

  // Accessibility
  label?: string
  ariaLabel?: string

  // Misc
  className?: string
  placeholder?: string
}
```

---

## Behavior

> [!TODO]
> Document all interaction behaviors

### Interactions
- **Decrement button:** Decreases value by `step` (default 1)
- **Increment button:** Increases value by `step` (default 1)
- **Direct input:** User can type value directly
- **Blur validation:** Validates and corrects value on blur
- **Keyboard:** Arrow up/down changes value
- **Min/Max:** Buttons disabled when limit reached
- **Invalid input:** Reverts to previous valid value

### Edge Cases
- Empty input → revert to min or 0
- Non-numeric input → revert to previous value
- Value below min → clamp to min
- Value above max → clamp to max
- Decimal input when not allowed → round or reject

**Current Cart Behavior:**
```tsx
onBlur={(e) => {
  const newQty = parseInt(e.target.value)
  if (!isNaN(newQty) && newQty > 0) {
    updateItemQuantity(item.id, newQty)
  }
  // Implicit: invalid input ignored, keeps previous value
}}
```

---

## Responsive Behavior

> [!TODO]
> Define mobile-specific adjustments

| Breakpoint       | Behavior Changes                               |
| ---------------- |:---------------------------------------------- |
| XS (0-639px)     | Larger touch targets for buttons (48×48px min) |
| SM (640-767px)   | TBD                                            |
| MD (768-1023px)  | TBD                                            |
| LG (1024-1279px) | Default sizing                                 |
| XL (1280+px)     | Default sizing                                 |

---

## Accessibility

> [!TODO]
> Complete accessibility requirements

### ARIA Attributes
- `role="spinbutton"` - For the input field
- `aria-valuenow` - Current value
- `aria-valuemin` - Minimum allowed value
- `aria-valuemax` - Maximum allowed value
- `aria-label` - For buttons (Decrease/Increase)
- `aria-invalid="true"` - When error state

### Keyboard Support
- `Tab` - Focus navigation
- `Up Arrow` - Increment
- `Down Arrow` - Decrement
- `Home` - Jump to min (if defined)
- `End` - Jump to max (if defined)

### Screen Readers
- Announce value changes
- Announce limits when reached
- Provide clear labels for buttons

---

## Usage Guidelines

> [!TODO]
> Add best practices

### When to Use
- ✅ Cart quantity adjustment (current use case)
- ✅ Numeric fields with common adjustments (+1/-1)
- ✅ When users might prefer clicking over typing

### When NOT to Use
- ❌ Large number ranges (e.g., year selection) - use regular input or dropdown
- ❌ When precision typing is needed - use Text Input
- ❌ Percentage or currency with symbols - use specialized inputs

### Best Practices
- Set reasonable min/max limits
- Use step=1 for integers, appropriate decimals for floats
- Disable decrement at minimum, increment at maximum
- Provide clear visual feedback for disabled states
- Consider mobile touch target sizes (48×48px minimum)

---

## Examples

> [!TODO]
> Add examples once extracted

### Cart Quantity (Current Use Case)
```tsx
<NumberInput
  value={item.quantity}
  onChange={(qty) => updateItemQuantity(item.id, qty)}
  min={1}
  max={99}
  size="small"
  theme="dark"
/>
```

### Product Quantity Selection
```tsx
<NumberInput
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={inventory.available}
  size="medium"
  label="Quantity"
/>
```

### With Error State
```tsx
<NumberInput
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={10}
  error={quantity > 10}
  errorMessage="Maximum 10 items per order"
/>
```

---

## Design Decisions

> [!TODO]
> Document decisions during implementation

### Token Choices
- Why these button sizes?
- Should buttons be square or rectangular?
- Input field width - fixed or fluid?

### Variant Strategy
- Combine with Text Input styling or separate?
- Should steppers be toggleable or always visible?

### Implementation Approach
- Extract from cart/page.tsx
- Reusable component in /components
- Consider using native input[type=number] vs text with validation

---

## Migration Tasks

> [!TODO]
> Track extraction from cart page

- [ ] Extract inline implementation to component file
- [ ] Add token support
- [ ] Add prop interface
- [ ] Handle all edge cases
- [ ] Add accessibility attributes
- [ ] Test with keyboard navigation
- [ ] Update cart/page.tsx to use new component

---

## Related Components

- **Text Input** - Similar styling, share base tokens
- **Button** - For increment/decrement buttons
- **Slider** - Alternative for numeric ranges

---

## References

### External Design Systems
- [Cedar Input](https://cedar.rei.com/components/input)
- [Carbon Number Input](https://carbondesignsystem.com/components/number-input/usage) ⭐ Best reference
- [Atlassian TextField (Number)](https://atlassian.design/components/textfield)

### Internal Resources
- Current: `src/app/cart/page.tsx` lines 13, 350-380
- Tokens: TBD in `/staging/tokens-wip.ts` → `gds-number-input-*`
- Icons: HiMinus, HiPlus from `react-icons/hi2`

---

## Status & Todo

### Completed
- [x] Identified current implementation
- [x] Initial component planning
- [ ] Token requirements defined
- [ ] Component extracted from cart
- [ ] Token integration
- [ ] Tests written
- [ ] Accessibility verified
- [ ] Documentation complete

### Pending
- [ ] Review Carbon Number Input implementation in detail
- [ ] Extract inline code to reusable component
- [ ] Define exact token values
- [ ] Add comprehensive validation
- [ ] Mobile touch target optimization
- [ ] Keyboard interaction testing

---

**Last Updated:** 2025-12-27
