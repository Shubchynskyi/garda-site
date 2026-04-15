import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileWarning,
  GitBranch,
  Pause,
  Play,
  Shield,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DEMO_SCENES = [
  {
    id: 0,
    kind: "ungoverned",
    label: "Ungoverned",
    theme: "without",
    title: "A direct agent run can still look finished too early",
    subtitle: "A patch lands, tests go green, and a production break still slips through because there is no shared gate sequence.",
  },
  {
    id: 1,
    kind: "workflow",
    label: "Workflow",
    theme: "with",
    title: "GARDA moves one task through the same gates every time",
    subtitle: "Preflight, compile, required reviews, and completion happen in order before anyone treats the output as done.",
  },
  {
    id: 2,
    kind: "proof",
    label: "Proof",
    theme: "with",
    title: "Completion ends with artifacts another human can inspect",
    subtitle: "Review outputs, gate summaries, and task-event history make the result auditable instead of hand-wavy.",
  },
] as const;

type SceneKind = (typeof DEMO_SCENES)[number]["kind"];
type LineTone = "normal" | "good" | "bad" | "muted";
type StageTone = "neutral" | "good" | "bad" | "warn";

type TerminalLine = {
  at: number;
  text: string;
  tone?: LineTone;
};

type ComparisonCard = {
  title: string;
  points: string[];
  tone: "without" | "with";
};

type Profile = {
  name: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const comparison: ComparisonCard[] = [
  {
    title: "Without GARDA",
    tone: "without",
    points: [
      "Task depth is inconsistent.",
      "Build, tests, and review can drift apart.",
      "One fix can reveal the next failure only after another run.",
      "Agents can cut corners or declare success too early.",
    ],
  },
  {
    title: "With GARDA",
    tone: "with",
    points: [
      "One universal workflow for every agent.",
      "Preflight and classification happen before deeper execution.",
      "Compile, reviews, and completion stay in order.",
      "Tasks pass only with proof and tamper-evident evidence.",
    ],
  },
];

const profiles: Profile[] = [
  {
    name: "Fast",
    description: "For small low-risk tasks that should stay lightweight.",
    icon: Sparkles,
    accent: "from-cyan-400/20 to-cyan-400/5",
  },
  {
    name: "Balanced",
    description: "The default mode for day-to-day development.",
    icon: Workflow,
    accent: "from-emerald-400/20 to-emerald-400/5",
  },
  {
    name: "Strict",
    description: "For risky changes, deeper review, and stronger guarantees.",
    icon: ShieldCheck,
    accent: "from-amber-400/20 to-amber-400/5",
  },
  {
    name: "Docs-only",
    description: "For documentation work without unnecessary code-review overhead.",
    icon: FileWarning,
    accent: "from-fuchsia-400/20 to-fuchsia-400/5",
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    title: "Enter task mode",
    description: "Start from one controlled path instead of jumping directly into edits.",
    icon: Workflow,
  },
  {
    title: "Preflight and classify",
    description: "Understand scope, risk, and likely review needs before implementation.",
    icon: AlertTriangle,
  },
  {
    title: "Compile and review",
    description: "Run build gates and independent specialist reviews in a defined order.",
    icon: Wrench,
  },
  {
    title: "Complete with proof",
    description: "Finish with completion checks and tamper-evident task events.",
    icon: Shield,
  },
];

const GITHUB_URL = "https://github.com/Shubchynskyi/garda-agent-orchestrator";
const USER_GUIDE_URL = `${GITHUB_URL}/blob/master/HOW_TO.md`;
const CLI_REFERENCE_URL = `${GITHUB_URL}/blob/master/docs/cli-reference.md`;
const ARCHITECTURE_URL = `${GITHUB_URL}/blob/master/docs/architecture.md`;
const WORK_EXAMPLE_URL = `${GITHUB_URL}/blob/master/docs/work-example.md`;
const AGENT_INIT_PROMPT_URL = `${GITHUB_URL}/blob/master/AGENT_INIT_PROMPT.md`;

const docCards = [
  {
    title: "User Guide",
    body: "Follow the real setup flow from the repository instead of guessing the install and onboarding path.",
    href: USER_GUIDE_URL,
    cta: "Open HOW_TO.md",
  },
  {
    title: "CLI Reference",
    body: "Check the public commands, flags, and lifecycle semantics for setup, agent-init, profiles, updates, and uninstall.",
    href: CLI_REFERENCE_URL,
    cta: "View command reference",
  },
  {
    title: "Architecture",
    body: "Read how GARDA deploys canonical rules, bridge profiles, and one workflow surface across providers.",
    href: ARCHITECTURE_URL,
    cta: "Read architecture",
  },
  {
    title: "Work Example",
    body: "See the full task lifecycle from TODO to DONE with profiles, reviews, and task-event evidence.",
    href: WORK_EXAMPLE_URL,
    cta: "Open workflow example",
  },
];

const heroHighlights = [
  {
    title: "Choose the right execution depth",
    body: "Use balanced, fast, strict, or docs-only based on the task instead of improvising depth on every run.",
  },
  {
    title: "Run the gates in the right order",
    body: "Keep preflight, compile, reviews, doc-impact, and completion in one predictable path to done.",
  },
  {
    title: "Leave proof behind",
    body: "Keep review artifacts and task-event history instead of relying on a fragile 'looks done' reply.",
  },
];

const startSteps: WorkflowStep[] = [
  {
    title: "Install the real CLI",
    description: "Use the published package name `garda-agent-orchestrator` or the one-off `npx` fallback from the repository docs.",
    icon: TerminalSquare,
  },
  {
    title: "Run setup once",
    description: "Let `garda setup` collect init answers and materialize the managed workspace state before any task execution.",
    icon: ShieldCheck,
  },
  {
    title: "Feed the prompt to the agent",
    description: "`AGENT_INIT_PROMPT.md` is the onboarding handoff: the agent reuses init answers, confirms active files, and completes `garda agent-init`.",
    icon: Workflow,
  },
];

function validateDemoConfig() {
  const ids = new Set<number>();
  const kinds = new Set<string>();
  for (const scene of DEMO_SCENES) {
    if (ids.has(scene.id)) throw new Error(`Duplicate demo scene id: ${scene.id}`);
    if (kinds.has(scene.kind)) throw new Error(`Duplicate demo scene kind: ${scene.kind}`);
    ids.add(scene.id);
    kinds.add(scene.kind);
  }
}

validateDemoConfig();

function useSceneTimer(key: string) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const start = Date.now();
    const id = window.setInterval(() => {
      setElapsed(Date.now() - start);
    }, 60);
    return () => window.clearInterval(id);
  }, [key]);

  return elapsed;
}

