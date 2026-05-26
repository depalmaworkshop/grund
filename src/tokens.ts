/**
 * Grund Design System - Tokens
 *
 * @version wip-3
 * @date 2026-01-21
 * @status Work in Progress
 *
 * ============================================================================
 * VERSION HISTORY
 * ============================================================================
 *
 * wip-3 (2026-01-21) - Current working version
 *   - Changed token prefix from dpws to gds (Grund Design System)
 *   - Updated branding to Grund Design System
 *
 * wip-2 (2026-01-21)
 *   - Updated naming convention to Tailwind (xs, sm, md, lg, xl, 2xl)
 *   - Updated breakpoints and container keys
 *
 * wip-1 (2025-12-27) - Initial version from p-009 implementation
 *   - 11 foundation categories + 4 component sets
 *   - 3-layer structure: Primitive → Semantic → Component
 *   - Based on REI Cedar design system model
 *
 * ============================================================================
 * SOURCE OF TRUTH LOCATION
 * ============================================================================
 *
 * Working file (always edit this file):
 * p-006-design-system-tokens/staging/tokens-wip.ts
 *
 * Completed versions archived in:
 * p-006-design-system-tokens/staging/wip-versions/tokens-wip-N.ts (wip-1, wip-2, etc.)
 *
 * Distributed to:
 * grund/src/tokens.ts (source of truth in Grund repo)
 *
 * GitHub: depalmaworkshop/grund
 * Future NPM: @depalmaworkshop/grund
 *
 * ============================================================================
 * TOKEN STRUCTURE
 * ============================================================================
 *
 * Prefix: gds (Grund Design System)
 * Model: Based on REI Cedar design system
 *
 * Token Layers:
 * 1. Primitive → Raw values (colors, numbers)
 * 2. Semantic → Purpose-based (text-primary, bg-surface)
 * 3. Component → Component-specific (button-padding, modal-backdrop)
 *
 * Naming Convention (REI Cedar style):
 * --gds-[category]-[subcategory]-[state]-[variant]
 *
 * Categories:
 * 1. Color - Palettes, semantic, functional
 * 2. Typography - Families, scales, weights
 * 3. Spacing - Tailwind scale (p-006 decision)
 * 4. Sizing - Containers, content widths, icons
 * 5. Grid & Breakpoints - Responsive system (xs, sm, md, lg, xl, 2xl)
 * 6. Radius - Border rounding
 * 7. Prominence - Shadows, elevation
 * 8. Motion - Animations, transitions, easings
 * 9. Z-Index - Layering system
 * 10. Fluid - Responsive/adaptive values
 * 11. Iconography - Icon sizing
 *
 * ============================================================================
 * CRITICAL TODOs
 * ============================================================================
 *
 * DECIDED: Breakpoint/size naming follows Tailwind convention
 * Using: lowercase (xs, sm, md, lg, xl, 2xl)
 * Affects: breakpoints, containers, all size tokens
 * Note: Also need to update Sanity schemas to match
 *
 * ============================================================================
 * REFERENCES
 * ============================================================================
 *
 * - p-006 research: Open Props, Carbon, Radix comparison
 * - p-006 decisions: Lowercase breakpoints (Tailwind), full spacing scale, CMS-first evolution
 * - CMS design system: Existing breakpoints (S, M, L, XL), spacing, containers
 * - REI Cedar: Comprehensive token structure, naming hierarchy
 * - Current implementation: Tailwind config, Geist fonts (placeholder), existing components
 *
 * ============================================================================
 * EVOLUTION PATH
 * ============================================================================
 *
 * Phase 1 (Now - p-009):
 * - MASTER in this file, fully editable
 * - Placeholder documentation in p-009/work/_meta/design-system/
 * - Learn what we need as we build
 *
 * Phase 2 (Soon - p-009/staging):
 * - Move docs to /staging/_meta/design-system/
 * - Define documentation template structure
 * - Ready for extraction
 *
 * Phase 3 (Eventually - p-006):
 * - Dedicated project: p-006-design-system-tokens
 * - Extract to NPM package
 * - Figma token sync
 * - Full documentation with templates
 */

// =============================================================================
// 1. COLOR TOKENS
// =============================================================================
/**
 * Color System
 *
 * Structure:
 * - Primitive: Raw color values (gray-50 to gray-950, brand colors)
 * - Semantic: Purpose-based (text-primary, bg-surface, border-subtle)
 * - Component: Component-specific overrides
 *
 * Current State:
 * - Using Tailwind colors directly (slate, blue, red, green, yellow)
 * - Glass morphism pattern (white/10, white/20, black/50)
 * - Dark mode only (light mode TODO)
 *
 * TODO:
 * - Define brand color palette
 * - Add light mode variants
 * - Create B2B vs B2C theme tokens
 * - Add colorblind-accessible variants
 *
 * See: /design/docs/foundations/color.md
 */
