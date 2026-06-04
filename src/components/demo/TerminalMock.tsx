import { motion } from "framer-motion";
import { useSceneTimer } from "../../hooks/useSceneTimer";
import { Window } from "../ui/Window";
import type { TerminalLine } from "./types";

export function Terminal({ sceneKey, lines }: { sceneKey: string; lines: TerminalLine[] }) {
  const elapsed = useSceneTimer(`${sceneKey}:terminal`);

  return (
    <Window title="terminal">
      <div className="space-y-2 px-5 py-5 font-mono text-[15px] leading-6">
        {lines.map((line, i) => {
          const shown = elapsed >= line.at;
          const color =
            line.tone === "good"
              ? "text-emerald-200"
              : line.tone === "bad"
                ? "text-rose-200"
                : line.tone === "muted"
                  ? "text-white/42"
                  : "text-white/80";

          return (
            <motion.div
              key={`${sceneKey}-${line.text}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: shown ? 1 : 0, x: shown ? 0 : -8 }}
              transition={{ duration: 0.18 }}
              className={`rounded-xl px-3 py-1.5 whitespace-pre-wrap wrap-break-word ${color}`}
            >
              {shown ? line.text : " "}
            </motion.div>
          );
        })}
      </div>
    </Window>
  );
}
