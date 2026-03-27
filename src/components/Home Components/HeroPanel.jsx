import { motion } from "framer-motion";
import { useRef } from "react";

const HeroPanel = () => {
  const boxref = useRef(null);

  return (
    <div className="w-full border-b border-border">
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          <div
            className="grid h-[200px] place-items-center sm:h-[220px] overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(circle, var(--color-dot-pattern) 1px, transparent 1px)`,
              backgroundSize: "10px 10px",
            }}
            ref={boxref}
          >
            <motion.span
              className="tiny5-font text-5xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-8xl lg:text-[96px] cursor-pointer"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut"}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
            >
              TP
            </motion.span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPanel;
