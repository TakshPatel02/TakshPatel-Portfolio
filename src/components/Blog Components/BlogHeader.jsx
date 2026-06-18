import { Search } from "lucide-react";
import { motion } from "framer-motion";

const BlogHeader = ({ postCount, searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full">
      {/* Title + Count */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-6 p-2">
            <motion.h1
              className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Blog{" "}
              <span className="align-super text-xs font-normal text-text-muted sm:text-sm">
                ({postCount})
              </span>
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-border bg-bg-secondary px-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-200 focus:border-text-muted focus:outline-none focus:ring-0 cursor-text font-body"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
