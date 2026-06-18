import BlogCard from "./BlogCard";

const BlogGrid = ({ posts }) => {
  // Split posts into rows of 2
  const rows = [];
  for (let i = 0; i < posts.length; i += 2) {
    rows.push(posts.slice(i, i + 2));
  }

  return (
    <div className="w-full border-b border-border">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                rowIndex < rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* First card */}
              {row[0] && (
                <div className="border-b border-border sm:border-b-0 sm:border-r">
                  <BlogCard post={row[0]} index={rowIndex * 2} />
                </div>
              )}

              {/* Second card */}
              {row[1] && (
                <div>
                  <BlogCard post={row[1]} index={rowIndex * 2 + 1} />
                </div>
              )}

              {/* Empty cell if odd card in row */}
              {!row[1] && <div className="hidden sm:block" />}
            </div>
          ))}

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <p className="font-mono text-sm text-text-muted uppercase tracking-widest">
                No posts found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;
