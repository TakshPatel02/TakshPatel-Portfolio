import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
const ProjectsPage = lazy(() => import("./Pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./Pages/ProjectDetailPage"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./Pages/BlogDetailPage"));
import Footer from "./components/Footer";
import PageNotFound from "./Pages/PageNotFound";
import NewFooter from "./components/Home Components/NewFooter";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/project"
            element={
              <Suspense
                fallback={
                  <h3 className="text-xl text-center">Loading Projects ...</h3>
                }
              >
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="/project/:slug"
            element={
              <Suspense
                fallback={
                  <h3 className="text-xl text-center">Loading Project ...</h3>
                }
              >
                <ProjectDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense
                fallback={
                  <h3 className="text-xl text-center">Loading Blog ...</h3>
                }
              >
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense
                fallback={
                  <h3 className="text-xl text-center">Loading Blog ...</h3>
                }
              >
                <BlogDetailPage />
              </Suspense>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
