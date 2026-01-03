import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.posts.list.path, async (req, res) => {
    try {
      // Validate input if needed, though optional
      const category = req.query.category as string | undefined;
      const posts = await storage.getPosts(category);
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.posts.get.path, async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getPost(slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.posts.categories.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  return httpServer;
}
