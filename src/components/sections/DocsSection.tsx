import { ArrowRight, TerminalSquare } from "lucide-react";
import { docCards } from "../../content/docs";
import { SectionTitle } from "../ui/SectionTitle";

export function DocsSection() {
  return (
    <section id="docs" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionTitle
        eyebrow="Docs"
        title="Go from demo to a real governed task"
        body="Read the setup guide, CLI reference, architecture notes, provider matrix, threat model, and workflow examples directly from the repository."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {docCards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl transition hover:border-cyan-300/25 hover:bg-white/6"
          >
            <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
              <TerminalSquare className="h-5 w-5 text-white/90" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
            <p className="mt-3 leading-7 text-white/62">{card.body}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-100/85">
              {card.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