function glowFor(kind: SceneKind) {
  if (kind === "proof") {
    return "from-emerald-500/18 via-cyan-400/10 to-transparent";
  }
  if (kind === "workflow") {
    return "from-cyan-500/18 via-emerald-400/10 to-transparent";
  }
  if (kind === "ungoverned") {
    return "from-rose-500/18 via-amber-400/10 to-transparent";
  }
  return "from-cyan-400/14 via-emerald-400/10 to-transparent";
}

function SectionTitle({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <div className="mb-3 text-xs uppercase tracking-[0.34em] text-cyan-200/72">{eyebrow}</div> : null}
      <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-white/62 md:text-lg">{body}</p> : null}
    </div>
  );
}

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08121a]/80 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-3 text-[10px] uppercase tracking-[0.3em] text-white/30">{title}</div>
      </div>
      {children}
    </div>
  );
}

function Terminal({ sceneKey, lines }: { sceneKey: string; lines: TerminalLine[] }) {
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
              className={`rounded-xl px-3 py-1.5 whitespace-pre-wrap break-words ${color}`}
            >
              {shown ? line.text : " "}
            </motion.div>
          );
        })}
      </div>
    </Window>
  );
}

function Editor({
  sceneKey,
  files,
  accent = "cyan",
}: {
  sceneKey: string;
  files: string[];
  accent?: "cyan" | "emerald" | "rose";
}) {
  const elapsed = useSceneTimer(`${sceneKey}:editor`);
  const bg =
    accent === "emerald"
      ? "bg-emerald-400/14"
      : accent === "rose"
      ? "bg-rose-400/14"
      : "bg-cyan-400/14";

  const snippets = useMemo(() => {
    if (files.includes("tests/checkout.spec.ts")) {
      return [
        "describe('checkout', () => {",
        "  it('returns 200 for a valid cart', async () => {",
        "    const response = await request(app)",
        "      .post('/checkout')",
        "      .send({ cartId: 'cart_123', paymentMethod: 'card' })",
        "      .expect(200);",
        "    expect(response.body.status).toBe('ok');",
        "    expect(response.body.orderId).toMatch(/^ord_/);",
        "  });",
        "});",
      ];
    }

    if (files.includes("src/types/result.ts")) {
      return [
        "export type CheckoutResult = {",
        "  status: 'ok' | 'failed';",
        "  orderId?: string;",
        "  errorCode?: string;",
        "};",
        "",
        "export function mapCheckoutResult(response: ApiResponse): CheckoutResult {",
        "  if (!response.ok) return { status: 'failed', errorCode: response.code };",
        "  return { status: 'ok', orderId: response.data.orderId };",
        "}",
      ];
    }

    if (files.includes("src/api/checkout.ts")) {
      return [
        "export async function checkout(orderId: string, payload: CheckoutPayload) {",
        "  const response = await paymentClient.createOrder({ orderId, ...payload });",
        "  if (!response.ok) {",
        "    throw new CheckoutError(response.code ?? 'CHECKOUT_FAILED');",
        "  }",
        "  return mapCheckoutResult(response);",
        "}",
        "",
        "router.post('/checkout', async (req, res) => {",
        "  const result = await checkout(req.body.cartId, req.body);",
        "  return res.status(200).json(result);",
        "});",
      ];
    }

    return [
      "export async function createCheckout(cartId: string, payload: CheckoutPayload) {",
      "  const cart = await cartRepository.getById(cartId);",
      "  if (!cart) throw new Error('Cart not found');",
      "",
      "  const response = await paymentClient.authorize({",
      "    cartId,",
      "    amount: cart.total,",
      "    paymentMethod: payload.paymentMethod,",
      "  });",
      "",
      "  return mapCheckoutResult(response);",
      "}",
    ];
  }, [files]);

  return (
    <Window title="editor">
      <div className="border-b border-white/10 px-4 py-4">
        <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/30">files</div>
        <div className="flex flex-wrap gap-2">
          {files.map((file, i) => (
            <motion.div
              key={file}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: elapsed > i * 180 + 120 ? 1 : 0.28, y: elapsed > i * 180 + 120 ? 0 : -6 }}
              className={`rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/78 ${bg}`}
            >
              {file}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="px-5 py-5 font-mono text-[14px] leading-7 text-white/78 md:text-[15px]">
        {snippets.map((line, i) => (
          <motion.div
            key={`${sceneKey}-line-${i}`}
            initial={{ opacity: 0.18, y: 4 }}
            animate={{ opacity: elapsed > i * 85 ? 1 : 0.18, y: elapsed > i * 85 ? 0 : 4 }}
            className="grid grid-cols-[28px_1fr] gap-4 rounded-xl px-3 py-1 hover:bg-white/[0.03]"
          >
            <span className="pt-0.5 text-right text-white/22">{i + 1}</span>
            <span className="whitespace-pre-wrap break-words">{line}</span>
          </motion.div>
        ))}
      </div>
    </Window>
  );
}

function Badge({
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

function StageCard({
  label,
  icon: Icon,
  on,
  successColor = "emerald",
}: {
  label: string;
  icon: LucideIcon;
  on: boolean;
  successColor?: "emerald" | "cyan";
}) {
  const active =
    successColor === "cyan"
      ? "border-cyan-300/25 bg-cyan-300/12 text-cyan-100"
      : "border-emerald-400/25 bg-emerald-400/12 text-emerald-100";

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 10, scale: 0.98 }}
      animate={{ opacity: on ? 1 : 0.2, y: on ? 0 : 10, scale: on ? 1 : 0.98 }}
      className={`rounded-[26px] border p-6 ${on ? active : "border-white/10 bg-white/5 text-white/50"}`}
    >
      <Icon className="mb-4 h-6 w-6" />
      <div className="text-2xl font-semibold">{label}</div>
    </motion.div>
  );
}

