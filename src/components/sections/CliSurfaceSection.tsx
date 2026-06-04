import { cliGroups } from "../../content/landing";
import { SectionTitle } from "../ui/SectionTitle";

export function CliSurfaceSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionTitle
        eyebrow="CLI Surface"
        title="Navigate, inspect, report, and maintain"
        body="The public CLI is broader than the task loop: operators can inspect blockers, render reports, clean runtime artifacts, repair indexes, and roll back controlled updates."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cliGroups.map((group) => (
          <div key={group.title} className="rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">{group.title}</h3>
            <div className="mt-5 grid gap-2">
              {group.commands.map((command) => (
                <div key={command} className="rounded-[16px] border border-white/10 bg-black/20 px-4 py-3 font-mono text-sm text-white/72">
                  {command}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-cyan-300/15 bg-cyan-300/6 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">Safe updates and rollback</h3>
          <p className="mt-3 leading-7 text-white/62">
            Check package or source updates, preview changes, apply controlled updates, and roll back from snapshots when needed.
          </p>
        </div>
        <div className="rounded-[28px] border border-emerald-300/15 bg-emerald-300/6 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">Runtime hygiene</h3>
          <p className="mt-3 leading-7 text-white/62">
            Use `garda cleanup` and `garda repair` to manage retained artifacts, stale locks, runtime indexes, and protected manifests.
          </p>
        </div>
      </div>
    </section>
  );
}
