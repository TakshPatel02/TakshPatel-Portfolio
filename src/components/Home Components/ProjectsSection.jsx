import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import app from "../../FireBaseConfig.js";

const ProjectCard = ({ project }) => {
  const technologies = Array.isArray(project?.technologies)
    ? project.technologies
    : [];
  const imageSrc =
    typeof project?.image === "string" && project.image.trim() !== ""
      ? project.image
      : null;

  return (
    <motion.div
      className="group flex h-full flex-col rounded-xl p-4 sm:p-5"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/project/${project.slug}`}>
        <motion.div
          className={`relative aspect-video overflow-hidden rounded-2xl bg-linear-to-br ${project.accent}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65)_0,transparent_55%)]"></div>
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
          {project.website ? (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-btn-bg p-2 transition hover:bg-hover-bg hover:text-text-primary"
              aria-label="Open live site"
            >
              <Globe className="h-4 w-4" />
            </a>
          ) : null}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-btn-bg p-2 transition hover:bg-hover-bg hover:text-text-primary"
              aria-label="Open source"
            >
              <Github className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-auto pt-3">
        <p className="text-xs uppercase tracking-widest text-text-muted">
          Technologies
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {technologies.map((t, index) => {
            const tech =
              typeof t === "object" && t !== null ? t : { name: String(t) };
            return (
              <span
                key={`${tech.name}-${index}`}
                className="inline-flex items-center gap-1.5 text-xs text-tag-text"
              >
                {tech.icon ? (
                  <img src={tech.icon} alt={tech.name} className="size-8" />
                ) : (
                  <span className="rounded bg-tag-bg px-2 py-1 text-xs text-tag-text">
                    {tech.name}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            project.status === "operational"
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-600"
              : "bg-amber-500/15 text-amber-600 dark:text-amber-300"
          }`}
        >
          {project.status === "operational"
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
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getDatabase(app);
        const projectsRef = ref(db, "projects");
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

          setProjects(projectsArray.filter(Boolean));
        } else {
          console.log("No project data available");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProjects();
  }, []);

  const rows = [];
  // Limit to 4 projects on home page
  const limitedProjects = projects.slice(0, 4);
  for (let i = 0; i < limitedProjects.length; i += 2) {
    rows.push(limitedProjects.slice(i, i + 2));
  }
  return (
    <section className="w-full">
      {/* Header */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
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
          <div className="flex w-full flex-col gap-4">
            <div className="h-px w-full bg-border"></div>
            <div className="h-px w-full bg-border"></div>
          </div>

          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="border-x border-border bg-bg-card">
              <div className="relative grid grid-cols-1 sm:grid-cols-2">
                {/* Double vertical divider */}
                <div
                  className="pointer-events-none absolute left-1/2 hidden -translate-x-2.25 sm:flex sm:gap-4"
                  style={{ top: "-18px", bottom: "-18px" }}
                >
                  <div className="h-full w-px bg-border"></div>
                  <div className="h-full w-px bg-border"></div>
                </div>

                {row[0] && <ProjectCard project={row[0]} />}

                {/* Double divider (mobile between cards) */}
                {row[1] && (
                  <div className="flex flex-col gap-4 sm:hidden">
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
        <div className="flex w-full flex-col gap-4">
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
