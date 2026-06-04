import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
function collectSourceFiles(directory) {
  const entries = fs.readdirSync(path.join(root, directory), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(relativePath));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      files.push(relativePath);
    }
  }

  return files;
}

const files = [
  ...collectSourceFiles("src"),
  "index.html",
  "package.json",
  "netlify.toml",
  ".nvmrc",
];

const corpus = files
  .map((file) => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n");

const required = [
  "1.1.0",
  "DeepSeek",
  "GitHub Copilot",
  "Antigravity",
  "Node.js 22.13+",
  "Node.js 24 LTS",
  "garda next-step T-001",
  "garda preprompt",
  "garda ui",
  "garda html",
  "garda cleanup",
  "garda repair",
  "garda rollback",
  "AGENT_INIT_PROMPT.md",
  "Threat Model",
  "Supported Providers",
  "Provider Matrix",
  "same-user",
  "local Git",
];

const forbidden = [
  "force every task through",
  "how Garda forces the workflow",
  "Claude, Codex, Copilot, Cursor, Gemini and other",
  ["Supports", "10", "provider entries"].join(" "),
  ["garda next-step", `"T-${"001"}"`, "--target" + "-root", '"."'].join(" "),
];

const missing = required.filter((needle) => !corpus.includes(needle));
const presentForbidden = forbidden.filter((needle) => corpus.includes(needle));

if (missing.length > 0 || presentForbidden.length > 0) {
  if (missing.length > 0) {
    console.error(`Missing required content:\n${missing.map((item) => `- ${item}`).join("\n")}`);
  }
  if (presentForbidden.length > 0) {
    console.error(`Forbidden stale content:\n${presentForbidden.map((item) => `- ${item}`).join("\n")}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
