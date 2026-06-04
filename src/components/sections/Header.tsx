import { ShieldCheck } from "lucide-react";
import { GITHUB_URL } from "../../content/links";
import { ScrollButton } from "../ui/ScrollButton";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#04070d]/65 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-2.5">
            <ShieldCheck className="h-5 w-5 text-cyan-100" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-[0.2em]">GARDA</div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">governed workflows for AI coding agents</div>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-white/62 md:flex">
          <ScrollButton targetId="why" className="bg-transparent hover:text-white">Why</ScrollButton>
          <ScrollButton targetId="demo" className="bg-transparent hover:text-white">Demo</ScrollButton>
          <ScrollButton targetId="workflow" className="bg-transparent hover:text-white">Workflow</ScrollButton>
          <ScrollButton targetId="docs" className="bg-transparent hover:text-white">Docs</ScrollButton>
          <ScrollButton targetId="start" className="bg-transparent hover:text-white">Install</ScrollButton>
          <ScrollButton targetId="security" className="bg-transparent hover:text-white">Security</ScrollButton>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
        </nav>
      </div>
    </header>
  );
}
