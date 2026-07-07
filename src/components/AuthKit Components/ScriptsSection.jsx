const scripts = [
  { script: "dev", js: "node --watch index.js", ts: "tsx watch src/index.ts" },
  { script: "build", js: "—", ts: "tsc" },
  { script: "start", js: "node index.js", ts: "node dist/index.js" },
];

const ScriptsSection = () => {
  return (
    <section id="scripts" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Scripts
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-3 gap-0 border-b border-border px-5 py-2.5">
              {["Script", "JavaScript", "TypeScript"].map((h) => (
                <span
                  key={h}
                  className="font-mono text-[9px] uppercase tracking-wider text-text-muted"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {scripts.map((row) => (
              <div
                key={row.script}
                className="flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-0 px-5 py-3 border-b border-border last:border-b-0 hover:bg-hover-bg transition-colors duration-200"
              >
                <div className="flex items-start sm:items-center gap-2">
                  <span className="sm:hidden font-mono text-[9px] uppercase tracking-wider text-text-muted w-24 shrink-0 mt-0.5 sm:mt-0">Script</span>
                  <code className="font-mono text-xs text-text-primary font-semibold">
                    {row.script}
                  </code>
                </div>
                <div className="flex items-start sm:items-center gap-2">
                  <span className="sm:hidden font-mono text-[9px] uppercase tracking-wider text-text-muted w-24 shrink-0 mt-0.5 sm:mt-0">JavaScript</span>
                  <code className="font-mono text-[11px] text-text-secondary break-all">
                    {row.js}
                  </code>
                </div>
                <div className="flex items-start sm:items-center gap-2">
                  <span className="sm:hidden font-mono text-[9px] uppercase tracking-wider text-text-muted w-24 shrink-0 mt-0.5 sm:mt-0">TypeScript</span>
                  <code className="font-mono text-[11px] text-text-secondary break-all">
                    {row.ts}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScriptsSection;
