import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We are using a file-based system for posts as requested, 
// so we don't need a posts table in Postgres.
// However, we define the schema here for type consistency.

export const CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Business",
  "Education",
  "Real Estate"
] as const;

export const BlogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(CATEGORIES),
  author: z.string(),
  date: z.string(), // YYYY-MM-DD
  featuredImage: z.string(),
  content: z.string(), // The markdown body
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

// For API lists, we might exclude content to save bandwidth
export const BlogPostSummarySchema = BlogPostSchema.omit({ content: true });
export type BlogPostSummary = z.infer<typeof BlogPostSummarySchema>;
