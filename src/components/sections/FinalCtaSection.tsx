import { ArrowRight } from "lucide-react";
import { GITHUB_URL, USER_GUIDE_URL } from "../../content/links";
import { SectionTitle } from "../ui/SectionTitle";

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
      <div className="rounded-[34px] border border-white/10 bg-linear-to-br from-cyan-400/10 via-white/3 to-emerald-400/8 p-10 backdrop-blur-2xl">
        <SectionTitle
          eyebrow="Ready"
          title="Use your existing agent, but make the workflow governed"
          body="Start with the repository, the setup guide, and one correct first run. Garda handles the workflow discipline on top of the agent you already use."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
          >
            View on GitHub
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={USER_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
          >
            Read setup guide
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