export const color = {
  // ---------------------------------------------------------------------------
  // PRIMITIVE COLORS (Raw values)
  // ---------------------------------------------------------------------------
  primitive: {
    // Grayscale - Slate (currently using Tailwind slate)
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',  // Currently used for surfaces
      900: '#0f172a',
      950: '#020617',
    },

    // Brand Colors (TODO: Define actual brand palette)
    brand: {
      primary: 'TODO',      // Main brand color
      secondary: 'TODO',    // Secondary brand color
      accent: 'TODO',       // Accent/highlight color
    },

    // Semantic Color Bases (from Tailwind)
    blue: {
      400: '#60a5fa',  // Currently used for focus rings
      500: '#3b82f6',  // Currently used for info states
      600: '#2563eb',
      700: '#1d4ed8',
    },
    green: {
      400: '#4ade80',  // Currently used for success text
      500: '#22c55e',  // Currently used for success backgrounds
    },
    yellow: {
      600: '#ca8a04',  // Currently used for warning states
      700: '#a16207',
    },
    red: {
      400: '#f87171',  // Currently used for danger text
      500: '#ef4444',  // Currently used for error backgrounds
      600: '#dc2626',  // Currently used for danger buttons
      700: '#b91c1c',
    },

    // Static colors (don't change with theme)
    static: {
      white: '#ffffff',
      black: '#000000',
    },
  },

  // ---------------------------------------------------------------------------
  // SEMANTIC COLORS (Purpose-based)
  // ---------------------------------------------------------------------------
  semantic: {
    // Text colors
    text: {
      primary: 'text-[var(--gds-color-text-primary)]',    // Auto-switches: light #171717, dark #ededed
      onFooter: 'text-[var(--gds-color-text-on-footer)]', // Text on footer background
      secondary: 'text-gray-300',         // var(--gds-color-text-secondary) - TODO: add light/dark
      tertiary: 'text-gray-500',          // var(--gds-color-text-tertiary)
      disabled: 'text-gray-500',          // var(--gds-color-text-disabled)
      inverse: 'text-gray-900',           // var(--gds-color-text-inverse) (for light backgrounds)

      // Interactive text
      link: {
        default: 'text-blue-400',         // var(--gds-color-text-link)
        hover: 'hover:text-blue-300',     // var(--gds-color-text-link-hover)
        visited: 'TODO',                  // var(--gds-color-text-link-visited)
      },
    },

    // Background colors
    background: {
      base: 'bg-[var(--gds-color-bg-base)]',           // Main app background (light: #fafafa, dark: #0a0a0a)
      footer: 'bg-[var(--gds-color-bg-footer)]',       // Footer background (light: #0a0a0a, dark: #171717)
      surface: 'bg-slate-800',                          // Cards, modals (TODO: add light/dark variants)
      elevated: 'TODO',                                 // Raised elements
      overlay: 'bg-black/50',                           // Modal backdrops

      // Glass morphism (current pattern)
      glass: {
        light: 'bg-white/10',
        medium: 'bg-white/20',
        heavy: 'TODO',
      },
    },

    // Border colors
    border: {
      default: 'border-white/10',         // var(--gds-color-border-default)
      subtle: 'border-white/10',          // var(--gds-color-border-subtle)
      medium: 'border-white/20',          // var(--gds-color-border-medium)
      strong: 'TODO',                     // var(--gds-color-border-strong)
      focus: 'border-blue-400',           // var(--gds-color-border-focus)
    },

    // Feedback/Status colors
    feedback: {
      success: {
        bg: 'bg-green-500/90',            // var(--gds-color-success-bg)
        border: 'border-green-400',       // var(--gds-color-success-border)
        text: 'text-green-400',           // var(--gds-color-success-text)
      },
      error: {
        bg: 'bg-red-500/90',              // var(--gds-color-error-bg)
        border: 'border-red-400',         // var(--gds-color-error-border)
        text: 'text-red-400',             // var(--gds-color-error-text)
      },
      warning: {
        bg: 'bg-yellow-600',              // var(--gds-color-warning-bg)
        bgHover: 'hover:bg-yellow-700',   // var(--gds-color-warning-bg-hover)
        text: 'TODO',                     // var(--gds-color-warning-text)
      },
      info: {
        bg: 'bg-blue-600',                // var(--gds-color-info-bg)
        bgHover: 'hover:bg-blue-700',     // var(--gds-color-info-bg-hover)
        text: 'text-blue-400',            // var(--gds-color-info-text)
        focus: 'ring-blue-400',           // var(--gds-color-info-focus)
      },
    },
  },
} as const

