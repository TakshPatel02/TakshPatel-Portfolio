import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-b border-border bg-bg-primary">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          <div className="grid grid-cols-1 md:grid-cols-4 w-full">
            {/* Column 1 (Left - blank on desktop) */}
            <div className="hidden md:block md:col-span-1 border-r border-border" />

            {/* Column 2 (Middle - content) */}
            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center pt-10 pb-8 px-4">
              <div className="w-full flex flex-col gap-4 max-w-[320px]">
                {/* Crafted by */}
                <div className="flex w-full">
                  <div className="w-[110px] sm:w-[130px] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                    crafted by
                  </div>
                  <div className="text-left text-text-secondary font-mono text-xs sm:text-sm">
                    <a
                      href="https://github.com/takshpatel02"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                    >
                      Taksh Patel
                    </a>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex w-full">
                  <div className="w-[110px] sm:w-[130px] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                    tech stack
                  </div>
                  <div className="text-left text-text-secondary font-mono text-xs sm:text-sm flex flex-col gap-1">
                    <a
                      href="https://react.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors"
                    >
                      React JS
                    </a>
                    <a
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors"
                    >
                      Tailwind css
                    </a>
                    <a
                      href="https://motion.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors"
                    >
                      Motion
                    </a>
                  </div>
                </div>

                {/* Inspired by */}
                <div className="flex w-full">
                  <div className="w-[110px] sm:w-[130px] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                    inspired by
                  </div>
                  <div className="text-left text-text-secondary font-mono text-xs sm:text-sm flex flex-col gap-1">
                    <a
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors"
                    >
                      tailwind css
                    </a>
                    <a
                      href="https://github.com/chanhdai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors"
                    >
                      chanh dai
                    </a>
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors"
                    >
                      vercel
                    </a>
                    <a
                      href="https://ramx.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary text-text-primary font-medium"
                    >
                      ramx.in
                    </a>
                  </div>
                </div>

                {/* Source code */}
                <div className="flex w-full">
                  <div className="w-[110px] sm:w-[130px] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                    source code
                  </div>
                  <div className="text-left text-text-secondary font-mono text-xs sm:text-sm">
                    <a
                      href="https://github.com/TakshPatel02/Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                    >
                      github
                    </a>
                  </div>
                </div>

                {/* Licence */}
                <div className="flex w-full">
                  <div className="w-[110px] sm:w-[130px] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                    licence
                  </div>
                  <div className="text-left text-text-secondary font-mono text-xs sm:text-sm">
                    MIT license
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3 (Right - blank on desktop) */}
            <div className="hidden md:block md:col-span-1 border-l border-border" />
          </div>

          {/* Social links row */}
          <div className="grid grid-cols-1 md:grid-cols-4 w-full border-t border-border">
            {/* Blank Left spacer on desktop */}
            <div className="hidden md:block md:col-span-1 border-r border-border" />

            {/* Social box grid (Middle) */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-3 w-full font-mono text-xs sm:text-sm">
              <a
                href="https://x.com/taksh_patel20"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-4 border-r border-border hover:bg-hover-bg hover:text-text-primary text-text-muted transition-colors cursor-pointer group"
              >
                <span className="transition-colors duration-200 group-hover:text-text-primary">x</span>
              </a>
              <a
                href="https://linkedin.com/in/taksh-patel20"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-4 border-r border-border hover:bg-hover-bg hover:text-text-primary text-text-muted transition-colors cursor-pointer group"
              >
                <span className="transition-colors duration-200 group-hover:text-text-primary">linkedin</span>
              </a>
              <a
                href="https://github.com/takshpatel02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-4 hover:bg-hover-bg hover:text-text-primary text-text-muted transition-colors cursor-pointer group"
              >
                <span className="transition-colors duration-200 group-hover:text-text-primary">github</span>
              </a>
            </div>

            {/* Blank Right spacer on desktop */}
            <div className="hidden md:block md:col-span-1 border-l border-border" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
