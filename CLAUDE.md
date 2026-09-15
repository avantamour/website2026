# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output to dist/
npm run preview    # serve dist/ on http://localhost:4321
npm run check      # astro check (typecheck + content collection validation)
```

There is no test runner, no linter, and no formatter configured. `astro check` is the only correctness gate — run it before declaring a change done.

Build the site after any structural edit. The Astro Content Collections + Zod schemas in `src/content/config.ts` only validate at build time, so a broken frontmatter field will pass `tsc` but fail `astro build`.

## The single load-bearing rule

**Every page must render to static HTML at build time and be fully readable with JavaScript disabled.** The growth strategy is SEO + citations in LLM answers; crawlers and AI agents must see the full content on a raw HTML fetch.

Concrete implications:
- `output: 'static'` in `astro.config.mjs` — do not change without a strong reason.
- No client-side React/Vue/Svelte. If a component genuinely needs interactivity, use a vanilla `<script is:inline>` block (see `src/pages/contact.astro` for the pattern).
- Do not fetch content client-side. Everything lives in `src/content/` and is rendered by `getCollection()` at build time.

## Brand copy is a single source of truth

All positioning text lives in `src/lib/constants.ts` as the `BRAND` object. Components **import**, never inline. The `BRAND.h1`, `BRAND.subLine`, and `BRAND.tagline` strings are immutable per the founding brief — changing them is a positioning change and needs explicit user approval.

`BRAND` also carries `email` (currently `connect@avantamour.in`), `phone` (`+91-9831397530`), `whatsapp` (the `wa.me/…` deep link), and `locations` (`['Delhi', 'Kolkata']`). The phone goes into both visible UI (contact page) and structured data (Organization + ProfessionalService). `BRAND.whatsapp` feeds both the floating WhatsApp FAB (`src/components/layout/WhatsAppButton.astro`, rendered from `BaseLayout.astro` so it appears on every page) and the "Chat on WhatsApp" line in the contact page's Direct card. The FAB is an explicitly user-approved exception to the "no third-party widget" rule in the gates list — do not remove or replace it without checking.

`BRAND.certifications` is the canonical list of the firm's ISO certifications (currently ISO/IEC 27001:2022 and ISO 9001:2015, both issued by EAS, both valid through January 2029). It is consumed by the footer "Certifications" column (`src/components/layout/Footer.astro`) and the JSON-LD `hasCredential` block on the Organization node (`src/components/seo/JsonLd.astro`). The About page lists them out long-form in the Credentials section, and the contact card has a one-line mention. If a certification is added, renewed, or revoked, edit the constant — everything else is downstream.

**Two LinkedIn URLs live in `BRAND`** and they are not interchangeable:
- `BRAND.founder.linkedin` — Arrpita's personal profile (`/in/arrpita-g-hajra-a5b37857/`). Used by the footer "LinkedIn" link, the About-page "Connect on LinkedIn" link, the "Arrpita on LinkedIn" entry on the contact page, the `Person.sameAs` in JSON-LD, and `Article.author.url`.
- `BRAND.social.linkedin` — the firm's company page (`/company/avantamour/`). Used by the "Avant Amour on LinkedIn" entry on the contact page and included in `Organization.sameAs` alongside the founder URL.

If you ever update one, double-check you're not silently swapping the other.

**Inline-script variable interpolation gotcha.** Astro does *not* interpolate Astro variables into `<script is:inline>` blocks — anything an inline script needs from `BRAND` (or any other Astro-side value) has to be passed in through the DOM, not referenced directly. The contact form's submit handler in `src/pages/contact.astro` is one such inline block. It used to hardcode the email a second time, but now the address is set once via `data-email={BRAND.email}` on the `<form>` and read back in the script as `form.dataset.email`, so it stays in sync with `BRAND.email` automatically — no second literal to maintain. This `data-*` attribute pattern is the approved workaround for the interpolation constraint; reach for it (or Astro's `define:vars` directive) in any new inline script rather than duplicating a constant.

**Founder name** lives in `BRAND.founder` as two deliberately separate fields:

- `fullName: 'Arrpita Ghosh Hajra'` — used wherever structured data needs a real-person identity: the About founder card, the standalone `Person` JSON-LD `name` field on the About page, and `Organization.founder.name` in the always-emitted Organization block. Nowhere visible-but-conversational.
- `firstName: 'Arrpita'` — everywhere else: CTAs ("Talk to Arrpita"), insights byline, meta `author` tag, `Article.author.name`, contact LinkedIn link text, `insights` collection author default.

`BRAND.founder.name` no longer exists — both `fullName` and `firstName` are required. If you find yourself reaching for "the name", pick consciously: structured-data identity → `fullName`; UI/conversational → `firstName`.

Spelling: **double `r`** ("Arrpita"). The single-`r` "Arpita" is a real, recurring misspelling — always double-check after any content edit. The LinkedIn URL handle `arrpita-g-hajra-…` is correct as-is and must not be changed.

**Founder portrait** is at `public/arrpita.jpg` (600×900, 2:3 JPEG). It is referenced in two places that must stay in sync:
- The About founder card (`src/pages/about.astro`) — a `<figure>` with `aspect-[2/3] object-cover`, capped at `max-w-sm` on mobile, then a tinted `<figcaption>` with the FOUNDER eyebrow, name (`fullName`), and title.
- The About-page `Person` JSON-LD `image` field (`src/components/seo/JsonLd.astro`) — built via `absoluteUrl('/arrpita.jpg', BRAND.url)`.

Swapping the photo means replacing the file at the same path; the asset URL is hardcoded as `/arrpita.jpg` in both consumers.

**Testimonials** live in `BRAND.testimonials` and render through `src/components/content/Testimonials.astro` on the homepage (just before `ContactCTA`), `/for-d2c-brands/` (the paid-search landing page) and `/about/`. They are LinkedIn recommendations of Arrpita, so three rules hold: (1) quotes are **verbatim as supplied by the owner** (the full text came in "Website content_Sept 15.docx", 15 Sep 2026), correcting only "Arpita" → "Arrpita" and obvious typos — never complete, embellish or tidy a quote, and mark any cut with "…"; (2) the block is framed around **Arrpita** ("What people who've worked with Arrpita say") and each `relationship` describes the tie to her, because recommendations can predate Avant Amour — the same prior-work rule as the Voice rules below; (3) **no `Review` or `AggregateRating` JSON-LD** — Google treats a business's reviews of itself on its own site as self-serving and ineligible for review snippets. Keep to a few placements; two quotes repeated on every page read as thin. Farida Hussain is CMO of USV — a named prior-research client — while the health & nutrition case study is anonymised, so her quote must never appear on that case study page or on the case-studies index (together they would name the brand behind the 30% result).

`NAV` and `FOOTER_LINKS` are also in `constants.ts`. Adding a route to the site means adding it here too.

## Content collections

Five collections defined in `src/content/config.ts`:

| Collection | Path | Extra fields beyond base |
|---|---|---|
| `services` | `src/content/services/*.mdx` | `methodologyType`, `relatedServices` (service slugs), `order`, `summary` |
| `insights` | `src/content/insights/*.mdx` | `publishDate` (required), `author`, `tags`, `glossaryRefs` (glossary slugs), `relatedPosts` (insights slugs) |
| `case-studies` | `src/content/case-studies/*.mdx` | `industry`, `metric?` (an outcome, shown with ↑), `scope?` (what was studied, for work with no outcome number — shown without the arrow), `services` (service slugs), `summary?` |
| `glossary` | `src/content/glossary/*.mdx` | `category`, `relatedTerms` (glossary slugs) |
| `pages` | `src/content/pages/*.mdx` (reserved; directory not yet created) | (base only) |

The shared base schema includes `title`, `description`, `publishDate?`, `updatedDate?`, `featured`, `draft`, `ogImage?`, **and `faqs`** (`Array<{ question; answer }>`, default `[]`). Every collection therefore supports FAQs by adding a frontmatter array.

Every index/list page filters with `({ data }) => !data.draft`. New routes that list collection entries must do the same.

**Internal linking is layout-enforced, not just a content rule.** The slug arrays in frontmatter are *the* source — the layouts auto-render the corresponding link blocks. Do not hand-author these blocks in MDX; populate the frontmatter and let the layout do the rest:

- `InsightsLayout.astro` reads `d.glossaryRefs` → renders "Related terms" pills; reads `d.relatedPosts` → renders "Related reading" cards.
- `ServiceLayout.astro` *queries* the `case-studies` collection for any entry whose `services` array contains the current service's slug → renders "Related case studies"; reads `d.relatedServices` → renders "Related services" pills.
- `CaseStudyLayout.astro` reads `d.services` → renders "Methods used" pills linking to `/services/<slug>`.
- `GlossaryLayout.astro` (called from `pages/glossary/[slug].astro`) reads `d.relatedTerms` → renders the related-terms aside.

Spec rules to maintain in content:
- Every insights post: ≥2 entries in `glossaryRefs`.
- Every service: ≥1 case study tagged with this service in its `services` array.
- Every case study: list every service used in its `services` array.

**Images in content** live under `src/assets/<collection>/<topic>/` (lowercase paths) and render through `src/components/content/Figure.astro`, imported in the MDX file. `astro:assets` resizes them to WebP at build, so drop in originals rather than hand-optimising. Pass `photo` for photographs (adds the 10% teal `.image-overlay`) and `zoom` for text-dense diagrams (adds an "Open full size" link). A diagram that arrives as a broken or unreadable image can be rebuilt in markup instead — see `SymbolicCapitalFunnel.astro`. Do not publish third-party maps or images that carry another site's watermark or copyright line, or photos of identifiable children without documented consent.

**Glossary categories are dual-edged.** The enum values (`'method' | 'concept' | 'role' | 'deliverable' | 'other'`) live in the Zod schema in `src/content/config.ts`, but their visible labels for the "By category" block (`Methods`, `Concepts`, `Roles`, `Deliverables`, `Other`) live in a separate `categoryLabel` map inside `src/pages/glossary/index.astro`. Adding a new category requires editing both files — if you forget the label map, the index page falls back to rendering the raw enum key.

## Layout / SEO pattern

Every page route renders through `BaseLayout.astro`, which slots in `SEO.astro` + `JsonLd.astro`. Pass `jsonLdType` and `jsonLdProps` to switch the per-page structured data. **`Organization` and `ProfessionalService` are always emitted.** Both carry the same `primaryAddress` (Delhi, region `DL`, country `IN`) and the same `location[]` array (Delhi + Kolkata as `Place` nodes, regions `DL` / `WB`). `hasCredential` (the ISO certs) sits on the Organization node only. **Cities only — never emit `streetAddress`, post code, or building name in any JSON-LD or visible content.** This is a hard rule, not a preference: if you find yourself reaching for a street, stop and ask. Per-page additions on top of the always-emitted pair:

- `'website'` (default) — adds `WebSite` (no `SearchAction` — the site has no search, removing it avoids a false signal)
- `'about'` — adds `Person` (founder)
- `'service'` — adds `Service` (requires `serviceName`, `serviceDescription`)
- `'article'` / `'case-study'` — adds `Article` (requires `articleHeadline`, `articleDescription`, `articleDatePublished`)
- `'glossary'` — adds `DefinedTerm` (requires `termName`, `termDescription`)

`Breadcrumbs.astro` emits both the visual nav and a `BreadcrumbList` JSON-LD block. Use it on every non-homepage route.

**Search titles are separate from visible headlines.** `title` drives the H1, breadcrumbs and `Article`/`Service` JSON-LD; the optional `seoTitle` is used **verbatim** as `<title>`, `og:title` and `twitter:title` — no ` | Avant Amour` suffix is appended, so include it yourself where wanted. It is accepted by `BaseLayout`, `PageLayout`, every content layout, and as a frontmatter field in the shared base schema (`src/content/config.ts`). Introduced 14 Sep 2026 because SEO baseline #4 found pages ranking in the top three with zero clicks under brand-only or bare-noun titles ("Avant Amour", "Services", "About Avant Amour | Avant Amour"), and several H1s are locked by the founding brief so they could not simply be rewritten. Keep search titles to ~60 characters and meta descriptions under 155 — `truncate()` cuts longer ones on a word boundary, but a cut description still ends in "…" in the results page. Title wording targets the keyword workbook (Dropbox, `Avant_Amour_Keyword_Research.xlsx`), which is the source of truth for query targets.

## FAQ system

The visible FAQ accordion and the `FAQPage` structured data come from a single source so they cannot drift apart.

- Frontmatter shape: `faqs: [{ question: '…', answer: '…' }, …]` on any collection entry (or as a const in a static `.astro` page).
- `<FAQ faqs={…} />` (in `src/components/content/FAQ.astro`) is a static-HTML `<details>/<summary>` accordion with the eyebrow-rule motif. Renders nothing if the array is empty. No client JS.
- `BaseLayout` accepts a `faqs?` prop and forwards it to `JsonLd`. When non-empty, `JsonLd` pushes a `FAQPage` node (with `mainEntity` of `Question` / `acceptedAnswer`) into `@graph` regardless of page type.
- `ServiceLayout` and `InsightsLayout` already wire `entry.data.faqs` through both the visible `<FAQ>` and the `BaseLayout faqs={…}` prop. For a one-off page (e.g. `for-d2c-brands.astro`), define a `faqs` const, render `<FAQ faqs={faqs} />`, and pass `faqs={faqs}` through `PageLayout`.

## Analytics & consent

GA4 with Consent Mode v2 default-deny is wired through `BaseLayout.astro` as of **June 2026**. This is the chosen analytics approach — there is no longer a plan to swap in a cookieless tool. Both the loader and the banner ship on every page because they live in `BaseLayout`, which all routes pass through.

- **Measurement ID** is `G-R9K61CYZV3` — the GA4 property "Avant Amour Website" (stream `11745023024`) that has collected data since 6 Jun 2026; Arrpita's Google account is admin. It is hardcoded in **two** places inside the BaseLayout `<head>`: the `<script async src="https://www.googletagmanager.com/gtag/js?id=…">` loader and the `gtag('config', '…', { anonymize_ip: true })` call. If it ever changes, update both — there is no constant for it. A **duplicate** property with the same name (`G-0GNHHLGV51`) was created under `connect@avantamour.in` on 11 Sep 2026 during the ads-agency setup; it is not used by the site and should be deleted so the two are never confused. Do not run both IDs.
- **Google Tag Manager** container `GTM-NRT6QM3S` was added on 12 Sep 2026 with the owner's explicit approval (it passed the "second tracking tool" gate below) to carry the Google Ads conversion and remarketing tags for the paid campaign. The agency manages the container's contents; the site ships only the loader. Three rules: (1) the consent-default `<script>` stays **above** both the GTM snippet and the gtag.js loader — the order in `BaseLayout.astro` is consent defaults → GTM → gtag.js; (2) **GA4 is fired by gtag.js, not by GTM** — if anyone adds a GA4 Google Tag inside the container, every page view double-counts; (3) Google's `<noscript>` iframe is deliberately **not** installed — it fires without consent signals and would break the default-deny posture. Consequence: Google Ads conversions only fully record after Accept, and Google models the rest from cookieless pings. That trade-off is the owner's decision, not the agency's. The container is the one surface this repo cannot audit, so the agency must keep it configured as follows: Consent Overview enabled (Admin → Container Settings) and every non-Google tag set to "Require additional consent" for the relevant types; nothing on the Consent Initialization trigger (the site sets defaults on-page before GTM loads — a GTM-side default would race it); no GA4 tag; and nothing that is itself on the gate list below (Meta Pixel, LinkedIn Insight, Hotjar, Clarity).
- **Default consent state**: `ad_storage`, `ad_user_data`, `ad_personalization`, and `analytics_storage` all default to `'denied'`; `functionality_storage` and `security_storage` are `'granted'`; `wait_for_update: 500` gives the saved-decision replay time to land before the first hit fires. This default-deny posture is itself behind the stop-and-ask gate — do not loosen it without explicit approval.
- **Persistence**: the visitor's choice is stored in `localStorage` under the key `aa_consent` as a JSON object of the same four ad/analytics fields. On every page load the head snippet reads the key and replays it via `gtag('consent', 'update', …)`, so returning visitors are not re-prompted and analytics_storage is not silently flipped back off.
- **Banner** lives at the end of `<body>` (after `<WhatsAppButton />`), `id="consent-banner"`, `role="dialog"`, `aria-live="polite"`, hidden by default (`class="hidden …"`) and un-hidden by an inline IIFE only when `localStorage.getItem('aa_consent')` is empty. The Accept and Decline buttons both write to `localStorage`, call `gtag('consent', 'update', …)`, and re-hide the banner. The script is `<script is:inline>` — no client framework, no bundling, consistent with the "no client JS unless vanilla" rule.
- **Banner styling** is Tailwind-only (no inline styles, no `<style>` block): `fixed inset-x-0 bottom-0 z-50 bg-cream border-t border-border` for the bar, `bg-teal-700 text-paper hover:bg-teal-900` for Accept (see the button-contrast rule under Design rules), `bg-paper border border-border text-ink hover:bg-cream` for Decline. The teal-as-accept choice respects the "yellow is a highlight, never a CTA" palette rule.

Adding a second analytics or tracking tool (Meta Pixel, LinkedIn Insight Tag, Hotjar, Clarity, etc.) is still a stop-and-ask. So is loosening the default-deny posture or moving the loader anywhere other than `BaseLayout`.

## Placeholder convention

Every block of stand-in copy is wrapped in an HTML comment:

```html
<!-- PLACEHOLDER: to be replaced with final copy -->
```

`grep -r "PLACEHOLDER" src/` is the canonical "what still needs the founder's voice" query. Glossary entries use `{/* PLACEHOLDER: ... */}` (MDX comment syntax) since they are `.mdx`.

## Voice rules (enforce in all generated copy)

- Glossary entries open with a definition-first sentence (`**X is** …`).
- Specific over abstract, declarative over hedging, warm but direct. Model on Arrpita's LinkedIn writing.
- **Banned agency-speak**: "leverage", "synergies", "best-in-class", "unlock", "deliver value", "robust", "world-class".
- Never lorem ipsum. Never copy that frames Avant Amour as a global brand or large agency.
- Prior clients (Zee5, Rapido, Adobe, USV) are **Arrpita's** prior research clients, not current Avant Amour clients — never imply otherwise.
- FAQ placeholders use the marker `PLACEHOLDER: FAQ to be edited by Arrpita` (MDX-comment syntax in `.mdx`, `//` comment in `.astro` frontmatter).

