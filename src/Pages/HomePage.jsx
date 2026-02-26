import { lazy, Suspense } from "react";
import HeroPanel from "../components/Home Components/HeroPanel";
import InfoCard from "../components/Home Components/InfoCard";
import Bio from "../components/Home Components/Bio";
import SectionDivider from "../components/SectionDivider";
import Contact from "../components/Home Components/Contact";
import ProjectsSection from "../components/Home Components/ProjectsSection";
const AboutSection = lazy(
  () => import("../components/Home Components/AboutSection"),
);
import GithubActivity from "../components/Home Components/GithubActivity";
const BlogSection = lazy(
  () => import("../components/Home Components/BlogSection"),
);

const HomePage = () => {
  return (
    <div>
      <HeroPanel />
      <InfoCard />
      <Bio />
      <SectionDivider />
      <Contact />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <Suspense fallback={<h3>Loading ...</h3>}><AboutSection /></Suspense>
      {/* <GithubActivity /> */}
      <SectionDivider />
      <Suspense fallback={<h3>Loading ...</h3>}><BlogSection /></Suspense>
      <SectionDivider />
    </div>
  );
};

export default HomePage;
