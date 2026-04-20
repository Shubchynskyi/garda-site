import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
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
    title: "Garda moves one task through the same gates every time",
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
    title: "Without Garda",
    tone: "without",
    points: [
      "The agent jumps straight into edits.",
      "Tests, reviews, and docs checks depend on discipline.",
      "Completion means whatever the agent claims is done.",
      "There is no shared audit trail for another human to inspect.",
    ],
  },
  {
    title: "With Garda",
    tone: "with",
    points: [
      "Every agent follows the same task workflow.",
      "Preflight classifies scope and risk before implementation.",
      "Compile, required reviews, doc-impact, and completion run in order.",
      "The task ends with review artifacts and tamper-evident history.",
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
    icon: BookOpen,
    accent: "from-fuchsia-400/20 to-fuchsia-400/5",
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    title: "Enter governed task mode",
    description: "Start from one controlled path instead of letting an agent improvise its own workflow.",
    icon: Workflow,
  },
  {
    title: "Preflight and classify",
    description: "Understand scope, risk, and likely review needs before implementation.",
    icon: AlertTriangle,
  },
  {
    title: "Run compile and reviews",
    description: "Compile, specialist reviews, and doc-impact happen in a defined order.",
    icon: Wrench,
  },
  {
    title: "Complete with proof",
    description: "Finish with completion checks, review artifacts, and task-event history.",
    icon: Shield,
  },
];

const GITHUB_URL = "https://github.com/Shubchynskyi/garda-agent-orchestrator";
const DOC_BRANCH = "master";
const repoFile = (path: string) => `${GITHUB_URL}/blob/${DOC_BRANCH}/${path}`;

const USER_GUIDE_URL = repoFile("HOW_TO.md");
const CLI_REFERENCE_URL = repoFile("docs/cli-reference.md");
const ARCHITECTURE_URL = repoFile("docs/architecture.md");
const WORK_EXAMPLE_URL = repoFile("docs/work-example.md");
const AGENT_INIT_PROMPT_URL = repoFile("AGENT_INIT_PROMPT.md");
const CHANGELOG_URL = repoFile("CHANGELOG.md");
const NPM_PACKAGE_URL = "https://www.npmjs.com/package/garda-agent-orchestrator";
const SOCKET_PACKAGE_URL = "https://socket.dev/npm/package/garda-agent-orchestrator";
const SOCKET_BADGE_URL = "https://socket.dev/api/badge/npm/package/garda-agent-orchestrator";
const INSTALL_COMMAND = "npm install -g garda-agent-orchestrator\ngarda setup";

const docCards = [
  {
    title: "User Guide",
    body: "Follow the setup and onboarding path for installing Garda and preparing a repository.",
    href: USER_GUIDE_URL,
    cta: "Open HOW_TO.md",
  },
  {
    title: "CLI Reference",
    body: "Review the public commands, flags, and lifecycle semantics for setup, agent-init, profiles, updates, and cleanup.",
    href: CLI_REFERENCE_URL,
    cta: "View command reference",
  },
  {
    title: "Architecture",
    body: "Read how Garda applies one workflow surface, bridge profiles, and enforced gates across providers.",
    href: ARCHITECTURE_URL,
    cta: "Read architecture",
  },
  {
    title: "Work Example",
    body: "See the full task lifecycle from TODO to DONE with profiles, reviews, and inspectable task-event history.",
    href: WORK_EXAMPLE_URL,
    cta: "Open workflow example",
  },
];

const heroHighlights = [
  {
    title: "Govern existing agents",
    body: "Use Claude, Codex, Copilot, Cursor, Gemini and others without letting each one invent its own workflow.",
  },
  {
    title: "Force quality gates",
    body: "Preflight, compile, required reviews, doc-impact, and completion run in a predictable order.",
  },
  {
    title: "Leave an audit trail",
    body: "Review artifacts, gate summaries, and task-event history make completion inspectable.",
  },
];

const startSteps: WorkflowStep[] = [
  {
    title: "Install Garda",
    description: "Use the published package name `garda-agent-orchestrator` to install the local governance CLI.",
    icon: TerminalSquare,
  },
  {
    title: "Run setup once",
    description: "Let `garda setup` collect init answers and materialize the managed workspace state before any task execution.",
    icon: ShieldCheck,
  },
  {
    title: "Hand the prompt to the agent",
    description: "`AGENT_INIT_PROMPT.md` is the onboarding handoff so the agent can initialize the managed workflow with `garda agent-init`.",
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
      ? "bg-emerald-400/[0.14]"
      : accent === "rose"
      ? "bg-rose-400/[0.14]"
      : "bg-cyan-400/[0.14]";

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
            className="grid grid-cols-[28px_1fr] gap-4 rounded-xl px-3 py-1 hover:bg-white/3"
          >
            <span className="pt-0.5 text-right text-white/22">{i + 1}</span>
            <span className="whitespace-pre-wrap wrap-break-word">{line}</span>
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

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  const hash = `#${id}`;
  if (window.location.hash !== hash) {
    window.history.replaceState(null, "", hash);
  }
}

function ScrollButton({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={() => scrollToSection(targetId)} className={className}>
      {children}
    </button>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          setCopied(false);
        }
      }}
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72 transition hover:bg-white/10"
    >
      {copied ? "Copied" : "Copy"}
    </button>
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

