const SectionDivider = ({ className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
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

      {/* Bottom border line */}
      <div className="h-px w-full bg-border"></div>
    </div>
  );
};

export default SectionDivider;
