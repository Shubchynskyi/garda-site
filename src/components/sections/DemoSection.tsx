import { DemoPanel } from "../demo/DemoPanel";
import { SectionTitle } from "../ui/SectionTitle";

export function DemoSection() {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
      <SectionTitle
        eyebrow="Demo"
        title="Watch the 2-minute demo"
        body="See how Garda routes a task through reviews, focused fixes, and verified completion."
      />
      <figure className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#080b11] shadow-[0_30px_100px_rgba(0,0,0,0.4)] md:mt-12 md:rounded-4xl">
        <iframe
          className="block aspect-video w-full border-0 bg-[#080b11]"
          src="https://www.youtube-nocookie.com/embed/1J74BDu1sEI"
          title="Garda Agent Orchestrator — 2-minute demo"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-white/65 md:px-6">
          Recorded walkthrough · English captions available ·{" "}
          <a href="https://www.youtube.com/watch?v=1J74BDu1sEI" target="_blank" rel="noopener noreferrer" className="text-teal-300 underline underline-offset-4 hover:text-teal-200">
            Watch on YouTube
          </a>
        </figcaption>
      </figure>
      <div className="mt-14 md:mt-20">
        <h3 className="mb-6 text-center text-2xl font-semibold text-white md:text-3xl">Explore the workflow step by step</h3>
        <DemoPanel />
      </div>
    </section>
  );
}
