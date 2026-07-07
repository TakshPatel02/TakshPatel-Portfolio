import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silently fail */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2.5 right-2.5 p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer opacity-0 group-hover/code:opacity-100"
      aria-label="Copy code"
    >
      {copied ? (
        <Check size={12} className="text-[#59d499]" />
      ) : (
        <Copy size={12} className="text-text-muted" />
      )}
    </button>
  );
};

const CodeBlock = ({ code, copyText, label }) => (
  <div className="group/code relative rounded-lg border border-border bg-(--color-surface-elevated) overflow-hidden">
    {label && (
      <div className="px-4 py-2 border-b border-border">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {label}
        </span>
      </div>
    )}
    <div className="px-4 py-3 font-mono text-xs sm:text-sm text-text-secondary overflow-x-auto">
      <pre className="whitespace-pre-wrap">{code}</pre>
    </div>
    <CopyButton text={copyText || code} />
  </div>
);

const QuickStart = () => {
  return (
    <section id="quick-start" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Quick Start
            </h2>
          </div>
        </div>
      </div>

      {/* Step 1: Install */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-(--color-surface-elevated) border border-border text-[10px] font-mono font-bold text-text-muted">
                1
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Scaffold
              </span>
            </div>
            <CodeBlock
              code={`npx create-express-authkit <project-name>`}
              copyText="npx create-express-authkit my-backend"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Language Prompt */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-(--color-surface-elevated) border border-border text-[10px] font-mono font-bold text-text-muted">
                2
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Pick a language
              </span>
            </div>
            <CodeBlock
              code={`? Choose your language: ›\n❯ JavaScript\n  TypeScript`}
              label="Prompt"
            />
          </div>
        </div>
      </div>

      {/* Step 3: Setup */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-(--color-surface-elevated) border border-border text-[10px] font-mono font-bold text-text-muted">
                3
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Run it
              </span>
            </div>
            <CodeBlock
              code={`cd my-backend\ncp .env.example .env      # macOS/Linux — use \`copy\` on Windows\nnpm run dev`}
              copyText="cd my-backend && cp .env.example .env && npm run dev"
            />
            <p className="mt-3 text-xs text-text-muted font-mono">
              TypeScript projects also support{" "}
              <code className="text-text-secondary">npm run build</code> and{" "}
              <code className="text-text-secondary">npm start</code> for production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStart;
