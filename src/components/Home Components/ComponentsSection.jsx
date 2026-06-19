import React from "react";
import { ArrowRight } from "lucide-react";
import MagneticCursorField from "../Component Section Components/MagneticCursorField";
import ParticleTextReveal from "../Component Section Components/ParticleTextReveal";

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
          <div className="border-x border-border bg-bg-card py-4 p-2">
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
              
              {/* Box 3: Col 2, Row 1 (1 box) */}
              <GridBox 
                label="box 3" 
                spanStyles="md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-1" 
                heightStyles="h-[120px] md:h-auto"
                className="border-b md:border-r" 
              />
              
              {/* Box 4: Col 2, Rows 2-3 (2 box) — Particle Text Reveal */}
              <ParticleTextReveal />
              
              {/* Box 2: Col 1, Rows 3-4 (2 box) */}
              <GridBox 
                label="box 2" 
                spanStyles="md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-2" 
                heightStyles="h-[200px] md:h-auto"
                className="border-b md:border-r" 
              />
              
              {/* Box 5: Col 2, Row 4 (1 box) */}
              <GridBox 
                label="box 5" 
                spanStyles="md:col-start-2 md:col-span-1 md:row-start-4 md:row-span-1" 
                heightStyles="h-[120px] md:h-auto"
                className="border-b md:border-r" 
              />
              
              {/* Box 8: Col 1-2, Rows 5-6 (2 box, 2 columns) */}
              <GridBox 
                label="box 8" 
                spanStyles="md:col-start-1 md:col-span-2 md:row-start-5 md:row-span-2" 
                heightStyles="h-[200px] md:h-auto"
                className="border-b md:border-b-0 md:border-r" 
              />
              
              {/* Box 6: Col 3, Row 1 (1 box) */}
              <GridBox 
                label="box 6" 
                spanStyles="md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-1" 
                heightStyles="h-[120px] md:h-auto"
                className="border-b" 
              />
              
              {/* Box 7: Col 3, Row 2 (1 box) */}
              <GridBox 
                label="box 7" 
                spanStyles="md:col-start-3 md:col-span-1 md:row-start-2 md:row-span-1" 
                heightStyles="h-[120px] md:h-auto"
                className="border-b" 
              />
              
              {/* Box 9: Col 3, Rows 3-4 (2 box) */}
              <GridBox 
                label="box 9" 
                spanStyles="md:col-start-3 md:col-span-1 md:row-start-3 md:row-span-2" 
                heightStyles="h-[200px] md:h-auto"
                className="border-b" 
              />
              
              {/* Box 10: Col 3, Row 5 (1 box) */}
              <GridBox 
                label="box 10" 
                spanStyles="md:col-start-3 md:col-span-1 md:row-start-5 md:row-span-1" 
                heightStyles="h-[120px] md:h-auto"
                className="border-b" 
              />

              {/* Box 11: Col 3, Row 6 (1 box) */}
              <GridBox 
                label="box 11" 
                spanStyles="md:col-start-3 md:col-span-1 md:row-start-6 md:row-span-1" 
                heightStyles="h-[120px] md:h-auto"
                className="border-0" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <button
              type="button"
              className="font-mono flex w-full items-center justify-center gap-2 py-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-text-muted hover:text-text-primary hover:bg-hover-bg transition-all duration-200 cursor-pointer group"
            >
              <span>all components</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentsSection;
