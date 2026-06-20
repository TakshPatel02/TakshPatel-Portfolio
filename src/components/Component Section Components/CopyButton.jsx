import { useState, useCallback, useRef } from "react";

const CopyButton = () => {
  const [copied, setCopied] = useState(false);
  const [pressed, setPressed] = useState(false);
  const timerRef = useRef(null);

  const handleClick = useCallback(() => {
    if (copied) return; // Prevent re-click during animation

    // Copy sample text
    navigator.clipboard?.writeText("npm install @taksh/components").catch(() => {});

    setPressed(true);
    setTimeout(() => setPressed(false), 150);

    setCopied(true);

    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Revert after 1.5s
    timerRef.current = setTimeout(() => {
      setCopied(false);
      timerRef.current = null;
    }, 1500);
  }, [copied]);

  return (
    <div className="md:col-start-3 md:col-span-1 md:row-start-5 md:row-span-1 border-b border-border h-[120px] md:h-auto relative overflow-hidden flex items-center justify-center p-6">
      {/* Code snippet + copy button */}
      <div className="flex items-center gap-3">
        {/* Fake code snippet */}
        <code
          className="font-mono text-[11px] text-text-muted select-all px-3 py-2 rounded-md"
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border)",
          }}
        >
          npm install @taksh/components
        </code>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleClick}
          className="relative flex items-center justify-center cursor-pointer rounded-md"
          style={{
            width: 36,
            height: 36,
            backgroundColor: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border)",
            transform: pressed ? "scale(0.9)" : "scale(1)",
            transition: "transform 150ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease",
            borderColor: copied ? "rgba(89, 212, 153, 0.5)" : "var(--color-border)",
          }}
        >
          {/* Copy icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: "absolute",
              color: "var(--color-text-muted)",
              opacity: copied ? 0 : 1,
              transform: copied ? "rotate(-90deg) scale(0.6)" : "rotate(0deg) scale(1)",
              transition: "opacity 150ms ease, transform 150ms ease",
            }}
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>

          {/* Checkmark icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: "absolute",
              color: "#59d499",
              opacity: copied ? 1 : 0,
              transform: copied ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.6)",
              transition: copied
                ? "opacity 150ms ease 50ms, transform 150ms ease 50ms"
                : "opacity 150ms ease, transform 150ms ease",
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Copy Button
      </span>
    </div>
  );
};

export default CopyButton;
