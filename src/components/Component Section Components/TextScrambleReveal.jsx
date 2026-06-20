import { useRef, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
const SCRAMBLE_DURATION = 400;
const STAGGER = 30;

const TextScrambleReveal = () => {
  const rafRef = useRef(null);
  const text = "Creative Developer";

  // Start with the resolved text visible
  const [displayChars, setDisplayChars] = useState(
    text.split("").map((ch) => ({ char: ch, resolved: true }))
  );

  const scramble = useCallback(() => {
    // Cancel any running animation
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const chars = text.split("");
    const totalChars = chars.length;
    const resolved = new Array(totalChars).fill(false);
    const current = chars.map((ch) => (ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]));

    // Spaces resolve immediately
    chars.forEach((ch, i) => { if (ch === " ") resolved[i] = true; });

    setDisplayChars(current.map((ch, i) => ({ char: ch, resolved: resolved[i] })));

    const startTime = performance.now();

    const tick = () => {
      const now = performance.now();
      let allDone = true;

      for (let i = 0; i < totalChars; i++) {
        if (resolved[i]) continue;

        const charStart = startTime + i * STAGGER;
        const elapsed = now - charStart;

        if (elapsed < 0) {
          current[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          allDone = false;
        } else if (elapsed < SCRAMBLE_DURATION) {
          current[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          allDone = false;
        } else {
          current[i] = chars[i];
          resolved[i] = true;
        }
      }

      setDisplayChars(current.map((ch, i) => ({ char: ch, resolved: resolved[i] })));

      if (!allDone) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  return (
    <div
      className="md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-1 border-b md:border-r border-border h-[120px] md:h-auto relative overflow-hidden flex items-center justify-center p-6 cursor-pointer hover:bg-hover-bg transition-colors duration-250"
      onMouseEnter={scramble}
    >
      <div className="font-display text-lg sm:text-xl font-semibold tracking-tight select-none whitespace-nowrap">
        {displayChars.map((item, i) => (
          <span
            key={i}
            style={{
              color: item.resolved ? "var(--color-text-primary)" : "rgba(255, 51, 102, 0.6)",
              transition: item.resolved ? "color 150ms ease" : "none",
              fontFamily: item.resolved ? "inherit" : "var(--font-mono)",
            }}
          >
            {item.char}
          </span>
        ))}
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Text Scramble
      </span>
    </div>
  );
};

export default TextScrambleReveal;

