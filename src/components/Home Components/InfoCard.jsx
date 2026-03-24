import { motion} from 'motion/react'

const InfoCard = () => {
  return (
    <section className="w-full border-b border-border">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          <div className="flex items-start">
            {/* Circular Avatar */}
            <div className="border-r border-border">
              <img
                src="https://res.cloudinary.com/portfolioblog/image/upload/v1772124137/ghibli_by7gu7.webp"
                alt="Taksh Patel"
                fetchPriority="high"
                className="h-[125px] w-[125px] flex-shrink-0 rounded-full border border-border object-cover sm:h-[150px] sm:w-[150px]"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col mt-8 sm:mt-20">
              {/* Name */}
              <div className="flex items-center gap-2 border-y border-border">
                <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl py-2">
                  <FlipLink>Taksh Patel</FlipLink>
                </h2>
              </div>

              {/* Tagline */}
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                Creating with code. Small details matter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-xl font-bold sm:text-2xl lg:text-4xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default InfoCard;
