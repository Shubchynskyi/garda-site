export const DEMO_SCENES = [
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

export type SceneKind = (typeof DEMO_SCENES)[number]["kind"];

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
