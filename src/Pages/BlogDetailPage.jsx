import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowUp, List, X } from "lucide-react";
import "highlight.js/styles/github-dark.css";
import { getDatabase, ref, get } from "firebase/database";
import app from "../FireBaseConfig";



/* ─── Slugify heading text for IDs ─── */
const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ─── Extract headings from markdown ─── */
const extractHeadings = (markdown) => {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].replace(/[*_`~\[\]]/g, ""),
      id: slugify(match[2].replace(/[*_`~\[\]]/g, "")),
    });
  }
  return headings;
};

/* ─── Animated markdown components (with IDs for TOC) ─── */
const AnimatedH1 = ({ children }) => {
  const text = typeof children === "string" ? children : children?.toString?.() || "";
  return (
    <h1
      id={slugify(text)}
      className="mb-4 mt-8 font-display text-lg font-bold text-text-primary sm:text-xl tracking-[0.01em]"
    >
      {children}
    </h1>
  );
};

const AnimatedH2 = ({ children }) => {
  const text = typeof children === "string" ? children : children?.toString?.() || "";
  return (
    <h2
      id={slugify(text)}
      className="mb-3 mt-8 font-display text-base font-bold text-text-primary sm:text-lg tracking-[0.01em]"
    >
      {children}
    </h2>
  );
};

const AnimatedH3 = ({ children }) => {
  const text = typeof children === "string" ? children : children?.toString?.() || "";
  return (
    <h3
      id={slugify(text)}
      className="mb-2.5 mt-6 font-display text-[15px] font-semibold text-text-primary tracking-[0.01em]"
    >
      {children}
    </h3>
  );
};

const AnimatedP = ({ children }) => (
  <p className="mb-4 text-[15px] leading-[1.8] text-text-secondary">{children}</p>
);

const AnimatedBlockquote = ({ children }) => (
  <blockquote className="my-6 border-l-2 border-text-muted/40 pl-4 italic text-text-secondary text-[15px] leading-[1.8]">
    {children}
  </blockquote>
);

const AnimatedUl = ({ children }) => (
  <ul className="mb-4 ml-5 list-disc space-y-1.5 text-[15px] text-text-secondary marker:text-text-muted/50">
    {children}
  </ul>
);

const AnimatedOl = ({ children }) => (
  <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-[15px] text-text-secondary marker:text-text-muted/50">
    {children}
  </ol>
);

const AnimatedImg = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className="my-6 w-full rounded-md border border-border"
  />
);

const AnimatedPre = ({ children }) => (
  <pre className="my-6 overflow-x-auto rounded-md bg-[#0d1117] border border-[#30363d] p-4 text-sm font-mono text-[#c9d1d9]">
    {children}
  </pre>
);

const MarkdownA = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-text-primary underline decoration-text-muted/30 underline-offset-[3px] transition hover:decoration-text-primary/60"
  >
    {children}
  </a>
);

const MarkdownLi = ({ children }) => (
  <li className="leading-[1.8] pl-1">{children}</li>
);

const MarkdownCode = ({ inline, children, className }) => {
  if (inline) {
    return (
      <code className="rounded-[4px] bg-bg-secondary border border-border/50 px-1.5 py-0.5 text-[13px] text-text-primary font-mono">
        {children}
      </code>
    );
  }
  return (
    <code
      className={`font-mono ${className || ""}`}
      style={{ background: "transparent", padding: 0 }}
    >
      {children}
    </code>
  );
};

const MarkdownHr = () => (
  <hr className="my-8 border-border" />
);

const MarkdownTable = ({ children }) => (
  <div className="my-6 overflow-x-auto rounded-md border border-border">
    <table className="w-full text-sm text-text-secondary">{children}</table>
  </div>
);

const MarkdownThead = ({ children }) => (
  <thead className="border-b border-border bg-bg-secondary text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
    {children}
  </thead>
);

const MarkdownTh = ({ children }) => (
  <th className="px-4 py-2.5">{children}</th>
);

const MarkdownTd = ({ children }) => (
  <td className="border-t border-border/50 px-4 py-2.5">{children}</td>
);

const markdownComponents = {
  h1: AnimatedH1,
  h2: AnimatedH2,
  h3: AnimatedH3,
  p: AnimatedP,
  a: MarkdownA,
  ul: AnimatedUl,
  ol: AnimatedOl,
  li: MarkdownLi,
  blockquote: AnimatedBlockquote,
  code: MarkdownCode,
  pre: AnimatedPre,
  img: AnimatedImg,
  hr: MarkdownHr,
  table: MarkdownTable,
  thead: MarkdownThead,
  th: MarkdownTh,
  td: MarkdownTd,
};

