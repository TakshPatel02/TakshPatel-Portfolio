import { createContext, useContext, useEffect, useState } from "react";
import gsap from "gsap";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    // Smooth color transition with GSAP — matches CSS custom properties exactly
    const bgColor = theme === "dark" ? "#0a0a0b" : "#ffffff";
    const textColor = theme === "dark" ? "#f4f4f6" : "#07080a";

    gsap.to("body", {
      backgroundColor: bgColor,
      color: textColor,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
