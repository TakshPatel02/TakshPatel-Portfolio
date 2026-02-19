import { useState } from "react";
import ProjectHeader from "../components/Project Components/ProjectHeader";
import ProjectGrid from "../components/Project Components/ProjectGrid";
import SectionDivider from "../components/SectionDivider";
import { projectsData } from "../data/projectsData";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.status === activeFilter);

  // Calculate project counts
  const projectCounts = {
    all: projectsData.length,
    working: projectsData.filter((p) => p.status === "working").length,
    building: projectsData.filter((p) => p.status === "building").length,
    filtered: filteredProjects.length,
  };

  return (
    <div className="w-full">
      <SectionDivider />
      <ProjectHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        projectCounts={projectCounts}
      />
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
};

export default ProjectsPage;
