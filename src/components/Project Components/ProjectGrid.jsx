import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects }) => {
  // Split projects into rows of 2
  const rows = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return (
    <div className="w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="w-full">
          {/* Double horizontal border with gap */}
          <div className="flex w-full flex-col gap-[16px]">
            <div className="h-px w-full bg-border"></div>
            <div className="h-px w-full bg-border"></div>
          </div>

          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="border-x border-border bg-bg-card">
              <div className="relative grid grid-cols-1 sm:grid-cols-2">
                {/* Double vertical divider */}
                <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 sm:flex">
                  <div className="h-full w-px bg-border"></div>
                  <div className="ml-4 h-full w-px bg-border"></div>
                </div>

                {/* Project Cards */}
                {row.map((project, index) => (
                  <div
                    key={project.id}
                    className={`${index === 0 ? "sm:pr-2" : "sm:pl-2"}`}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
