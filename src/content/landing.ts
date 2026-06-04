import {
  AlertTriangle,
  BookOpen,
  Shield,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ComparisonCard = {
  title: string;
  points: string[];
  tone: "without" | "with";
};

export type Profile = {
  name: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

export type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const comparison: ComparisonCard[] = [
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

export const profiles: Profile[] = [
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

export const workflowSteps: WorkflowStep[] = [
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

export const heroHighlights = [
  {
    title: "Govern many agents",
    body: "Use documented provider entrypoints and bridge profiles without letting each agent surface invent its own workflow.",
  },
  {
    title: "Follow next-step",
    body: "`garda next-step` shows the exact next command so agents stay inside the same task loop.",
  },
  {
    title: "Inspect the run",
    body: "`garda ui` opens a local dashboard, while `garda html` writes a static report you can share or archive.",
  },
];

export const startSteps: WorkflowStep[] = [
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

export const cliGroups = [
  { title: "Navigate", commands: ["garda next-step", "garda preprompt"] },
  { title: "Inspect", commands: ["garda status", "garda status why-blocked", "garda doctor", "garda doctor explain"] },
  { title: "Report", commands: ["garda html", "garda ui"] },
  { title: "Maintain", commands: ["garda cleanup", "garda repair", "garda rollback"] },
];
