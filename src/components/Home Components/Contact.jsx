const Contact = () => {
  return (
    <section className="w-full border-b border-border">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          <div className="py-3 p-2">
            <p className="font-display text-sm font-semibold text-text-primary sm:text-lg">
              Want to work together or see more details about my experience?
            </p>
          </div>
          <div className="border-t border-border">
            <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <a
                href="/resume.pdf"
                className="font-display py-3 px-6 text-center text-xs font-semibold uppercase tracking-widest text-text-primary transition hover:bg-hover-bg rounded-lg sm:text-sm"
              >
                Resume / CV
              </a>
              <a
                href="mailto:hello@ncdai.dev"
                className="font-display py-3 px-6 text-center text-xs font-semibold uppercase tracking-widest text-text-primary transition hover:bg-hover-bg rounded-lg sm:text-sm"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
