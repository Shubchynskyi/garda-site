export function ThemePill({ theme }: { theme: "without" | "with" }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl">
      <span className={theme === "without" ? "text-rose-300" : "text-emerald-300"}>
        {theme === "without" ? "WITHOUT GARDA" : "WITH GARDA"}
      </span>
      <span className="mx-2 text-white/40">·</span>
      <span>{theme === "without" ? "DIRECT AGENT RUN" : "CONTROLLED WORKFLOW"}</span>
    </div>
  );
}
