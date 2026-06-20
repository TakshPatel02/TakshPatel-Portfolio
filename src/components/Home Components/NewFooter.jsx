import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";

// ── FlipLink animation settings matching HeroPanel ──
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => (
  <motion.div
    initial="initial"
    whileHover="hovered"
    className="relative block overflow-hidden whitespace-nowrap text-xl font-bold sm:text-2xl lg:text-3xl"
    style={{ lineHeight: 1 }}
  >
    <div className="select-none">
      {children.split("").map((l, i) => (
        <motion.span
          key={i}
          variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
          transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
          className="inline-block"
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
    <div className="absolute inset-0 select-none">
      {children.split("").map((l, i) => (
        <motion.span
          key={i}
          variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
          transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
          className="inline-block"
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const NewFooter = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-bg-primary pb-8 relative">
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
        <div className="border border-border bg-bg-card relative">
          
          {/* FIG. 02 Label */}
          <div className="absolute top-3 right-4 font-mono text-[10px] text-text-muted opacity-60 tracking-wider pointer-events-none select-none">
            FIG. 02
          </div>

          {/* Main content row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-8 px-4 sm:px-6">
            
            {/* Left Section */}
            <div className="flex flex-col gap-1.5">
              <h2 className="font-display font-bold text-text-primary text-xl sm:text-2xl lg:text-3xl">
                <FlipLink>Taksh Patel</FlipLink>
              </h2>
              <p className="font-mono text-sm text-text-secondary">
                Creating with code. Small details matter.
              </p>
            </div>

            {/* Right Section: Social Links */}
            <div className="flex flex-col gap-2.5 font-mono text-xs sm:text-sm">
              {/* GitHub */}
              <a
                href="https://github.com/takshpatel02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-[#ff3366] transition-colors duration-200 group"
              >
                <Github size={14} className="text-text-muted group-hover:text-[#ff3366] transition-colors duration-200" />
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/taksh-patel20"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-[#ff3366] transition-colors duration-200 group"
              >
                <Linkedin size={14} className="text-text-muted group-hover:text-[#ff3366] transition-colors duration-200" />
                <span>LinkedIn</span>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/TakshPatel02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-[#ff3366] transition-colors duration-200 group"
              >
                <Twitter size={14} className="text-text-muted group-hover:text-[#ff3366] transition-colors duration-200" />
                <span>X (Twitter)</span>
              </a>

              {/* Email */}
              <a
                href="mailto:takshpatel022@gmail.com"
                className="flex items-center gap-2 text-text-secondary hover:text-[#ff3366] transition-colors duration-200 group"
              >
                <Mail size={14} className="text-text-muted group-hover:text-[#ff3366] transition-colors duration-200" />
                <span>Email</span>
              </a>
            </div>

          </div>

          {/* Bottom Copyright Row */}
          <div className="border-t border-border py-3 text-center">
            <p className="text-xs text-text-secondary font-mono">
              © 2026 Taksh Patel. All rights reserved.
            </p>
          </div>

        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center border border-border bg-bg-card text-text-secondary hover:text-[#ff3366] hover:border-[#ff3366] hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm select-none"
          title="Scroll to Top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Bottom Blur Fade Overlay */}
      <div
        className="fixed bottom-0 left-0 right-0 h-12 pointer-events-none z-45 bg-linear-to-t from-bg-primary via-bg-primary/30 to-transparent backdrop-blur-xs"
        style={{
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0))",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0))",
        }}
      />
    </footer>
  );
};

export default NewFooter;
