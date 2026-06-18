import { lazy, Suspense, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import HeroPanel from "../components/Home Components/HeroPanel";
import SectionDivider from "../components/SectionDivider";
import Contact from "../components/Home Components/Contact";
import ProjectsSection from "../components/Home Components/ProjectsSection";
import IntroSection from "../components/Home Components/IntroSection";
import StackSection from "../components/Home Components/StackSection";
import ComponentsSection from "../components/Home Components/ComponentsSection";
const AboutSection = lazy(
  () => import("../components/Home Components/AboutSection"),
);
import GithubActivity from "../components/Home Components/GithubActivity";
import NewFooter from "../components/Home Components/NewFooter";
const BlogSection = lazy(
  () => import("../components/Home Components/BlogSection"),
);

const HomePage = () => {
  const location = useLocation();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip scroll on initial page load / refresh — let the browser
    // handle its own scroll restoration. Only scroll on in-app navigation.
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
      <HeroPanel />
      <SectionDivider />
      <IntroSection />
      <SectionDivider />
      <StackSection />
      <SectionDivider />
      {/* <Contact /> */}
      {/* <SectionDivider /> */}
      <ProjectsSection />
      <SectionDivider />
      <ComponentsSection />
      <SectionDivider />
      {/* <Suspense fallback={<h3>Loading ...</h3>}><AboutSection /></Suspense> */}
      {/* <GithubActivity /> */}
      {/* <SectionDivider /> */}
      <Suspense fallback={<h3>Loading ...</h3>}><BlogSection /></Suspense>
      <SectionDivider />
    </div>
  );
};

export default HomePage;
