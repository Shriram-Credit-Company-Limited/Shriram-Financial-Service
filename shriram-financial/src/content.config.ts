import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    intro: z.string(),
    description: z.string().optional(),
    features: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { products };
