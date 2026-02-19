import { Globe, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="group p-4 sm:p-5 flex flex-col h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/project/${project.slug}`}>
        {/* Project Preview Image */}
        <motion.div
          className={`relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br ${project.accent}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Optional: Add gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65)_0,_transparent_55%)]"></div>

          {/* Preview mockup or image */}
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-800">
              Preview
            </div>
          )}
        </motion.div>
      </Link>

      {/* Action Icons - Outside Link to prevent navigation on click */}
      <div className="absolute right-7 top-7 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:right-9 sm:top-9">
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-white/90 p-2 text-zinc-800 shadow-lg transition hover:scale-110 hover:bg-white"
            aria-label="Visit website"
          >
            <Globe className="h-4 w-4" />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-white/90 p-2 text-zinc-800 shadow-lg transition hover:scale-110 hover:bg-white"
            aria-label="View source code"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Project Info */}
      <Link
        to={`/project/${project.slug}`}
        className="mt-4 block flex-1 flex flex-col"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-text-primary transition group-hover:text-blue-400 sm:text-xl">
            {project.title}
          </h3>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-auto pt-4">
          <p className="text-xs uppercase tracking-widest text-text-muted">
            Technologies
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="flex items-center gap-1 text-text-muted"
                title={tech.name}
              >
                {tech.icon ? (
                  <img src={tech.icon} className="size-8" alt={tech.name} />
                ) : (
                  <span className="rounded bg-tag-bg px-2 py-1 text-xs text-tag-text">
                    {tech.name}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
