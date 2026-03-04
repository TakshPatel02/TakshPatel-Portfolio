import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col bg-bg-primary">
      {/* Hero Section with Dot Pattern */}
      <div className="w-full border-b border-border">
        <section className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <div
              className="grid h-[200px] place-items-center sm:h-[220px]"
              style={{
                backgroundImage: `radial-gradient(circle, var(--color-dot-pattern) 1px, transparent 1px)`,
                backgroundSize: "10px 10px",
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <motion.div
                  className="font-display text-center text-7xl font-bold tracking-tight text-text-primary sm:text-[75px]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  404
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Message Section */}
      <div className="w-full border-b border-border">
        <section className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <div className="p-6 sm:p-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
                  Page Not Found
                </h2>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Description Section */}
      <div className="w-full border-b border-border">
        <section className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            <div className="p-6 sm:p-8">
              <motion.p
                className="text-base text-text-secondary sm:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Looks like this page doesn't exist. It might have been moved or
                deleted. Don't worry, you can always head back to the home page
                and continue exploring.
              </motion.p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="w-full border-b border-border flex-grow">
        <section className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card h-full flex flex-col">
            <div className="p-6 sm:p-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 rounded-lg border-2 border-text-primary bg-bg-primary px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-bg-secondary hover:shadow-md"
                >
                  <span>Back to Home</span>
                  <motion.div whileHover={{ x: 4 }} whileTap={{ x: 0 }}>
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PageNotFound;
