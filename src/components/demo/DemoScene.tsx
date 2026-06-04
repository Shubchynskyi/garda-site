import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileWarning, GitBranch, ShieldCheck } from "lucide-react";
import type { SceneKind } from "../../content/demo";
import { useSceneTimer } from "../../hooks/useSceneTimer";
import { Badge } from "../ui/Badge";
import { Window } from "../ui/Window";
import { Editor } from "./EditorMock";
import { Terminal } from "./TerminalMock";
import type { LineTone } from "./types";

export function DemoScene({ kind }: { kind: SceneKind }) {
  const elapsed = useSceneTimer(`${kind}:scene`);

  if (kind === "ungoverned") {
    return (
      <div className="mx-auto grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <Editor sceneKey={kind} files={["src/api/checkout.ts", "src/types/result.ts"]} accent="rose" />
        <div className="grid gap-4">
          <Terminal
            sceneKey={kind}
            lines={[
              { at: 120, text: '$ task: "fix checkout bug"' },
              { at: 520, text: "> patch applied" },
              { at: 920, text: "$ npm test checkout" },
              { at: 1280, text: "All tests passed", tone: "good" },
              { at: 1640, text: "$ smoke /checkout" },
              { at: 2000, text: "GET /checkout 500", tone: "bad" },
              { at: 2360, text: "No required review path caught it", tone: "bad" },
            ]}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Badge icon={AlertTriangle} text="No enforced gates" tone="bad" />
            <Badge icon={FileWarning} text="Looks done, still broken" tone="bad" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "workflow") {
    return (
      <div className="mx-auto grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <Editor sceneKey={kind} files={["TASK.md", "src/api/checkout.ts", "src/types/result.ts"]} accent="emerald" />
        <div className="grid gap-4">
          <Terminal
            sceneKey={kind}
            lines={[
              { at: 120, text: '$ task: "Execute T-001 from TASK.md strictly through all mandatory orchestrator gates."' },
              { at: 520, text: "$ garda next-step T-001" },
              { at: 760, text: "> next: run preflight/classify-change" },
              { at: 920, text: "> preflight: balanced, reviews=code+security" },
              { at: 1320, text: "> compile gate: passed", tone: "good" },
              { at: 1720, text: "> required reviews: passed", tone: "good" },
              { at: 2120, text: "> completion gate: ready", tone: "good" },
            ]}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Task entry",
              "Preflight",
              "Compile gate",
              "Required reviews",
            ].map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0.18, y: 8 }}
                animate={{ opacity: elapsed > index * 240 + 400 ? 1 : 0.18, y: elapsed > index * 240 + 400 ? 0 : 8 }}
                className="rounded-[20px] border border-white/10 bg-white/4 px-4 py-4 text-base font-medium text-white/82"
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid items-start gap-6 lg:grid-cols-[0.88fr_1.12fr]">
      <div className="grid gap-4">
        {[
          {
            title: "Required reviews",
            body: "Code and security review artifacts are attached before completion can pass.",
            icon: ShieldCheck,
          },
          {
            title: "Task-event history",
            body: "Every stage leaves an event in the log so another human can see what actually happened.",
            icon: GitBranch,
          },
          {
            title: "Gate summary",
            body: "Passed means compile, reviews, doc-impact, and completion all cleared in order.",
            icon: CheckCircle2,
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: elapsed > index * 220 + 120 ? 1 : 0.24, y: elapsed > index * 220 + 120 ? 0 : 10 }}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl"
            >
              <div className="mb-3 inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-100">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 leading-7 text-white/62">{item.body}</p>
            </motion.div>
          );
        })}
      </div>
      <Window title="task-event log">
        <div className="space-y-2 px-5 py-5 font-mono text-[14px] leading-6 md:text-[15px]">
          {[
            { at: 120, text: "TASK_ENTRY         ok", tone: "normal" as LineTone },
            { at: 480, text: "PREFLIGHT          passed", tone: "good" as LineTone },
            { at: 840, text: "COMPILE_GATE       passed", tone: "good" as LineTone },
            { at: 1200, text: "SECURITY_REVIEW    approved", tone: "good" as LineTone },
            { at: 1560, text: "REQUIRED_REVIEWS   passed", tone: "good" as LineTone },
            { at: 1920, text: "COMPLETION_GATE    ready", tone: "good" as LineTone },
          ].map((line, i) => {
            const shown = elapsed >= line.at;
            const color =
              line.tone === "good"
                ? "text-emerald-200"
                : line.tone === "bad"
                  ? "text-rose-200"
                  : "text-white/82";

            return (
              <motion.div
                key={`${kind}-${line.text}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: shown ? 1 : 0, x: shown ? 0 : -8 }}
                transition={{ duration: 0.18 }}
                className={`rounded-xl px-3 py-1.5 ${color}`}
              >
                {shown ? line.text : " "}
              </motion.div>
            );
          })}
        </div>
      </Window>
    </div>
  );
}
