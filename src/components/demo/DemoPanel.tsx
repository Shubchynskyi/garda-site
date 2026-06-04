import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { DEMO_SCENES } from "../../content/demo";
import type { SceneKind } from "../../content/demo";
import { DemoScene } from "./DemoScene";
import { ThemePill } from "./ThemePill";

function glowFor(kind: SceneKind) {
  if (kind === "proof") {
    return "from-emerald-500/[0.18] via-cyan-400/10 to-transparent";
  }
  if (kind === "workflow") {
    return "from-cyan-500/[0.18] via-emerald-400/10 to-transparent";
  }
  if (kind === "ungoverned") {
    return "from-rose-500/[0.18] via-amber-400/10 to-transparent";
  }
  return "from-cyan-400/[0.14] via-emerald-400/10 to-transparent";
}

export function DemoPanel() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const activeScene = DEMO_SCENES[index];
  const gradient = useMemo(() => glowFor(activeScene.kind), [activeScene.kind]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setAutoplay(false);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % DEMO_SCENES.length);
    }, 3600);
    return () => window.clearTimeout(id);
  }, [autoplay, index]);

  return (
    <div className="rounded-4xl border border-white/10 bg-white/4 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:p-6">
      <div className="mb-6 border-b border-white/10 pb-6">
        <div className="space-y-3">
          <ThemePill theme={activeScene.theme} />
          <div className="min-h-33 md:min-h-30">
            <div className="text-xs uppercase tracking-[0.28em] text-white/42">{activeScene.label}</div>
            <div className="mt-2 text-2xl font-semibold text-white md:text-3xl">{activeScene.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/58 md:text-base">{activeScene.subtitle}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoplay((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72 transition hover:bg-white/10"
            aria-pressed={autoplay}
          >
            {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{autoplay ? "Pause" : "Play"}</span>
          </button>
          {DEMO_SCENES.map((scene, i) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => {
                setIndex(i);
                setAutoplay(false);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                i === index
                  ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/5 text-white/62 hover:bg-white/8"
              }`}
            >
              {scene.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br ${gradient} p-5 transition-all duration-700 md:p-8`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,0.08),transparent_24%),linear-gradient(180deg,rgba(4,7,13,0.65)_0%,rgba(7,16,25,0.72)_60%,rgba(4,7,13,0.82)_100%)]" />
        <div className="relative z-10 min-h-130">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.id}
              initial={{ opacity: 0, y: 18, scale: 0.988 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.992 }}
              transition={{ duration: 0.28 }}
            >
              <DemoScene kind={activeScene.kind} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
