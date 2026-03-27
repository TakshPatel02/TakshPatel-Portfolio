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

      <motion.div className="relative mx-auto w-full max-w-[1800px] h-[150px] overflow-hidden"
        
      >
        <span className="tiny5-font block select-none text-center leading-none tracking-tight text-transparent [font-size:clamp(4.5rem,18vw,16rem)] [-webkit-text-stroke:2px_var(--color-border)] sm:[-webkit-text-stroke:1.5px_var(--color-border)] leading-0">
          TAKSH PATEL
        </span>
      </motion.div>
    </footer>
  );
};

export default NewFooter;