// =============================================================================
// 2. TYPOGRAPHY TOKENS
// =============================================================================
/**
 * Typography System
 *
 * Current State:
 * - Geist Sans (primary font) - PLACEHOLDER, will change
 * - Geist Mono (monospace) - PLACEHOLDER, will change
 * - Using Tailwind text-* utilities
 *
 * TODO:
 * - Define final font families
 * - Complete type scale
 * - Add line height scale
 * - Add letter spacing scale
 * - Define heading styles (h1-h6)
 * - Add body text styles
 *
 * See: /design/docs/foundations/typography.md
 */
export const typography = {
  // ---------------------------------------------------------------------------
  // FONT FAMILIES
  // ---------------------------------------------------------------------------
  fontFamily: {
    sans: 'var(--font-geist-sans)',       // var(--gds-font-family-sans) - PLACEHOLDER
    mono: 'var(--font-geist-mono)',       // var(--gds-font-family-mono) - PLACEHOLDER
    serif: 'TODO',                        // var(--gds-font-family-serif)

    // Fallback stacks (TODO)
    sansFallback: 'system-ui, -apple-system, sans-serif',
    monoFallback: 'ui-monospace, monospace',
  },

  // ---------------------------------------------------------------------------
  // FONT SIZES (Currently observed in use)
  // ---------------------------------------------------------------------------
  fontSize: {
    xs: 'TODO',                           // var(--gds-font-size-xs)
    sm: 'TODO',                           // var(--gds-font-size-sm)
    base: 'TODO',                         // var(--gds-font-size-base) - Default body
    lg: 'TODO',                           // var(--gds-font-size-lg)
    xl: 'text-xl',                        // var(--gds-font-size-xl) - Modal titles
    '2xl': 'text-2xl',                    // var(--gds-font-size-2xl)
    '3xl': 'text-3xl',                    // var(--gds-font-size-3xl)
    '4xl': 'TODO',                        // var(--gds-font-size-4xl)
  },

  // ---------------------------------------------------------------------------
  // FONT WEIGHTS
  // ---------------------------------------------------------------------------
  fontWeight: {
    normal: 'font-normal',                // var(--gds-font-weight-normal) - 400
    medium: 'font-medium',                // var(--gds-font-weight-medium) - 500
    semibold: 'font-semibold',            // var(--gds-font-weight-semibold) - 600
    bold: 'TODO',                         // var(--gds-font-weight-bold) - 700
  },

  // ---------------------------------------------------------------------------
  // LINE HEIGHTS (TODO)
  // ---------------------------------------------------------------------------
  lineHeight: {
    tight: 'TODO',                        // var(--gds-line-height-tight)
    normal: 'TODO',                       // var(--gds-line-height-normal)
    relaxed: 'TODO',                      // var(--gds-line-height-relaxed)
    loose: 'TODO',                        // var(--gds-line-height-loose)
  },

  // ---------------------------------------------------------------------------
  // LETTER SPACING (TODO)
  // ---------------------------------------------------------------------------
  letterSpacing: {
    tight: 'TODO',                        // var(--gds-letter-spacing-tight)
    normal: 'TODO',                       // var(--gds-letter-spacing-normal)
    wide: 'TODO',                         // var(--gds-letter-spacing-wide)
  },
} as const

// =============================================================================
// 3. SPACING TOKENS
// =============================================================================
/**
 * Spacing System
 *
 * Decision: Full Tailwind Standard Scale (p-006 DESIGN-SYSTEM-MAPPING.md)
 * Base Unit: 0.25rem (4px)
 *
 * Usage: padding, margin, gap
 *
 * Current State: Using Tailwind utilities (p-4, gap-3, etc.)
 *
 * See: /design/docs/foundations/spacing.md
 */
