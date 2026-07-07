import React from "react";
import { ArrowRight } from "lucide-react";
import MagneticCursorField from "../Component Section Components/MagneticCursorField";
import TimelineReveal from "../Component Section Components/TimelineReveal";
import SpotlightReveal from "../Component Section Components/SpotlightReveal";
import TextScrambleReveal from "../Component Section Components/TextScrambleReveal";
import GlowBorder from "../Component Section Components/GlowBorder";
import UnderlineDrawLink from "../Component Section Components/UnderlineDrawLink";
import OdometerCounter from "../Component Section Components/OdometerCounter";
import CommandBar from "../Component Section Components/CommandBar";
import CopyButton from "../Component Section Components/CopyButton";
import ToggleSwitch from "../Component Section Components/ToggleSwitch";
import InfiniteMarquee from "../Component Section Components/InfiniteMarquee";

const GridBox = ({ label, className = "", spanStyles = "", heightStyles = "h-[120px] md:h-auto" }) => {
  return (
    <div className={`p-6 flex items-center justify-center hover:bg-hover-bg transition-colors duration-250 cursor-pointer group border-border ${heightStyles} ${spanStyles} ${className}`}>
      <span className="font-mono text-xs sm:text-sm text-text-muted group-hover:text-text-primary transition-colors duration-250 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
};

const ComponentsSection = () => {
  return (
    <section id="components" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Components{" "}
              <span className="align-super text-xs font-normal text-text-muted sm:text-sm">
                (11)
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Grid Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-6 md:h-[900px] w-full">
              {/* Box 1: Col 1, Rows 1-2 (2 box) — Magnetic Cursor Field */}
              <MagneticCursorField />
              
              {/* Box 3: Col 2, Row 1 (1 box) — Text Scramble Reveal */}
              <TextScrambleReveal />
              
              {/* Box 4: Col 2, Rows 2-3 (2 box) — Timeline Reveal */}
              <TimelineReveal />
              
              {/* Box 2: Col 1, Rows 3-4 (2 box) — Spotlight Reveal */}
              <SpotlightReveal />
              
              {/* Box 5: Col 2, Row 4 (1 box) — Glow Border */}
              <GlowBorder />
              
              {/* Box 8: Col 1-2, Rows 5-6 (2 box, 2 columns) — Infinite Marquee */}
              <InfiniteMarquee />
              
              {/* Box 6: Col 3, Row 1 (1 box) — Underline Draw Link */}
              <UnderlineDrawLink />
              
              {/* Box 7: Col 3, Row 2 (1 box) — Odometer Counter */}
              <OdometerCounter />
              
              {/* Box 9: Col 3, Rows 3-4 (2 box) — Command Bar */}
              <CommandBar />
              
              {/* Box 10: Col 3, Row 5 (1 box) — Copy Button */}
              <CopyButton />

              {/* Box 11: Col 3, Row 6 (1 box) — Toggle Switch */}
              <ToggleSwitch />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <a
              href="https://component-labs.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono flex w-full items-center justify-center gap-2 py-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-text-muted hover:text-text-primary hover:bg-hover-bg transition-all duration-200 cursor-pointer group"
            >
              <span>all components</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentsSection;
