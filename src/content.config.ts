import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      lang: z.enum(["it", "en"]),
      translationKey: z.string().regex(/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/).optional(),
    }),
});

const materials = defineCollection({
  loader: glob({ base: "./src/content/materials", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["it", "en"]),
    translationKey: z.string().regex(/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/).optional(),
    category: z.string(),
    format: z.enum(["guide", "notes", "exercise", "slides", "video"]),
    level: z.string(),
    topics: z.array(z.string()),
    resourceLang: z.enum(["it", "en"]).optional(),
    downloadLang: z.enum(["it", "en"]).optional(),
    href: z.string(),
    downloadHref: z.string().optional(),
    updatedDate: z.coerce.date(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { blog, materials };
