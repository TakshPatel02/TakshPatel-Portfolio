import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { label: "Portfolio", to: "/" },
  { label: "Project", to: "/project" },
  { label: "Blog", to: "/blog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg-primary/80 backdrop-blur transition-colors duration-300">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="grid h-16 grid-cols-2 items-center border-x border-border px-4">
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-tight text-text-primary sm:text-xl"
            aria-label="Go to homepage"
          >
            TP
          </Link>

          <div className="flex items-center justify-end gap-3">
            <nav className="hidden items-center gap-6 text-sm font-medium text-text-secondary md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `transition ${isActive ? "text-text-primary" : "hover:text-text-primary"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              className="rounded-full border border-border bg-btn-bg p-2 text-text-secondary transition hover:border-border hover:text-text-primary"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              type="button"
              className="flex items-center rounded-full border border-border bg-btn-bg p-2 text-text-secondary transition hover:border-border hover:text-text-primary md:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="md:hidden">
          <div className="mx-4 mb-4 rounded-2xl border border-border bg-bg-secondary/90 p-4 shadow-lg">
            <div className="flex flex-col gap-3 text-sm font-medium text-text-secondary">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 transition ${
                      isActive
                        ? "bg-hover-bg text-text-primary"
                        : "hover:bg-hover-bg hover:text-text-primary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
