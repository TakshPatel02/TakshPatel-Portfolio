import { useRef, useEffect, useCallback, useState } from "react";
import { Boxes } from "lucide-react";

const ITEMS = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", invertInDark: false },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", invertInDark: false },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", invertInDark: false },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", invertInDark: false },
  { name: "Redux Toolkit", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redux.svg", invertInDark: false },
  { name: "Motion", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg", invertInDark: true },
  { name: "Component-Labs", icon: "Boxes", invertInDark: false },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", invertInDark: false },
  { name: "Postgres", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", invertInDark: false },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/prisma.svg", invertInDark: true },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", invertInDark: false },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", invertInDark: false },
  { name: "Claude", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg", invertInDark: true },
  { name: "Gemini", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg", invertInDark: true },
  { name: "ChatGPT", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", invertInDark: true },
];

const SPEED = 0.5; // px per frame at 60fps
const EASE_DURATION = 400; // ms to slow down / speed up

const InfiniteMarquee = () => {
  const trackRef = useRef(null);
  const copyRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    speed: SPEED,
    targetSpeed: SPEED,
    halfWidth: 0,
    raf: null,
    lastTime: 0,
    easeStart: 0,
    easeFrom: SPEED,
    easeTo: SPEED,
    easing: false,
  });
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  const tick = useCallback((time) => {
    const s = stateRef.current;

    // Ease speed toward target
    if (s.easing) {
      const elapsed = time - s.easeStart;
      const t = Math.min(elapsed / EASE_DURATION, 1);
      // Smooth ease: cubic ease-in-out
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      s.speed = s.easeFrom + (s.easeTo - s.easeFrom) * ease;
      if (t >= 1) {
        s.speed = s.easeTo;
        s.easing = false;
      }
    }

    // Move track
    s.x -= s.speed;

    // Seamless loop: when first copy fully scrolled out, reset
    if (s.halfWidth > 0 && Math.abs(s.x) >= s.halfWidth) {
      s.x += s.halfWidth;
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${s.x}px)`;
    }

    s.raf = requestAnimationFrame(tick);
  }, []);

  const easeToSpeed = useCallback((newSpeed, time) => {
    const s = stateRef.current;
    s.easeStart = time || performance.now();
    s.easeFrom = s.speed;
    s.easeTo = newSpeed;
    s.easing = true;
  }, []);

  const onTrackEnter = useCallback(() => {
    easeToSpeed(0);
  }, [easeToSpeed]);

  const onTrackLeave = useCallback(() => {
    easeToSpeed(SPEED);
    setHoveredIdx(-1);
  }, [easeToSpeed]);

  useEffect(() => {
    if (!copyRef.current || !trackRef.current) return;

    const updateWidth = () => {
      if (copyRef.current && trackRef.current) {
        const computedStyle = window.getComputedStyle(trackRef.current);
        const gapVal = parseFloat(computedStyle.gap) || 12;
        stateRef.current.halfWidth = copyRef.current.offsetWidth + gapVal;
      }
    };

    updateWidth();

    // Set up ResizeObserver to handle layout/image loading shifts
    const observer = new ResizeObserver(updateWidth);
    observer.observe(copyRef.current);

    // Also update on window load
    window.addEventListener("load", updateWidth);

    stateRef.current.raf = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", updateWidth);
      if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf);
    };
  }, [tick]);

  // Render two copies for seamless loop
  const renderItems = (copy) =>
    ITEMS.map((item, i) => {
      const idx = copy * ITEMS.length + i;
      const isHovered = hoveredIdx === i;
      const somethingHovered = hoveredIdx !== -1;

      return (
        <div
          key={idx}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full cursor-default select-none"
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border)",
            opacity: somethingHovered ? (isHovered ? 1 : 0.4) : 0.8,
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            transition: "opacity 250ms ease, transform 250ms ease",
          }}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(-1)}
        >
          {item.icon === "Boxes" ? (
            <Boxes className="h-4 w-4 text-text-secondary" />
          ) : item.icon ? (
            <img
              src={item.icon}
              alt=""
              className={`h-4 w-4 object-contain ${
                item.invertInDark ? "dark:invert" : ""
              }`}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : null}
          <span
            className="font-mono text-xs whitespace-nowrap"
            style={{
              color: isHovered ? "var(--color-text-primary)" : "var(--color-text-muted)",
              transition: "color 250ms ease",
            }}
          >
            {item.name}
          </span>
        </div>
      );
    });

  return (
    <div
      className="md:col-start-1 md:col-span-2 md:row-start-5 md:row-span-2 border-b md:border-b-0 md:border-r border-border h-[200px] md:h-auto relative overflow-hidden flex flex-col justify-center"
      onMouseEnter={onTrackEnter}
      onMouseLeave={onTrackLeave}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, var(--color-bg-card), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, var(--color-bg-card), transparent)",
        }}
      />

      {/* Row 1 — scrolls left */}
      <div className="w-full overflow-hidden py-2 px-2">
        <div
          ref={trackRef}
          className="flex gap-3 w-max"
          style={{ willChange: "transform" }}
        >
          <div ref={copyRef} className="flex gap-3 shrink-0">
            {renderItems(0)}
          </div>
          <div className="flex gap-3 shrink-0">
            {renderItems(1)}
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none z-20">
        Infinite Marquee
      </span>
    </div>
  );
};

export default InfiniteMarquee;
