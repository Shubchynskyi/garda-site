import { SectionTitle } from "../ui/SectionTitle";
import { Window } from "../ui/Window";

const detailShots = [
  {
    src: "/screenshots/garda-ui/task-progress-dark.webp",
    alt: "Task progress in Garda UI: completed stages with timestamps, the current stage and the remaining stages",
    caption: "Task progress: what passed, what is running, what is still ahead.",
  },
  {
    src: "/screenshots/garda-ui/quality-check-dark.webp",
    alt: "Latest quality check in Garda UI: evidence current, status PASS, changed files and rule answers marked PASS",
    caption: "Latest quality check: evidence, changed files and every rule answer.",
  },
];

export function DashboardSection() {
  return (
    <section id="dashboard" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-10">
      <SectionTitle
        eyebrow="Local dashboard"
        title="Every task, gate, and review in one view"
        body="Run garda ui to open a read-only dashboard on 127.0.0.1. Follow a task through its stages, check reviews and full-suite results, and see the profiles and quality rules your workflow uses."
      />
      <figure className="mx-auto mt-12 max-w-6xl">
        <Window title="garda ui · 127.0.0.1">
          <img
            src="/screenshots/garda-ui/tasks-dark.webp"
            width={1600}
            height={1000}
            alt="Garda UI task queue for the Garda repository: task counters, navigation tabs and the task table with status, priority, area and title"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </Window>
        <figcaption className="mt-4 text-center text-sm leading-6 text-white/52">
          Garda&apos;s own task queue: Garda is developed through Garda.
        </figcaption>
      </figure>
      <div className="mx-auto mt-6 grid max-w-6xl gap-6 md:grid-cols-2">
        {detailShots.map((shot) => (
          <figure
            key={shot.src}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08121a]/80 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
          >
            <img
              src={shot.src}
              width={1058}
              height={1484}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/62">{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
