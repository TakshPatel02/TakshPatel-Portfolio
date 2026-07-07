import { useState } from "react";
import { motion } from "motion/react";
import { Terminal, Copy, Check, ExternalLink, Package, Github, Shield } from "lucide-react";

const installCmd = "npx create-express-authkit my-backend";

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
        <Check size={13} className="text-[#59d499]" />
      ) : (
        <Copy size={13} className="text-text-muted opacity-60 group-hover/cmd:opacity-100 transition-opacity" />
      )}
    </button>
  );
};

const AuthKitHero = () => {
  return (
    <section id="authkit-hero" className="w-full scroll-mt-24">
      {/* Top border line spanning full screen width */}
      <div className="h-px w-full bg-border" />

      {/* Package Label Row */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-3 flex items-center gap-2">
            <Shield size={14} className="text-[#ff3366]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              NPM Package
            </span>
          </div>
        </div>
      </div>

      {/* Package Name */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-6 sm:py-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight"
            >
              create-express-authkit
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed max-w-[600px]"
            >
              Scaffold a production-ready Express + MongoDB backend with complete JWT
              authentication — access/refresh token rotation, OTP-based password reset,
              and rate limiting on every sensitive endpoint — in seconds.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Install Command */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="group/cmd flex items-center gap-3 rounded-lg border border-border bg-(--color-surface-elevated) px-4 py-3 font-mono text-xs sm:text-sm text-text-secondary"
            >
              <Terminal size={14} className="shrink-0 text-text-muted" />
              <code className="flex-1 break-all select-all">{installCmd}</code>
              <CopyButton text={installCmd} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Badge + Links Row */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4 flex flex-wrap items-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              {/* npm badge */}
              <a
                href="https://www.npmjs.com/package/create-express-authkit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/npm/v/create-express-authkit?style=flat&colorA=0a0a0b&colorB=59d499"
                  alt="npm version"
                  className="h-[18px]"
                  loading="lazy"
                />
              </a>

              {/* npm link */}
              <a
                href="https://www.npmjs.com/package/create-express-authkit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-secondary hover:text-[#ff3366] hover:border-[#ff3366]/30 transition-colors"
              >
                <Package size={11} />
                npm
                <ExternalLink size={9} className="opacity-50" />
              </a>

              {/* GitHub link */}
              <a
                href="https://github.com/TakshPatel02/create-express-authkit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-secondary hover:text-[#ff3366] hover:border-[#ff3366]/30 transition-colors"
              >
                <Github size={11} />
                GitHub
                <ExternalLink size={9} className="opacity-50" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthKitHero;