function ThemePill({ theme }: { theme: "without" | "with" }) {
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

function DemoScene({ kind }: { kind: SceneKind }) {
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
              { at: 520, text: "> preflight: balanced, reviews=code+security" },
              { at: 920, text: "> compile gate: npm test && npm run build", tone: "muted" },
              { at: 1320, text: "> required reviews: passed", tone: "good" },
              { at: 1720, text: "> doc-impact gate: no changes required", tone: "good" },
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
                className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-medium text-white/82"
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
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
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

function DemoPanel() {
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
    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:p-6">
      <div className="mb-6 border-b border-white/10 pb-6">
        <div className="space-y-3">
          <ThemePill theme={activeScene.theme} />
          <div className="min-h-[132px] md:min-h-[120px]">
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

      <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ${gradient} p-5 transition-all duration-700 md:p-8`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,0.08),transparent_24%),linear-gradient(180deg,rgba(4,7,13,0.65)_0%,rgba(7,16,25,0.72)_60%,rgba(4,7,13,0.82)_100%)]" />
        <div className="relative z-10 min-h-[520px]">
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

export default function GardaLandingPage() {
  return (
    <div className="min-h-screen bg-[#04070d] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.08),transparent_24%),linear-gradient(180deg,#04070d_0%,#071019_50%,#04070d_100%)]" />
      <motion.div className="fixed -left-20 top-10 -z-10 h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl" animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="fixed right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-fuchsia-400/7 blur-3xl" animate={{ y: [0, 16, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="fixed bottom-0 left-1/3 -z-10 h-80 w-80 rounded-full bg-emerald-400/7 blur-3xl" animate={{ y: [0, -12, 0] }} transition={{ duration: 9, repeat: Infinity }} />

      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#04070d]/65 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-2.5">
              <ShieldCheck className="h-5 w-5 text-cyan-100" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-[0.2em]">GARDA</div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">orchestration for AI coding workflows</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/62 md:flex">
            <a href="#why" className="hover:text-white">Why</a>
            <a href="#demo" className="hover:text-white">Demo</a>
            <a href="#profiles" className="hover:text-white">Profiles</a>
            <a href="#workflow" className="hover:text-white">Workflow</a>
            <a href="#docs" className="hover:text-white">Docs</a>
            <a href="#start" className="hover:text-white">Start</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-14 pt-20 lg:px-10 lg:pt-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                AI coding agents need a workflow, not just a prompt.
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] text-white md:text-5xl lg:text-6xl">
                Ship AI-generated code with gates, not vibes.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
                Governed local agent orchestration for AI coding workflows. GARDA deploys canonical rules, mandatory quality gates, and token-usage optimization into any project without replacing your existing coding agent.
              </p>
              <div className="mt-10 grid gap-3 lg:grid-cols-3">
                {heroHighlights.map((point, index) => (
                  <div
                    key={point.title}
                    className="grid h-full gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white lg:min-h-[56px]">{point.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/62">{point.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#start"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.08)] transition hover:bg-cyan-300/15"
                >
                  Start with the real CLI
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  Open GitHub
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/44">
                Public package: `garda-agent-orchestrator`. Public commands: `garda`, `gao`, `garda-agent-orchestrator`.
              </p>
              <div className="mt-8 flex flex-wrap gap-2 text-sm text-white/62">
                <Badge icon={Workflow} text="8 providers" />
                <Badge icon={ShieldCheck} text="9 review types" />
                <Badge icon={CheckCircle2} text="Token economy" />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <div className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-200/72">Product Snapshot</div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    "Public package: garda-agent-orchestrator",
                    "Mandatory gates: preflight, compile, reviews, doc-impact, completion",
                    "Providers: Claude, Codex, Copilot, Gemini, Qwen, Windsurf, Junie, Antigravity",
                    "Outputs: review artifacts, gate summaries, task-event history",
                  ].map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/68">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Window title="first run">
                <div className="space-y-2 px-5 py-5 font-mono text-[14px] leading-6 text-white/82 md:text-[15px]">
                  <div>npm install -g garda-agent-orchestrator</div>
                  <div>garda setup</div>
                  <div># give AGENT_INIT_PROMPT.md to your coding agent</div>
                  <div># the agent completes garda agent-init</div>
                </div>
              </Window>

              <div className="rounded-[28px] border border-cyan-300/15 bg-cyan-300/[0.06] p-6 backdrop-blur-xl">
                <div className="text-sm font-semibold text-white">What this fixes</div>
                <p className="mt-3 leading-7 text-white/62">
                  The agent does not jump straight into edits and then declare success. GARDA makes task depth, reviews, and completion explicit before code is treated as done.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          <SectionTitle
            eyebrow="Demo"
            title="See the workflow in motion"
            body="Three scenes: what unguided output looks like, how GARDA forces the workflow, and what proof looks like when the task is actually done."
          />
          <div className="mt-12">
            <DemoPanel />
          </div>
        </section>

        <section id="why" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Why GARDA"
            title="The difference between fast AI output and controlled delivery"
            body="Agents can generate code quickly. Shipping still needs structure, review, and proof. GARDA makes those gates explicit and repeatable across providers."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {comparison.map((card) => (
              <div
                key={card.title}
                className={`rounded-[30px] border p-8 backdrop-blur-xl ${
                  card.tone === "without"
                    ? "border-rose-400/15 bg-rose-400/6"
                    : "border-emerald-400/15 bg-emerald-400/6"
                }`}
              >
                <div className={`mb-5 text-sm font-medium uppercase tracking-[0.28em] ${card.tone === "without" ? "text-rose-200" : "text-emerald-200"}`}>
                  {card.title}
                </div>
                <div className="space-y-4 text-white/78">
                  {card.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <div className={`mt-1 h-2.5 w-2.5 rounded-full ${card.tone === "without" ? "bg-rose-300" : "bg-emerald-300"}`} />
                      <p className="leading-7">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="profiles" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Profiles"
            title="Different tasks need different strictness"
            body="Profiles make AI execution practical. Small tasks stay lightweight. Risky changes go deeper."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {profiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <div key={profile.name} className={`rounded-[28px] border border-white/10 bg-gradient-to-b ${profile.accent} p-6 backdrop-blur-xl`}>
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

        <section id="workflow" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Workflow"
            title="One universal workflow for every agent"
            body="GARDA does not replace your coding agent. It gives every agent the same controlled path to done."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                  <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-3">
                    <Icon className="h-5 w-5 text-cyan-100" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 leading-7 text-white/62">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="docs" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Docs"
            title="Use the real docs from the project, not a marketing summary"
            body="The repository already has the important pieces: setup, CLI reference, architecture, workflow examples, and the agent init prompt."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {docCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-cyan-300/25 hover:bg-white/[0.06]"
              >
                <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
                  <TerminalSquare className="h-5 w-5 text-white/90" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 leading-7 text-white/62">{card.body}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-100/85">
                  {card.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="start" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Get Started"
            title="Use the actual onboarding flow from the repository"
            body="The canonical path is simple: install the package, run `garda setup`, then feed `AGENT_INIT_PROMPT.md` to the agent so it can complete the hard `garda agent-init` gate."
          />
          <div className="mt-14 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="grid gap-4">
              {startSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex items-start gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                      0{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-cyan-100" />
                        <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="mt-3 max-w-xl leading-7 text-white/62">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/72">First controlled run</div>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/50">
                    This is the real quick-start shape from the project docs, not a made-up marketing flow.
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-100">
                  Official flow
                </div>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#08121a]/85">
                <div className="border-b border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/32">terminal</div>
                <div className="space-y-2 px-5 py-5 font-mono text-[15px] text-white/80">
                  <div>npm install -g garda-agent-orchestrator</div>
                  <div>garda setup</div>
                  <div># give AGENT_INIT_PROMPT.md to your coding agent</div>
                  <div># the agent completes garda agent-init</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={AGENT_INIT_PROMPT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
                >
                  Open AGENT_INIT_PROMPT
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CLI_REFERENCE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  View CLI reference
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
          <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-emerald-400/8 p-10 backdrop-blur-2xl">
            <SectionTitle
              eyebrow="Ready"
              title="Open the real project, then run the real onboarding"
              body="The next step should not be another abstract demo. It should be the repository, the setup guide, and one correct first run."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
              >
                Open GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={USER_GUIDE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
              >
                Read setup guide
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
