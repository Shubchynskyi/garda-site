import { profiles } from "../../content/landing";
import { SectionTitle } from "../ui/SectionTitle";

export function ProfilesSection() {
  return (
    <section id="profiles" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionTitle
        eyebrow="Profiles"
        title="Choose strictness by task risk"
        body="Profiles keep small changes lightweight and push riskier work through a deeper review path."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <div key={profile.name} className={`rounded-[28px] border border-white/10 bg-linear-to-b ${profile.accent} p-6 backdrop-blur-xl`}>
              <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/6 p-3">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{profile.name}</h3>
              <p className="mt-3 leading-7 text-white/62">{profile.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
