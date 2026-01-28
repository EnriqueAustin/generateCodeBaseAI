// This format is:
// - Deterministic
// - Easy for AI to reason about
// - Safe to regenerate constantly

// ---

// ## 🛠️ Tool: `generateCodeBase.js`

// This version:
// - Uses **Git** to respect `.gitignore`
// - Ignores `.txt` automatically
// - Sorts files for stable diffs
// - Works on macOS / Linux / Windows

// ### ✅ Drop this in your project root

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const OUTPUT_FILE = "codeBase.txt";
const ROOT = process.cwd();

// ADD EXTRA ROOTS HERE (relative to where you run the script)
const EXTRA_PATHS = ["../docker"];

/**
 * Get git-tracked files (respects .gitignore)
 */
function getGitFiles(baseDir)
{
  const output = execSync("git ls-files", {
    cwd: baseDir,
    encoding: "utf8",
  });

  return output
    .split("\n")
    .filter(Boolean)
    .filter(file => !file.endsWith(".txt"))
    .map(file => path.join(baseDir, file));
}

/**
 * Infer language from extension
 */
function langFromExt(ext)
{
  return ext.replace(".", "") || "";
}

let allFiles = [];

// main project
allFiles.push(...getGitFiles(ROOT));

// extra folders (e.g. docker/)
for (const extra of EXTRA_PATHS)
{
  const extraRoot = path.resolve(ROOT, extra);
  if (fs.existsSync(extraRoot))
  {
    allFiles.push(...getGitFiles(extraRoot));
  }
}

// normalize, dedupe, sort
const files = [...new Set(allFiles)]
  .map(file => path.relative(ROOT, file))
  .sort();
  
let snapshot = "";

// Header
snapshot += `PROJECT SNAPSHOT\n`;
snapshot += `Generated: ${new Date().toISOString()}\n`;
snapshot += `Files: ${files.length}\n\n`;

for (const file of files)
{
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) continue;

  const ext = path.extname(file);
  const lang = langFromExt(ext);
  const content = fs.readFileSync(abs, "utf8");

  snapshot += `===== FILE: ${file} =====\n`;
  snapshot += `\`\`\`${lang}\n`;
  snapshot += content.trimEnd() + "\n";
  snapshot += `\`\`\`\n\n`;
}

fs.writeFileSync(OUTPUT_FILE, snapshot);
console.log(`✅ codeBase.txt regenerated (${files.length} files)`);