/* ─── Table of Contents Panel ─── */
const TableOfContents = ({ headings, isOpen, onClose, activeId }) => {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed bottom-22 left-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 rounded-lg border border-border bg-bg-primary/95 backdrop-blur-sm shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                Table of Contents
              </span>
              <button
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center rounded text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Headings list */}
            <div className="max-h-[50vh] overflow-y-auto py-1.5">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => handleClick(heading.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                    heading.level === 2 ? "pl-6" : heading.level === 3 ? "pl-8" : "pl-4"
                  } ${
                    activeId === heading.id
                      ? "bg-hover-bg text-text-primary font-medium"
                      : "text-text-secondary hover:bg-hover-bg hover:text-text-primary"
                  }`}
                >
                  {heading.text}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState("");

  const headings = useMemo(() => extractHeadings(markdownContent), [markdownContent]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Track active heading via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    // Small delay to let headings render
    const timer = setTimeout(() => {
      headings.forEach((h) => {
        const el = document.getElementById(h.id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [headings]);

  // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPostAndMarkdown = async () => {
      setLoading(true);
      setError(null);

      try {
        const db = getDatabase(app);
        const blogsRef = ref(db, "blogs");
        const snapshot = await get(blogsRef);

        if (!snapshot.exists()) {
          throw new Error("Blog post not found");
        }

        const rawData = snapshot.val();
        const blogGroup = Object.values(rawData)[0] || {};
        const blogsArray = Object.values(blogGroup);
        const matchedPost = blogsArray.find((p) => p.slug === slug);

        if (!matchedPost) {
          throw new Error("Blog post not found");
        }

        setPost(matchedPost);

        if (!matchedPost.markdownUrl) {
          setMarkdownContent(
            "# Content Coming Soon\n\nThis blog post is currently being written.",
          );
          return;
        }

        const response = await fetch(matchedPost.markdownUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        const text = await response.text();
        setMarkdownContent(text);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndMarkdown();
  }, [slug]);

  // Find active heading text for the pill
  const activeHeading = headings.find((h) => h.id === activeHeadingId);

  /* ─── Loading state ─── */
  if (loading) {
    return (
      <div className="w-full">
        <div className="w-full border-b border-border">
          <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
            <div className="border-x border-border bg-bg-card py-20">
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-text-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Error state ─── */
  if (error || !post) {
    return (
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-20">
            <div className="text-center">
              <h1 className="font-display text-xl font-bold text-text-primary">
                Blog post not found
              </h1>
              <Link
                to="/blog"
                className="mt-4 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─── Breadcrumb / Back ─── */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-3 px-4 sm:px-6">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Blog
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Article Header ─── */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-6 sm:py-8 px-4 sm:px-6">
            {/* Hero Image — constrained height */}
            {post.image && (
              <motion.div
                className="mb-5 overflow-hidden rounded-md border border-border"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full"
                />
              </motion.div>
            )}

            {/* Title — reduced size */}
            <motion.h1
              className="font-display text-lg font-bold text-text-primary leading-tight sm:text-xl md:text-2xl tracking-[0.01em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              className="mt-3 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                <Calendar className="h-3 w-3" />
                <time>{post.date}</time>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Article Body ─── */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <motion.article 
            className="border-x border-border bg-bg-card py-6 sm:py-8 px-4 sm:px-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={markdownComponents}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>
      </div>

      {/* ─── Back to Blog footer ─── */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <Link
              to="/blog"
              className="font-mono group flex w-full items-center justify-center gap-2 py-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-text-muted hover:text-text-primary hover:bg-hover-bg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Table of Contents Panel ─── */}
      {headings.length > 0 && (
        <TableOfContents
          headings={headings}
          isOpen={tocOpen}
          onClose={() => setTocOpen(false)}
          activeId={activeHeadingId}
        />
      )}

      {/* ─── Fixed bottom bar: TOC pill + Scroll-to-top ─── */}
      <AnimatePresence>
        {showScrollTop && headings.length > 0 && (
          <motion.div
            className="fixed bottom-14 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
          >
            {/* Active section pill / TOC trigger */}
            <button
              onClick={() => setTocOpen(true)}
              className="flex items-center gap-2 rounded-md border border-border bg-bg-primary/90 backdrop-blur-sm px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <List className="h-3.5 w-3.5 text-text-muted" />
              <span className="max-w-[180px] truncate font-medium">
                {activeHeading ? activeHeading.text : "Table of Contents"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback scroll-to-top when no headings */}
      {headings.length === 0 && (
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-10 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg-primary/90 backdrop-blur-sm text-text-muted transition-colors hover:bg-hover-bg hover:text-text-primary cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default BlogDetailPage;
