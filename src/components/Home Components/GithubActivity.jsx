import { useEffect, useMemo, useState } from "react";

const BASE_URL = "https://github-contributions-api.jogruber.de/v4/takshpatel02";

const levelClasses = [
  "bg-white/5",
  "bg-white/15",
  "bg-white/35",
  "bg-white/55",
  "bg-white/80",
];

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatDateKey = (date) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const GithubActivity = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        // Fetch both 2025 and 2026 contributions
        const [res2025, res2026] = await Promise.all([
          fetch(`${BASE_URL}?y=2025`),
          fetch(`${BASE_URL}?y=2026`),
        ]);

        if (!res2025.ok || !res2026.ok) {
          throw new Error("Failed to load GitHub activity.");
        }

        const [data2025, data2026] = await Promise.all([
          res2025.json(),
          res2026.json(),
        ]);

        // Merge contributions, dedup by date (2026 wins)
        const map = new Map();
        for (const c of data2025.contributions || []) map.set(c.date, c);
        for (const c of data2026.contributions || []) map.set(c.date, c);
        const allContributions = [...map.values()].sort((a, b) =>
          a.date.localeCompare(b.date),
        );

        const total = {
          ...(data2025.total || {}),
          ...(data2026.total || {}),
        };

        if (isMounted) {
          setData({ total, contributions: allContributions });
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load GitHub activity.");
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalContributions = useMemo(() => {
    if (!data?.total) return 0;
    return Object.values(data.total).reduce((sum, value) => sum + value, 0);
  }, [data]);

  const graphData = useMemo(() => {
    if (!data?.contributions?.length) {
      return { weeks: [], months: [] };
    }

    const contributions = data.contributions;

    // Find first and last actual commits
    const firstCommit = contributions.find((c) => c.count > 0);
    const lastCommit = [...contributions].reverse().find((c) => c.count > 0);

    if (!firstCommit || !lastCommit) {
      return { weeks: [], months: [] };
    }

    // Only include contributions from first commit to last commit
    const trimmed = contributions.filter(
      (c) => c.date >= firstCommit.date && c.date <= lastCommit.date,
    );

    const lookup = new Map(
      trimmed.map((day) => [day.date, { level: day.level, count: day.count }]),
    );

    const firstDate = new Date(firstCommit.date + "T00:00:00");
    const lastDate = new Date(lastCommit.date + "T00:00:00");
    const start = getStartOfWeek(firstDate);

    const weeks = [];
    const cursor = new Date(start);

    while (cursor <= lastDate) {
      const week = [];

      for (let i = 0; i < 7; i += 1) {
        const key = formatDateKey(cursor);
        const entry = lookup.get(key) || { level: 0, count: 0 };
        const isBeforeStart = cursor < firstDate;
        week.push({ date: key, ...entry, empty: isBeforeStart });
        cursor.setDate(cursor.getDate() + 1);
      }

      weeks.push(week);
    }

    // Build month labels with their starting week index
    const months = [];
    let lastKey = "";
    weeks.forEach((week, weekIndex) => {
      for (const day of week) {
        if (day.empty) continue;
        const d = new Date(day.date + "T00:00:00");
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (key !== lastKey) {
          months.push({ label: monthFormatter.format(d), weekIndex });
          lastKey = key;
          break;
        }
      }
    });

    return { weeks, months };
  }, [data]);

  return (
    <section className="w-full border-b border-white/10">
      <div className="w-full border-b border-white/10">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-white/10 bg-zinc-950 px-4 py-6 sm:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              Featured
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              GitHub Activity
            </h2>
            <p className="mt-3 text-sm text-zinc-300">
              Total Contributions:{" "}
              <span className="font-semibold">{totalContributions}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-white/10 bg-zinc-950">
          <div className="px-4 pb-6 pt-6 sm:px-6">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 sm:p-6">
              {error ? (
                <p className="text-sm text-rose-200">{error}</p>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="overflow-x-auto">
                    <div
                      style={{
                        minWidth: `${graphData.weeks.length * 15 + 28}px`,
                      }}
                    >
                      {/* Month labels */}
                      <div className="relative ml-7 h-5">
                        {graphData.months.map(({ label, weekIndex }, i) => (
                          <span
                            key={`${label}-${i}`}
                            className="absolute text-[11px] text-zinc-400"
                            style={{ left: `${weekIndex * 15}px` }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>

                      {/* Day labels + grid */}
                      <div className="flex gap-1">
                        <div className="flex w-6 shrink-0 flex-col justify-between py-[2px] text-[10px] leading-[13px] text-zinc-500">
                          <span></span>
                          <span>Mon</span>
                          <span></span>
                          <span>Wed</span>
                          <span></span>
                          <span>Fri</span>
                          <span></span>
                        </div>
                        <div className="flex gap-[3px]">
                          {graphData.weeks.map((week, weekIndex) => (
                            <div
                              key={`week-${weekIndex}`}
                              className="flex flex-col gap-[3px]"
                            >
                              {week.map((day) => (
                                <div
                                  key={day.date}
                                  className={`h-[11px] w-[11px] rounded-sm ${
                                    day.empty
                                      ? "bg-transparent"
                                      : levelClasses[day.level] ||
                                        levelClasses[0]
                                  }`}
                                  title={
                                    day.empty
                                      ? ""
                                      : `${day.date}: ${day.count} contributions`
                                  }
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                      {totalContributions.toLocaleString()} contributions on
                      GitHub.
                    </span>
                    <div className="flex items-center gap-2">
                      <span>Less</span>
                      <div className="flex items-center gap-1">
                        {levelClasses.map((cls, index) => (
                          <span
                            key={`legend-${index}`}
                            className={`h-3 w-3 rounded-sm ${cls}`}
                          />
                        ))}
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
