import React from "react";
import { Boxes } from "lucide-react";

const categories = [
  {
    id: "01",
    name: "languages",
    skills: [
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        invertInDark: false,
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        invertInDark: false,
      },
    ],
  },
  {
    id: "02",
    name: "frontend",
    skills: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        invertInDark: false,
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        invertInDark: false,
      },
      {
        name: "Redux Toolkit",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redux.svg",
        invertInDark: false,
      },
      {
        name: "Motion",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg",
        invertInDark: true,
      },
      {
        name: "Component-Labs",
        icon: "Boxes",
        invertInDark: false,
      },
    ],
  },
  {
    id: "03",
    name: "backend",
    skills: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        invertInDark: false,
      },
      {
        name: "Postgres",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        invertInDark: false,
      },
      {
        name: "Prisma",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/prisma.svg",
        invertInDark: true,
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        invertInDark: false,
      },
    ],
  },
  {
    id: "04",
    name: "tools & ai",
    skills: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        invertInDark: false,
      },
      {
        name: "Claude",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg",
        invertInDark: true,
      },
      {
        name: "Gemini",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg",
        invertInDark: true,
      },
      {
        name: "ChatGPT",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
        invertInDark: true,
      },
    ],
  },
];

const StackSection = () => {
  return (
    <section className="w-full">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Stack
            </h2>
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col md:flex-row border-b border-border last:border-b-0"
              >
                {/* Left Column: Category ID & Name */}
                <div className="w-full md:w-[200px] shrink-0 p-4 border-b border-border md:border-b-0 md:border-r md:border-border bg-bg-card flex items-center">
                  <span className="font-mono text-sm text-text-muted mr-3">
                    {category.id}
                  </span>
                  <span className="font-display text-sm font-semibold text-text-secondary sm:text-base">
                    {category.name}
                  </span>
                </div>

                {/* Right Column: Skill Pills */}
                <div className="flex-1 p-4 flex flex-wrap items-center gap-2 bg-bg-card">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-secondary px-2.5 py-1 text-xs font-semibold text-text-primary hover:border-text-muted hover:bg-hover-bg transition-all duration-200"
                    >
                      {skill.icon === "Boxes" ? (
                        <Boxes className="h-3.5 w-3.5 text-text-secondary" />
                      ) : skill.icon ? (
                        <img
                          src={skill.icon}
                          alt=""
                          className={`h-3.5 w-3.5 object-contain ${
                            skill.invertInDark ? "dark:invert" : ""
                          }`}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : null}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
