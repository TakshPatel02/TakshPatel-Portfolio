import { ExternalLink, Package, Github, User } from "lucide-react";

const links = [
  {
    label: "npm",
    url: "https://www.npmjs.com/package/create-express-authkit",
    icon: Package,
    value: "npmjs.com/package/create-express-authkit",
  },
  {
    label: "GitHub",
    url: "https://github.com/TakshPatel02/create-express-authkit",
    icon: Github,
    value: "github.com/TakshPatel02/create-express-authkit",
  },
  {
    label: "Author",
    url: "https://github.com/takshpatel02",
    icon: User,
    value: "Taksh Patel",
  },
];

const LinksSection = () => {
  return (
    <section id="links" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Links
            </h2>
          </div>
        </div>
      </div>

      {/* Link Rows */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-b-0 hover:bg-hover-bg transition-colors duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-md border border-border bg-(--color-surface-elevated) shrink-0">
                  <link.icon
                    size={14}
                    className="text-text-muted group-hover:text-text-primary transition-colors duration-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block">
                    {link.label}
                  </span>
                  <span className="text-sm text-text-primary font-medium truncate block group-hover:text-text-primary transition-colors duration-200">
                    {link.value}
                  </span>
                </div>
                <ExternalLink
                  size={14}
                  className="shrink-0 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
