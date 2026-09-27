import React from "react";
import Link from "next/link";
import GithubActivity from "./github-activity";
import { siteConfig } from "@/lib/config/site-config";
import NowTeaser from "./now-teaser";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FileText } from "lucide-react";
import SectionDivider from "../section-divider";

const IntroSection = async () => {
  return (
    <section className="w-full">
      {/* ── Social Profiles Bar ── */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-200 px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-1.5 text-xs font-mono font-semibold text-text-secondary hover:text-text-primary hover:border-text-muted transition-all duration-200"
              >
                <FaLinkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-1.5 text-xs font-mono font-semibold text-text-secondary hover:text-text-primary hover:border-text-muted transition-all duration-200"
              >
                <FaGithub className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href={siteConfig.links.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-1.5 text-xs font-mono font-semibold text-text-secondary hover:text-text-primary hover:border-text-muted transition-all duration-200"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </a>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-(--color-surface-elevated) px-3 py-1.5 text-xs font-mono font-semibold text-text-secondary hover:text-text-primary hover:border-text-muted transition-all duration-200"
              >
                <FileText className="h-3.5 w-3.5" />
                Resume
              </Link>
            </div>
            <Link
              href="/links"
              className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-[#00a8e8] dark:text-[#57c1ff] hover:underline transition-all group shrink-0"
            >
              <span>All links</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* ── 01 // BIO Header Box ── */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-200 px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 pt-4 pb-4">
            {/* Section Title */}
            <h2 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-text-primary">
              Where I'm at
            </h2>
          </div>
        </div>
      </div>

      {/* Bullets List Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-200 px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-3">
            <ul className="space-y-4">
              {siteConfig.bio.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted opacity-80" />
                  <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {siteConfig.features.showNowSection && (
        // ── Now Teaser ── 
        <NowTeaser />
      )}

      <GithubActivity />
    </section>
  );
};

export default IntroSection;

