import { BlogPost, BlogPostSummary, CATEGORIES } from "@shared/schema";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface IStorage {
  getPosts(category?: string): Promise<BlogPostSummary[]>;
  getPost(slug: string): Promise<BlogPost | undefined>;
  getCategories(): Promise<string[]>;
}

export class FileStorage implements IStorage {
  private contentDir: string;
  private cache: Map<string, BlogPost>;
  private lastCacheUpdate: number = 0;
  private readonly CACHE_TTL = 60000; // 1 minute cache

  constructor() {
    this.contentDir = path.join(process.cwd(), "content", "posts");
    this.cache = new Map();
    // Ensure directory exists
    fs.mkdir(this.contentDir, { recursive: true }).catch(err => 
      console.error("Failed to create content directory:", err)
    );
  }

  private async refreshCacheIfNeeded() {
    const now = Date.now();
    if (this.cache.size > 0 && now - this.lastCacheUpdate < this.CACHE_TTL) {
      return;
    }

    try {
      const files = await fs.readdir(this.contentDir);
      const newCache = new Map<string, BlogPost>();

      await Promise.all(
        files.filter(f => f.endsWith('.md')).map(async (file) => {
          try {
            const filePath = path.join(this.contentDir, file);
            const content = await fs.readFile(filePath, "utf-8");
            const parsed = matter(content);
            const data = parsed.data as any;

            if (data.slug && data.title) {
               // Validate category
               const category = CATEGORIES.includes(data.category) ? data.category : "Technology";
               
               const post: BlogPost = {
                 slug: data.slug,
                 title: data.title,
                 description: data.description || "",
                 category: category,
                 author: data.author || "Admin",
                 date: data.date || new Date().toISOString().split('T')[0],
                 featuredImage: data.featuredImage || "",
                 content: parsed.content
               };
               newCache.set(post.slug, post);
            }
          } catch (err) {
            console.error(`Error parsing file ${file}:`, err);
          }
        })
      );

      this.cache = newCache;
      this.lastCacheUpdate = now;
    } catch (err) {
      console.error("Error reading content directory:", err);
      // Don't clear cache on error, keep old data
    }
  }

  async getPosts(category?: string): Promise<BlogPostSummary[]> {
    await this.refreshCacheIfNeeded();
    
    let posts = Array.from(this.cache.values());
    
    if (category) {
      posts = posts.filter(p => p.category === category);
    }

    // Sort by date desc
    return posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).map(post => {
      // Return summary without content
      const { content, ...summary } = post;
      return summary;
    });
  }

  async getPost(slug: string): Promise<BlogPost | undefined> {
    await this.refreshCacheIfNeeded();
    return this.cache.get(slug);
  }

  async getCategories(): Promise<string[]> {
    return Array.from(CATEGORIES);
  }
}

export const storage = new FileStorage();
