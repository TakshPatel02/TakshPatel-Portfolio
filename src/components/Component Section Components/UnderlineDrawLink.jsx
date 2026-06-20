import { useRef, useState, useCallback } from "react";

const UnderlineDrawLink = () => {
  const linkRef = useRef(null);
  const lineRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const onEnter = useCallback((e) => {
    const rect = linkRef.current.getBoundingClientRect();
    const fromLeft = e.clientX - rect.left < rect.width / 2;

    const line = lineRef.current;
    // Cancel any running transition to restart cleanly
    line.style.transition = "none";

    if (fromLeft) {
      line.style.left = "0";
      line.style.right = "auto";
      line.style.width = "0%";
    } else {
      line.style.left = "auto";
      line.style.right = "0";
      line.style.width = "0%";
    }

    // Force reflow, then animate to full width
    line.offsetWidth;
    line.style.transition = "width 250ms ease-out";
    line.style.width = "100%";

    setIsHovered(true);
  }, []);

  const onLeave = useCallback((e) => {
    const rect = linkRef.current.getBoundingClientRect();
    const exitLeft = e.clientX - rect.left < rect.width / 2;

    const line = lineRef.current;
    // Flip anchor to the exit side so it shrinks toward the cursor
    line.style.transition = "none";

    if (exitLeft) {
      line.style.left = "0";
      line.style.right = "auto";
    } else {
      line.style.left = "auto";
      line.style.right = "0";
    }

    line.style.width = "100%";

    // Force reflow, then shrink
    line.offsetWidth;
    line.style.transition = "width 200ms ease-in";
    line.style.width = "0%";

    setIsHovered(false);
  }, []);

  return (
    <div className="md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-1 border-b border-border h-[120px] md:h-auto relative overflow-hidden flex items-center justify-center p-6">
      <div
        ref={linkRef}
        className="relative cursor-pointer select-none inline-block"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <span
          className="font-display text-base sm:text-lg font-semibold tracking-tight transition-colors duration-200"
          style={{ color: isHovered ? "var(--color-text-primary)" : "var(--color-text-muted)" }}
        >
          View Work
        </span>

        {/* Directional underline */}
        <span
          ref={lineRef}
          className="absolute bottom-0 h-[2px]"
          style={{
            left: "0",
            width: "0%",
            backgroundColor: "#ff3366",
          }}
        />
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Underline Draw
      </span>
    </div>
  );
};

export default UnderlineDrawLink;
