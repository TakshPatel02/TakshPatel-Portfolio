import AuthKitHero from "../components/AuthKit Components/AuthKitHero";
import WhyAuthKit from "../components/AuthKit Components/WhyAuthKit";
import QuickStart from "../components/AuthKit Components/QuickStart";
import EnvVariables from "../components/AuthKit Components/EnvVariables";
import ApiReference from "../components/AuthKit Components/ApiReference";
import ApiExamples from "../components/AuthKit Components/ApiExamples";
import RateLimiting from "../components/AuthKit Components/RateLimiting";
import ProjectStructure from "../components/AuthKit Components/ProjectStructure";
import SecurityHighlights from "../components/AuthKit Components/SecurityHighlights";
import BuiltWith from "../components/AuthKit Components/BuiltWith";
import ScriptsSection from "../components/AuthKit Components/ScriptsSection";
import LinksSection from "../components/AuthKit Components/LinksSection";
import AuthKitSidebar from "../components/AuthKit Components/AuthKitSidebar";
import SectionDivider from "../components/SectionDivider";

const AuthKitPage = () => {
  return (
    <div>
      <AuthKitHero />
      <SectionDivider />
      <WhyAuthKit />
      <SectionDivider />
      <QuickStart />
      <SectionDivider />
      <EnvVariables />
      <SectionDivider />
      <ApiReference />
      <SectionDivider />
      <ApiExamples />
      <SectionDivider />
      <RateLimiting />
      <SectionDivider />
      <ProjectStructure />
      <SectionDivider />
      <SecurityHighlights />
      <SectionDivider />
      <BuiltWith />
      <SectionDivider />
      <ScriptsSection />
      <SectionDivider />
      <LinksSection />
      <SectionDivider />

      {/* Fixed Sidebar */}
      <AuthKitSidebar />
    </div>
  );
};

export default AuthKitPage;
