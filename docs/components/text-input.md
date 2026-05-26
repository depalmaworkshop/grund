---
component: Text Input
category: forms-and-input
status: planning
priority: high
version: wip-2
created: 2025-12-27
updated: 2026-01-21T13:26
cedar_url: https://cedar.rei.com/components/input
carbon_url: https://carbondesignsystem.com/components/text-input/usage
atlassian_url: https://atlassian.design/components/textfield
extraction_status: inline in consuming application; not yet extracted
uses_tokens: false
has_variants: true
responsive: true
token_prefix: gds-text-input
token_categories:
  - spacing
  - color
  - typography
  - radius
  - elevation
---

# Text Input

## Overview

> [!TODO] Migration from Website
> - [ ] Extract text input patterns from the consuming application's checkout flow shipping form
> - [ ] Build base TextInput component with all variants
> - [ ] Replace inline inputs in checkout with new component
> - [ ] Ensure all input types supported (text, email, tel, etc.)
> - [ ] Add proper validation and error handling

> [!TODO]
> Review all three design systems - Text Input is fundamental

**Purpose:** Single-line input field for text data
**Use cases:**
- Form fields (name, email, address) - current in checkout
- Search inputs
- User credentials
- Any single-line text entry

**Current Implementation:** Inline in the consuming application's checkout flow for shipping address fields

---

## Anatomy

> [!TODO]
> Define complete structure with all optional elements

```
┌─────────────────────────────────────┐
│  Label                              │
│  ┌───────────────────────────────┐  │
│  │ 🔍  Placeholder text      [X] │  │
│  └───────────────────────────────┘  │
│  Helper text / Error message        │
└─────────────────────────────────────┘
```

**Elements:**
- Label (optional but recommended)
- Input field (required)
- Leading icon (optional)
- Trailing icon/button (optional - clear button, visibility toggle)
- Placeholder text (optional)
- Helper text (optional)
- Error message (optional)
- Character counter (optional)

---

## Variants

> [!TODO]
> Review variant coverage across Cedar/Carbon/Atlassian

### By Type
- **Text** - Default text input
- **Email** - Email validation
- **Password** - Obscured text with visibility toggle
- **Tel** - Telephone number
- **URL** - URL validation
- **Search** - Search field with icon

### By Size
- **Small** - Compact forms
- **Medium** - Default
- **Large** - Prominent forms, landing pages

### By State
- Default
- Hover
- Focus
- Disabled
- Error/Invalid
- Success/Valid (checkmark)
- Read-only

### By Width
- **Fixed** - Set width (e.g., postal code)
- **Fluid** - Full container width
- **Auto** - Content-based width

### By Theme
- Light
- Dark (checkout currently uses dark theme)

---

## Tokens

> [!TODO]
> Define comprehensive token set - this is the base for all inputs

### Foundation Tokens

| Token                                     | Value | Purpose                             |
| ----------------------------------------- | ----- |:----------------------------------- |
| `gds-spacing-input-padding-x-sm`         | TBD   | Horizontal padding (small)          |
| `gds-spacing-input-padding-x-md`         | TBD   | Horizontal padding (medium)         |
| `gds-spacing-input-padding-x-lg`         | TBD   | Horizontal padding (large)          |
| `gds-spacing-input-padding-y-sm`         | TBD   | Vertical padding (small)            |
| `gds-spacing-input-padding-y-md`         | TBD   | Vertical padding (medium)           |
| `gds-spacing-input-padding-y-lg`         | TBD   | Vertical padding (large)            |
| `gds-spacing-input-icon-gap`             | TBD   | Gap between icon and text           |
| `gds-spacing-input-label-margin`         | TBD   | Space between label and input       |
| `gds-spacing-input-helper-margin`        | TBD   | Space between input and helper text |
| `gds-radius-input`                       | TBD   | Border radius                       |
| `gds-typography-input-font-size-sm`      | TBD   | Font size (small)                   |
| `gds-typography-input-font-size-md`      | TBD   | Font size (medium)                  |
| `gds-typography-input-font-size-lg`      | TBD   | Font size (large)                   |
| `gds-typography-input-label-font-size`   | TBD   | Label font size                     |
| `gds-typography-input-label-font-weight` | TBD   | Label font weight                   |
| `gds-typography-input-helper-font-size`  | TBD   | Helper text font size               |
| `gds-elevation-input-shadow-focus`       | TBD   | Focus shadow/glow                   |
| `gds-motion-input-transition`            | TBD   | State transition                    |

