import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { heroHighlights } from "../../content/landing";
import { GITHUB_URL, INSTALL_COMMAND } from "../../content/links";
import { Badge } from "../ui/Badge";
import { ScrollButton } from "../ui/ScrollButton";
import { Window } from "../ui/Window";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-14 pt-20 lg:px-10 lg:pt-24">
      <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            AI coding agents need a workflow, not just a prompt.
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] text-white md:text-5xl lg:text-6xl">
            Make AI coding agents follow the same gates every time.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            Garda is a local governance layer for many popular AI coding agent providers and local provider surfaces. It covers providers such as Claude, Codex, and Antigravity 2.0 / CLI, with one key requirement for mandatory review: the active surface must be able to delegate fresh sub-agent reviewers.
          </p>
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {heroHighlights.map((point, index) => (
              <div
                key={point.title}
                className="grid h-full grid-rows-[2.75rem_auto_1fr] gap-3 rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl lg:grid-rows-[2.75rem_2.75rem_1fr]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                  0{index + 1}
                </div>
                <h3 className="text-base font-semibold leading-6 text-white">{point.title}</h3>
                <p className="text-sm leading-6 text-white/62">{point.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.08)] transition hover:bg-cyan-300/15"
            >
              View on GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
            <ScrollButton
              targetId="start"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              Install with npm
              <ChevronRight className="h-4 w-4" />
            </ScrollButton>
            <ScrollButton
              targetId="demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-medium text-white/72 transition hover:border-white/20 hover:text-white"
            >
              Watch demo
            </ScrollButton>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/44">
            Version 1.1.0. Gates, not vibes. Package: `garda-agent-orchestrator`. Commands: `garda`, `gao`, `garda-agent-orchestrator`.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-sm text-white/62">
            <Badge icon={Workflow} text="Many provider surfaces" />
            <Badge icon={ShieldCheck} text="Mandatory gates" />
            <Badge icon={CheckCircle2} text="Auditable completion" />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
            <div className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-200/72">Governance Snapshot</div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                "Local governance layer for existing coding agents",
                "Requires a local Git working tree so task scope and review freshness can be audited",
                "Mandatory gates: preflight, compile, reviews, doc-impact, completion",
                "Supports many popular providers and local provider surfaces with provider-specific entrypoints and bridge profiles.",
                "Claude, Codex, and Antigravity 2.0 / CLI are first-viewport examples; mandatory review relies on fresh sub-agent reviewer delegation.",
                "Operator surfaces: `garda next-step`, `garda preprompt`, `garda ui`, `garda html`, `garda cleanup`, `garda repair`, and `garda rollback`",
              ].map((item) => (
                <div key={item} className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/68">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Window title="first run">
            <div className="space-y-2 px-5 py-5 font-mono text-[14px] leading-6 text-white/82 md:text-[15px]">
              {INSTALL_COMMAND.split("\n").map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div># give AGENT_INIT_PROMPT.md to your coding agent</div>
              <div>garda next-step T-001</div>
              <div># run the exact command it prints, then ask again</div>
              <div>garda next-step T-001</div>
            </div>
          </Window>

          <div className="rounded-[28px] border border-cyan-300/15 bg-cyan-300/6 p-6 backdrop-blur-xl">
            <div className="text-sm font-semibold text-white">Why this lands</div>
            <p className="mt-3 leading-7 text-white/62">
              Garda does not replace your coding agent. It makes task entry, gates, reviews, and completion explicit before work can be treated as done.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
