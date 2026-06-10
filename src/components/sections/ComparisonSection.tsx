import { CheckCircle2 } from "lucide-react";
import { comparison, whyGardaPoints } from "../../content/landing";
import { SectionTitle } from "../ui/SectionTitle";

export function ComparisonSection() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionTitle
        eyebrow="Why Garda"
        title="What changes when the workflow is governed"
        body="Agents can generate code quickly. Shipping still needs structure, review, and proof. Garda makes those gates explicit and repeatable across providers."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {comparison.map((card) => (
          <div
            key={card.title}
            className={`rounded-[30px] border p-8 backdrop-blur-xl ${
              card.tone === "without"
                ? "border-rose-400/15 bg-rose-400/6"
                : "border-emerald-400/15 bg-emerald-400/6"
            }`}
          >
            <div className={`mb-5 text-sm font-medium uppercase tracking-[0.28em] ${card.tone === "without" ? "text-rose-200" : "text-emerald-200"}`}>
              {card.title}
            </div>
            <div className="space-y-4 text-white/78">
              {card.points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className={`mt-1 h-2.5 w-2.5 rounded-full ${card.tone === "without" ? "bg-rose-300" : "bg-emerald-300"}`} />
                  <p className="leading-7">{point}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-[30px] border border-cyan-300/20 bg-cyan-300/6 p-8 backdrop-blur-xl">
        <div className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/90">Why GARDA?</div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {whyGardaPoints.map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-3xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/78">
              <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-cyan-200/95" />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