function InstallShortcut() {
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

export default function GardaLandingPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#04070d] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.08),transparent_24%),linear-gradient(180deg,#04070d_0%,#071019_50%,#04070d_100%)]" />
      <motion.div
        className="fixed -left-20 top-10 -z-10 h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-fuchsia-400/[0.07] blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 16, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-0 left-1/3 -z-10 h-80 w-80 rounded-full bg-emerald-400/[0.07] blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -12, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 9, repeat: Infinity }}
      />

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

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-14 pt-20 lg:px-10 lg:pt-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                AI coding agents need a workflow, not just a prompt.
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] text-white md:text-5xl lg:text-6xl">
                Make AI coding agents follow the same gates every time.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
                Garda is a local governance layer for Claude, Codex, Copilot, Cursor, Gemini and other AI coding agents. It works best in CLI mode, where it can force every task through task mode, preflight, compile checks, required reviews, doc-impact checks, and completion gates before the work is treated as done.
              </p>
              <div className="mt-10 grid gap-3 lg:grid-cols-3">
                {heroHighlights.map((point, index) => (
                  <div
                    key={point.title}
                    className="grid h-full gap-4 rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white lg:min-h-14">{point.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/62">{point.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.08)] transition hover:bg-cyan-300/15"
                >
                  View on GitHub
                  <ArrowRight className="h-4 w-4" />
                </a>
                <ScrollButton
                  targetId="start"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  Install with npm
                  <ChevronRight className="h-4 w-4" />
                </ScrollButton>
                <ScrollButton
                  targetId="demo"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-medium text-white/72 transition hover:border-white/20 hover:text-white"
                >
                  Watch demo
                </ScrollButton>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/44">
                Gates, not vibes. Package: `garda-agent-orchestrator`. Commands: `garda`, `gao`, `garda-agent-orchestrator`.
              </p>
              <div className="mt-8 flex flex-wrap gap-2 text-sm text-white/62">
                <Badge icon={Workflow} text="8 coding agents" />
                <Badge icon={ShieldCheck} text="Mandatory gates" />
                <Badge icon={CheckCircle2} text="Auditable completion" />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                <div className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-200/72">Governance Snapshot</div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    "Local governance layer for existing coding agents",
                    "Mandatory gates: preflight, compile, reviews, doc-impact, completion",
                    "Works with Claude, Codex, Copilot, Cursor, Gemini, Qwen, Windsurf, Junie, and Antigravity. Best in CLI mode.",
                    "Artifacts: review outputs, gate summaries, and task-event history",
                  ].map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/68">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Window title="first run">
                <div className="space-y-2 px-5 py-5 font-mono text-[14px] leading-6 text-white/82 md:text-[15px]">
                  {INSTALL_COMMAND.split("\n").map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                  <div># give AGENT_INIT_PROMPT.md to your coding agent</div>
                  <div># the agent completes garda agent-init</div>
                </div>
              </Window>

              <div className="rounded-[28px] border border-cyan-300/15 bg-cyan-300/6 p-6 backdrop-blur-xl">
                <div className="text-sm font-semibold text-white">Why this lands</div>
                <p className="mt-3 leading-7 text-white/62">
                  Garda does not replace your coding agent. It makes task entry, gates, reviews, and completion explicit before work can be treated as done.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          <SectionTitle
            eyebrow="Demo"
            title="See the workflow in motion"
            body="Three scenes show what unguided output looks like, how Garda forces the workflow, and what completion looks like once the artifacts exist."
          />
          <div className="mt-12">
            <DemoPanel />
          </div>
        </section>

        <section id="why" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Why Garda"
            title="What changes when the workflow is governed"
            body="Agents can generate code quickly. Shipping still needs structure, review, and proof. Garda makes those gates explicit and repeatable across providers."
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

        <section id="not-prompts" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Not just prompts"
            title="Garda is a runtime layer, not a prompt pack"
            body="Prompt files can suggest behavior. Garda enforces workflow structure with a local CLI, lifecycle state, mandatory gates, review artifacts, and auditable completion."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Runtime contract",
                body: "A Node and TypeScript CLI controls setup, task mode, profiles, updates, cleanup, and validation.",
                icon: TerminalSquare,
              },
              {
                title: "Mandatory gates",
                body: "Preflight, compile, reviews, doc-impact, and completion are part of the workflow, not optional habits.",
                icon: ShieldCheck,
              },
              {
                title: "Review artifacts",
                body: "Specialist reviews leave inspectable outputs before a task can be treated as complete.",
                icon: FileWarning,
              },
              {
                title: "Audit trail",
                body: "Task-event history records how work moved through the lifecycle.",
                icon: GitBranch,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                  <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-3">
                    <Icon className="h-5 w-5 text-cyan-100" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/62">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="positioning" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="rounded-[34px] border border-white/10 bg-linear-to-br from-cyan-400/10 via-white/3 to-emerald-400/8 p-10 backdrop-blur-2xl">
            <SectionTitle
              eyebrow="Positioning"
              title="Not another agent launcher"
              body="Most tools focus on starting more agents. Garda focuses on making agent work reviewable, repeatable, and harder to mark as done too early."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                "Use your existing coding agent.",
                "Force the same workflow across providers.",
                "Accept completion only when the gates pass.",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-black/20 p-6 text-lg font-medium leading-7 text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Workflow"
            title="One repeatable workflow for every provider"
            body="Garda does not replace your coding agent. It gives every provider the same governed path from task entry to auditable completion."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
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

        <section id="docs" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Docs"
            title="Go from demo to a real governed task"
            body="Read the setup guide, CLI reference, architecture notes, and workflow example directly from the repository."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {docCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl transition hover:border-cyan-300/25 hover:bg-white/6"
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

        <section id="start" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-10">
          <SectionTitle
            eyebrow="Get Started"
            title="Run your first governed agent workflow"
            body="Install Garda, run setup, then hand `AGENT_INIT_PROMPT.md` to your coding agent so it can initialize the managed workflow."
          />
          <div className="mt-14 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="grid gap-4">
              {startSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex items-start gap-4 rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
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

            <div className="rounded-[30px] border border-white/10 bg-white/4 p-8 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/72">First controlled run</div>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/50">
                    Install once, initialize the workspace, then let your agent enter the governed workflow.
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-100">
                  Local CLI
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#08121a]/85">
                <div className="border-b border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/32">terminal</div>
                <div className="space-y-2 px-5 py-5 font-mono text-[15px] text-white/80">
                  {INSTALL_COMMAND.split("\n").map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                  <div># give AGENT_INIT_PROMPT.md to your coding agent</div>
                  <div># the agent completes garda agent-init</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <CopyButton value={INSTALL_COMMAND} />
                <a
                  href={AGENT_INIT_PROMPT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
                >
                  Open AGENT_INIT_PROMPT
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CLI_REFERENCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  View CLI reference
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-10">
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/4 p-8 backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/72">Current release</div>
              <div className="mt-3 text-2xl font-semibold text-white">v1.0.0 public baseline</div>
              <p className="mt-3 leading-7 text-white/62">
                Runtime, gates, provider bridges, profiles, cleanup flows, and audit trail are available in the first public release line.
              </p>
              <a
                href={CHANGELOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
              >
                Open changelog
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-[30px] border border-emerald-400/15 bg-emerald-400/6 p-8 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-emerald-200/72">Security</div>
                  <div className="mt-3 text-2xl font-semibold text-white">Socket package report</div>
                  <p className="mt-3 max-w-xl leading-7 text-white/62">
                    Inspect the live Socket report for `garda-agent-orchestrator`. The published CLI uses Node.js 24+ as the support baseline, remains compatible with Node 20 and 22, is built from TypeScript source, and lists no runtime npm dependencies in `package.json`.
                  </p>
                </div>
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-100/80" />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={NPM_PACKAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  View on npm
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={SOCKET_PACKAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm font-medium text-emerald-50 transition hover:bg-emerald-300/15"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <img
                    src={SOCKET_BADGE_URL}
                    alt="Socket security badge for garda-agent-orchestrator"
                    loading="lazy"
                    className="h-5 w-auto"
                  />
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  "Runtime baseline: Node.js 24+ (compatible with 20 and 22)",
                  "Source and build: TypeScript",
                  "Runtime npm dependencies: none listed",
                ].map((item) => (
                  <div key={item} className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
          <div className="rounded-[34px] border border-white/10 bg-linear-to-br from-cyan-400/10 via-white/3 to-emerald-400/8 p-10 backdrop-blur-2xl">
            <SectionTitle
              eyebrow="Ready"
              title="Use your existing agent, but make the workflow governed"
              body="Start with the repository, the setup guide, and one correct first run. Garda handles the workflow discipline on top of the agent you already use."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15"
              >
                View on GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={USER_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
              >
                Read setup guide
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <InstallShortcut />
    </div>
  );
}
