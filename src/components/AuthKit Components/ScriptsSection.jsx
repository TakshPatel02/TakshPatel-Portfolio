import { motion } from "motion/react";

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
          <div className="border-x border-border bg-bg-card py-4 p-2">
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
            <div className="grid grid-cols-3 gap-0 border-b border-border px-5 py-2.5">
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
            {scripts.map((row, i) => (
              <motion.div
                key={row.script}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                className="grid grid-cols-3 gap-0 px-5 py-3 border-b border-border last:border-b-0 hover:bg-hover-bg transition-colors duration-200"
              >
                <div>
                  <code className="font-mono text-xs text-text-primary font-semibold">
                    {row.script}
                  </code>
                </div>
                <div>
                  <code className="font-mono text-[11px] text-text-secondary break-all">
                    {row.js}
                  </code>
                </div>
                <div>
                  <code className="font-mono text-[11px] text-text-secondary break-all">
                    {row.ts}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScriptsSection;
