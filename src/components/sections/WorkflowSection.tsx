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
    </section>
  );
}
