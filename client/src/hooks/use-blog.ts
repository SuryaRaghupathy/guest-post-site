import { useQuery } from "@tanstack/react-query";
import { getPosts, getPost, getCategories } from "@/lib/posts";

export function usePosts(category?: string) {
  return useQuery({
    queryKey: ["posts", category],
    queryFn: () => getPosts(category),
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost(slug),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}
