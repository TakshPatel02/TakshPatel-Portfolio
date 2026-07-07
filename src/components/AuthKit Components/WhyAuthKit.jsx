const WhyAuthKit = () => {
  return (
    <section id="why-authkit" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Why AuthKit
            </h2>
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Most backend starters give you a bare Express skeleton and leave auth as
              an exercise. AuthKit gives you a fully working, security-hardened auth
              system on day one — token rotation, OTP-based password reset, dual-layer
              rate limiting, and brute-force protection — so you can start building your
              actual product instead of re-implementing login for the tenth time.
            </p>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <ul className="space-y-3">
              {[
                "Complete JWT auth with access & refresh token rotation",
                "OTP-based password reset via email out of the box",
                "Rate limiting on every sensitive endpoint — not just login",
                "JavaScript & TypeScript templates, your choice",
                "One command — zero config needed to start",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted opacity-80" />
                  <span className="text-sm text-text-primary leading-relaxed">
                    {point}
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

export default WhyAuthKit;
