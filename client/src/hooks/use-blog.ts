import { useQuery } from "@tanstack/react-query";
import { api, buildUrl, type BlogPostSummary } from "@shared/routes";

export function usePosts(category?: string) {
  return useQuery({
    queryKey: [api.posts.list.path, category],
    queryFn: async () => {
      // Build URL with query params
      let url = api.posts.list.path;
      if (category) {
        url += `?category=${encodeURIComponent(category)}`;
      }
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch posts");
      
      const data = await res.json();
      return api.posts.list.responses[200].parse(data);
    },
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: [api.posts.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.posts.get.path, { slug });
      const res = await fetch(url);
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch post");
      
      const data = await res.json();
      return api.posts.get.responses[200].parse(data);
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: [api.posts.categories.path],
    queryFn: async () => {
      const res = await fetch(api.posts.categories.path);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.posts.categories.responses[200].parse(await res.json());
    },
  });
}
