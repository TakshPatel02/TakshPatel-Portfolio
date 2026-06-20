import { useState, useRef, useCallback, useEffect } from "react";

const GlowBorder = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const borderRef = useRef(null);

  const tick = useCallback(() => {
    angleRef.current = (angleRef.current + 1.5) % 360;

    if (borderRef.current) {
      borderRef.current.style.background = `conic-gradient(
        from ${angleRef.current}deg at 50% 50%,
        transparent 0deg,
        rgba(255, 51, 102, 0.6) 60deg,
        rgba(87, 193, 255, 0.6) 120deg,
        transparent 180deg,
        transparent 360deg
      )`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const onEnter = useCallback(() => {
    setIsHovered(true);
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const onLeave = useCallback(() => {
    setIsHovered(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
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
      className="md:col-start-2 md:col-span-1 md:row-start-4 md:row-span-1 border-b md:border-r border-border h-[120px] md:h-auto relative overflow-hidden flex items-center justify-center cursor-pointer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Rotating conic gradient border */}
      <div
        ref={borderRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      />

      {/* Inner fill — masks the gradient to show only as a border */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "1px",
          backgroundColor: "var(--color-bg-card)",
        }}
      />

      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHovered
            ? "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 51, 102, 0.04) 0%, transparent 70%)"
            : "transparent",
          transition: "background 400ms ease",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-1 select-none pointer-events-none">
        <span className="font-display text-base sm:text-lg font-semibold text-text-primary tracking-tight">
          Glow Border
        </span>
        <span className="font-mono text-[10px] text-text-muted opacity-60 uppercase tracking-widest">
          Hover me
        </span>
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none z-10">
        Border Trace
      </span>
    </div>
  );
};

export default GlowBorder;
