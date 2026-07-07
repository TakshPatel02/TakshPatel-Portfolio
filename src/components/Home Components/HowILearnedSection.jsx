import React from "react";
import { ExternalLink } from "lucide-react";

const resources = [
  {
    id: "01",
    name: "CodeWithHarry",
    learned: "HTML & CSS fundamentals",
    type: "YouTube",
    link: "https://www.youtube.com/@CodeWithHarry",
    advantages: "Beginner-friendly, structured intro to HTML & CSS.",
  },
  {
    id: "02",
    name: "Hitesh Choudhary — Chai aur Code",
    learned: "JavaScript fundamentals, React (in-depth + full project), Node.js backend (MongoDB aggregation), and Next.js (in progress)",
    type: "YouTube + Udemy",
    link: "https://www.youtube.com/@ChaiAurCode",
    advantages: "In-depth, project-based — the resource I keep coming back to.",
  },
  {
    id: "03",
    name: "Sheryians Coding School",
    learned: "React basics (first introduction to component-based UI) and advanced email-based authentication",
    type: "YouTube",
    link: "https://www.youtube.com/@sheryians",
    advantages: "Approachable explanations, great for getting unstuck fast.",
  },
  {
    id: "04",
    name: "Manu Arora",
    learned: "Tailwind CSS (design-first approach) and Framer Motion / Motion",
    type: "YouTube",
    link: "https://www.youtube.com/@manuarora",
    advantages: "Best design instincts of any dev educator I've followed.",
  },
  {
    id: "05",
    name: "Piyush Garg",
    learned: "Node.js & Express core fundamentals",
    type: "Udemy + YouTube",
    link: "https://www.youtube.com/@piyushgargdev",
    advantages: "Breaks down backend logic better than anyone else I've watched.",
  },
];

const HowILearnedSection = () => {
  return (
    <section id="how-i-learned" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl flex items-center gap-2.5">
              How I Learned{" "}
              <span className="align-super text-xs font-normal text-text-muted sm:text-sm">
                (Resources)
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="flex flex-col sm:flex-row border-b border-border last:border-b-0 group hover:bg-hover-bg transition-colors duration-300"
              >
                {/* Left Column: ID, Name, Tag & Link (Top-aligned, fixed gap) */}
                <div className="w-full sm:w-[240px] shrink-0 p-5 border-b border-border sm:border-b-0 sm:border-r sm:border-border flex flex-col justify-start items-start gap-3">
                  <div>
                    <span className="font-mono text-[10px] text-text-muted tracking-wider block mb-1">
                      RESOURCE {resource.id}
                    </span>
                    <h3 className="font-display text-base font-bold text-text-primary group-hover:text-text-primary transition-colors duration-200">
                      {resource.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="inline-flex items-center rounded-md border border-border bg-bg-secondary px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-text-secondary">
                      {resource.type}
                    </span>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors"
                    >
                      Visit Channel <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                {/* Right Column: Learned & Advantages */}
                <div className="flex-1 p-5 flex flex-col gap-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block mb-1.5">
                      What I Learned
                    </span>
                    <p className="text-sm font-semibold text-text-primary leading-relaxed">
                      {resource.learned}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Why I Recommend
                    </span>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-body">
                      {resource.advantages}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowILearnedSection;
