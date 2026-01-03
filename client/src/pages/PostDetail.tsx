import { usePost } from "@/hooks/use-blog";
import { Loader2, Calendar, Clock, ArrowLeft } from "lucide-react";
import { useRoute, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function PostDetail() {
  const [, params] = useRoute("/post/:slug");
  const slug = params?.slug;
  
  const { data: post, isLoading, isError } = usePost(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <Link href="/" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
        </Link>
      </div>
    );
  }

  // Calculate read time (approx 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen pb-20">
      {/* Header Image */}
      <div className="h-[40vh] md:h-[60vh] w-full relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-background to-transparent pt-32 pb-8">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href={`/category/${post.category}`} className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-6 hover:bg-primary/90 transition-colors">
                {post.category}
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight max-w-4xl">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-background rounded-t-3xl border-t border-x border-border p-6 md:p-10 max-w-4xl mx-auto shadow-sm"
        >
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-12 border-b border-border/50 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-foreground">
                {post.author.charAt(0)}
              </div>
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.date), "MMMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              {readTime} min read
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags / Footer of post */}
          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
             <Link href="/" className="text-primary font-medium hover:underline flex items-center group">
               <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
               Back to all articles
             </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
