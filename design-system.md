# Damietta Furniture - Design System & Architecture Guide

## 1. Design Principles
- **Spatial Confidence:** Furniture cannot be touched online. We compensate with precise scale communication, lifestyle photography, and detailed dimension diagrams.
- **Material Honesty:** We sell solid wood, not MDF. Photography must highlight grain, joints, and textures. Avoid rendering flat, lifeless surfaces.
- **Craft Pride:** Show the workshop, name the craftsmen. Provenance (Damietta) is our primary trust signal.
- **Conversion Architecture:** Remove friction. Show BNPL on PDPs, make delivery clear, make returns human-readable, prioritize WhatsApp for consultation.

## 2. The Spatial Confidence System
Six layers to replace the showroom experience:
1. **Visual Context:** Lifestyle room scenes with human scale.
2. **Material Language:** Macro texture shots of grain/upholstery.
3. **Dimensional Clarity:** 2D orthographic line drawings. "Fits through 80cm door."
4. **Craft Evidence:** Workshop process photos and craftsman profiles.
5. **Social Proof:** Granular reviews detailing delivery and material feel.
6. **Risk Reduction:** Transparent delivery costs, visible 30-day returns.

## 3. Photography Art Direction
Every product requires 6 shots:
1. Primary: Lifestyle room scene.
2. Studio: Product only, clean background.
3. Texture: Macro detail (grain, weave).
4. Scale: Side profile with context.
5. Detail: Specific feature (joint, handle).
6. Angle: Alternate view (back/interior).
*Rule:* Warm toning across all images. No cold whites unless in `bold-contemporary` personality.

## 4. Token System
Located in `tokens.css`.
- Uses fluid typography via `clamp()`.
- Spacing is based on an 8pt scale (`--space-1` to `--space-32`).
- Semantic colors (`--color-background`, `--color-surface`, `--color-accent`) designed for easy personality overrides.

## 5. Material Token System
Semantic wood and fabric hex codes to ensure consistent badging and swatch rendering across the site.
- Woods: Oak, Walnut, Pine, Ebony, Ash, Mahogany.
- Fabrics: Linen, Velvet, Leather, Boucle, Cotton.

## 6. Typography Guide
- **Display:** Evocative headers. (e.g., Playfair Display)
- **Body:** Readable, warm serif or clean sans-serif. (e.g., Source Serif 4)
- **Label:** UI elements, uppercase friendly. (e.g., Lato)
- **Arabic:** Specialized WOFF2 fonts for RTL support (e.g., Amiri, Cairo) mapped when `[dir="rtl"]` is active.

## 7. Component API
Located in `components.css`. Follows BEM (`.product-card`, `.product-card__image`).
- Buttons (`.btn--primary`, `.btn--secondary`)
- Cards (`.product-card`, `.testimonial-card`)
- Inputs, Accordions, Swatch Grids.

## 8. Product Detail Page (PDP)
The most critical page (`product.html`). Mandatory elements:
- Category material badge.
- BNPL installment pricing.
- Spatial fit guide.
- Clear delivery and return policies near CTA.
- WhatsApp consultation link.
- Sticky Add-to-Cart bar on scroll.

## 9. Gallery and Filter System
Filters are organized by intent, not taxonomy:
- Room, Style, Material, Dimension.
- `gallery.html` uses a responsive grid with hover-alternate lifestyle imagery.

## 10. Custom Order Flow
`custom-order.html` outlines the bespoke process:
- Exact dimensions, material choice, direct from maker.
- WhatsApp is the primary CTA due to regional market preference.

## 11. Arabic/RTL Implementation
Located in `rtl.css`.
- Use logical properties in base CSS (`margin-inline`, `padding-block`).
- Explicit RTL flips triggered by `[dir="rtl"]`.
- Base Arabic font size increased by 5%, line-height adjusted to 1.8 to accommodate descenders.

## 12. Accessibility Audit Checklist
- Target: WCAG 2.1 AA.
- `aria-label` and `role` attributes used on swatches, breadcrumbs, accordions.
- Contrast verified on all primary text against background.
- Focus states visible (`:focus-visible`).
- Motion obeys `@media (prefers-reduced-motion: reduce)`.

## 13. Mobile UX Guide
- Minimum 48x48 tap targets.
- Horizontal scroll snapping for categories.
- Touch gesture readiness for product galleries.

## 14. Performance Guide
- Target LCP < 2.5s.
- Hero images `loading="eager"`, below fold `loading="lazy"`.
- Use `<picture>` with AVIF/WebP and explicit width/height to prevent CLS.

## 15. Conversion Architecture
Anti-patterns avoided: No hidden return policies, no infinite scroll without state restoration, no missing price/delivery details.

## 16. WhatsApp Integration
Integrated via `wa.me` links across PDP and Contact pages. High priority for the Egyptian market.

## 17. Brand Personality Switching
Switch personalities by loading one of the stylesheets in `/brand-personalities/` after `tokens.css`.
- `artisan-heritage.css`
- `luxe-editorial.css`
- `scandinavian-modern.css`
- `mediterranean-warmth.css`
- `bold-contemporary.css`

## 18. Damietta Market Context
The brand narrative centers heavily on the city's legacy. Trust is built by showing craftsmen and proving the item is not a cheap import. Payment methods highlight regional standards (Vodafone Cash, InstaPay).