### Component-Specific Tokens

```typescript
textInput: {
  base: {
    borderRadius: string
    transition: string
    padding: string
    fontSize: string
  },
  label: {
    fontSize: string
    fontWeight: string
    marginBottom: string
    color: string
  },
  helper: {
    fontSize: string
    marginTop: string
  },
  variants: {
    dark: {
      bg: string
      bgFocus: string
      bgDisabled: string
      color: string
      colorDisabled: string
      border: string
      borderFocus: string
      borderError: string
      placeholder: string
      label: string
      helper: string
      error: string
    },
    light: {
      // Same structure
    }
  },
  sizes: {
    small: { padding, fontSize, height },
    medium: { padding, fontSize, height },
    large: { padding, fontSize, height }
  },
  states: {
    disabled: { opacity, cursor, bg },
    error: { borderColor, bgColor, textColor },
    success: { borderColor, iconColor }
  },
  icons: {
    size: string
    color: string
    padding: string
  }
}
```

---

## Props/API

> [!TODO]
> Complete comprehensive interface

```typescript
interface TextInputProps {
  // Value
  value: string
  onChange: (value: string) => void

  // Field configuration
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search'
  name?: string
  id?: string
  placeholder?: string
  autocomplete?: string

  // Content
  label?: string
  helperText?: string
  errorMessage?: string

  // Icons/Adornments
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  showClearButton?: boolean

  // Validation
  required?: boolean
  error?: boolean
  success?: boolean
  pattern?: string
  minLength?: number
  maxLength?: number
  showCharacterCount?: boolean

  // Behavior
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean

  // Callbacks
  onBlur?: () => void
  onFocus?: () => void

  // Style
  size?: 'small' | 'medium' | 'large'
  width?: 'fixed' | 'fluid' | 'auto'
  theme?: 'dark' | 'light'

  // Accessibility
  ariaLabel?: string
  ariaDescribedBy?: string

  // Misc
  className?: string
}
```

---

## Behavior

> [!TODO]
> Document all interaction behaviors

### Interactions
- **Click:** Focus input field
- **Type:** Updates value
- **Tab:** Focus navigation
- **Clear button:** Clears input and focuses field
- **Password visibility:** Toggles between password/text type
- **Validation:** On blur or submit (configurable)

### Edge Cases
- Empty required field → show error
- Invalid format (email, URL) → show error
- Exceeds maxLength → prevent typing or truncate
- Disabled state → no interaction
- Read-only → can select/copy but not edit

---

## Responsive Behavior

> [!TODO]
> Mobile considerations

| Breakpoint       | Behavior Changes                                                               |
| ---------------- |:------------------------------------------------------------------------------ |
| XS (0-639px)     | Full width, larger touch targets, appropriate keyboard type (email, tel, etc.) |
| SM (640-767px)   | TBD                                                                            |
| MD (768-1023px)  | TBD                                                                            |
| LG (1024-1279px) | Default sizing                                                                 |
| XL (1280+px)     | Default sizing                                                                 |

---

## Accessibility

> [!TODO]
> Complete WCAG compliance requirements

### ARIA Attributes
- `aria-label` - When no visible label
- `aria-labelledby` - Associates with label element
- `aria-describedby` - Associates with helper/error text
- `aria-invalid="true"` - When error state
- `aria-required="true"` - When required
- `aria-disabled="true"` - When disabled

