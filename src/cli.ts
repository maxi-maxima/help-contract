#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { auditCommand, writeDemo } from "./runner.js";
import type { HelpContractReport } from "./types.js";

const program = new Command();

program
  .name("help-contract")
  .description("Audit CLI help text for agent-ready command contracts.")
  .version("0.1.0");

program
  .command("audit")
  .description("Run a help command and write a contract report. Use -- before the command.")
  .option("--out <dir>", "output directory", "reports/help-contract")
  .allowUnknownOption(true)
  .argument("[command...]", "command and arguments")
  .action(async (command: string[], options: { out: string }) => {
    const normalized = command[0] === "--" ? command.slice(1) : command;
    const report = await auditCommand(normalized, options.out);
    printSummary(report);
    console.log(`Reports: ${options.out}`);
    process.exitCode = report.findings.some((finding) => finding.severity === "error") ? 1 : 0;
  });

program.command("demo").option("--out <dir>", "output directory", "reports/demo").action(async (options: { out: string }) => {
  const report = await writeDemo(options.out);
  printSummary(report);
  console.log(`Reports: ${options.out}`);
});

program.parse();

function printSummary(report: HelpContractReport): void {
  const status = report.score >= 90 ? pc.green("PASS") : report.score >= 60 ? pc.yellow("WARN") : pc.red("FAIL");
  console.log(`Help Contract ${status}`);
  console.log(`Command: ${report.command.join(" ")}`);
  console.log(`Score: ${report.score}/100`);
  console.log(`Findings: ${report.findings.length}`);
}
