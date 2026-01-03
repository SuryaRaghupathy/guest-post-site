import { Link } from "wouter";
import { type BlogPostSummary } from "@shared/routes";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

interface PostCardProps {
  post: BlogPostSummary;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  // Use first image if multiple, or a fallback.
  // In a real app, this would be a proper image optimization component.
  const imageUrl = post.featuredImage || "https://images.unsplash.com/photo-1499750310159-52f0f83463dd?q=80&w=2070&auto=format&fit=crop"; 
  // above: beautiful desk setup for fallback

  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block col-span-full mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="aspect-[16/10] md:aspect-auto md:h-full w-full overflow-hidden">
            <img 
              src={imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-muted-foreground text-sm">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 line-clamp-3 md:line-clamp-4">
              {post.description}
            </p>
            
            <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
              Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/post/${post.slug}`} className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-primary tracking-wide uppercase">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(post.date), "MMM d, yyyy")}
          </span>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
          {post.description}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/50">
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-secondary-foreground">
            {post.author.charAt(0)}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
}
