import type { HelpContractReport } from "./types.js";

export function analyzeHelp(command: string[], output: string): HelpContractReport {
  const sections = {
    usage: hasSection(output, ["usage", "用法"]),
    commands: hasSection(output, ["commands", "command", "subcommands", "命令"]),
    options: hasSection(output, ["options", "flags", "arguments", "选项", "参数"]),
    examples: hasSection(output, ["examples", "example", "示例"]),
    exitCodes: /exit\s+codes?|退出码|exit status|return codes?/i.test(output)
  };

  const findings = [];
  if (!sections.usage) {
    findings.push({
      severity: "error" as const,
      code: "missing-usage",
      message: "Help text does not include a usage section."
    });
  }
  if (!sections.options) {
    findings.push({
      severity: "error" as const,
      code: "missing-options",
      message: "Help text does not describe options or arguments."
    });
  }
  if (!sections.commands) {
    findings.push({
      severity: "warning" as const,
      code: "missing-commands",
      message: "Help text does not list commands or subcommands."
    });
  }
  if (!sections.examples) {
    findings.push({
      severity: "warning" as const,
      code: "missing-examples",
      message: "Help text does not include examples."
    });
  }
  if (!sections.exitCodes) {
    findings.push({
      severity: "warning" as const,
      code: "missing-exit-codes",
      message: "Help text does not document exit codes."
    });
  }

  const score = Math.max(
    0,
    100 -
      findings.reduce((sum, finding) => {
        return sum + (finding.severity === "error" ? 25 : 15);
      }, 0)
  );

  return {
    command,
    score,
    sections,
    findings,
    outputPreview: output.split(/\r?\n/).slice(0, 40).join("\n")
  };
}

function hasSection(output: string, names: string[]): boolean {
  const lines = output.split(/\r?\n/);
  return lines.some((line) => {
    const normalized = line.trim().toLowerCase();
    return names.some((name) => normalized === `${name}:` || normalized.startsWith(`${name}:`) || normalized === name);
  });
}
