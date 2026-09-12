export function formatDate(date: Date | string, locale = 'en-IN'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function absoluteUrl(path: string, site: string): string {
  if (path.startsWith('http')) return path;
  const base = site.replace(/\/$/, '');
  const rel = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rel}`;
}

/**
 * Truncate on a word boundary. The previous version cut mid-word, which is how
 * every Google snippet and LinkedIn share of the home page ended in
 * "…ethnographic resear" until September 2026.
 */
export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return cut.replace(/[\s,;:.\-—–]+$/, '') + '…';
}
