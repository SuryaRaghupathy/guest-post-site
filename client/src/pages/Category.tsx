import { usePosts } from "@/hooks/use-blog";
import { PostCard } from "@/components/PostCard";
import { Loader2 } from "lucide-react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";

export default function Category() {
  const [, params] = useRoute("/category/:category");
  const category = params?.category ? decodeURIComponent(params.category) : undefined;
  
  const { data: posts, isLoading, isError } = usePosts(category);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !posts) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground">Could not load posts for this category.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b border-border pb-8"
      >
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Category</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground capitalize">
          {category}
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this collection
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-secondary/30 rounded-3xl">
          <p className="text-xl text-muted-foreground">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}
