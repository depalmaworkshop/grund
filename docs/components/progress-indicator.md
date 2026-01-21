---
component: Progress Indicator
category: feedback
status: planning
priority: high
version: wip-2
created: 2025-12-27
updated: 2026-01-21T13:26
cedar_url: https://cedar.rei.com/components/breadcrumb (similar pattern)
carbon_url: https://carbondesignsystem.com/components/progress-indicator/usage
atlassian_url: https://atlassian.design/components/progress-tracker
website_path: src/app/checkout/page.tsx (state-based, needs UI component)
uses_tokens: false
has_variants: true
responsive: true
token_prefix: gds-progress-indicator
token_categories:
  - spacing
  - color
  - typography
  - sizing
---

# Progress Indicator

## Overview

> [!TODO] Build Missing UI Component
> - [ ] Design visual progress indicator for checkout flow
> - [ ] Build ProgressIndicator component from scratch
> - [ ] Add to `checkout/page.tsx` to visualize existing step state
> - [ ] Support horizontal (desktop) and vertical (mobile) layouts
> - [ ] Add step navigation (allow going back)

> [!TODO]
> Review Carbon Progress Indicator and Atlassian Progress Tracker - they have excellent patterns

**Purpose:** Shows user's progress through a multi-step process
**Use cases:**
- Checkout flow (current use case: shipping → payment → review)
- Multi-step forms
- Onboarding flows
- Guided processes

**Current Implementation:** State management exists (`step` in checkout/page.tsx) but no UI component

**Current State Management:**
```tsx
const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
```

---

## Anatomy

> [!TODO]
> Define structure - Carbon has good horizontal stepper pattern

```
Horizontal (Desktop):
┌─────────────────────────────────────────────────┐
│  ●━━━━━  ●━━━━━  ○                              │
│  Step 1   Step 2   Step 3                       │
│  Label    Label    Label                        │
└─────────────────────────────────────────────────┘

Vertical (Mobile):
┌──────────────┐
│  ● Step 1    │
│  │ Label     │
│  │           │
│  ● Step 2    │
│  │ Label     │
│  │           │
│  ○ Step 3    │
│    Label     │
└──────────────┘
```

**Elements:**
- Step indicator (circle/number/icon) (required)
- Connector line between steps (required)
- Step label (required)
- Step description (optional)
- Current step highlight (required)
- Completed step checkmark (optional)

---

## Variants

> [!TODO]
> Review Carbon and Atlassian variants

### By Orientation
- **Horizontal** - Desktop, wide screens (default)
- **Vertical** - Mobile, narrow screens, sidebars

### By Display Style
- **Numbered** - Shows step numbers (1, 2, 3)
- **Icons** - Shows custom icons per step
- **Dots** - Simple dots for step indicators
- **Checkmarks** - Shows checkmark for completed steps

### By Interactivity
- **Read-only** - Shows progress, no navigation
- **Interactive** - Click to navigate to previous steps
- **Clickable labels** - Click label to navigate

### By State (Per Step)
- **Incomplete** - Not yet reached
- **Current** - Active step (highlighted)
- **Complete** - Finished step
- **Error** - Step with validation errors
- **Disabled** - Cannot navigate to this step

### By Theme
- Light
- Dark (checkout currently uses dark theme)

---

## Tokens

> [!TODO]
> Define comprehensive token set

### Foundation Tokens

| Token                                             | Value | Purpose                           |
| ------------------------------------------------- | ----- |:--------------------------------- |
| `gds-sizing-progress-indicator-circle`           | TBD   | Circle/dot size                   |
| `gds-sizing-progress-indicator-line-thickness`   | TBD   | Connector line thickness          |
| `gds-spacing-progress-indicator-step-gap`        | TBD   | Gap between steps (horizontal)    |
| `gds-spacing-progress-indicator-vertical-gap`    | TBD   | Gap between steps (vertical)      |
| `gds-spacing-progress-indicator-label-margin`    | TBD   | Space between indicator and label |
| `gds-typography-progress-indicator-label-size`   | TBD   | Label font size                   |
| `gds-typography-progress-indicator-label-weight` | TBD   | Label font weight                 |
| `gds-typography-progress-indicator-desc-size`    | TBD   | Description font size             |
| `gds-color-progress-indicator-incomplete`        | TBD   | Incomplete step color             |
| `gds-color-progress-indicator-current`           | TBD   | Current step color                |
| `gds-color-progress-indicator-complete`          | TBD   | Complete step color               |
| `gds-color-progress-indicator-line`              | TBD   | Connector line color              |

