import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import app from "../../FireBaseConfig.js";

const BlogCard = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="block h-full">
    <div className="group relative flex flex-col h-full p-3 sm:p-4 transition-colors duration-300 hover:bg-hover-bg">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden rounded-md bg-bg-secondary border border-border">
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
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted" />
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
    </div>
  </Link>
);

const BlogSection = () => {
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getDatabase(app);
        const projectsRef = ref(db, "blogs");
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
          const rawData = snapshot.val();

          const values = Object.values(rawData);
          let projectsArray = [];

          if (values.length === 1 && Array.isArray(values[0])) {
            projectsArray = values[0];
          } else if (
            values.length === 1 &&
            values[0] &&
            typeof values[0] === "object"
          ) {
            projectsArray = Object.values(values[0]);
          } else {
            projectsArray = values;
          }

          setBlogsData(projectsArray.filter(Boolean).reverse());
        } else {
          console.log("No project data available");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProjects();
  }, []);

  // Show only latest 4 blogs on homepage
  const visibleBlogs = blogsData.slice(0, 4);

  const rows = [];
  for (let i = 0; i < visibleBlogs.length; i += 2) {
    rows.push(visibleBlogs.slice(i, i + 2));
  }

  return (
    <section id="blog" className="w-full scroll-mt-24">
      {/* Header */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Blog{" "}
              <span className="align-super text-xs font-normal text-text-muted sm:text-sm">
                ({blogsData.length})
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
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
                    <BlogCard post={row[0]} />
                  </div>
                )}

                {/* Second card */}
                {row[1] && (
                  <div className={row.length === 1 ? "sm:border-r border-border" : ""}>
                    <BlogCard post={row[1]} />
                  </div>
                )}

                {/* Empty cell if odd card in row */}
                {!row[1] && (
                  <div className="hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Posts Footer */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <Link
              to="/blog"
              className="font-mono group flex w-full items-center justify-center gap-2 py-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-text-muted hover:text-text-primary hover:bg-hover-bg transition-all duration-200"
            >
              <span>All Posts</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
