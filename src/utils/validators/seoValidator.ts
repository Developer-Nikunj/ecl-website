import { z } from "zod";

export const seoSchema = z.object({
  slug: z.string(),
  pageUrl: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),

  status: z.number().optional(),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),

  robots: z.string().optional(),
  canonicalUrl: z.string().optional(),

  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),

  schema: z.any().optional(),
});
