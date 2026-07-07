import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check, Info } from "lucide-react";

const envContent = `PORT=8000

# MongoDB
MONGODB_URL=mongodb://127.0.0.1:27017/authentication

# JWT Secrets — replace with strong, unique secrets
ACCESS_JWT_SECRET=your_access_jwt_secret_key
REFRESH_JWT_SECRET=your_refresh_jwt_secret_key
JWT_RESET_PASSWORD_TOKEN_SECRET=your_reset_password_jwt_secret_key

# JWT Expiry
ACCESS_JWT_EXPIRES_IN=15m
REFRESH_JWT_EXPIRES_IN=7d
RESET_PASSWORD_JWT_EXPIRES_IN=15m

# CORS
CORS_ORIGIN=http://localhost:5173

# Email (Nodemailer — Gmail App Password)
GOOGLE_USER=your_google_user@gmail.com
GOOGLE_APP_PASSWORD=your_16_character_app_password`;

const EnvVariables = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(envContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silently fail */
    }
  };

  return (
    <section id="env-variables" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Environment Variables
            </h2>
          </div>
        </div>
      </div>

      {/* Code Block */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card p-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group/code relative rounded-lg border border-border bg-(--color-surface-elevated) overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  .env
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Copy env config"
                >
                  {copied ? (
                    <Check size={12} className="text-[#59d499]" />
                  ) : (
                    <Copy size={12} className="text-text-muted" />
                  )}
                </button>
              </div>
              <div className="px-4 py-3 font-mono text-[11px] sm:text-xs text-text-secondary overflow-x-auto leading-relaxed">
                <pre className="whitespace-pre">{envContent}</pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card px-5 py-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-start gap-3 rounded-lg border border-border bg-(--color-surface-elevated) px-4 py-3"
            >
              <Info size={14} className="shrink-0 mt-0.5 text-[#ffc533]" />
              <p className="text-xs text-text-secondary leading-relaxed">
                Email delivery uses a Gmail account with an{" "}
                <strong className="text-text-primary">App Password</strong> (not
                OAuth2). Generate one from your Google Account → Security → 2-Step
                Verification → App Passwords. Requires 2FA to be enabled on the
                account.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvVariables;
