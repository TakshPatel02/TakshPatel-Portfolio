import { Info } from "lucide-react";

const limits = [
  { endpoint: "/register", strategy: "IP-only", limit: "5", window: "1 hour" },
  { endpoint: "/login", strategy: "IP-only", limit: "20", window: "15 min" },
  { endpoint: "/login", strategy: "Email+IP", limit: "5", window: "1 hour" },
  { endpoint: "/refresh-token", strategy: "IP-only", limit: "20", window: "15 min" },
  { endpoint: "/forget-password", strategy: "Email+IP", limit: "5", window: "15 min" },
  { endpoint: "/verify-reset-otp", strategy: "Email+IP", limit: "10", window: "15 min" },
  { endpoint: "/reset-password", strategy: "Email+IP", limit: "10", window: "15 min" },
];

const RateLimiting = () => {
  return (
    <section id="rate-limiting" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Rate Limiting
            </h2>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <p className="text-sm text-text-secondary leading-relaxed">
              Every sensitive endpoint is protected — not just password reset. Login
              uses a <strong className="text-text-primary">dual-layer</strong>{" "}
              strategy: a broad IP-based cap catches mass credential-stuffing scripts,
              while a tighter email+IP-based cap stops someone brute-forcing one
              specific account.
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-4 gap-0 border-b border-border px-5 py-2.5">
              {["Endpoint", "Strategy", "Limit", "Window"].map((h) => (
                <span
                  key={h}
                  className="font-mono text-[9px] uppercase tracking-wider text-text-muted"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {limits.map((row) => (
              <div
                key={`${row.endpoint}-${row.strategy}`}
                className="flex flex-col gap-2 sm:grid sm:grid-cols-4 sm:gap-0 px-5 py-3 border-b border-border last:border-b-0 hover:bg-hover-bg transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <span className="sm:hidden font-mono text-[9px] uppercase tracking-wider text-text-muted w-24 shrink-0">Endpoint</span>
                  <code className="font-mono text-xs text-text-primary font-medium">
                    {row.endpoint}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="sm:hidden font-mono text-[9px] uppercase tracking-wider text-text-muted w-24 shrink-0">Strategy</span>
                  <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider border text-text-secondary border-border bg-bg-secondary">
                    {row.strategy}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="sm:hidden font-mono text-[9px] uppercase tracking-wider text-text-muted w-24 shrink-0">Limit</span>
                  <span className="font-mono text-xs text-text-secondary font-semibold">
                    {row.limit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="sm:hidden font-mono text-[9px] uppercase tracking-wider text-text-muted w-24 shrink-0">Window</span>
                  <span className="font-mono text-xs text-text-muted">
                    {row.window}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-(--color-surface-elevated) px-4 py-3">
              <Info size={14} className="shrink-0 mt-0.5 text-text-muted" />
              <p className="text-xs text-text-secondary leading-relaxed">
                <strong className="text-text-primary">Email+IP compound keying</strong>{" "}
                means an attacker can't dodge the limit by simply rotating through
                emails from the same IP, and legitimate users on shared networks
                (office wifi) don't get blocked by someone else's failed attempts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RateLimiting;
