import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./Pages/BlogDetailPage"));
const ResumePage = lazy(() => import("./Pages/ResumePage"));
const AuthKitPage = lazy(() => import("./Pages/AuthKitPage"));
import Footer from "./components/Footer";
import PageNotFound from "./Pages/PageNotFound";
import NewFooter from "./components/Home Components/NewFooter";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route
            path="/resume"
            element={
              <Suspense
                fallback={
                  <h3 className="text-xl text-center">Loading Resume ...</h3>
                }
              >
                <ResumePage />
              </Suspense>
            }
          />
          <Route
            path="/authkit"
            element={
              <Suspense
                fallback={
                  <h3 className="text-xl text-center">Loading AuthKit ...</h3>
                }
              >
                <AuthKitPage />
              </Suspense>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        <NewFooter />
      </div>
    </ThemeProvider>
  );
};

export default App;
