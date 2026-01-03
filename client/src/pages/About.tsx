import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Our Mission</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
          Crafting stories that inspire and inform.
        </h1>
        
        <div className="prose prose-lg mx-auto text-muted-foreground">
          <p className="text-xl leading-relaxed mb-8">
            Scribe is a platform dedicated to thoughtful writing and clean design. 
            We believe that great ideas deserve a beautiful home.
          </p>
          <p>
            Founded in 2024, our goal is to bring back the joy of reading on the web. 
            No clutter, no distractions—just pure content delivered with typographic excellence.
          </p>
        </div>

        <div className="mt-12 p-8 bg-secondary/30 rounded-3xl">
          <h3 className="text-2xl font-serif font-bold mb-4">Join our team</h3>
          <p className="text-muted-foreground mb-6">
            We are always looking for talented writers and developers.
          </p>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-all hover:shadow-lg">
            View Openings
          </button>
        </div>
      </motion.div>
    </div>
  );
}
