import { useRef, useEffect, useState, useCallback } from "react";

const ITEMS = [
  { num: "01", label: "Frontend Engineering" },
  { num: "02", label: "Component Architecture" },
  { num: "03", label: "Backend Systems" },
  { num: "04", label: "Open Source" },
];

const TimelineReveal = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 to 1

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Start when top of box is just below viewport
      // End when top of box reaches 10% of viewport height
      const start = viewH + 100;
      const end = viewH * 0.1;
      const current = rect.top;

      const raw = 1 - (current - end) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Each item reveals at evenly spaced progress points
  const getItemState = useCallback(
    (index) => {
      const threshold = (index + 0.5) / ITEMS.length;
      const revealed = progress >= threshold;
      // Smooth opacity ramp near threshold
      const proximiy = (progress - threshold + 0.15) / 0.15;
      const opacity = Math.max(0.15, Math.min(1, proximiy));
      return { revealed, opacity };
    },
    [progress]
  );

  return (
    <div
      ref={containerRef}
      className="md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-2 border-b md:border-r border-border h-[200px] md:h-auto relative overflow-hidden flex items-center"
    >
      <div className="relative w-full px-6 py-8 flex flex-col">
        {/* Vertical line — background track */}
        <div
          className="absolute left-[30px] top-6 bottom-6 w-px"
          style={{ backgroundColor: "var(--color-border)" }}
        />

        {/* Vertical line — progress fill */}
        <div
          className="absolute left-[30px] top-6 bottom-6 w-px origin-top"
          style={{
            backgroundColor: "#ff3366",
            transform: `scaleY(${progress})`,
            transition: "transform 100ms linear",
          }}
        />

        {/* Items */}
        <div className="flex flex-col gap-5">
          {ITEMS.map((item, i) => {
            const { revealed, opacity } = getItemState(i);

            return (
              <div
                key={i}
                className="flex items-center relative min-h-[28px]"
                style={{
                  opacity: revealed ? 1 : opacity,
                  transform: revealed ? "translateY(0px)" : "translateY(12px)",
                  transition: "opacity 300ms ease-out, transform 300ms ease-out",
                }}
              >
                {/* Dot on the line */}
                <div
                  className="absolute left-[6px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full z-10"
                  style={{
                    backgroundColor: revealed ? "#ff3366" : "var(--color-surface-elevated)",
                    border: `2px solid ${revealed ? "#ff3366" : "var(--color-border)"}`,
                    boxShadow: revealed ? "0 0 6px rgba(255, 51, 102, 0.4)" : "none",
                    transition: "background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
                  }}
                />

                {/* Text content */}
                <div className="flex items-baseline gap-2.5 pl-6">
                  <span
                    className="font-mono text-[10px] tabular-nums tracking-wider"
                    style={{
                      color: revealed ? "#ff3366" : "var(--color-text-muted)",
                      transition: "color 300ms ease",
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="font-display text-sm font-medium tracking-tight"
                    style={{
                      color: revealed ? "var(--color-text-primary)" : "var(--color-text-muted)",
                      transition: "color 300ms ease",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Timeline Reveal
      </span>
    </div>
  );
};

export default TimelineReveal;
