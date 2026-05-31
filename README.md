# Avant Amour — Marketing Site

Founder-led qualitative research firm in India. Marketing site at https://avantamour.in.

## Stack

- **Astro 5** (static output)
- **Tailwind CSS 3**
- **MDX** for content collections
- **TypeScript** strict
- **Cloudflare Pages** (build output: `dist/`)

## Locked positioning

All on-page copy must remain consistent with `src/lib/constants.ts`. Never hardcode brand copy in components — import from `BRAND`. The positioning H1, sub-line, and tagline are immutable per the founding brief.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve dist/
npm run check    # typecheck (astro check)
```

## Content

- `src/content/services/*.mdx` — service definitions
- `src/content/case-studies/*.mdx` — anonymised engagements
- `src/content/blog/*.mdx` — essays in Arpita's voice
- `src/content/glossary/*.mdx` — definition-first entries (heavily citable by LLMs)

Mark all placeholder copy with `<!-- PLACEHOLDER: to be replaced with final copy -->`.

## Voice rules for placeholders

- Definition-first sentences in glossary entries
- Specific over abstract, declarative over hedging, warm but direct
- No agency-speak: avoid "leverage", "synergies", "best-in-class", "unlock", "deliver value"
- Never lorem ipsum
- Never copy that contradicts the positioning (no global-brand language)

## SEO / GEO

- Static HTML rendering — every page is readable with JS disabled
- `robots.txt` allows all crawlers including GPTBot, ClaudeBot, PerplexityBot
- JSON-LD structured data on every page (Organization + page-specific schema)
- Sitemap auto-generated to `/sitemap-index.xml`
- RSS feed at `/rss.xml`

## Deploy

Cloudflare Pages, connected to GitHub.

- Build command: `npm run build`
- Output: `dist/`
- Custom domain: `avantamour.in` (configure DNS after first successful build)

No Cloudflare Functions, KV, or D1 for v1. Static only.
