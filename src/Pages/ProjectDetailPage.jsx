import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Globe, Github, ExternalLink, ArrowUp } from "lucide-react";
import "highlight.js/styles/github-dark.css";
import SectionDivider from "../components/SectionDivider";
import { projectsData } from "../data/projectsData";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find the project by slug
  const project = projectsData.find((p) => p.slug === slug);

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (!project) {
        setError("Project not found");
        setLoading(false);
        return;
      }

      if (!project.markdownUrl) {
        setMarkdownContent("");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(project.markdownUrl);
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
  }, [slug, project]);

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

  if (error || !project) {
    return (
      <div className="w-full">
        <div className="flex w-full flex-col gap-4">
          <div className="h-px w-full bg-border"></div>
          <div className="h-px w-full bg-border"></div>
        </div>
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-16">
            <div className="px-4 sm:px-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-text-primary">
                  Project not found
                </h1>
                <Link
                  to="/project"
                  className="mt-4 inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SectionDivider />
      {/* Back Button */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4">
            <div className="px-4 sm:px-8">
              <Link
                to="/project"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image with Borders */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-8 sm:py-10">
            <div className="px-4 sm:px-8">
              <div
                className={`relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br ${project.accent}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65)_0,_transparent_55%)]"></div>
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Header Info with Borders */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-8 sm:py-10">
            <div className="px-4 sm:px-8">
              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-btn-bg px-3 py-1 text-sm text-text-secondary">
                  {project.status === "working" ? "Operational" : "Building"}
                </span>
                <span className="rounded-full bg-btn-bg px-3 py-1 text-sm text-text-secondary">
                  {project.tech}
                </span>
                <span className="rounded-full bg-btn-bg px-3 py-1 text-sm text-text-secondary">
                  {project.timeline}
                </span>
              </div>

              {/* Title & Description */}
              <h1 className="font-display text-4xl font-bold text-text-primary sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-text-secondary sm:text-xl">
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    Timeline
                  </p>
                  <p className="mt-1 font-semibold text-text-primary">
                    {project.timeline}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    Tech
                  </p>
                  <p className="mt-1 font-semibold text-text-primary">
                    {project.tech}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    Role
                  </p>
                  <p className="mt-1 font-semibold text-text-primary">
                    {project.role}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    Status
                  </p>
                  <p className="mt-1 font-semibold text-text-primary">
                    {project.status === "working" ? "Live" : "In Progress"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-text-primary px-6 py-3 font-medium text-bg-primary transition hover:bg-text-secondary"
                  >
                    <Globe className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-btn-bg px-6 py-3 font-medium text-text-primary transition hover:bg-hover-bg"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                )}
              </div>

              {/* Divider */}
              <hr className="my-12 border-border" />

              {/* Tech Stack Section - Always Show */}
              <section className="mb-12">
                <h2 className="mb-4 text-2xl font-bold text-text-primary">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-border bg-bg-secondary px-4 py-2"
                    >
                      <img src={tech.icon} alt={tech.name} className="size-8" />
                      <span className="font-medium text-text-primary">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="my-12 border-border" />
              {/* Markdown Content or Default Overview */}
              {markdownContent ? (
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
              ) : (
                <section>
                  <h2 className="mb-4 text-2xl font-bold text-text-primary">
                    Overview
                  </h2>
                  <p className="leading-7 text-text-secondary">
                    {project.description}
                  </p>
                </section>
              )}
            </div>
          </div>
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
    </div>
  );
};

export default ProjectDetailPage;
