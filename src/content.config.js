import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    pubDate: z.date(),
  }),
});

// Expose your defined collection to Astro
export const collections = { posts };
