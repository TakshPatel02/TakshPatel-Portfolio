import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="h-full">
      <motion.div
        className="group p-4 sm:p-5 flex flex-col h-full"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Blog Post Image */}
        <motion.div
          className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-bg-secondary"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-muted">
              <span className="text-sm">No Image</span>
            </div>
          )}
        </motion.div>

        {/* Blog Post Info */}
        <div className="mt-3 flex items-start gap-2 flex-1">
          <h3 className="font-display text-sm font-bold text-text-primary transition group-hover:text-blue-400 sm:text-lg">
            {post.title}
          </h3>
          {post.isNew && (
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
          )}
        </div>
        <p className="mt-auto pt-2 text-xs uppercase tracking-widest text-text-muted">
          {post.date}
        </p>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
