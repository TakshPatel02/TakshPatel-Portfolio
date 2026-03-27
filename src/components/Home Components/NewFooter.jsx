import React from "react";
import { motion } from "framer-motion";

const NewFooter = () => {
  return (
    <footer className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundSize: "40px 100%",
        }}
      />

      <motion.div className="relative mx-auto flex h-[78px] w-full max-w-[1800px] justify-center overflow-hidden sm:h-[90px] md:h-[120px] lg:h-[150px] text-center">
        <span className="tiny5-font block whitespace-nowrap px-2 text-center leading-none tracking-tight text-transparent [font-size:clamp(2.4rem,20vw,16rem)] [-webkit-text-stroke:1px_var(--color-border)] sm:[-webkit-text-stroke:1.5px_var(--color-border)] md:[-webkit-text-stroke:2px_var(--color-border)]">
          TAKSH PATEL
        </span>
      </motion.div>
    </footer>
  );
};

export default NewFooter;
