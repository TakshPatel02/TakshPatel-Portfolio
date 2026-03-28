import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "../../context/ThemeContext";

const GithubActivity = () => {
  const { theme } = useTheme();

  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section className="w-full border-b border-border">
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Featured
            </p>
            <h2 className="font-display mt-2 text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              GitHub Activity
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card py-4 p-2">
          <div className="flex justify-center overflow-x-auto">
            <GitHubCalendar
              username="takshpatel02"
              colorScheme={theme === "dark" ? "dark" : "light"}
              theme={calendarTheme}
              fontSize={14}
              blockSize={13}
              blockMargin={2}
              
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