### Component-Specific Tokens

```typescript
progressIndicator: {
  base: {
    circleSize: string
    lineThickness: string
    transition: string
  },
  horizontal: {
    stepGap: string
    alignment: 'center' | 'flex-start'
  },
  vertical: {
    stepGap: string
    lineHeight: string
  },
  indicator: {
    size: string
    borderWidth: string
  },
  label: {
    fontSize: string
    fontWeight: string
    marginTop: string
  },
  description: {
    fontSize: string
    marginTop: string
  },
  variants: {
    dark: {
      incomplete: { bg, border, color, line },
      current: { bg, border, color, line },
      complete: { bg, border, color, line },
      label: { color, colorCurrent, colorComplete },
      description: { color }
    },
    light: {
      // Same structure
    }
  },
  states: {
    error: { bg, border, color },
    disabled: { opacity, cursor }
  }
}
```

---

## Props/API

> [!TODO]
> Complete interface

```typescript
interface Step {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
  error?: boolean
}

interface ProgressIndicatorProps {
  // Steps
  steps: Step[]
  currentStep: string

  // Behavior
  interactive?: boolean
  onStepClick?: (stepId: string) => void
  allowSkip?: boolean // Can jump to future steps

  // Style
  orientation?: 'horizontal' | 'vertical'
  displayStyle?: 'numbered' | 'icons' | 'dots'
  showCheckmarks?: boolean
  showDescriptions?: boolean
  theme?: 'dark' | 'light'

  // Accessibility
  ariaLabel?: string

  // Misc
  className?: string
}
```

---

## Behavior

> [!TODO]
> Document interaction behaviors

### Interactions
- **Current step:** Highlighted, visually distinct
- **Completed steps:** Different color, optional checkmark
- **Click navigation:** Jump to previous steps (if interactive)
- **Linear flow:** Can't skip ahead (unless allowSkip)
- **Error handling:** Show error state on invalid steps

### Edge Cases
- Single step → show indicator but no connectors
- All steps complete → show final completion state
- Error on previous step → can't proceed forward
- Disabled steps → can't navigate to them

**Checkout Flow Example:**
```tsx
// Current state management (no UI)
const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')

// Progress indicator should show:
// Shipping (complete) → Payment (current) → Review (incomplete)
```

---

## Responsive Behavior

> [!TODO]
> Mobile-first considerations

| Breakpoint       | Behavior Changes                            |
| ---------------- |:------------------------------------------- |
| XS (0-639px)     | Switch to vertical orientation, stack steps |
| SM (640-767px)   | Vertical or compact horizontal              |
| MD (768-1023px)  | Horizontal with labels                      |
| LG (1024-1279px) | Full horizontal with descriptions           |
| XL (1280+px)     | Full horizontal with descriptions           |

---

## Accessibility

> [!TODO]
> Complete ARIA requirements

### ARIA Attributes
- `role="progressbar"` - Or `role="navigation"` if interactive
- `aria-label="Checkout progress"` - Overall component
- `aria-current="step"` - Current step
- `aria-label` - Per step (e.g., "Step 1 of 3: Shipping")
- `aria-disabled="true"` - Disabled steps
- `aria-invalid="true"` - Steps with errors

### Keyboard Support
- `Tab` - Focus navigation between steps (if interactive)
- `Enter/Space` - Activate step (if interactive)
- `Arrow keys` - Navigate between steps (if interactive)

### Screen Readers
- Announce current step
- Announce total number of steps
- Announce step completion status
- Announce when moving to new step

### Focus Management
- Focus moves to new step content when navigating
- Clear visual focus indicators
- Skip links to jump to step content

---

## Usage Guidelines

> [!TODO]
> Best practices

