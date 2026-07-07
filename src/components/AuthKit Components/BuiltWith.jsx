import { motion } from "motion/react";

const techStack = [
  { name: "Express 5", category: "core" },
  { name: "Mongoose", category: "core" },
  { name: "jsonwebtoken", category: "auth" },
  { name: "bcrypt", category: "auth" },
  { name: "Zod", category: "validation" },
  { name: "Nodemailer", category: "email" },
  { name: "express-rate-limit", category: "security" },
  { name: "cookie-parser", category: "utility" },
  { name: "cors", category: "utility" },
  { name: "dotenv", category: "utility" },
];

const tsAdditions = [
  { name: "tsx", category: "typescript" },
  { name: "typescript", category: "typescript" },
];

const BuiltWith = () => {
  return (
    <section id="built-with" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Built With
            </h2>
          </div>
        </div>
      </div>

      {/* Tech Pills */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-wrap gap-2"
            >
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.25,
                    delay: i * 0.03,
                    ease: "easeOut",
                  }}
                  className="inline-flex items-center rounded-md border border-border bg-bg-secondary px-2.5 py-1 text-xs font-semibold text-text-primary hover:border-text-muted hover:bg-hover-bg transition-all duration-200 cursor-default"
                >
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>

            {/* TS note */}
            <div className="mt-4 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                TypeScript adds
              </span>
              <div className="flex gap-2">
                {tsAdditions.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center rounded-md border border-[#57c1ff]/20 bg-[#57c1ff]/5 px-2.5 py-1 text-xs font-semibold text-[#57c1ff] cursor-default"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltWith;
