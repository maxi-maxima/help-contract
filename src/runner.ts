import type { HelpContractReport } from "./types.js";
import { spawn } from "node:child_process";
import { analyzeHelp } from "./analyze.js";
import { writeReport } from "./writer.js";

export async function auditCommand(command: string[], outDir: string): Promise<HelpContractReport> {
  if (command.length === 0) {
    throw new Error("No command provided.");
  }
  const output = await captureHelp(command);
  const report = analyzeHelp(command, output);
  await writeReport(report, outDir);
  return report;
}

export async function writeDemo(outDir: string): Promise<HelpContractReport> {
  const output = `Usage: demo <command> [options]

Commands:
  scan <path>       Scan a project

Options:
  --out <dir>       Output directory
  --json            Print JSON

Examples:
  demo scan . --out reports

Exit codes:
  0 success
  1 findings
  2 CLI error
`;
  const report = analyzeHelp(["demo", "--help"], output);
  await writeReport(report, outDir);
  return report;
}

async function captureHelp(command: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command[0], command.slice(1), {
      shell: false,
      windowsHide: true
    });
    let output = "";
    child.stdout?.on("data", (chunk: Buffer) => {
      output += chunk.toString("utf8");
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      output += chunk.toString("utf8");
    });
    child.on("error", reject);
    child.on("close", () => resolve(output));
  });
}
