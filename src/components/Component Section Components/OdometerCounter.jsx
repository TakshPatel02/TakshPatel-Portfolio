import { useRef, useEffect, useState, useMemo, useCallback } from "react";

const DIGIT_HEIGHT = 32;
const DURATION = 800;
const STAGGER = 80;

// Single odometer column — contains 0-9 stacked vertically, translates to target
const DigitColumn = ({ target, delay, spinKey }) => {
  const colRef = useRef(null);

  useEffect(() => {
    if (spinKey === 0 || !colRef.current) return;

    // Start from a random overshoot position (spin effect)
    const overshoot = target + 10 + Math.floor(Math.random() * 10);
    colRef.current.style.transition = "none";
    colRef.current.style.transform = `translateY(${-overshoot * DIGIT_HEIGHT}px)`;

    // Force reflow
    colRef.current.offsetHeight;

    // Animate to final position
    colRef.current.style.transition = `transform ${DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
    colRef.current.style.transform = `translateY(${-target * DIGIT_HEIGHT}px)`;
  }, [spinKey, target, delay]);

  // Build the digit stack: repeat 0-9 three times for smooth spinning
  const digits = useMemo(() => {
    const arr = [];
    for (let cycle = 0; cycle < 3; cycle++) {
      for (let d = 0; d < 10; d++) {
        arr.push(d);
      }
    }
    return arr;
  }, []);

  return (
    <div className="overflow-hidden" style={{ height: DIGIT_HEIGHT }}>
      <div
        ref={colRef}
        className="flex flex-col"
        style={{ transform: `translateY(${-target * DIGIT_HEIGHT}px)` }}
      >
        {digits.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-center font-display font-bold text-text-primary"
            style={{ height: DIGIT_HEIGHT, fontSize: "1.5rem", lineHeight: 1 }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

const OdometerCounter = () => {
  const [spinKey, setSpinKey] = useState(0);

  const numberStr = "70";
  const digitArr = numberStr.split("").map(Number);

  const onHover = useCallback(() => {
    setSpinKey((k) => k + 1);
  }, []);

  return (
    <div
      className="md:col-start-3 md:col-span-1 md:row-start-2 md:row-span-1 border-b border-border h-[120px] md:h-auto relative overflow-hidden flex items-center justify-center p-6 cursor-pointer hover:bg-hover-bg transition-colors duration-250"
      onMouseEnter={onHover}
    >
      <div className="flex flex-col items-center gap-1 select-none">
        {/* Odometer digits row */}
        <div className="flex items-center">
          {digitArr.map((digit, i) => (
            <DigitColumn
              key={i}
              target={digit}
              delay={i * STAGGER}
              spinKey={spinKey}
            />
          ))}

          {/* Static "+" suffix */}
          <span
            className="font-display font-bold text-text-primary"
            style={{
              fontSize: "1.5rem",
              lineHeight: 1,
              height: DIGIT_HEIGHT,
              display: "flex",
              alignItems: "center",
            }}
          >
            +
          </span>
        </div>

        {/* Label */}
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted opacity-70">
          Components
        </span>
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Odometer
      </span>
    </div>
  );
};

export default OdometerCounter;
