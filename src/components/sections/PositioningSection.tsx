import { SectionTitle } from "../ui/SectionTitle";

export function PositioningSection() {
  return (
    <section id="positioning" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="rounded-[34px] border border-white/10 bg-linear-to-br from-cyan-400/10 via-white/3 to-emerald-400/8 p-10 backdrop-blur-2xl">
        <SectionTitle
          eyebrow="Positioning"
          title="Not another agent launcher"
          body="Most tools focus on starting more agents. Garda focuses on making agent work reviewable, repeatable, and harder to mark as done too early."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            "Use your existing coding agent.",
            "Force the same workflow across providers.",
            "Accept completion only when the gates pass.",
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-black/20 p-6 text-lg font-medium leading-7 text-white/78">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
