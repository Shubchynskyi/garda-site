import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const expectedVersion = "1.4.1";

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

const expectedSocialImage = "garda-og-preview-final-safe.jpg";

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
if (!readText("index.html").includes(expectedSocialImage)) {
  versionErrors.push(`index.html does not reference ${expectedSocialImage}`);
}
if (!fs.existsSync(path.join(root, "public", expectedSocialImage))) {
  versionErrors.push(`public/${expectedSocialImage} is missing`);
}

const requiredVisible = [
  "Version 1.4.1",
  "Guarded custom review lanes",
  "profile-owned dependency graphs",
  "authenticated `REUSE`, bounded `DELTA`, or conservative `FULL` review",
  "Authenticated REUSE, DELTA, and FULL modes",
  "garda review-catalog validate --target-root \".\"",
  "garda review-catalog migrate --target-root \".\"",
  "Existing workspaces remain compatible without migration",
  "findings receipts",
  "canonical-first SQLite projection",
  "compiled-only npm package",
  "canonical files remain authoritative",
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
  "Garda 1.4.0",
  "Version 1.4.0",
  "v1.4.0 release line",
  "Garda 1.3.0",
  "Version 1.3.0",
  "v1.3.0 release line",
  "Garda 1.2.0",
  "Version 1.2.0",
  "v1.2.0 release line",
  "SECURITY_REVIEW    approved",
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