export const spacing = {
  // Full Tailwind scale (35 values)
  // Format: key: [rem value, px value, CSS var]
  0: ['0', '0px', 'var(--gds-space-0)'],
  px: ['1px', '1px', 'var(--gds-space-px)'],
  0.5: ['0.125rem', '2px', 'var(--gds-space-0-5)'],
  1: ['0.25rem', '4px', 'var(--gds-space-1)'],
  1.5: ['0.375rem', '6px', 'var(--gds-space-1-5)'],
  2: ['0.5rem', '8px', 'var(--gds-space-2)'],
  2.5: ['0.625rem', '10px', 'var(--gds-space-2-5)'],
  3: ['0.75rem', '12px', 'var(--gds-space-3)'],
  3.5: ['0.875rem', '14px', 'var(--gds-space-3-5)'],
  4: ['1rem', '16px', 'var(--gds-space-4)'],        // Common padding
  5: ['1.25rem', '20px', 'var(--gds-space-5)'],
  6: ['1.5rem', '24px', 'var(--gds-space-6)'],      // Modal padding
  7: ['1.75rem', '28px', 'var(--gds-space-7)'],
  8: ['2rem', '32px', 'var(--gds-space-8)'],
  9: ['2.25rem', '36px', 'var(--gds-space-9)'],
  10: ['2.5rem', '40px', 'var(--gds-space-10)'],
  11: ['2.75rem', '44px', 'var(--gds-space-11)'],
  12: ['3rem', '48px', 'var(--gds-space-12)'],
  14: ['3.5rem', '56px', 'var(--gds-space-14)'],
  16: ['4rem', '64px', 'var(--gds-space-16)'],      // Input width (w-16)
  20: ['5rem', '80px', 'var(--gds-space-20)'],
  24: ['6rem', '96px', 'var(--gds-space-24)'],
  28: ['7rem', '112px', 'var(--gds-space-28)'],
  32: ['8rem', '128px', 'var(--gds-space-32)'],
  36: ['9rem', '144px', 'var(--gds-space-36)'],
  40: ['10rem', '160px', 'var(--gds-space-40)'],
  44: ['11rem', '176px', 'var(--gds-space-44)'],
  48: ['12rem', '192px', 'var(--gds-space-48)'],
  52: ['13rem', '208px', 'var(--gds-space-52)'],
  56: ['14rem', '224px', 'var(--gds-space-56)'],
  60: ['15rem', '240px', 'var(--gds-space-60)'],
  64: ['16rem', '256px', 'var(--gds-space-64)'],
  72: ['18rem', '288px', 'var(--gds-space-72)'],
  80: ['20rem', '320px', 'var(--gds-space-80)'],
  96: ['24rem', '384px', 'var(--gds-space-96)'],

  // Semantic spacing aliases (TODO: Define based on usage patterns)
  semantic: {
    componentPadding: {
      sm: 'p-2',                          // var(--gds-space-component-padding-sm)
      md: 'p-4',                          // var(--gds-space-component-padding-md)
      lg: 'p-6',                          // var(--gds-space-component-padding-lg)
    },
    componentGap: {
      sm: 'gap-2',                        // var(--gds-space-component-gap-sm)
      md: 'gap-3',                        // var(--gds-space-component-gap-md)
      lg: 'gap-4',                        // var(--gds-space-component-gap-lg)
    },
    sectionSpacing: {
      sm: 'TODO',                         // var(--gds-space-section-sm)
      md: 'TODO',                         // var(--gds-space-section-md)
      lg: 'TODO',                         // var(--gds-space-section-lg)
    },
  },
} as const

// =============================================================================
// 4. SIZING TOKENS
// =============================================================================
/**
 * Sizing System
 *
 * Categories:
 * - Container widths (page layout)
 * - Content widths (readable line lengths)
 * - Component sizes (buttons, inputs, avatars)
 * - Icon sizes
 *
 * Source: CMS design system + Tailwind defaults
 *
 * See: /design/docs/foundations/sizing.md
 */
