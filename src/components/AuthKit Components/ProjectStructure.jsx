import { FolderTree } from "lucide-react";

const jsTree = `├── index.js
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validations/`;

const tsTree = `├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── validations/
├── tsconfig.json`;

const TreeBlock = ({ label, tree }) => (
  <div className="flex-1 min-w-[240px] rounded-lg border border-border bg-(--color-surface-elevated) overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
      <FolderTree size={12} className="text-text-muted" />
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </span>
    </div>
    <div className="px-4 py-3 font-mono text-[11px] sm:text-xs text-text-secondary leading-relaxed overflow-x-auto">
      <pre className="whitespace-pre">{tree}</pre>
    </div>
  </div>
);

const ProjectStructure = () => {
  return (
    <section id="project-structure" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Project Structure
            </h2>
          </div>
        </div>
      </div>

      {/* Tree Blocks */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <TreeBlock label="JavaScript" tree={jsTree} />
              <TreeBlock label="TypeScript" tree={tsTree} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectStructure;