### Keyboard Support
- `Tab` - Focus navigation
- `Shift+Tab` - Reverse focus
- Text input - Standard text editing
- `Escape` - Clear field (optional)

### Screen Readers
- Announce label
- Announce required state
- Announce error messages
- Announce character count/limits

### Focus Management
- Clear focus ring using `gds-focus-*` tokens
- Focus remains in field during typing
- Focus trap in modals/dialogs (context-dependent)

---

## Usage Guidelines

> [!TODO]
> Best practices from design systems

### When to Use
- ✅ Single-line text data (name, email, address)
- ✅ Short responses (search queries, usernames)
- ✅ Structured data (phone, postal code)

### When NOT to Use
- ❌ Multi-line text - use Text Area
- ❌ Numeric values with +/- - use Number Input
- ❌ Selecting from options - use Select/Dropdown
- ❌ Binary choice - use Checkbox/Toggle

### Best Practices
- Always provide labels (visible or aria-label)
- Use appropriate input type (email, tel, etc.) for mobile keyboards
- Provide helpful placeholder text as examples, not instructions
- Use helper text for formatting guidance
- Show errors inline, close to the field
- Use autocomplete attributes for form autofill
- Don't use placeholder as label replacement

---

## Examples

> [!TODO]
> Add real examples once implemented

### Basic Text Input
```tsx
<TextInput
  label="First name"
  value={firstName}
  onChange={setFirstName}
  required
/>
```

### Email with Validation
```tsx
<TextInput
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={!isValidEmail(email)}
  errorMessage="Please enter a valid email address"
  helperText="We'll never share your email"
/>
```

### Search with Icon
```tsx
<TextInput
  type="search"
  placeholder="Search products..."
  value={searchQuery}
  onChange={setSearchQuery}
  leadingIcon={<HiMagnifyingGlass />}
  showClearButton
/>
```

### Password with Toggle
```tsx
<TextInput
  label="Password"
  type="password"
  value={password}
  onChange={setPassword}
  minLength={8}
  showCharacterCount
  helperText="Minimum 8 characters"
/>
```

---

## Design Decisions

> [!TODO]
> Document decisions during implementation

### Token Choices
- Why these padding values?
- Focus state: shadow vs border change?
- Error state: border color vs background tint?

### Variant Strategy
- Should password toggle be built-in or separate component?
- Clear button: always visible or on hover?
- Icon placement: inside border or outside?

### Implementation Approach
- Native <input> with styling wrapper
- Controlled vs uncontrolled (support both?)
- Validation: built-in or external library?

---

## Related Components

- **Number Input** - For numeric values
- **Text Area** - For multi-line text
- **Search** - Specialized text input for search
- **Select** - For choosing from options

---

## References

### External Design Systems
- [Cedar Input](https://cedar.rei.com/components/input) ⭐ Good patterns
- [Carbon Text Input](https://carbondesignsystem.com/components/text-input/usage) ⭐ Comprehensive
- [Atlassian TextField](https://atlassian.design/components/textfield) ⭐ Excellent accessibility

### Internal Resources
- Current: the consuming application's checkout flow shipping address form
- Tokens: TBD in `src/tokens.ts` → `gds-text-input-*`
- Related: Number Input shares base styling

---

## Status & Todo

### Completed
- [x] Identified current usage (checkout form)
- [x] Initial component planning
- [ ] Token requirements defined
- [ ] Component implementation
- [ ] Token integration
- [ ] Validation logic
- [ ] Tests written
- [ ] Accessibility verified
- [ ] Documentation complete

### Pending
- [ ] Review all three design system implementations
- [ ] Define exact token values
- [ ] Build base component
- [ ] Add all variants (email, password, search)
- [ ] Implement validation patterns
- [ ] Mobile keyboard type optimization
- [ ] Extract checkout form to use new component

---

**Last Updated:** 2025-12-27
