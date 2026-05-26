---
component: Select
category: forms-and-input
status: built
priority: medium
version: wip-1
created: 2025-12-27
updated: 2026-01-21T13:26
cedar_url: https://cedar.rei.com/components/select
carbon_url: https://carbondesignsystem.com/components/dropdown/usage
atlassian_url: https://atlassian.design/components/select
website_path: src/components/Select.tsx
uses_tokens: true
has_variants: true
responsive: true
token_prefix: gds-select
token_categories:
  - spacing
  - color
  - typography
  - radius
  - elevation
  - motion
---

# Select

## Overview

✅ **BUILT** - This component is implemented and uses design tokens

**Purpose:** Dropdown menu for selecting a single option from a list
**Use cases:**
- Country/region selection (checkout)
- Settings and preferences
- Filtering and sorting
- Any single-choice selection

**Current Implementation:** Fully built component with token integration at `src/components/Select.tsx`

---

## Anatomy

```
Closed State:
┌────────────────────────────┐
│  Selected Label        ▼   │
└────────────────────────────┘

Open State:
┌────────────────────────────┐
│  Selected Label        ▲   │
└────────────────────────────┘
┌────────────────────────────┐
│  ✓ Option 1                │
│    Option 2                │
│    Option 3                │
└────────────────────────────┘
```

**Elements:**
- Trigger button (required) - Shows selected value
- Chevron icon (required) - Indicates expandable state
- Dropdown list (required) - Options container
- Option items (required) - Selectable choices
- Checkmark icon (optional) - Indicates selected option
- Placeholder text (optional) - When no selection

**Current Implementation Structure:**
```tsx
<div> {/* Container */}
  <button> {/* Trigger */}
    <span>Selected Label</span>
    <HiChevronDown />
  </button>
  {isOpen && (
    <div> {/* Dropdown */}
      <button> {/* Option */}
        <span>Label</span>
        <HiCheck />
      </button>
    </div>
  )}
</div>
```

---

## Variants

### By Theme
- **Dark** - For dark backgrounds (default)
- **Light** - For light backgrounds

**Token Structure:**
```typescript
variants: {
  dark: {
    trigger: { bg, bgHover, border, color },
    dropdown: { bg, border },
    option: { color, bgHover, bgSelected },
    checkmark: { color }
  },
  light: {
    // Same structure
  }
}
```

### By State
- Default
- Hover
- Focus
- Open/Expanded
- Disabled
- Selected

---

## Tokens

✅ **Already Implemented** - Tokens defined in `src/tokens.ts`

### Current Token Structure

```typescript
select: {
  base: {
    borderRadius: string
    padding: string
    transition: string
  },
  dropdown: {
    borderRadius: string
    shadow: string
    padding: string
    marginTop: string
    maxHeight: string
    zIndex: number
  },
  checkmark: {
    size: string
  },
  states: {
    disabled: {
      opacity: string
      cursor: string
    }
  },
  variants: {
    dark: {
      trigger: {
        bg: string
        bgHover: string
        border: string
        color: string
      },
      dropdown: {
        bg: string
        border: string
      },
      option: {
        color: string
        bgHover: string
        bgSelected: string
      },
      checkmark: {
        color: string
      }
    },
    light: {
      trigger: {
        bg: string
        bgHover: string
        border: string
        color: string
      },
      dropdown: {
        bg: string
        border: string
      },
      option: {
        color: string
        bgHover: string
        bgSelected: string
      },
      checkmark: {
        color: string
      }
    }
  }
}
```

### Token Usage Pattern

**In Component:**
```tsx
import { select } from '@depalmaworkshop/grund'

// Get variant-specific styles
const variantStyles = select.variants[variant]

// Apply tokens
className={`
  ${variantStyles.trigger.bg}
  ${variantStyles.trigger.bgHover}
  border ${variantStyles.trigger.border}
  ${select.base.borderRadius}
  ${select.base.padding}
`}
```

---

## Props/API

✅ **Implemented Interface:**

```typescript
interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  className?: string
  variant?: 'dark' | 'light'
}
```

---

## Behavior

✅ **Implemented Behaviors:**

### Interactions
- **Click trigger:** Opens/closes dropdown
- **Click option:** Selects value, closes dropdown
- **Click outside:** Closes dropdown (implemented with useRef)
- **Escape key:** Closes dropdown
- **Disabled:** No interaction allowed

