import {
  ARCHITECTURE_URL,
  CLI_REFERENCE_URL,
  CONFIGURATION_URL,
  PROVIDER_MATRIX_URL,
  PROVIDERS_URL,
  RELEASE_READINESS_URL,
  THREAT_MODEL_URL,
  USER_GUIDE_URL,
  WORK_EXAMPLE_URL,
} from "./links";

export const docCards = [
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
  {
    title: "Configuration",
    body: "Understand workflow config, profiles, review policies, full-suite validation, and project memory settings.",
    href: CONFIGURATION_URL,
    cta: "Read configuration",
  },
  {
    title: "Supported Providers",
    body: "See provider entrypoints, bridge profiles, shared AGENTS.md providers, and current provider-specific limitations.",
    href: PROVIDERS_URL,
    cta: "Open provider list",
  },
  {
    title: "Provider Matrix",
    body: "Review the test-backed compatibility matrix for provider entrypoints, gates, and review delegation status.",
    href: PROVIDER_MATRIX_URL,
    cta: "Open provider matrix",
  },
  {
    title: "Threat Model",
    body: "Understand same-user limits, local governance boundaries, and recommended hardening.",
    href: THREAT_MODEL_URL,
    cta: "Read threat model",
  },
  {
    title: "Release Readiness",
    body: "Review release gates, runtime baseline expectations, and package verification evidence.",
    href: RELEASE_READINESS_URL,
    cta: "Open release readiness",
  },
];