export const sizing = {
  // ---------------------------------------------------------------------------
  // CONTAINER WIDTHS (From CMS design system)
  // ---------------------------------------------------------------------------
  container: {
    sm: ['640px', 'var(--gds-size-container-sm)'],
    md: ['768px', 'var(--gds-size-container-md)'],
    lg: ['1024px', 'var(--gds-size-container-lg)'],
    xl: ['1280px', 'var(--gds-size-container-xl)'],
    '2xl': ['1536px', 'var(--gds-size-container-2xl)'],
  },

  // ---------------------------------------------------------------------------
  // CONTENT WIDTHS (Character-based for readability)
  // ---------------------------------------------------------------------------
  content: {
    narrow: ['20ch', 'var(--gds-size-content-narrow)'],      // Short headlines
    prose: ['60ch', 'var(--gds-size-content-prose)'],        // Optimal reading width
    wide: ['80ch', 'var(--gds-size-content-wide)'],          // Wide content
  },

  // ---------------------------------------------------------------------------
  // COMPONENT SIZES (TODO: Define when building components)
  // ---------------------------------------------------------------------------
  component: {
    button: {
      sm: 'TODO',                         // var(--gds-size-button-sm)
      md: 'TODO',                         // var(--gds-size-button-md)
      lg: 'TODO',                         // var(--gds-size-button-lg)
    },
    input: {
      sm: 'TODO',                         // var(--gds-size-input-sm)
      md: 'TODO',                         // var(--gds-size-input-md)
      lg: 'TODO',                         // var(--gds-size-input-lg)
    },
    avatar: {
      sm: 'TODO',                         // var(--gds-size-avatar-sm)
      md: 'TODO',                         // var(--gds-size-avatar-md)
      lg: 'TODO',                         // var(--gds-size-avatar-lg)
    },
  },

  // ---------------------------------------------------------------------------
  // ICON SIZES (TODO)
  // ---------------------------------------------------------------------------
  icon: {
    xs: 'TODO',                           // var(--gds-size-icon-xs) - 12px
    sm: 'TODO',                           // var(--gds-size-icon-sm) - 16px
    md: 'TODO',                           // var(--gds-size-icon-md) - 20px
    lg: 'TODO',                           // var(--gds-size-icon-lg) - 24px
    xl: 'TODO',                           // var(--gds-size-icon-xl) - 32px
  },
} as const

// =============================================================================
// 5. GRID & BREAKPOINTS
// =============================================================================
/**
 * Responsive System
 *
 * Decision: Lowercase breakpoint names following Tailwind convention
 * Format: xs, sm, md, lg, xl, 2xl
 *
 * Source: CMS design system (adapted to Tailwind naming)
 * Note: Sanity schemas also need updating to match
 *
 * See: /design/docs/foundations/breakpoints.md
 */
export const breakpoints = {
  // Breakpoint values (Tailwind naming convention)
  xs: ['480px', 'var(--gds-breakpoint-xs)'],       // Extra small devices
  sm: ['640px', 'var(--gds-breakpoint-sm)'],       // Small devices
  md: ['768px', 'var(--gds-breakpoint-md)'],       // Medium devices
  lg: ['1024px', 'var(--gds-breakpoint-lg)'],      // Large devices
  xl: ['1280px', 'var(--gds-breakpoint-xl)'],      // Extra large devices
  '2xl': ['1536px', 'var(--gds-breakpoint-2xl)'],  // 2x extra large

  // Grid configuration (TODO: Define when needed)
  grid: {
    columns: 12,                          // var(--gds-grid-columns)
    gutter: 'TODO',                       // var(--gds-grid-gutter)
    margin: 'TODO',                       // var(--gds-grid-margin)
  },
} as const

// =============================================================================
// 6. RADIUS TOKENS
// =============================================================================
/**
 * Border Radius System
 *
 * Current Pattern: rounded-lg used throughout
 *
 * See: /design/docs/foundations/radius.md
 */
export const radius = {
  none: ['0px', 'var(--gds-radius-none)'],
  sm: ['0.125rem', 'var(--gds-radius-sm)'],        // 2px
  md: ['0.375rem', 'var(--gds-radius-md)'],        // 6px
  lg: ['0.5rem', 'var(--gds-radius-lg)'],          // 8px - Currently used
  xl: ['0.75rem', 'var(--gds-radius-xl)'],         // 12px
  '2xl': ['1rem', 'var(--gds-radius-2xl)'],        // 16px
  '3xl': ['1.5rem', 'var(--gds-radius-3xl)'],      // 24px
  full: ['9999px', 'var(--gds-radius-full)'],      // Fully round

  // Tailwind class equivalents
  tailwind: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  },
} as const

// =============================================================================
// 7. PROMINENCE (SHADOWS & ELEVATION)
// =============================================================================
/**
 * Shadow/Elevation System
 *
 * Current Usage:
 * - shadow-lg: Toast notifications
 * - shadow-2xl: Modals
 *
 * TODO: Define complete elevation scale
 *
 * See: /design/docs/foundations/prominence.md
 */
export const prominence = {
  shadow: {
    sm: ['TODO', 'var(--gds-shadow-sm)'],
    md: ['TODO', 'var(--gds-shadow-md)'],
    lg: ['shadow-lg', 'var(--gds-shadow-lg)'],     // Toast
    xl: ['TODO', 'var(--gds-shadow-xl)'],
    '2xl': ['shadow-2xl', 'var(--gds-shadow-2xl)'], // Modal
    inner: ['TODO', 'var(--gds-shadow-inner)'],
  },

  // Elevation layers (semantic)
  elevation: {
    flat: 'TODO',                         // No shadow
    raised: 'TODO',                       // Subtle elevation
    floating: 'TODO',                     // Cards, dropdowns
    modal: 'shadow-2xl',                  // Modal dialogs
    tooltip: 'TODO',                      // Tooltips, popovers
  },
} as const

