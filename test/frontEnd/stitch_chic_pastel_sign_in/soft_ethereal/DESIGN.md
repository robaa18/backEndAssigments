---
name: Soft Ethereal
colors:
  surface: '#fefccf'
  surface-dim: '#dedcb1'
  surface-bright: '#fefccf'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f6c9'
  surface-container: '#f2f0c4'
  surface-container-high: '#eceabe'
  surface-container-highest: '#e6e5b9'
  on-surface: '#1d1d03'
  on-surface-variant: '#4f4446'
  inverse-surface: '#323214'
  inverse-on-surface: '#f5f3c7'
  outline: '#817476'
  outline-variant: '#d3c3c5'
  surface-tint: '#78555e'
  primary: '#78555e'
  on-primary: '#ffffff'
  primary-container: '#ffd1dc'
  on-primary-container: '#7a5761'
  inverse-primary: '#e7bbc6'
  secondary: '#7b5455'
  on-secondary: '#ffffff'
  secondary-container: '#fecbcb'
  on-secondary-container: '#7a5354'
  tertiary: '#5c5d6e'
  on-tertiary: '#ffffff'
  tertiary-container: '#dbdbef'
  on-tertiary-container: '#5e6070'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e2'
  primary-fixed-dim: '#e7bbc6'
  on-primary-fixed: '#2d141c'
  on-primary-fixed-variant: '#5e3e47'
  secondary-fixed: '#ffdad9'
  secondary-fixed-dim: '#ecbaba'
  on-secondary-fixed: '#2f1314'
  on-secondary-fixed-variant: '#613d3e'
  tertiary-fixed: '#e1e1f5'
  tertiary-fixed-dim: '#c5c5d8'
  on-tertiary-fixed: '#191b29'
  on-tertiary-fixed-variant: '#444655'
  background: '#fefccf'
  on-background: '#1d1d03'
  surface-variant: '#e6e5b9'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The design system is built upon a "Soft Ethereal" aesthetic that balances high-end sophistication with a playful, approachable warmth. The target audience values aesthetics, wellness, and self-expression. The UI should evoke an emotional response of calm, delight, and "digital comfort."

The style is a hybrid of **Soft Minimalism** and **Refined Glassmorphism**. It utilizes generous whitespace, delicate pastel layering, and translucent surfaces to create a sense of depth without weight. Visual elements should feel "pillowy" and tactile, avoiding any harsh transitions or sharp angles.

## Colors

The palette is anchored in a trio of soft pastels supported by a rich cream base. 

- **Primary (Pastel Pink):** Used for primary actions, active states, and brand-heavy moments.
- **Secondary (Tea Rose):** Used for subtle accents, hover states, and secondary emphasis.
- **Tertiary (Lavender):** Provides a cool counterpoint to the warm pinks, used for informational elements or category distinctions.
- **Neutral (Cream):** This is the primary background color. Do not use pure white (#FFFFFF) for surfaces; use Cream to maintain the "soft" look.
- **Text:** To avoid high-contrast harshness, the "Main Text" is a warm charcoal-brown rather than pure black.

## Typography

This design system uses a high-contrast typographic pairing to achieve its "Playful yet Sophisticated" goal.

- **Headlines:** Use **Playfair Display**. Its elegant serifs provide a classic, editorial feel. Use tighter letter spacing for large display text to create a modern, high-fashion look.
- **UI & Body:** Use **Plus Jakarta Sans**. Its soft, rounded terminals and open apertures mirror the "girly" aesthetic while remaining exceptionally legible.
- **Scale:** Maintain a clear hierarchy. Mobile headlines should scale down slightly to prevent awkward line breaks, while body text remains consistent for accessibility.

## Layout & Spacing

The layout philosophy is **Organic and Fluid**. Avoid rigid, grid-locked structures in favor of "breathing" compositions.

- **The Grid:** Use a 12-column system for desktop with a maximum container width of 1200px. For mobile, shift to a single-column layout with 20px side margins.
- **Rhythm:** Use an 8px base unit. Negative space is a primary design tool—err on the side of "too much" space to maintain the light, ethereal feel.
- **Alignment:** While the system uses a grid, use off-center alignments or overlapping elements (e.g., an image overlapping a text container) to break the "corporate" feel.

## Elevation & Depth

Depth in this design system is achieved through **Soft Layering** rather than traditional shadows.

1.  **Glassmorphism:** Use for floating navigation, modals, and overlaying cards. Set background blur to `20px` with a white fill at `60%` opacity and a subtle `1px` white border at `40%` opacity.
2.  **Ambient Shadows:** When shadows are necessary (e.g., for buttons), use an "Ethereal Glow" style. Shadows should be large, very diffused, and tinted with the primary pink color (#FFD1DC) at very low opacity (15-20%) rather than neutral grey.
3.  **Tonal Layers:** Use subtle shifts between Cream (#FFFDD0) and very light Lavender (#F9F9FF) to distinguish content sections without hard lines.

## Shapes

The shape language is dominated by **Extreme Circularity**. There are no sharp corners in the design system.

- **Components:** Buttons, input fields, and tags should be fully pill-shaped (rounded-xl).
- **Cards:** Use a large 32px (2rem) radius for content containers to create a soft, inviting frame.
- **Images:** All images should have at least a 24px corner radius. Circular masks are encouraged for profile avatars and decorative icons.

## Components

### Buttons
Primary buttons are pill-shaped, using the Primary Pink color with a soft Lavender shadow. Text should be in the Label-MD style. Hover states should include a subtle scale-up (1.02x) to enhance the "squishy" tactile feel.

### Input Fields
Inputs should have a Cream background with a thin 1px border in a slightly darker Pink. The focus state should utilize a "glow" effect using a 4px soft shadow in Lavender.

### Cards & Containers
Cards should use the Glassmorphism specification defined in Elevation. Use internal padding of `md` (24px) or `lg` (48px) to ensure content doesn't feel cramped.

### Chips & Tags
Small, pill-shaped tags using the Lavender or Tea Rose colors. These should have a "semi-flat" look with no shadow to distinguish them from actionable buttons.

### Interactive Elements
Checkboxes and Radios must be highly rounded. Use a Lavender fill for selected states with a white checkmark/dot. Avoid standard browser styling; every interactive element must feel custom and "soft."