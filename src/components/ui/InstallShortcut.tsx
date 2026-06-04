import { ArrowRight, TerminalSquare } from "lucide-react";
import { ScrollButton } from "./ScrollButton";

export function InstallShortcut() {
  return (
    <ScrollButton
      targetId="start"
      className="fixed inset-x-4 bottom-4 z-40 inline-flex items-center justify-center gap-3 rounded-full border border-cyan-300/30 bg-[#08121a]/92 px-5 py-3 text-sm font-medium text-cyan-50 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-cyan-300/12 sm:inset-x-auto sm:right-4"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
        <TerminalSquare className="h-4 w-4" />
      </span>
      <span>Install</span>
      <ArrowRight className="h-4 w-4" />
    </ScrollButton>
  );
}