// =============================================================================
// 8. MOTION TOKENS
// =============================================================================
/**
 * Motion System
 *
 * Current State:
 * - slide-in-right animation (toast)
 * - transition-colors (buttons, interactive elements)
 *
 * TODO:
 * - Define duration scale
 * - Add easing functions
 * - Create animation presets
 * - Add prefers-reduced-motion handling
 *
 * See: /design/docs/foundations/motion.md
 */
export const motion = {
  // ---------------------------------------------------------------------------
  // DURATIONS
  // ---------------------------------------------------------------------------
  duration: {
    instant: ['50ms', 'var(--gds-duration-instant)'],
    fast: ['150ms', 'var(--gds-duration-fast)'],
    normal: ['300ms', 'var(--gds-duration-normal)'],   // Toast slide-in
    slow: ['500ms', 'var(--gds-duration-slow)'],
    slower: ['700ms', 'var(--gds-duration-slower)'],
  },

  // ---------------------------------------------------------------------------
  // EASING FUNCTIONS
  // ---------------------------------------------------------------------------
  easing: {
    linear: ['linear', 'var(--gds-easing-linear)'],
    in: ['cubic-bezier(0.4, 0, 1, 1)', 'var(--gds-easing-in)'],
    out: ['ease-out', 'var(--gds-easing-out)'],        // Toast slide-in
    inOut: ['cubic-bezier(0.4, 0, 0.2, 1)', 'var(--gds-easing-in-out)'],

    // Expressive easings (TODO)
    elastic: 'TODO',
    bounce: 'TODO',
  },

  // ---------------------------------------------------------------------------
  // TRANSITIONS (Tailwind utilities)
  // ---------------------------------------------------------------------------
  transition: {
    none: 'transition-none',
    all: 'transition-all',
    colors: 'transition-colors',          // Currently used for buttons
    opacity: 'transition-opacity',
    transform: 'transition-transform',
  },

  // ---------------------------------------------------------------------------
  // KEYFRAMES (Custom animations)
  // ---------------------------------------------------------------------------
  keyframes: {
    slideInRight: {
      name: 'slide-in-right',
      definition: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
    },
    // TODO: Add more as needed (fadeIn, fadeOut, scaleUp, etc.)
  },

  // ---------------------------------------------------------------------------
  // ANIMATIONS (Predefined combinations)
  // ---------------------------------------------------------------------------
  animation: {
    slideInRight: 'animate-slide-in-right',   // Used for toast
    // TODO: Add more preset animations
  },
} as const

// =============================================================================
// 9. Z-INDEX TOKENS
// =============================================================================
/**
 * Z-Index Layering System
 *
 * INTEGRATION: Standardizes inconsistent z-index usage
 * Current Issues:
 * - Toast: z-9999 (inline style) vs z-50 (attempted Tailwind)
 * - Modal: z-[10000]
 *
 * Solution: Defined layer system with gaps for flexibility
 *
 * See: /design/docs/foundations/z-index.md
 */
export const zIndex = {
  // Standard layers
  base: [0, 'var(--gds-z-index-base)'],
  dropdown: [1000, 'var(--gds-z-index-dropdown)'],
  sticky: [2000, 'var(--gds-z-index-sticky)'],
  fixed: [3000, 'var(--gds-z-index-fixed)'],
  modalBackdrop: [4000, 'var(--gds-z-index-modal-backdrop)'],
  modal: [4100, 'var(--gds-z-index-modal)'],
  popover: [5000, 'var(--gds-z-index-popover)'],
  toast: [6000, 'var(--gds-z-index-toast)'],         // Standardized
  tooltip: [7000, 'var(--gds-z-index-tooltip)'],

  // Legacy values (to be refactored)
  legacy: {
    toastOld: 9999,                       // ToastContext currently uses this
    modalOld: 10000,                      // ConfirmModal currently uses this
  },
} as const

// =============================================================================
// 10. FLUID TOKENS
// =============================================================================
/**
 * Fluid/Responsive Tokens
 *
 * Values that scale with viewport using clamp()
 * Inspired by REI Cedar's responsive spacing
 *
 * TODO: Define fluid typography, spacing, sizing
 *
 * See: /design/docs/foundations/fluid.md
 */
