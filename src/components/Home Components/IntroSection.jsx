import React from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { GitHubCalendar } from "react-github-calendar";

const IntroSection = () => {
    const { theme } = useTheme();
  
    const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#141516", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };
  return (
    <section className="w-full">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Hello
            </h2>
          </div>
        </div>
      </div>

      {/* Bullets List Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-3">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted opacity-80" />
                <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  Frontend & full-stack developer building real, production-grade projects — not tutorial clones
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted opacity-80" />
                <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  Currently shipping{" "}
                  <a
                    href="https://componentlabs.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-text-muted hover:decoration-text-primary hover:text-text-primary transition-all duration-200"
                  >
                    ComponentLabs
                  </a>
                  , an open-source React component library with 40+ animated UI components
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted opacity-80" />
                <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  IT undergrad at GTU, sharpening MERN + Next.js skills while preparing for placements
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Links Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-4 px-3 flex items-center gap-3">
            <a
              href="https://github.com/takshpatel02"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-secondary text-text-secondary hover:bg-hover-bg hover:text-text-primary transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/takshpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-secondary text-text-secondary hover:bg-hover-bg hover:text-text-primary transition-all duration-200"
              aria-label="Twitter / X"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/taksh-patel20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-secondary text-text-secondary hover:bg-hover-bg hover:text-text-primary transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 px-4 items-center justify-center gap-2 rounded-md border border-border bg-bg-secondary text-xs font-semibold uppercase tracking-widest text-text-secondary hover:bg-hover-bg hover:text-text-primary transition-all duration-200"
              aria-label="Resume"
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
              <div className="border-x border-border bg-bg-card py-4 p-2">
                <div className="flex justify-center overflow-x-auto">
                  <GitHubCalendar
                    username="takshpatel02"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    theme={calendarTheme}
                    fontSize={14}
                    blockSize={13}
                    blockMargin={2}
                    
                  />
                </div>
              </div>
            </div>
    </section>
  );
};

export default IntroSection;
