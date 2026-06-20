import { useRef, useEffect, useCallback, useState } from "react";

const SpotlightReveal = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const posRef = useRef({ x: -9999, y: -9999, lx: -9999, ly: -9999 });
  const rafRef = useRef(null);
  const [isInside, setIsInside] = useState(false);

  const STIFFNESS = 0.1;
  const RADIUS = 200;

  // Lerp loop — punch a hole in the dark overlay where the cursor is
  const tick = useCallback(() => {
    const p = posRef.current;
    p.lx += (p.x - p.lx) * STIFFNESS;
    p.ly += (p.y - p.ly) * STIFFNESS;

    if (overlayRef.current) {
      // Inverted mask: transparent at cursor (reveals content), opaque everywhere else (stays dark)
      const mask = `radial-gradient(circle ${RADIUS}px at ${p.lx}px ${p.ly}px, transparent 0%, transparent 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.8) 70%, black 100%)`;
      overlayRef.current.style.maskImage = mask;
      overlayRef.current.style.webkitMaskImage = mask;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const onEnter = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    posRef.current = { x, y, lx: x, ly: y };
    setIsInside(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    posRef.current.x = e.clientX - rect.left;
    posRef.current.y = e.clientY - rect.top;
  }, []);

  const onLeave = useCallback(() => {
    setIsInside(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    // Reset mask so overlay is fully opaque again (no hole)
    if (overlayRef.current) {
      overlayRef.current.style.maskImage = "none";
      overlayRef.current.style.webkitMaskImage = "none";
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-2 border-b md:border-r border-border h-[200px] md:h-auto relative overflow-hidden"
      style={{ cursor: "crosshair" }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Layer 1 (bottom): The hidden content — always fully rendered */}
      {/* Gradient background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 70% 60% at 15% 15%, rgba(87, 193, 255, 0.4) 0%, transparent 70%),
          radial-gradient(ellipse 70% 60% at 85% 15%, rgba(255, 199, 51, 0.35) 0%, transparent 70%),
          radial-gradient(ellipse 70% 60% at 15% 85%, rgba(89, 212, 153, 0.35) 0%, transparent 70%),
          radial-gradient(ellipse 70% 60% at 85% 85%, rgba(255, 97, 97, 0.4) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(167, 139, 250, 0.2) 0%, transparent 70%)
        `
      }} />

      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="spotlight-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-text-muted" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#spotlight-grid)" />
      </svg>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted opacity-70">
          Discover
        </span>
        <span className="font-display text-xl sm:text-2xl font-semibold text-text-primary text-center leading-tight">
          Hover to reveal
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted opacity-50">
          what's hidden beneath
        </span>

        {/* Decorative dots */}
        <div className="flex gap-1.5 mt-2">
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(87, 193, 255, 0.8)" }} />
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(255, 97, 97, 0.8)" }} />
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(89, 212, 153, 0.8)" }} />
        </div>
      </div>

      {/* Layer 2 (top): Dark overlay — masked to punch a hole at cursor */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundColor: "var(--color-bg-card)",
          opacity: isInside ? 1 : 1,
          transition: "opacity 400ms ease",
        }}
      />

      {/* Fade overlay — separate layer that fades in/out to handle mouse leave gracefully */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          backgroundColor: "var(--color-bg-card)",
          opacity: isInside ? 0 : 1,
          transition: "opacity 400ms ease",
        }}
      />

      {/* Bottom label — always visible */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none z-30">
        Spotlight Reveal
      </span>
    </div>
  );
};

export default SpotlightReveal;
