import { ArrowRight } from "lucide-react";
import { ARCHITECTURE_URL, WORK_EXAMPLE_URL } from "../../content/links";
import { workflowSteps } from "../../content/landing";
import { SectionTitle } from "../ui/SectionTitle";

export function WorkflowSection() {
  return (
    <section id="workflow" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionTitle
        eyebrow="Workflow"
        title="One repeatable workflow for every provider"
        body="Garda does not replace your coding agent. It gives every provider the same governed path from task entry to auditable completion."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {workflowSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-3">
                <Icon className="h-5 w-5 text-cyan-100" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 leading-7 text-white/62">{step.description}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[24px] border border-white/10 bg-white/4 px-5 py-4 text-sm leading-6 text-white/62 backdrop-blur-xl">
        <span>The full gate chain is documented in the architecture notes and workflow example.</span>
        <a href={ARCHITECTURE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-100 transition hover:text-white">
          Architecture
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <a href={WORK_EXAMPLE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-100 transition hover:text-white">
          Work Example
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
