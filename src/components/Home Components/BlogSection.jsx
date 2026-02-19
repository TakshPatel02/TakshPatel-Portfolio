import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogsData } from "../../data/blogsData";

const BlogCard = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="h-full">
    <motion.div
      className="group p-4 sm:p-5 rounded-xl flex flex-col h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-bg-secondary border border-border"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </motion.div>

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

const BlogSection = () => {
  const rows = [];
  for (let i = 0; i < blogsData.length; i += 2) {
    rows.push(blogsData.slice(i, i + 2));
  }

  return (
    <section className="w-full">
      {/* Header */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Blog{" "}
              <span className="align-super text-xs font-normal text-text-muted sm:text-sm">
                ({blogsData.length})
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Blog rows */}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="w-full">
          {/* Double horizontal border with gap */}
          <div className="flex w-full flex-col gap-[16px]">
            <div className="h-px w-full bg-border"></div>
            <div className="h-px w-full bg-border"></div>
          </div>

          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="border-x border-border bg-bg-card">
              <div className="relative grid grid-cols-1 sm:grid-cols-2">
                {/* Double vertical divider */}
                <div
                  className="pointer-events-none absolute left-1/2 hidden -translate-x-[9px] sm:flex sm:gap-[16px]"
                  style={{ top: "-18px", bottom: "-18px" }}
                >
                  <div className="h-full w-px bg-border"></div>
                  <div className="h-full w-px bg-border"></div>
                </div>

                {row[0] && <BlogCard post={row[0]} />}

                {/* Double divider (mobile between cards) */}
                {row[1] && (
                  <div className="flex flex-col gap-[16px] sm:hidden">
                    <div className="h-px w-full bg-border"></div>
                    <div className="h-px w-full bg-border"></div>
                  </div>
                )}

                {row[1] && <BlogCard post={row[1]} />}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* All Posts */}
      <div className="w-full">
        <div className="flex w-full flex-col gap-[16px]">
          <div className="h-px w-full bg-border"></div>
          <div className="h-px w-full bg-border"></div>
        </div>
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <Link
              to="/blog"
              className="font-display flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-widest text-text-primary transition hover:bg-hover-bg"
            >
              All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
