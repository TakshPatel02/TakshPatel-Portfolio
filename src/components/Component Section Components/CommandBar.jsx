import { useRef, useState, useCallback } from "react";

const CommandBar = () => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    if (value.trim() === "") {
      setIsFocused(false);
      setValue("");
    }
  }, [value]);

  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setValue("");
      setIsFocused(false);
      inputRef.current?.blur();
    }
  }, []);

  return (
    <div className="md:col-start-3 md:col-span-1 md:row-start-3 md:row-span-2 border-b border-border h-[200px] md:h-auto relative overflow-hidden flex flex-col items-center justify-center p-6 gap-3">
      {/* Command bar */}
      <div
        className="relative flex items-center"
        style={{
          width: isFocused ? "100%" : "180px",
          transition: "width 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="w-full flex items-center gap-2 px-3 rounded-lg"
          style={{
            height: "36px",
            backgroundColor: "var(--color-surface-elevated)",
            border: `1px solid ${isFocused ? "#ff3366" : "var(--color-border)"}`,
            boxShadow: isFocused
              ? "0 0 0 3px rgba(255, 51, 102, 0.15), inset 0 1px 2px rgba(0,0,0,0.1)"
              : "none",
            transition: "border-color 200ms ease, box-shadow 200ms ease",
          }}
        >
          {/* Search icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            style={{
              color: isFocused ? "#ff3366" : "var(--color-text-muted)",
              transition: "color 200ms ease",
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            placeholder={isFocused ? "Type a command..." : "Search..."}
            className="flex-1 bg-transparent outline-none font-mono text-xs text-text-primary placeholder:text-text-muted"
            style={{ caretColor: "#ff3366" }}
          />

          {/* ⌘K badge — only when collapsed */}
          {!isFocused && (
            <div
              className="flex items-center gap-0.5 shrink-0"
              style={{
                opacity: isFocused ? 0 : 0.6,
                transition: "opacity 150ms ease",
              }}
            >
              <kbd
                className="font-mono text-[10px] text-text-muted px-1 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--color-btn-bg)",
                  border: "1px solid var(--color-border)",
                  lineHeight: 1,
                }}
              >
                ⌘
              </kbd>
              <kbd
                className="font-mono text-[10px] text-text-muted px-1 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--color-btn-bg)",
                  border: "1px solid var(--color-border)",
                  lineHeight: 1,
                }}
              >
                K
              </kbd>
            </div>
          )}

          {/* Clear button — only when focused with text */}
          {isFocused && value && (
            <button
              type="button"
              className="shrink-0 cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault();
                setValue("");
                inputRef.current?.focus();
              }}
              style={{ color: "var(--color-text-muted)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Hint text */}
      <span
        className="font-mono text-[10px] text-text-muted text-center"
        style={{
          opacity: isFocused ? 0.5 : 0,
          transition: "opacity 200ms ease",
        }}
      >
        Press ESC to close
      </span>

      {/* Bottom label */}
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Command Bar
      </span>
    </div>
  );
};

export default CommandBar;
