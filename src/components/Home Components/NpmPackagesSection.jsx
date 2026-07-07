import React, { useState } from "react";
import { ExternalLink, Github, Terminal, Copy, Check, Package } from "lucide-react";

const packages = [
  {
    id: "01",
    name: "component-labs",
    description:
      "Open-source React component library with 60+ animated components",
    installCmd: "npm i component-labs",
    npmUrl: "https://www.npmjs.com/package/component-labs",
    githubUrl: "https://github.com/TakshPatel02/ComponentLabs-npm",
  },
  {
    id: "02",
    name: "iconflow",
    description:
      "Lucide React icon wrapper with 6 built-in animation types — drop-in, zero config",
    installCmd: "npm i iconflow",
    npmUrl: "https://www.npmjs.com/package/iconflow",
    githubUrl: "https://github.com/TakshPatel02/IconFlow-npm",
  },
  {
    id: "03",
    name: "create-express-authkit",
    description:
      "CLI to scaffold an Express + MongoDB backend with JWT auth in one command",
    installCmd: "npx create-express-authkit my-app",
    npmUrl: "https://www.npmjs.com/package/create-express-authkit",
    githubUrl: "https://github.com/TakshPatel02/create-express-authkit",
  },
];

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: silently fail */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
      aria-label="Copy install command"
    >
      {copied ? (
        <Check size={12} className="text-[#59d499]" />
      ) : (
        <Copy size={12} className="text-text-muted opacity-60 group-hover/cmd:opacity-100 transition-opacity" />
      )}
    </button>
  );
};

const NpmPackageCard = ({ pkg }) => {
  return (
    <div className="flex flex-col sm:flex-row border-b border-border last:border-b-0 group hover:bg-hover-bg transition-colors duration-300">
      {/* Left Column: Package name, badge, install command */}
      <div className="w-full sm:w-[260px] shrink-0 p-5 border-b border-border sm:border-b-0 sm:border-r sm:border-border flex flex-col justify-between items-start gap-3">
        <div className="w-full">
          {/* Package number label */}
          <span className="font-mono text-[10px] text-text-muted tracking-wider block mb-1">
            PACKAGE {pkg.id}
          </span>

          {/* Package name with accent dot */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-display text-base font-bold text-text-primary group-hover:text-text-primary transition-colors duration-200 break-all">
              {pkg.name}
            </h3>
          </div>

          {/* npm badge */}
          <a
            href={pkg.npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-3"
          >
            <img
              src={`https://img.shields.io/npm/v/${pkg.name}?style=flat&colorA=0a0a0b&colorB=59d499`}
              alt={`${pkg.name} npm version`}
              className="h-[18px]"
              loading="lazy"
            />
          </a>
        </div>

        {/* Install command */}
        <div className="group/cmd w-full flex items-center gap-2 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-2 font-mono text-[11px] text-text-secondary">
          <Terminal size={12} className="shrink-0 text-text-muted" />
          <code className="flex-1 break-all select-all">{pkg.installCmd}</code>
          <CopyButton text={pkg.installCmd} />
        </div>
      </div>

      {/* Right Column: Description + Links */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
        {/* Description */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block mb-1.5">
            What It Does
          </span>
          <p className="text-sm font-semibold text-text-primary leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap gap-3 items-center">
          <a
            href={pkg.npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors"
          >
            <Package size={11} />
            npm
            <ExternalLink size={9} className="opacity-50" />
          </a>
          <a
            href={pkg.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors"
          >
            <Github size={11} />
            GitHub
            <ExternalLink size={9} className="opacity-50" />
          </a>
        </div>
      </div>
    </div>
  );
};

const NpmPackagesSection = () => {
  return (
    <section id="npm-packages" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl flex items-center gap-2.5">
              NPM Packages{" "}
              <span className="align-super text-xs font-normal text-text-muted sm:text-sm">
                ({packages.length})
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            {packages.map((pkg) => (
              <NpmPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NpmPackagesSection;
