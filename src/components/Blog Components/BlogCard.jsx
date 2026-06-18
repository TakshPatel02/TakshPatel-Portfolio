import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ post, index }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <motion.div
        className="group relative flex flex-col h-full p-3 sm:p-4 transition-colors duration-300 hover:bg-hover-bg"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden rounded-md bg-bg-secondary border border-border">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-muted">
              <span className="font-mono text-xs uppercase tracking-widest">No Image</span>
            </div>
          )}

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/3 dark:group-hover:bg-white/2" />
        </div>

        {/* Content */}
        <div className="mt-2.5 flex flex-col flex-1 gap-1">
          <div className="flex items-start gap-2">
            <h3 className="font-display text-sm font-semibold text-text-primary leading-snug sm:text-[15px] tracking-[0.01em]">
              {post.title}
            </h3>
            {post.isNew && (
              <motion.span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#57c1ff]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
            {post.date}
          </p>
        </div>

        {/* Hover arrow indicator */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight className="h-3.5 w-3.5 text-text-muted" />
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