### Implementation Details
```tsx
// Close on click outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  if (isOpen) {
    document.addEventListener('mousedown', handleClickOutside)
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}, [isOpen])

// Close on Escape key
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }

  document.addEventListener('keydown', handleEscape)
  return () => document.removeEventListener('keydown', handleEscape)
}, [isOpen])
```

---

## Accessibility

> [!TODO]
> Enhance accessibility - current implementation is basic

### Current Implementation
- Basic keyboard support (Escape to close)
- Click outside to close
- Disabled state styling

### Needed Improvements
- [ ] Add ARIA attributes (`role="combobox"`, `aria-expanded`, `aria-activedescendant`)
- [ ] Add keyboard navigation (Arrow keys to navigate options)
- [ ] Add `aria-label` for trigger
- [ ] Improve screen reader announcements
- [ ] Focus management (return focus to trigger on close)

---

## Usage Guidelines

### When to Use
- ✅ Selecting from 3-15 options (current: country selection)
- ✅ Single-choice selection
- ✅ Options with simple labels

### When NOT to Use
- ❌ 2 options only - use Radio buttons
- ❌ >15 options - use Search/Autocomplete
- ❌ Multi-select - use Checkbox list or Multi-select component

---

## Examples

### Current Usage (Cart/Checkout)
```tsx
<Select
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={[
    { value: 'se', label: 'Sweden' },
    { value: 'fi', label: 'Finland' },
    { value: 'ax', label: 'Åland' }
  ]}
  placeholder="Select country"
  variant="dark"
/>
```

### With Disabled State
```tsx
<Select
  value={region}
  onChange={setRegion}
  options={regions}
  disabled={!countrySelected}
  placeholder="Select region"
/>
```

---

## Design Decisions

### Why This Token Structure?
- **Variant-based:** Easy to add light/dark themes
- **Nested organization:** Groups related properties (trigger, dropdown, option)
- **Flexible:** Can add new variants without breaking existing code
- **Type-safe:** TypeScript ensures correct token usage

### Why Not Native `<select>`?
- More styling control
- Better cross-browser consistency
- Custom interactions (click outside, animations)
- Easier to add features (search, multi-select in future)

---

## Future Enhancements

> [!TODO] Future Improvements
> - [ ] Add search/filter functionality for long lists
> - [ ] Support option groups (`<optgroup>` equivalent)
> - [ ] Add multi-select variant
> - [ ] Virtualization for very long lists (performance)
> - [ ] Add loading state for async options
> - [ ] Support custom option rendering (icons, descriptions)

---

## Related Components

- **Text Input** - For search variant of Select
- **Checkbox** - For multi-select alternative
- **Radio Button** - For visible options alternative

---

## References

### External Design Systems
- [Cedar Select](https://cedar.rei.com/components/select)
- [Carbon Dropdown](https://carbondesignsystem.com/components/dropdown/usage)
- [Atlassian Select](https://atlassian.design/components/select)

### Internal Resources
- **Implementation:** `src/components/Select.tsx`
- **Tokens:** `src/tokens.ts` → `select.*`
- **Usage:** Cart page (country selection), Settings page
- **Icons:** HiChevronDown, HiCheck from `react-icons/hi2`

---

## Lessons Learned

✅ **What Worked Well:**
- Token structure is clean and easy to use
- Variant pattern makes theming simple
- Click-outside and Escape handlers work great
- Visual feedback (checkmark, hover states) is clear

⚠️ **What Needs Improvement:**
- Accessibility could be better (ARIA, keyboard nav)
- No search for long option lists
- Could benefit from option groups
- Animation on open/close would be nice

📚 **For Future Components:**
- This token pattern should be template for other components
- Variant structure works well - reuse for Button, Input, etc.
- Consider accessibility from the start (don't retrofit)
- Build in common patterns (search, loading) early

---

## Status & Todo

### Completed
- [x] Component built and working
- [x] Token integration complete
- [x] Dark/light variants implemented
- [x] Basic interactions (click, escape)
- [x] Used in production (cart, settings)

### Pending
- [ ] Enhance accessibility (ARIA, keyboard navigation)
- [ ] Add search/filter for long lists
- [ ] Consider option groups
- [ ] Add animations
- [ ] Document for team

---

**Last Updated:** 2025-12-27
