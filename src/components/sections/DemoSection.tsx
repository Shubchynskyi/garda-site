import { DemoPanel } from "../demo/DemoPanel";
import { SectionTitle } from "../ui/SectionTitle";

export function DemoSection() {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
      <SectionTitle
        eyebrow="Demo"
        title="See the workflow in motion"
        body="Three scenes show what unguided output looks like, how Garda routes the workflow, and what completion looks like once the artifacts exist."
      />
      <div className="mt-12">
        <DemoPanel />
      </div>
    </section>
  );
}
