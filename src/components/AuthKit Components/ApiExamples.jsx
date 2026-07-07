import { useState } from "react";
import { Copy, Check, ChevronRight } from "lucide-react";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2.5 right-2.5 p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer opacity-0 group-hover/code:opacity-100"
      aria-label="Copy code"
    >
      {copied ? (
        <Check size={12} className="text-[#59d499]" />
      ) : (
        <Copy size={12} className="text-text-muted" />
      )}
    </button>
  );
};

const JsonBlock = ({ label, statusColor, code, copyText }) => (
  <div className="group/code relative rounded-lg border border-border bg-(--color-surface-elevated) overflow-hidden">
    {label && (
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        {statusColor && (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: statusColor }}
          />
        )}
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {label}
        </span>
      </div>
    )}
    <div className="px-4 py-3 font-mono text-[11px] sm:text-xs text-text-secondary overflow-x-auto leading-relaxed">
      <pre className="whitespace-pre">{code}</pre>
    </div>
    <CopyButton text={copyText || code} />
  </div>
);

const examples = [
  {
    id: "register",
    title: "Register",
    request: {
      label: "POST /api/v1/users/register",
      code: `{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}`,
    },
    response: {
      label: "201 Response",
      statusColor: "#59d499",
      code: `{
  "success": true,
  "message": "User registered successfully",
  "userId": "665f..."
}`,
    },
  },
  {
    id: "login",
    title: "Login",
    request: {
      label: "POST /api/v1/users/login",
      code: `{
  "email": "john@example.com",
  "password": "securePassword123"
}`,
    },
    response: {
      label: "200 Response",
      statusColor: "#59d499",
      code: `{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOi..."
}`,
    },
    note: "Refresh token is set automatically as an HTTP-only cookie.",
  },
  {
    id: "forgot-password",
    title: "Forgot Password Flow",
    steps: [
      {
        stepLabel: "Step 1 — Request OTP",
        request: {
          label: "POST /api/v1/users/forget-password",
          code: `{ "email": "john@example.com" }`,
        },
        response: {
          label: "200 Response",
          statusColor: "#59d499",
          code: `{
  "success": true,
  "message": "If this email exists, an OTP has been sent."
}`,
        },
      },
      {
        stepLabel: "Step 2 — Verify OTP",
        request: {
          label: "POST /api/v1/users/verify-reset-otp",
          code: `{ "email": "john@example.com", "otp": "482910" }`,
        },
        response: {
          label: "200 Response",
          statusColor: "#59d499",
          code: `{
  "success": true,
  "data": { "resetToken": "eyJhbGciOi..." }
}`,
        },
      },
      {
        stepLabel: "Step 3 — Reset Password",
        request: {
          label: "POST /api/v1/users/reset-password",
          code: `Authorization: Bearer <resetToken>\n{ "newPassword": "newSecurePassword456" }`,
        },
        response: {
          label: "200 Response",
          statusColor: "#59d499",
          code: `{
  "success": true,
  "message": "Password reset successfully. Please log in with your new password."
}`,
        },
      },
    ],
  },
];

const ApiExamples = () => {
  return (
    <section id="api-examples" className="w-full scroll-mt-24">
      {/* Header Box */}
      <div className="w-full border-b border-border">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <div className="border-x border-border bg-bg-card py-4 p-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl">
              Examples
            </h2>
          </div>
        </div>
      </div>

      {examples.map((example) => (
        <div key={example.id} className="w-full border-b border-border">
          <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
            <div className="border-x border-border bg-bg-card">
              {/* Example Title */}
              <div className="px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <ChevronRight size={12} className="text-text-muted" />
                  <h3 className="font-display text-sm font-bold text-text-primary sm:text-base">
                    {example.title}
                  </h3>
                </div>
              </div>

              {/* Simple request/response example */}
              {example.request && (
                <div className="px-5 py-4 flex flex-col gap-3">
                  <JsonBlock
                    label={example.request.label}
                    code={example.request.code}
                  />
                  <JsonBlock
                    label={example.response.label}
                    statusColor={example.response.statusColor}
                    code={example.response.code}
                  />
                  {example.note && (
                    <p className="text-xs text-text-muted font-mono mt-1">
                      {example.note}
                    </p>
                  )}
                </div>
              )}

              {/* Multi-step flow (Forgot Password) */}
              {example.steps &&
                example.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="px-5 py-4 border-b border-border last:border-b-0"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-3">
                      {step.stepLabel}
                    </span>
                    <div className="flex flex-col gap-3">
                      <JsonBlock
                        label={step.request.label}
                        code={step.request.code}
                      />
                      <JsonBlock
                        label={step.response.label}
                        statusColor={step.response.statusColor}
                        code={step.response.code}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ApiExamples;
