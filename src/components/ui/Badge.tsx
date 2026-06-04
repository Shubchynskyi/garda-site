import type { LucideIcon } from "lucide-react";

type StageTone = "neutral" | "good" | "bad" | "warn";

export function Badge({
  icon: Icon,
  text,
  tone = "neutral",
}: {
  icon: LucideIcon;
  text: string;
  tone?: StageTone;
}) {
  const styles =
    tone === "good"
      ? "border-emerald-400/25 bg-emerald-400/12 text-emerald-100"
      : tone === "bad"
      ? "border-rose-400/25 bg-rose-400/12 text-rose-100"
      : tone === "warn"
      ? "border-amber-400/25 bg-amber-400/12 text-amber-100"
      : "border-white/10 bg-white/5 text-white/82";

  return (
    <div className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-base backdrop-blur-xl ${styles}`}>
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </div>
  );
}
