import { z } from 'zod';
import { BlogPostSchema, BlogPostSummarySchema, CATEGORIES } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  posts: {
    list: {
      method: 'GET' as const,
      path: '/api/posts',
      input: z.object({
        category: z.enum(CATEGORIES).optional(),
      }).optional(),
      responses: {
        200: z.array(BlogPostSummarySchema),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/posts/:slug',
      responses: {
        200: BlogPostSchema,
        404: errorSchemas.notFound,
      },
    },
    categories: {
      method: 'GET' as const,
      path: '/api/categories',
      responses: {
        200: z.array(z.string()),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type BlogPost = z.infer<typeof BlogPostSchema>;
export type BlogPostSummary = z.infer<typeof BlogPostSummarySchema>;
