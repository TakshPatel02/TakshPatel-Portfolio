import { Search } from "lucide-react";
import { useState } from "react";

const BlogHeader = ({ postCount }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <div className="p-2">
              <h1 className="font-display text-4xl font-bold text-text-primary sm:text-5xl lg:text-6xl">
                Blog
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <div className="p-2">
              <p className="text-sm text-text-secondary sm:text-base">
                A collection of articles on development, design, and ideas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search Blog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-bg-secondary px-10 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-text-muted focus:outline-none focus:ring-1 focus:ring-text-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