export const fluid = {
  // Fluid spacing (TODO: Define using clamp())
  spacing: {
    // Example: clamp(min, preferred, max)
    // 1: 'clamp(0.5rem, 0.5rem + 0.5vw, 1rem)',
  },

  // Fluid typography (TODO: Define using clamp())
  fontSize: {
    // Example: clamp(16px, 4vw, 24px)
  },
} as const

// =============================================================================
// 11. ICONOGRAPHY TOKENS
// =============================================================================
/**
 * Icon System
 *
 * Current State: Using HeroIcons (HiTrash in cart)
 *
 * TODO:
 * - Define icon size scale
 * - Standardize icon library
 * - Create icon component wrapper
 *
 * See: /design/docs/foundations/iconography.md
 */
export const iconography = {
  // Icon sizes (TODO: Define based on usage)
  size: {
    xs: ['12px', 'var(--gds-icon-size-xs)'],
    sm: ['16px', 'var(--gds-icon-size-sm)'],
    md: ['20px', 'var(--gds-icon-size-md)'],
    lg: ['24px', 'var(--gds-icon-size-lg)'],
    xl: ['32px', 'var(--gds-icon-size-xl)'],
  },

  // Icon library (TODO: Standardize on one)
  library: {
    current: 'HeroIcons',
    alternative: 'TODO',                  // Lucide? Phosphor? Custom?
  },
} as const

// =============================================================================
// 12. COMPONENT TOKENS
// =============================================================================
/**
 * Component-Specific Tokens
 *
 * These are complete token sets for individual components.
 * Each component has its own .md documentation file.
 *
 * See: /design/docs/components/*.md
 */

// -----------------------------------------------------------------------------
// Toast Component
// See: /design/docs/components/component-toast.md
// -----------------------------------------------------------------------------
export const toast = {
  zIndex: zIndex.toast[0],                // 6000 (standardized)
  minWidth: ['300px', 'var(--gds-toast-min-width)'],
  maxWidth: ['28rem', 'var(--gds-toast-max-width)'],   // max-w-md
  padding: spacing[4],                    // p-4
  borderRadius: radius.lg,                // rounded-lg
  shadow: prominence.shadow.lg,           // shadow-lg
  animation: motion.animation.slideInRight,
  duration: 3000,                         // Auto-dismiss duration (ms)

  // Variants
  variants: {
    success: {
      bg: color.semantic.feedback.success.bg,
      border: color.semantic.feedback.success.border,
      text: color.semantic.text.primary,
    },
    error: {
      bg: color.semantic.feedback.error.bg,
      border: color.semantic.feedback.error.border,
      text: color.semantic.text.primary,
    },
    info: {
      bg: 'bg-blue-500/90',
      border: 'border-blue-400',
      text: color.semantic.text.primary,
    },
  },
} as const

// -----------------------------------------------------------------------------
// Modal Component
// See: /design/docs/components/component-modal.md
// -----------------------------------------------------------------------------
export const modal = {
  zIndex: {
    backdrop: zIndex.modalBackdrop[0],    // 4000
    content: zIndex.modal[0],             // 4100
  },
  backdrop: {
    bg: color.semantic.background.overlay,        // bg-black/50
    blur: 'backdrop-blur-sm',
  },
  container: {
    bg: color.semantic.background.surface,        // bg-slate-800
    border: color.semantic.border.default,        // border-white/10
    borderRadius: radius.lg,              // rounded-lg
    shadow: prominence.shadow['2xl'],     // shadow-2xl
    maxWidth: ['28rem', 'var(--gds-modal-max-width)'],  // max-w-md
    padding: spacing[6],                  // p-6
  },
  title: {
    fontSize: typography.fontSize.xl,     // text-xl
    fontWeight: typography.fontWeight.semibold,  // font-semibold
    color: color.semantic.text.primary,   // text-white
    marginBottom: spacing[3],             // mb-3
  },
  message: {
    color: color.semantic.text.secondary, // text-gray-300
    marginBottom: spacing[6],             // mb-6
  },
  buttons: {
    gap: spacing[3],                      // gap-3
    // Button variants defined below
  },
  variants: {
    danger: {
      confirmBg: 'bg-red-600',
      confirmBgHover: 'hover:bg-red-700',
    },
    warning: {
      confirmBg: color.semantic.feedback.warning.bg,
      confirmBgHover: color.semantic.feedback.warning.bgHover,
    },
    info: {
      confirmBg: color.semantic.feedback.info.bg,
      confirmBgHover: color.semantic.feedback.info.bgHover,
    },
  },
} as const

