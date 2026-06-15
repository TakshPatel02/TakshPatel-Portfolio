const SectionDivider = ({ className = "" }) => {
  return (
    <div className={`w-full ${className} relative`}>
      {/* Top border line */}
      <div className="h-px w-full bg-border"></div>

      {/* Diagonal hatched pattern */}
      <div
        className="h-10 w-full opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 6px)",
        }}
      ></div>
      {/* Vertical border-x overlay connecting the section borders */}
      <div className="absolute inset-0 mx-auto w-full max-w-4xl px-4 sm:px-6 pointer-events-none z-10">
        <div className="h-full border-x border-border"></div>
      </div>

      {/* Bottom border line */}
      <div className="h-px w-full bg-border"></div>
    </div>
  );
};

export default SectionDivider;
