import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-y border-border">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          {/* Social links */}
          <div className="flex items-center justify-center gap-4 border-b border-border py-5">
            <a
              href="https://github.com/takshpatel02"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-btn-bg p-2.5 text-text-muted transition hover:bg-hover-bg hover:text-text-primary"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/taksh-patel20"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-btn-bg p-2.5 text-text-muted transition hover:bg-hover-bg hover:text-text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/takshpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-btn-bg p-2.5 text-text-muted transition hover:bg-hover-bg hover:text-text-primary"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="mailto:taksh@example.com"
              className="rounded-full bg-btn-bg p-2.5 text-text-muted transition hover:bg-hover-bg hover:text-text-primary"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="py-4 text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-text-muted">
              &copy; {year} Taksh Patel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