## Path aliases

Defined in `tsconfig.json`. Use them in imports — do not write relative paths that climb out of `src/`:

- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@lib/*` → `src/lib/*`
- `@styles/*` → `src/styles/*`
- `@/*` → `src/*`

## Design rules (don't drift)

- Palette is fixed: teal `#1A9FA5`, yellow `#FBAA19`, cream `#FBF8F3`, paper `#FFFFFF`, ink `#0F1419` / `#3A4348`, border `#E8E2D5`. All in `tailwind.config.mjs` and CSS variables in `src/styles/global.css`.
- Yellow is a highlight, never a CTA. One yellow element per section, maximum.
- **Solid buttons use `bg-teal-700` (`#105F63`), not `bg-teal`.** Cream on the base teal `#1A9FA5` measures **3.03:1**, below the WCAG AA minimum of 4.5:1 for normal text — Lighthouse flagged it from launch. `teal-700` gives 6.98:1; `teal-600` was rejected because it lands on exactly 4.50 and any font-weight change would fail again. Hover deepens to `teal-900`. Applied 12 Sep 2026 with the owner's approval. The same rule covers the tag pills' `hover:bg-teal-700`.
- **Teal text uses `teal-700` too — the brand teal `#1A9FA5` is for things that are not words.** The brand teal measures 3.21:1 on paper and 3.03:1 on cream, so every link, eyebrow label, "Learn more →", tag pill label and nav hover/active state uses `teal-700` (7.40 / 6.98). In CSS that is `var(--color-teal-text)` (`global.css` drives the base `a` colour and `.eyebrow`); in markup it is `text-teal-700` / `hover:text-teal-700`. The brand teal stays for rules, borders, `decoration-teal` underlines, focus rings, `::selection`, the hero signature underline and the theme-color meta. The only remaining `text-teal` uses are `aria-hidden` glyphs (the FAQ "+" and the homepage "→" bullets), which WCAG exempts. Because `teal-700` is close to ink, the active nav item also carries a brand-teal underline — do not go back to colour alone. Applied 15 Sep 2026 with the owner's approval. Do not add new `text-teal` text, and do not "lighten" to `teal-600` — it lands on exactly 4.50:1 on cream, with no margin (measured in-browser).
- No shadows on cards — use `border border-border` (a 1px warm-grey border).
- No gradients. The only exception is the 10% teal overlay applied to imagery via `.image-overlay` in `global.css`.
- Section rhythm: alternate `<Section background="cream">` and `<Section background="paper">`. Padding is `py-16 md:py-24`.
- Display type is **Fraunces** (`font-display`), body is **Inter** (`font-sans`). Both load from Google Fonts in `BaseLayout.astro`.
- Animations must honour `prefers-reduced-motion` — the rule is already in `global.css`; if you add new animations, verify they fall back.
- **Logo lockup** in `Header.astro` and `Footer.astro` uses `public/logo-mark.png` — a clean mark-only asset (the A + sunburst, transparent background, no caption). Plain `<img class="h-10 w-auto"/>` in the header, `h-12 w-auto` in the footer; the parent `<a>` is `flex items-center` for shared centre-line with the "Avant Amour" wordmark. The older `public/logo.svg` and `public/logo.png` still exist for backwards compatibility but should not be reintroduced into the lockup — they contain a baked-in "AVANT AMOUR" caption that renders as an illegible blur at small sizes.
- **Interior layout spacing** is calibrated: header band ends with `pb-10 md:pb-14`, body section starts with `pt-8 md:pt-12 pb-12 md:pb-20`. Raising the body's top padding stacks against the header band's bottom padding and re-creates a ~50px empty stretch between the H1+intro and the first content block. The same pattern is used by all five interior layouts (Service / Page / Insights / CaseStudy / Glossary) for cross-page consistency.
- **Prior-research logos** live at `public/logos/{adobe,rapido,usv,zee5}.png`, consumed by `src/components/home/CredibilityStrip.astro`. Source PNGs must be transparent-background; if they aren't, the resting `opacity: 0.85` treatment will reveal the white rectangle. The directory name and every filename **must be lowercase** — Windows dev (NTFS) is case-insensitive, but Netlify serves on Linux, so a `/Logos/Zee5.png` reference will render fine locally and 404 in production. Same rule for any new asset path under `public/`: lowercase the directory and the basename.

## Stop and ask before

These are inherited from the founding brief. Do not do any of them without explicit user approval:

- Adding a CMS, admin UI, or any backend
- Adding any second analytics or tracking tool (Meta Pixel, LinkedIn Insight Tag, Hotjar, Clarity, etc.), or changing the default-deny consent posture of the existing GA4 setup (see "Analytics & consent")
- Adding any third-party widget (chat, popup, social proof). The site-wide WhatsApp FAB is the one approved exception — adding *another* chat/popup/social-proof widget still needs the gate.
- Changing the colour palette, typography, or any locked positioning copy
- Adding pages or routes not in the original brief structure
- Installing any client-side framework (React, Vue, Svelte) — vanilla JS islands only
- Switching off `output: 'static'`

## Deploy target

Netlify, static only (no serverless functions for v1). Build command `npm run build`, output `dist/`. Connected GitHub repo: https://github.com/avantamour/website2026 (Netlify builds from `main`). The contact form uses Netlify Forms; `www` 301s to the bare apex. Earlier copies of this file said Cloudflare Pages and pointed at `sayantan-personal/avant-amour` — both wrong; that repo is an abandoned fork.
