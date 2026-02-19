const AboutSection = () => {
  return (
    <section className="w-full border-b border-border">
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              About
            </p>
            <h2 className="font-display mt-2 text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Me
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          <div className="flex flex-col border-b border-border sm:flex-row">
            <div className="border-b border-border sm:border-b-0 sm:border-r sm:border-border">
              <div className="flex h-full w-full items-center justify-center px-6 py-10">
                <div className="flex h-40 w-40 items-center justify-center rounded-md border border-border bg-bg-secondary text-xs uppercase tracking-[0.2em] text-text-muted sm:h-48 sm:w-48 overflow-hidden">
                  <img src="https://res.cloudinary.com/portfolioblog/image/upload/v1771491501/ghibli_q2zccw.png" alt="" className="object-cover"/>
                </div>
              </div>
            </div>

            <div className="flex-1 py-6">
              <h3 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-3xl">
                Taksh Patel
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                I build full-stack applications that combine strong backend
                architecture with polished frontend experiences. Using React,
                Node.js, MongoDB, and PostgreSQL, I develop products that are
                fast, structured, and production-ready. I focus on performance,
                maintainability, and thoughtful UI interactions powered by
                Tailwind and GSAP.
              </p>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Tech Stack
                </p>
                <p className="mt-2 text-sm text-text-secondary sm:text-base">
                  js, react, tailwind, gsap, node, mongodb, postgres
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
