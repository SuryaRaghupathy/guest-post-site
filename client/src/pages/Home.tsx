import { usePosts } from "@/hooks/use-blog";
import { PostCard } from "@/components/PostCard";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: posts, isLoading, isError } = usePosts();

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
        <p className="text-muted-foreground">Could not load posts. Please try again later.</p>
      </div>
    );
  }

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
          Ideas that matter,<br/> <span className="text-primary italic">beautifully told.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </motion.div>

      {/* Featured Post */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <PostCard post={featuredPost} featured />
        </motion.div>
      )}

      {/* Grid of Posts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-secondary/30 rounded-3xl">
          <p className="text-xl text-muted-foreground">No posts found yet.</p>
        </div>
      )}
    </div>
  );
}
