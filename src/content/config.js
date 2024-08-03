import { z, defineCollection, reference } from "astro:content";
// 2. Define your collection(s)

const postCollections = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    pubDate: z.date(),
    relatedPosts: z.array(reference("blog")).default([]),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  posts: postCollections,
};