// -----------------------------------------------------------------------------
// Button Component (TODO: Extract from modal when standardizing)
// See: /design/docs/components/component-button.md
// -----------------------------------------------------------------------------
export const button = {
  base: {
    padding: 'px-4 py-2',                 // TODO: Define size variants
    borderRadius: radius.lg,
    transition: motion.transition.colors,
    fontWeight: typography.fontWeight.medium,
  },
  variants: {
    primary: 'TODO',
    secondary: {
      bg: 'bg-white/10',
      bgHover: 'hover:bg-white/20',
      text: color.semantic.text.primary,
    },
    danger: {
      bg: 'bg-red-600',
      bgHover: 'hover:bg-red-700',
      text: color.semantic.text.primary,
    },
    ghost: 'TODO',
  },
  states: {
    disabled: {
      opacity: 'disabled:opacity-50',
      cursor: 'disabled:cursor-not-allowed',
    },
  },
} as const

// -----------------------------------------------------------------------------
// Input Component (TODO: Define when building forms)
// See: /design/docs/components/component-input.md
// -----------------------------------------------------------------------------
export const input = {
  base: {
    bg: color.semantic.background.glass.light,      // bg-white/10
    border: color.semantic.border.default,          // border-white/20
    borderRadius: radius.md,              // rounded
    padding: 'px-2 py-1',                 // TODO: Define size variants
    color: color.semantic.text.primary,   // text-white
  },
  states: {
    focus: {
      outline: 'focus:outline-none',
      ring: 'focus:ring-2',
      ringColor: color.semantic.feedback.info.focus,  // focus:ring-blue-400
    },
    disabled: {
      opacity: 'disabled:opacity-50',
    },
  },
} as const

// -----------------------------------------------------------------------------
// Select Component (Custom dropdown replacing native select)
// See: /design/docs/components/component-select.md
// -----------------------------------------------------------------------------
export const select = {
  // Base sizing/spacing (shared across variants)
  base: {
    borderRadius: radius.md,                // rounded
    padding: 'px-3 py-2',
    transition: motion.transition.colors,
  },

  // Dropdown shared properties
  dropdown: {
    borderRadius: radius.lg,                // rounded-lg
    shadow: prominence.shadow.lg,           // shadow-lg
    maxHeight: '16rem',                     // max-h-64 (256px)
    padding: spacing[2],                    // p-2
    marginTop: spacing[1],                  // mt-1 (gap from trigger)
    zIndex: 9999,                           // High z-index to appear above everything
  },

  // Checkmark (shared across variants)
  checkmark: {
    size: 'w-5 h-5',
  },

  // States (shared across variants)
  states: {
    disabled: {
      opacity: 'disabled:opacity-50',
      cursor: 'disabled:cursor-not-allowed',
    },
  },

  // Variant-specific styles
  variants: {
    // Dark variant (for dark backgrounds - cart, main site)
    dark: {
      trigger: {
        bg: color.semantic.background.glass.light,        // bg-white/10
        bgHover: 'hover:bg-white/20',
        border: color.semantic.border.default,            // border-white/20
        color: color.semantic.text.primary,               // text-white
      },
      dropdown: {
        bg: color.semantic.background.surface,            // bg-slate-800
        border: color.semantic.border.default,            // border-white/10
      },
      option: {
        color: color.semantic.text.primary,               // text-white
        bgHover: 'hover:bg-white/10',
        bgSelected: color.semantic.background.glass.medium,  // bg-white/20
      },
      checkmark: {
        color: color.semantic.feedback.success.text,      // text-green-400
      },
    },
    // Light variant (for white backgrounds - settings, modals)
    light: {
      trigger: {
        bg: 'bg-white',
        bgHover: 'hover:bg-gray-50',
        border: 'border-gray-300',
        color: 'text-gray-900',
      },
      dropdown: {
        bg: 'bg-white',
        border: 'border-gray-300',
      },
      option: {
        color: 'text-gray-900',
        bgHover: 'hover:bg-gray-100',
        bgSelected: 'bg-gray-100',
      },
      checkmark: {
        color: 'text-green-600',
      },
    },
  },
} as const

// =============================================================================
// EXPORTS
// =============================================================================
/**
 * Export all token categories
 *
 * Usage:
 * import { color, typography, spacing } from '@/design/tokens'
 *
 * const primaryText = color.semantic.text.primary  // 'text-white'
 * const modalPadding = modal.container.padding     // spacing[6]
 */
export const tokens = {
  color,
  typography,
  spacing,
  sizing,
  breakpoints,
  radius,
  prominence,
  motion,
  zIndex,
  fluid,
  iconography,
  // Components
  toast,
  modal,
  button,
  input,
  select,
} as const

// Export individual categories for convenience
export default tokens
