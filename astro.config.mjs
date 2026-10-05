import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://avantamour.in',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // The whole stylesheet (~24 KB, ~6 KB gzipped) is inlined into every page:
    // as a separate file it was a render-blocking request that PageSpeed
    // measured at ~0.5 s on mobile (5 Oct 2026). Most visitors, and all ad
    // clicks, land fresh, so the lost cross-page caching costs little.
    inlineStylesheets: 'always',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      // /thank-you and the ads landing page are noindex; listing them in the
      // sitemap asks Google to index pages we have told it not to.
      filter: (page) =>
        !page.includes('/404') && !page.includes('/thank-you') && !page.includes('/market-research-company'),
    }),
  ],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
