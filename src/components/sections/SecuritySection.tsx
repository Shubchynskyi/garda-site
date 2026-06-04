import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  CHANGELOG_URL,
  CONTROL_PLANE_ISOLATION_URL,
  NPM_PACKAGE_URL,
  SOCKET_BADGE_URL,
  SOCKET_PACKAGE_URL,
  THREAT_MODEL_URL,
} from "../../content/links";

export function SecuritySection() {
  return (
    <section id="security" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-10">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/4 p-8 backdrop-blur-xl">
          <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/72">Current release</div>
          <div className="mt-3 text-2xl font-semibold text-white">v1.1.0 release line</div>
          <p className="mt-3 leading-7 text-white/62">
            Garda 1.1.0 focuses on clearer setup/update output, `next-step` routing, local UI/report surfaces, project memory, review reuse, runtime cleanup, and release validation.
          </p>
          <a
            href={CHANGELOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
          >
            Open changelog
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-[30px] border border-emerald-400/15 bg-emerald-400/6 p-8 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-emerald-200/72">Security</div>
              <div className="mt-3 text-2xl font-semibold text-white">Threat model and package report</div>
              <p className="mt-3 max-w-xl leading-7 text-white/62">
                Inspect the live Socket report for `garda-agent-orchestrator`. The CLI targets Node.js 24 LTS as the primary runtime and supports Node.js 22.13+ as the compatibility line. Garda is local workflow governance, not a sandbox against a malicious same-user process.
              </p>
            </div>
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-100/80" />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <a
              href={THREAT_MODEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
            >
              Read Threat Model
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={CONTROL_PLANE_ISOLATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/6 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/12"
            >
              Control-plane isolation
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={NPM_PACKAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              View on npm
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={SOCKET_PACKAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm font-medium text-emerald-50 transition hover:bg-emerald-300/15"
            >
              <ShieldCheck className="h-4 w-4" />
              <img
                src={SOCKET_BADGE_URL}
                alt="Socket security badge for garda-agent-orchestrator"
                loading="lazy"
                className="h-5 w-auto"
              />
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              "Runtime baseline: Node.js 24 LTS primary",
              "Compatibility line: Node.js 22.13+",
              "Node 20 is outside the tested support matrix",
            ].map((item) => (
              <div key={item} className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/70">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
