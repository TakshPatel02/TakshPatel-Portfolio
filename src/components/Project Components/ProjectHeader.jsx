import { Search } from "lucide-react";
import { motion } from "framer-motion";

const ProjectHeader = ({
  activeFilter,
  setActiveFilter,
  projectCounts,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-2">
            <div className="">
              <div className="flex items-start justify-between">
                <h1 className="font-display text-4xl font-bold text-text-primary sm:text-5xl lg:text-6xl">
                  Projects
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-2">
            <div className="">
              <p className="text-sm text-text-secondary sm:text-lg">
                My projects and work across different technologies and domains.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-2">
            <div className="">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search Projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-2 border-border bg-bg-secondary px-10 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-200 focus:border-text-primary focus:outline-none focus:ring-0 cursor-text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-2">
            <div className="">
              <h2 className="text-sm font-semibold text-text-primary sm:text-base">
                Filter by Status
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter("all")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === "all"
                      ? "bg-text-primary text-bg-primary"
                      : "bg-btn-bg text-text-secondary hover:bg-hover-bg"
                  }`}
                >
                  All ({projectCounts.all})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter("building")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === "building"
                      ? "bg-text-primary text-bg-primary"
                      : "bg-btn-bg text-text-secondary hover:bg-hover-bg"
                  }`}
                >
                  Building ({projectCounts.building})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter("operational")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === "operational"
                      ? "bg-text-primary text-bg-primary"
                      : "bg-btn-bg text-text-secondary hover:bg-hover-bg"
                  }`}
                >
                  Operational ({projectCounts.operational})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter("fullstack")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === "fullstack"
                      ? "bg-text-primary text-bg-primary"
                      : "bg-btn-bg text-text-secondary hover:bg-hover-bg"
                  }`}
                >
                  Full Stack ({projectCounts.fullstack})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter("frontend")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === "frontend"
                      ? "bg-text-primary text-bg-primary"
                      : "bg-btn-bg text-text-secondary hover:bg-hover-bg"
                  }`}
                >
                  Frontend ({projectCounts.frontend})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter("backend")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === "backend"
                      ? "bg-text-primary text-bg-primary"
                      : "bg-btn-bg text-text-secondary hover:bg-hover-bg"
                  }`}
                >
                  Backend ({projectCounts.backend})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter("animated")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === "animated"
                      ? "bg-text-primary text-bg-primary"
                      : "bg-btn-bg text-text-secondary hover:bg-hover-bg"
                  }`}
                >
                  Animated ({projectCounts.animated})
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Projects Count Section */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-2">
            <div className="">
              <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                All Projects{" "}
                <span className="text-base font-normal text-text-muted sm:text-lg">
                  ({projectCounts.filtered} projects)
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
