import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tag: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  'news': newsCollection,
};
