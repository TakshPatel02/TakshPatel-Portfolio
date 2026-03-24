import { useEffect, useState } from "react";
import app from "../FireBaseConfig.js";
import ProjectHeader from "../components/Project Components/ProjectHeader";
import ProjectGrid from "../components/Project Components/ProjectGrid";
import SectionDivider from "../components/SectionDivider";
// import { projectsData } from "../data/projectsData";
import { getDatabase, ref, get, set, push } from "firebase/database";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectsData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getDatabase(app);
        const projectsRef = ref(db, "projects");
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
          const rawData = snapshot.val();

          // STEP 1: get the inner object (push id)
          const projectGroup = Object.values(rawData)[0];

          // STEP 2: convert numeric keys to array
          const projectsArray = Object.values(projectGroup);

          setProjectData(projectsArray);
          console.log("Fetched projects data:", projectsArray);
        } else {
          console.log("No project data available");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProjects();
  }, []);

  const filterProjects = (project) => {
    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "building" || activeFilter === "operational") {
      return project.status === activeFilter;
    }

    if (
      activeFilter === "frontend" ||
      activeFilter === "backend" ||
      activeFilter === "fullstack"
    ) {
      return project.type === activeFilter;
    }

    if (activeFilter === "animated") {
      return Boolean(project.animated);
    }

    return true;
  };

  // Filter projects based on both active filter and search query
  const activeFilteredProjects = projectsData.filter(filterProjects);

  const filteredProjects = activeFilteredProjects.filter(
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
    operational: projectsData.filter((p) => p.status === "operational").length,
    building: projectsData.filter((p) => p.status === "building").length,
    frontend: projectsData.filter((p) => p.type === "frontend").length,
    backend: projectsData.filter((p) => p.type === "backend").length,
    fullstack: projectsData.filter((p) => p.type === "fullstack").length,
    animated: projectsData.filter((p) => p.animated).length,
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
