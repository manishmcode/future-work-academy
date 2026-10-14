# FutureWorkAcademy

> FutureWorkAcademy is an online learning platform offering practical video courses and instructor-led live classes for AI productivity, personal productivity, remote work, freelancing, and online business development.

## Public Pages

- [Home](https://futureworkacademy.net/): Overview of FutureWorkAcademy, including AI productivity, personal productivity, remote work, freelancing, online business development, video courses, and live classes.
- [Pricing](https://futureworkacademy.net/pricing/): Information about pricing, subscription plans, and included learning features.
- [Unsubscribe](https://futureworkacademy.net/unsubscribe/): Information and options for unsubscribing from the service.
- [Privacy Policy](https://futureworkacademy.net/privacy-policy/): Information about privacy and personal data handling.
- [Terms & Conditions](https://futureworkacademy.net/terms-conditions/): Terms and conditions governing use of the platform.
- [Imprint](https://futureworkacademy.net/imprint/): Legal and company information about FutureWorkAcademy.

## Open Graph Image And Hero Asset

- Open Graph file: `public/images/og-image.webp` (1200x630, 1.91:1, center cover crop, no stretch)
- Open Graph URL: `https://futureworkacademy.net/images/og-image.webp`
- Homepage hero: `public/images/futurework-learning-hero.webp`

`live-class-mockup.webp` remains in the repo for legacy references, but the current homepage uses `futurework-learning-hero.webp`.

## Structured Data Assets

Deploy these files under `public/` so schema URLs resolve:

| File | URL |
|------|-----|
| Site logo | `public/images/logo.webp` -> `https://futureworkacademy.net/images/logo.webp` |
| Basic plan | `public/images/pricing/basic-plan.webp` |
| Classic plan | `public/images/pricing/classic-plan.webp` |
| Premium plan | `public/images/pricing/premium-plan.webp` |

JSON-LD is one `application/ld+json` block per page with a single root `WebPage` and nested entities (see `src/seo/structuredData.ts`).

## LLM Metadata

- File: `public/llms.txt`
- Canonical URL: `https://futureworkacademy.net/llms.txt`
