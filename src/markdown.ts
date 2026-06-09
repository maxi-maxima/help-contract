import type { HelpContractReport } from "./types.js";

export function toMarkdown(report: HelpContractReport): string {
  const lines = [
    "# Help Contract Report",
    "",
    `Command: \`${report.command.join(" ")}\``,
    "",
    `Score: **${report.score}/100**`,
    "",
    "## Sections",
    "",
    "| Section | Present |",
    "| --- | --- |"
  ];

  for (const [section, present] of Object.entries(report.sections)) {
    lines.push(`| ${section} | ${present ? "yes" : "no"} |`);
  }

  lines.push("");
  lines.push("## Findings");
  lines.push("");
  if (report.findings.length === 0) {
    lines.push("No findings.");
  } else {
    lines.push("| Severity | Code | Message |");
    lines.push("| --- | --- | --- |");
    for (const finding of report.findings) {
      lines.push(`| ${finding.severity} | \`${finding.code}\` | ${finding.message} |`);
    }
  }

  lines.push("");
  lines.push("## Output Preview");
  lines.push("");
  lines.push("```text");
  lines.push(report.outputPreview.trimEnd());
  lines.push("```");
  lines.push("");
  return lines.join("\n");
}
