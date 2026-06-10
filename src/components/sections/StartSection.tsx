import { ArrowRight } from "lucide-react";
import { startSteps } from "../../content/landing";
import { AGENT_INIT_PROMPT_URL, CLI_REFERENCE_URL, INSTALL_COMMAND } from "../../content/links";
import { CopyButton } from "../ui/CopyButton";
import { SectionTitle } from "../ui/SectionTitle";

export function StartSection() {
  return (
    <section id="start" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-10">
      <SectionTitle
        eyebrow="Get Started"
        title="Run your first governed agent workflow"
        body="Install Garda, run setup in a local Git working tree, then hand `AGENT_INIT_PROMPT.md` to your coding agent so it can initialize the managed workflow."
      />
      <div className="mt-14 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4">
          {startSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-start gap-4 rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                  0{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-cyan-100" />
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="mt-3 max-w-xl leading-7 text-white/62">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/4 p-8 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/72">First controlled run</div>
              <p className="mt-2 max-w-lg text-sm leading-6 text-white/50">
                Install once, initialize the workspace, then let your agent enter the governed workflow.
              </p>
            </div>
            <div className="whitespace-nowrap rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-100">
              Local CLI
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#08121a]/85">
            <div className="border-b border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/32">terminal</div>
            <div className="space-y-2 px-5 py-5 font-mono text-[15px] text-white/80">
              {INSTALL_COMMAND.split("\n").map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div># give AGENT_INIT_PROMPT.md to your coding agent</div>
              <div># agent runs garda agent-init</div>
              <div>garda next-step T-001</div>
              <div># run the exact command it prints, then ask again</div>
              <div>garda next-step T-001</div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CopyButton value={INSTALL_COMMAND} />
            <a
              href={AGENT_INIT_PROMPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
            >
              Open AGENT_INIT_PROMPT
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={CLI_REFERENCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              View CLI reference
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
