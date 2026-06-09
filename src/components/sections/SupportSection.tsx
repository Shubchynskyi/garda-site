import { ArrowRight, Coins, Heart } from "lucide-react";
import { CRYPTO_DONATION_URL, KO_FI_URL } from "../../content/links";
import { SectionTitle } from "../ui/SectionTitle";

const supportItems = [
  "AI tokens",
  "model subscriptions",
  "release validation",
  "documentation",
  "compatibility testing",
  "maintenance",
];

export function SupportSection() {
  return (
    <section id="support" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-10">
      <div className="grid gap-10 overflow-hidden rounded-[34px] border border-white/10 bg-linear-to-br from-emerald-400/12 via-white/4 to-cyan-400/10 p-8 backdrop-blur-2xl lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div>
          <SectionTitle
            eyebrow="Support GARDA"
            title="Buy me some tokens"
            body="GARDA is an independent open-source project for governed AI coding workflows. Voluntary support helps keep validation, documentation, compatibility checks, and maintenance moving."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href={KO_FI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
            >
              <Heart className="h-4 w-4" />
              Support on Ko-fi
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={CRYPTO_DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/82 transition hover:bg-white/10"
            >
              <Coins className="h-4 w-4" />
              Donate crypto
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid content-center gap-4">
          <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/72">What support helps cover</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {supportItems.map((item) => (
              <div key={item} className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/68">
                {item}
              </div>
            ))}
          </div>
          <p className="text-sm leading-6 text-white/44">
            Sponsorship is voluntary and does not guarantee private support, roadmap priority, or custom development.
          </p>
        </div>
      </div>
    </section>
  );
}
