---
status: placeholder
created: 2025-12-26
purpose: Initial structure - not ready for publication
updated: 2026-01-21T13:27
---

# Modal Component

Blocking dialogs for critical confirmations.

## Key Info

**Behavior:**
- Centered on screen
- Backdrop blur
- Focus trapped
- Dismissible (Escape key)

**Variants:**
- Danger (red) - destructive actions
- Warning (yellow) - important decisions
- Info (blue) - general confirmations

## Tokens

```typescript
modal.zIndex.backdrop    // 4000
modal.zIndex.content     // 4100
modal.container.padding  // spacing[6] (24px)
modal.container.shadow   // shadow-2xl
```

## Usage

```typescript
import ConfirmModal from '@/components/ConfirmModal'

<ConfirmModal
  isOpen={showModal}
  title="Remove Item"
  message="Remove this item from cart?"
  variant="danger"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

## Current Implementation

- Location: `/src/components/ConfirmModal.tsx`

## TODO

- [ ] Add loading state for async actions
- [ ] Add size variants (sm, md, lg)
- [ ] Add form support
- [ ] Implement stacked buttons for mobile
- [ ] Add animation (fade/scale)
- [ ] Respect prefers-reduced-motion

---

**Note:** This is a placeholder with initial information only. Not ready for publication. Awaiting documentation template structure.

**See:** `src/tokens.ts` for complete token definitions
