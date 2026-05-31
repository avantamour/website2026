import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { BRAND } from '@lib/constants';

export async function GET(context: APIContext) {
  const posts = await getCollection('insights', ({ data }) => !data.draft);
  return rss({
    title: `${BRAND.name} — Notes from the field`,
    description: BRAND.defaultDescription,
    site: context.site ?? BRAND.url,
    items: posts
      .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
      .map((p) => ({
        title: p.data.title,
        pubDate: p.data.publishDate,
        description: p.data.description,
        link: `/insights/${p.slug}/`,
      })),
    customData: `<language>en-IN</language>`,
  });
}
