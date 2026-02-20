import { useState } from "react";
import ProjectHeader from "../components/Project Components/ProjectHeader";
import ProjectGrid from "../components/Project Components/ProjectGrid";
import SectionDivider from "../components/SectionDivider";
import { projectsData } from "../data/projectsData";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on both active filter and search query
  const statusFilteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.status === activeFilter);

  const filteredProjects = statusFilteredProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(project.technologies) &&
        project.technologies.some((tech) =>
          typeof tech === "object"
            ? tech.name.toLowerCase().includes(searchQuery.toLowerCase())
            : tech.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  // Calculate project counts (based on status filter only)
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
};

export default ProjectsPage;
