import matter from "gray-matter";

// Use Vite's import.meta.glob to bundle markdown files at build time
// The 'as: "raw"' option imports the content as a string
// 'eager: true' makes the imports synchronous
const modules = import.meta.glob("../../../content/posts/*.md", {
  as: "raw",
  eager: true,
});

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  category?: string;
  author?: string;
  featuredImage?: string;
}

export const posts: BlogPost[] = Object.entries(modules)
  .map(([path, content]) => {
    const { data, content: body } = matter(content as string);
    const slug = path.split("/").pop()?.replace(".md", "") || "";

    return {
      slug,
      content: body,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: data.category,
      author: data.author,
      featuredImage: data.featuredImage,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPosts(category?: string) {
  if (category) {
    return posts.filter((p) => p.category === category);
  }
  return posts;
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}

export function getCategories() {
  const categories = new Set(posts.map((p) => p.category).filter(Boolean));
  return Array.from(categories) as string[];
}
