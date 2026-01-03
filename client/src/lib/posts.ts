// Use Vite's import.meta.glob to bundle markdown files at build time
// The 'query: "?raw"' option imports the content as a string
// 'eager: true' makes the imports synchronous
const modules = import.meta.glob('../../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
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
    const rawContent = content as string;

    // Simple parser that mimics gray-matter safely in the browser
    const match = rawContent.match(/^---\s*([\s\S]*?)\s*---([\s\S]*)$/);
    const frontmatter = match ? match[1] : '';
    const body = match ? match[2].trim() : rawContent;

    const data: Record<string, string> = {};
    frontmatter.split('\n').forEach((line) => {
      const [key, ...value] = line.split(':');
      if (key && value.length > 0) {
        data[key.trim()] = value.join(':').trim().replace(/^["'](.*)["']$/, '$1');
      }
    });

    const slug = path.split('/').pop()?.replace('.md', '') || '';

    return {
      slug,
      content: body,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
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
