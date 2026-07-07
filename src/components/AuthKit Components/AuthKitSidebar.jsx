import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const sections = [
  { id: "authkit-hero", label: "Hero" },
  { id: "why-authkit", label: "Why AuthKit" },
  { id: "quick-start", label: "Quick Start" },
  { id: "env-variables", label: "Env Variables" },
  { id: "api-reference", label: "API Reference" },
  { id: "api-examples", label: "Examples" },
  { id: "rate-limiting", label: "Rate Limiting" },
  { id: "project-structure", label: "Structure" },
  { id: "security", label: "Security" },
  { id: "built-with", label: "Built With" },
  { id: "scripts", label: "Scripts" },
  { id: "links", label: "Links" },
];

const AuthKitSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track active section with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button — fixed on right side */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center gap-[5px] p-3 rounded-xl border border-border bg-bg-primary/90 backdrop-blur-sm hover:bg-hover-bg transition-all duration-200 cursor-pointer group"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="block bg-text-muted group-hover:bg-text-primary transition-colors duration-200 rounded-full"
            style={{
              width: `${18 - i * 2}px`,
              height: "2px",
            }}
          />
        ))}
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-[260px] sm:w-[300px] rounded-2xl border border-border bg-bg-primary/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  On This Page
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md hover:bg-hover-bg transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X size={14} className="text-text-muted" />
                </button>
              </div>

              {/* Section Links */}
              <nav className="px-3 py-3 max-h-[60vh] overflow-y-auto">
                {sections.map((section, i) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.03,
                      ease: "easeOut",
                    }}
                    onClick={() => scrollToSection(section.id)}
                    className={`group/item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer hover:-translate-x-1 ${
                      activeSection === section.id
                        ? "bg-hover-bg text-text-primary"
                        : "text-text-secondary hover:bg-hover-bg hover:text-text-primary"
                    }`}
                  >
                    <span
                      className={`font-mono text-[9px] tracking-wider shrink-0 w-5 ${
                        activeSection === section.id
                          ? "text-[#ff3366]"
                          : "text-text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm font-medium transition-all duration-200 group-hover/item:text-base ${
                        activeSection === section.id
                          ? "text-text-primary font-semibold"
                          : ""
                      }`}
                    >
                      {section.label}
                    </span>
                    {activeSection === section.id && (
                      <motion.span
                        layoutId="active-dot"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-[#ff3366]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthKitSidebar;
