import { describe, expect, it } from "vitest";
import { toMarkdown } from "../src/markdown.js";
import type { HelpContractReport } from "../src/types.js";

describe("toMarkdown", () => {
  it("renders score, section table, and findings", () => {
    const markdown = toMarkdown({
      command: ["demo", "--help"],
      score: 80,
      sections: {
        usage: true,
        commands: true,
        options: true,
        examples: false,
        exitCodes: false
      },
      findings: [
        {
          severity: "warning",
          code: "missing-examples",
          message: "Help text does not include examples."
        }
      ],
      outputPreview: "Usage: demo [options]"
    } satisfies HelpContractReport);

    expect(markdown).toContain("# Help Contract Report");
    expect(markdown).toContain("demo --help");
    expect(markdown).toContain("missing-examples");
  });
});