### When to Use
- ✅ Multi-step processes (checkout, forms, setup)
- ✅ 3-7 steps (optimal range)
- ✅ Linear workflows where order matters
- ✅ When user needs context of overall progress

### When NOT to Use
- ❌ Single-step processes (use heading instead)
- ❌ >10 steps (too complex, break into sections)
- ❌ Non-linear workflows (use tabs instead)
- ❌ When step order can change dynamically

### Best Practices
- Keep step labels short (1-2 words)
- Use present tense for labels ("Shipping" not "Ship")
- Show total steps (Step 1 of 3)
- Provide visual feedback for progress
- Allow navigation to previous steps
- Don't allow skipping required steps
- Consider mobile layout early

---

## Examples

> [!TODO]
> Add examples once implemented

### Checkout Flow (Current Use Case)
```tsx
<ProgressIndicator
  steps={[
    { id: 'shipping', label: 'Shipping', description: 'Address & delivery' },
    { id: 'payment', label: 'Payment', description: 'Choose payment method' },
    { id: 'review', label: 'Review', description: 'Confirm order' }
  ]}
  currentStep={step}
  interactive
  onStepClick={(stepId) => {
    // Only allow going back, not forward
    const stepIndex = steps.findIndex(s => s.id === stepId)
    const currentIndex = steps.findIndex(s => s.id === step)
    if (stepIndex < currentIndex) {
      setStep(stepId)
    }
  }}
  theme="dark"
/>
```

### Onboarding Flow
```tsx
<ProgressIndicator
  steps={[
    { id: 'profile', label: 'Profile', icon: <HiUser /> },
    { id: 'preferences', label: 'Preferences', icon: <HiCog /> },
    { id: 'complete', label: 'Complete', icon: <HiCheckCircle /> }
  ]}
  currentStep={currentStep}
  displayStyle="icons"
  showCheckmarks
  orientation="horizontal"
/>
```

### Form with Error
```tsx
<ProgressIndicator
  steps={[
    { id: 'personal', label: 'Personal Info', error: hasErrors },
    { id: 'business', label: 'Business Info' },
    { id: 'review', label: 'Review' }
  ]}
  currentStep="business"
  interactive={false}
/>
```

---

## Design Decisions

> [!TODO]
> Document decisions during implementation

### Token Choices
- Circle size: balance visibility and compactness
- Line thickness: visible but not overwhelming
- Colors: sufficient contrast for accessibility

### Variant Strategy
- Horizontal vs vertical: when to switch?
- Interactive by default or explicit prop?
- Show checkmarks always or optional?

### Implementation Approach
- Pure CSS or SVG for connectors?
- Responsive: media queries or JS measurement?
- State management: controlled vs uncontrolled?

---

## Related Components

- **Tabs** - For non-linear navigation
- **Breadcrumbs** - For hierarchical navigation
- **Pagination** - For paged content
- **Progress Bar** - For continuous progress (loading, uploading)

---

## References

### External Design Systems
- [Carbon Progress Indicator](https://carbondesignsystem.com/components/progress-indicator/usage) ⭐ Excellent patterns
- [Atlassian Progress Tracker](https://atlassian.design/components/progress-tracker) ⭐ Great examples
- [Cedar Breadcrumb](https://cedar.rei.com/components/breadcrumb) (similar visual pattern)

### Internal Resources
- Current: `src/app/checkout/page.tsx` step state management
- Tokens: TBD in `/staging/tokens-wip.ts` → `gds-progress-indicator-*`
- Icons: HiCheckCircle for checkmarks

---

## Status & Todo

### Completed
- [x] Identified current use case (checkout flow)
- [x] Initial component planning
- [ ] Token requirements defined
- [ ] Component design
- [ ] Component implementation
- [ ] Token integration
- [ ] Tests written
- [ ] Accessibility verified
- [ ] Documentation complete

### Pending
- [ ] Review Carbon and Atlassian implementations in detail
- [ ] Define exact token values
- [ ] Design visual appearance (circle size, colors, spacing)
- [ ] Build component
- [ ] Add to checkout page
- [ ] Test responsive behavior (horizontal → vertical)
- [ ] Keyboard navigation testing
- [ ] Screen reader testing

---

**Last Updated:** 2025-12-27
