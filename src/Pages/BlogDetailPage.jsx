import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Calendar, Clock, ArrowUp } from "lucide-react";
import "highlight.js/styles/github-dark.css";
import SectionDivider from "../components/SectionDivider";
import { blogsData } from "../data/blogsData";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find the blog post by slug
  const post = blogsData.find((p) => p.slug === slug);

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (!post) {
        setError("Blog post not found");
        setLoading(false);
        return;
      }

      if (!post.markdownUrl) {
        setMarkdownContent(
          "# Content Coming Soon\n\nThis blog post is currently being written.",
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(post.markdownUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        const text = await response.text();
        setMarkdownContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [slug, post]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex w-full flex-col gap-4">
          <div className="h-px w-full bg-border"></div>
          <div className="h-px w-full bg-border"></div>
        </div>
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-16">
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-text-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-16">
            <div className="px-4 sm:px-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-text-primary">
                  Blog post not found
                </h1>
                <Link
                  to="/blog"
                  className="mt-4 inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <SectionDivider />
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4">
            <div className="px-4 sm:px-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Article Container with Borders */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <article className="border-x border-border bg-bg-card py-8 sm:py-12">
            <div className="px-4 sm:px-8">
              {/* Article Header */}
              <header className="mb-8 border-b border-border pb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full rounded-lg mb-4"
                />
                <h1 className="font-display text-lg font-bold text-text-primary sm:text-2xl md:text-4xl lg:text-5xl">
                  {post.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time>{post.date}</time>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
              </header>

              {/* Markdown Content */}
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-6 mt-8 text-3xl font-bold text-text-primary">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-4 mt-8 text-2xl font-bold text-text-primary">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-3 mt-6 text-xl font-semibold text-text-primary">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-7 text-text-secondary">
                        {children}
                      </p>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline decoration-blue-400/30 underline-offset-2 transition hover:decoration-blue-400"
                      >
                        {children}
                      </a>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 ml-6 list-disc space-y-2 text-text-secondary">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 ml-6 list-decimal space-y-2 text-text-secondary">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-7">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-6 border-l-4 border-border bg-bg-secondary px-4 py-3 italic text-text-secondary">
                        {children}
                      </blockquote>
                    ),
                    code: ({ inline, children, className }) => {
                      if (inline) {
                        return (
                          <code className="rounded bg-bg-secondary px-1.5 py-0.5 text-sm text-text-primary">
                            {children}
                          </code>
                        );
                      }
                      return <code className={className}>{children}</code>;
                    },
                    pre: ({ children }) => (
                      <pre className="my-6 overflow-x-auto rounded-lg bg-[#0d1117] p-4">
                        {children}
                      </pre>
                    ),
                    img: ({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt}
                        className="my-6 rounded-lg border border-border"
                      />
                    ),
                    hr: () => <hr className="my-8 border-border" />,
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 inline-flex items-center gap-2 rounded-lg border border-border bg-bg-card px-4 py-3 font-medium text-text-secondary shadow-lg transition hover:bg-bg-secondary hover:text-text-primary"
        title="Back to Top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
};

export default BlogDetailPage;
