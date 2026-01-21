---
status: placeholder
created: 2025-12-26
purpose: Initial structure - not ready for publication
updated: 2026-01-21T13:27
---

# Toast Component

Brief, non-intrusive feedback notifications.

## Key Info

**Behavior:**
- Slides in from top-right
- Auto-dismisses (3 seconds)
- Non-blocking

**Variants:**
- Success (green) - confirmations
- Error (red) - failures
- Info (blue) - general updates

## Tokens

```typescript
toast.zIndex       // 6000
toast.padding      // spacing[4] (16px)
toast.borderRadius // rounded-lg (8px)
toast.animation    // slide-in-right
toast.duration     // 3000ms
```

## Usage

```typescript
import { useToast } from '@/contexts/ToastContext'

showToast('Item added to cart', 'success')
```

## Current Implementation

- Location: `/src/components/Toast.tsx`
- Context: `/src/contexts/ToastContext.tsx`

## TODO

- [ ] Add warning variant
- [ ] Implement manual dismiss button
- [ ] Add icon support
- [ ] Implement toast queue
- [ ] Add keyboard dismiss (Escape)
- [ ] Respect prefers-reduced-motion

---

**Note:** This is a placeholder with initial information only. Not ready for publication. Awaiting documentation template structure.

**See:** `website/src/design/tokens.ts` for complete token definitions
