import { FileWarning, GitBranch, ShieldCheck, TerminalSquare } from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";

export function RuntimeLayerSection() {
  return (
    <section id="not-prompts" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionTitle
        eyebrow="Not just prompts"
        title="Garda is a runtime layer, not a prompt pack"
        body="Prompt files can suggest behavior. Garda gates workflow structure with a local CLI, lifecycle state, mandatory gates, review artifacts, and auditable completion."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Runtime contract",
            body: "A Node and TypeScript CLI controls setup, task mode, profiles, updates, cleanup, and validation.",
            icon: TerminalSquare,
          },
          {
            title: "Mandatory gates",
            body: "Preflight, compile, reviews, doc-impact, and completion are part of the workflow, not optional habits.",
            icon: ShieldCheck,
          },
          {
            title: "Review artifacts",
            body: "Specialist reviews leave inspectable outputs before a task can be treated as complete.",
            icon: FileWarning,
          },
          {
            title: "Audit trail",
            body: "Task-event history records how work moved through the lifecycle.",
            icon: GitBranch,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-3">
                <Icon className="h-5 w-5 text-cyan-100" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-white/62">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
