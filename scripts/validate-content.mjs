import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const expectedVersion = "1.1.0";

function readText(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function readJson(file) {
  return JSON.parse(readText(file));
}

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

const sourceFiles = collectSourceFiles("src");
const visibleCorpus = sourceFiles.map(readText).join("\n");
const fullCorpus = [
  ...sourceFiles,
  "index.html",
  "package.json",
  "package-lock.json",
  "netlify.toml",
  ".nvmrc",
].map(readText).join("\n");

const packageJson = readJson("package.json");
const packageLock = readJson("package-lock.json");

const versionErrors = [];
if (packageJson.version !== expectedVersion) {
  versionErrors.push(`package.json version is ${packageJson.version}, expected ${expectedVersion}`);
}
if (packageLock.version !== expectedVersion) {
  versionErrors.push(`package-lock.json version is ${packageLock.version}, expected ${expectedVersion}`);
}
if (packageLock.packages?.[""]?.version !== expectedVersion) {
  versionErrors.push(`package-lock root package version is ${packageLock.packages?.[""]?.version}, expected ${expectedVersion}`);
}

const requiredVisible = [
  "Version 1.1.0",
  "Claude",
  "Codex",
  "Antigravity 2.0 / CLI",
  "many popular AI coding agent providers",
  "local provider surfaces",
  "fresh sub-agent reviewers",
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
  "Architecture",
  "Work Example",
  "full gate chain",
  "same-user",
  "local Git",
];

const forbidden = [
  "force every task through",
  "how Garda forces the workflow",
  "does not currently satisfy independent review delegation",
  "independent delegated reviews are not currently supported",
  "Claude, Codex, Copilot, Cursor, Gemini and other",
  ["Supports", "10", "provider entries"].join(" "),
  ["garda next-step", `"T-${"001"}"`, "--target" + "-root", '"."'].join(" "),
];

const missingVisible = requiredVisible.filter((needle) => !visibleCorpus.includes(needle));
const presentForbidden = forbidden.filter((needle) => fullCorpus.includes(needle));

if (versionErrors.length > 0 || missingVisible.length > 0 || presentForbidden.length > 0) {
  if (versionErrors.length > 0) {
    console.error(`Version drift:\n${versionErrors.map((item) => `- ${item}`).join("\n")}`);
  }
  if (missingVisible.length > 0) {
    console.error(`Missing visible content:\n${missingVisible.map((item) => `- ${item}`).join("\n")}`);
  }
  if (presentForbidden.length > 0) {
    console.error(`Forbidden stale content:\n${presentForbidden.map((item) => `- ${item}`).join("\n")}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
