import { ChevronDown, Globe, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import app from "../../FireBaseConfig.js";

const ProjectAccordionItem = ({ project, isOpen, onToggle }) => {
  const technologies = Array.isArray(project?.technologies)
    ? project.technologies
    : [];

  const bullets = Array.isArray(project?.bullets)
    ? project.bullets
    : [
        "Designed with modern design guidelines and smooth transitions",
        "Optimized for high-performance and fast loading speeds",
        "Built with a fully responsive layout supporting mobile and desktop",
      ];

  const renderPeriod = (periodText) => {
    const text = periodText || "05.2025 – ∞";
    const infinityChar = text.includes("∞") ? "∞" : text.includes("\u221E") ? "\u221E" : null;
    if (infinityChar) {
      const parts = text.split(infinityChar);
      return (
        <>
          {parts[0]}
          <span className="text-sm font-sans font-semibold inline-block align-baseline relative top-[0.5px] scale-110 ml-0.5">
            ∞
          </span>
          {parts.slice(1).join(infinityChar)}
        </>
      );
    }
    return text;
  };

  return (
    <div className="border-b border-border last:border-b-0 flex flex-col bg-bg-card">
      {/* Header Row (Toggles Accordion) */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-hover-bg transition-colors select-none"
        onClick={onToggle}
      >
        {/* Left Side: Icon, Title & Period */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-white p-1.5 overflow-hidden">
            {project?.logo ? (
              <img
                src={project.logo}
                alt=""
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <span className="text-xs font-bold text-neutral-800 uppercase">
                {project?.title ? project.title.substring(0, 2) : "PR"}
              </span>
            )}
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-text-primary sm:text-base">
              {project?.title}
            </h3>
            <p className="font-mono text-xs text-text-muted mt-0.5">
              {renderPeriod(project?.period)}
            </p>
          </div>
        </div>

        {/* Right Side: Links & Chevron */}
        <div className="flex items-center gap-3 text-text-muted">
          {project?.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full hover:bg-btn-bg hover:text-text-primary transition-colors"
              aria-label="Open live site"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          {project?.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full hover:bg-btn-bg hover:text-text-primary transition-colors"
              aria-label="Open GitHub repository"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-250 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Expanded Body Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 pt-2 border-t border-border/40">
              {/* Description */}
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base mb-4">
                {project?.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2.5 mb-5 pl-1">
                {bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted opacity-80" />
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Technologies / Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {technologies.map((t, idx) => {
                  const techName = typeof t === "object" && t !== null ? t.name : String(t);
                  return (
                    <span
                      key={idx}
                      className="rounded-full border border-border bg-tag-bg px-3 py-1 text-xs font-semibold text-text-secondary hover:border-text-muted transition-colors"
                    >
                      {techName}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

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

  // Show only 4 projects initially, or all if showAll is true
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="w-full">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Projects{" "}
              <span className="align-super text-xs font-normal text-text-muted sm:text-sm">
                ({projects.length})
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Projects List Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            {visibleProjects.map((project, index) => (
              <ProjectAccordionItem
                key={project.slug || index}
                project={project}
                isOpen={expandedIndex === index}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === index ? -1 : index)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Load All Projects Button Box */}
      {!showAll && projects.length > 4 && (
        <div className="w-full border-b border-border">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="border-x border-border bg-bg-card">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="font-display block w-full py-4 text-center text-sm font-semibold uppercase tracking-widest text-text-primary transition hover:bg-hover-bg cursor-pointer"
              >
                Load All Projects
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
