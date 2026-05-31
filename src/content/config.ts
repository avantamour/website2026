import { defineCollection, z } from 'astro:content';

const base = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  ogImage: z.string().optional(),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .default([]),
});

const services = defineCollection({
  type: 'content',
  schema: base.extend({
    methodologyType: z.enum([
      'ethnography',
      'in-depth-interviews',
      'whatsapp-diary-studies',
      'ux-research',
      'focus-groups',
    ]),
    relatedServices: z.array(z.string()).default([]),
    order: z.number().default(99),
    summary: z.string().optional(),
  }),
});

const insights = defineCollection({
  type: 'content',
  schema: base.extend({
    publishDate: z.coerce.date(),
    author: z.string().default('Arrpita'),
    tags: z.array(z.string()).default([]),
    relatedPosts: z.array(z.string()).default([]),
    glossaryRefs: z.array(z.string()).default([]),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: base.extend({
    industry: z.string(),
    metric: z.string(),
    services: z.array(z.string()).default([]),
    publishDate: z.coerce.date().optional(),
    summary: z.string().optional(),
  }),
});

const glossary = defineCollection({
  type: 'content',
  schema: base.extend({
    category: z
      .enum(['method', 'concept', 'role', 'deliverable', 'other'])
      .default('concept'),
    relatedTerms: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: base,
});

export const collections = {
  services,
  insights,
  'case-studies': caseStudies,
  glossary,
  pages,
};
