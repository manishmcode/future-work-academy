# FutureWorkAcademy

> FutureWorkAcademy is an online learning platform offering AI and technology courses, practical learning resources, and live instructor-led guidance to help learners develop technology skills and apply them in real-world contexts.

## Public pages

- [Home](https://futureworkacademy.net/): Overview of FutureWorkAcademy, including AI and technology education, learning features, courses, and live instructor guidance.
- [Pricing](https://futureworkacademy.net/pricing/): Information about pricing, subscription plans, and included learning features.
- [Unsubscribe](https://futureworkacademy.net/unsubscribe/): Information and options for unsubscribing from the service.
- [Privacy Policy](https://futureworkacademy.net/privacy-policy/): Information about privacy and personal data handling.
- [Terms & Conditions](https://futureworkacademy.net/terms-conditions/): Terms and conditions governing use of the platform.
- [Imprint](https://futureworkacademy.net/imprint/): Legal and company information about FutureWorkAcademy.

## Open Graph image

- File: `public/images/og-image.webp` (1200×630, 1.91:1, center cover crop, no stretch)
- Canonical URL: `https://futureworkacademy.net/images/og-image.webp`
- Regenerate from a master asset: `npm run build:og-image -- public/images/your-master.webp`

`live-class-mockup.webp` is kept in sync for legacy URLs and the home hero.

## Structured data assets (WebP)

Deploy these files under `public/` so schema URLs resolve:

| File | URL |
|------|-----|
| Site logo | `public/images/logo.webp` → `https://futureworkacademy.net/images/logo.webp` |
| Basic plan | `public/images/pricing/basic-plan.webp` |
| Classic plan | `public/images/pricing/classic-plan.webp` |
| Premium plan | `public/images/pricing/premium-plan.webp` |

JSON-LD is one `application/ld+json` block per page with a single root `WebPage` and nested entities (see `src/seo/structuredData.ts`).
