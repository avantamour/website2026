import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://avantamour.in',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
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
