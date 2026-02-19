import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsData } from "../../data/projectsData";

const ProjectCard = ({ project }) => (
  <motion.div
    className="group p-4 sm:p-5 rounded-xl flex flex-col h-full"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
  >
    <Link to={`/project/${project.slug}`}>
      <motion.div
        className={`relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br ${project.accent}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img src={project.image} alt={project.title} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65)_0,_transparent_55%)]"></div>
        <div className="absolute bottom-4 left-4 rounded-xl bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-800">
          Preview
        </div>
      </motion.div>
    </Link>

    <div className="mt-4 flex items-start justify-between gap-3">
      <Link to={`/project/${project.slug}`} className="flex-1">
        <h3 className="font-display text-sm font-bold text-text-primary transition group-hover:text-blue-400 sm:text-lg lg:text-xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary sm:text-base">
          {project.description}
        </p>
      </Link>
      <div className="flex shrink-0 items-center gap-2 text-text-muted">
        {project.website && (
          <button
            type="button"
            className="rounded-full bg-btn-bg p-2 transition hover:bg-hover-bg hover:text-text-primary"
            aria-label="Open live site"
          >
            <Link
              to={`${project.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-4 w-4" />
            </Link>
          </button>
        )}
        {project.github && (
          <button
            type="button"
            className="rounded-full bg-btn-bg p-2 transition hover:bg-hover-bg hover:text-text-primary"
            aria-label="Open source"
          >
            <Link
              to={`${project.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </Link>
          </button>
        )}
      </div>
    </div>

    <div className="mt-auto pt-3">
      <p className="text-xs uppercase tracking-widest text-text-muted">
        Technologies
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <span
            key={t.name}
            className="inline-flex items-center gap-1.5 text-xs text-tag-text"
          >
            <img src={t.icon} alt={t.name} className="size-8" />
          </span>
        ))}
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between">
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          project.status === "Operational"
            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
            : "bg-amber-500/15 text-amber-600 dark:text-amber-300"
        }`}
      >
        {project.status === "Operational"
          ? "All Systems Operational"
          : "Building"}
      </span>
      <Link
        to={`/project/${project.slug}`}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary transition group-hover:text-text-primary"
      >
        View Details
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const rows = [];
  // Limit to 4 projects on home page
  const limitedProjects = projectsData.slice(0, 4);
  for (let i = 0; i < limitedProjects.length; i += 2) {
    rows.push(limitedProjects.slice(i, i + 2));
  }

  return (
    <section className="w-full">
      {/* Header */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Featured
            </span>
            <h2 className="font-display mt-2 text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Selected Projects
            </h2>
          </div>
        </div>
      </div>

      {/* Project rows */}
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

                {row[0] && <ProjectCard project={row[0]} />}

                {/* Double divider (mobile between cards) */}
                {row[1] && (
                  <div className="flex flex-col gap-[16px] sm:hidden">
                    <div className="h-px w-full bg-border"></div>
                    <div className="h-px w-full bg-border"></div>
                  </div>
                )}

                {row[1] && <ProjectCard project={row[1]} />}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Show All Projects */}
      <div className="w-full">
        <div className="flex w-full flex-col gap-[16px]">
          <div className="h-px w-full bg-border"></div>
          <div className="h-px w-full bg-border"></div>
        </div>
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <Link
              to="/project"
              className="font-display block py-4 text-center text-sm font-semibold uppercase tracking-widest text-text-primary transition hover:bg-hover-bg"
            >
              Show All Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
