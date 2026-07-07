import { ShieldCheck } from "lucide-react";

const highlights = [
  {
    text: "Passwords hashed with **bcrypt** (10 salt rounds)",
    bold: "bcrypt",
  },
  {
    text: 'Refresh tokens in Secure, HttpOnly, SameSite: Strict cookies',
  },
  {
    text: "**Token rotation** — old refresh token invalidated on every refresh",
    bold: "Token rotation",
  },
  {
    text: "**OTP brute-force protection** — max 5 attempts, then OTP is deleted",
    bold: "OTP brute-force protection",
  },
  {
    text: "**Dual-layer rate limiting** on login (IP + Email), single-layer on every other sensitive endpoint",
    bold: "Dual-layer rate limiting",
  },
  {
    text: "**Single-use reset tokens** via unique jti claim",
    bold: "Single-use reset tokens",
  },
  {
    text: "**Timing-safe forgot-password response** — same response whether or not email exists (prevents enumeration)",
    bold: "Timing-safe forgot-password response",
  },
];

const renderText = (text) => {
  // Simple bold marker: **text** → <strong>text</strong>
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-text-primary font-semibold">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const SecurityHighlights = () => {
  return (
    <section id="security" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl flex items-center gap-2.5">
              <ShieldCheck size={22} className="text-text-muted" />
              Security Highlights
            </h2>
          </div>
        </div>
      </div>

      {/* Bullet List */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted opacity-80" />
                  <span className="text-sm text-text-secondary leading-relaxed">
                    {renderText(item.text)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityHighlights;
