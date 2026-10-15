import { describe, expect, it } from "vitest";
import { analyzeHelp } from "../src/analyze.js";

describe("analyzeHelp", () => {
  it("scores complete help text as agent-ready", () => {
    const report = analyzeHelp(
      ["demo", "--help"],
      `Usage: demo <command> [options]

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
`
    );

    expect(report.score).toBe(100);
    expect(report.findings).toHaveLength(0);
    expect(report.sections).toMatchObject({
      usage: true,
      commands: true,
      options: true,
      examples: true,
      exitCodes: true
    });
  });

  it("recognizes colorized section headings", () => {
    const report = analyzeHelp(
      ["demo", "--help"],
      `\u001B[1mUsage:\u001B[0m demo <command> [options]

\u001B[1mCommands:\u001B[0m
  scan <path>       Scan a project

\u001B[1mOptions:\u001B[0m
  --help            Show help

\u001B[1mExamples:\u001B[0m
  demo scan .

Exit codes:
  0 success
`
    );

    expect(report.score).toBe(100);
    expect(report.findings).toHaveLength(0);
  });

  it("reports missing examples and exit codes", () => {
    const report = analyzeHelp(
      ["thin", "--help"],
      `Usage: thin [options]

Options:
  --help Show help
`
    );

    expect(report.score).toBeLessThan(100);
    expect(report.findings).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        code: "missing-examples"
      })
    );
    expect(report.findings).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        code: "missing-exit-codes"
      })
    );
  });
});
