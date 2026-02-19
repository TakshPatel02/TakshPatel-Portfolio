import HeroPanel from "../components/Home Components/HeroPanel";
import InfoCard from "../components/Home Components/InfoCard";
import Bio from "../components/Home Components/Bio";
import SectionDivider from "../components/SectionDivider";
import Contact from "../components/Home Components/Contact";
import ProjectsSection from "../components/Home Components/ProjectsSection";
import AboutSection from "../components/Home Components/AboutSection";
import GithubActivity from "../components/Home Components/GithubActivity";
import BlogSection from "../components/Home Components/BlogSection";
import Footer from "../components/Footer";

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
      <AboutSection />
      {/* <GithubActivity /> */}
      <SectionDivider />
      <BlogSection />
      <SectionDivider />

    </div>
  );
};

export default HomePage;
