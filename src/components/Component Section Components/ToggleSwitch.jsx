import { useState, useCallback } from "react";

// Slight overshoot then settle — not bouncy, just 5% past then back
const EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const DURATION = "200ms";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const toggle = useCallback(() => {
    setIsOn((v) => !v);
  }, []);

  return (
    <div className="md:col-start-3 md:col-span-1 md:row-start-6 md:row-span-1 border-0 border-border h-[120px] md:h-auto relative overflow-hidden flex items-center justify-center p-6">
      <div className="flex items-center gap-4 select-none">
        {/* Label */}
        <span
          className="font-mono text-[11px] uppercase tracking-widest"
          style={{
            color: isOn ? "#ff3366" : "var(--color-text-muted)",
            transition: `color ${DURATION} ease`,
          }}
        >
          {isOn ? "On" : "Off"}
        </span>

        {/* Toggle track */}
        <button
          type="button"
          onClick={toggle}
          className="relative cursor-pointer rounded-full"
          style={{
            width: 48,
            height: 28,
            backgroundColor: isOn ? "#ff3366" : "var(--color-surface-elevated)",
            border: `1px solid ${isOn ? "rgba(255, 51, 102, 0.3)" : "var(--color-border)"}`,
            transition: `background-color ${DURATION} ease, border-color ${DURATION} ease`,
            padding: 0,
          }}
        >
          {/* Thumb */}
          <div
            style={{
              position: "absolute",
              top: 3,
              left: isOn ? 22 : 3,
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: isOn
                ? "0 1px 3px rgba(255, 51, 102, 0.4), 0 0 0 1px rgba(255, 51, 102, 0.1)"
                : "0 1px 4px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              transform: "scale(1)",
              transition: `left ${DURATION} ${EASE}, box-shadow ${DURATION} ease, transform ${DURATION} ease`,
            }}
            onTransitionEnd={(e) => {
              // No-op — just allows CSS to handle everything
            }}
          />
        </button>
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Toggle Switch
      </span>
    </div>
  );
};

export default ToggleSwitch;
