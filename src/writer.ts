import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { toMarkdown } from "./markdown.js";
import type { HelpContractReport } from "./types.js";

export async function writeReport(report: HelpContractReport, outDir: string): Promise<void> {
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "help-contract.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(path.join(outDir, "help-contract.md"), toMarkdown(report), "utf8");
}
