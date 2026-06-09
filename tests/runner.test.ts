import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { writeDemo } from "../src/runner.js";

describe("writeDemo", () => {
  it("writes JSON and Markdown help reports", async () => {
    const out = await mkdtemp(path.join(os.tmpdir(), "help-contract-"));

    const report = await writeDemo(out);

    expect(report.score).toBe(100);
    await expect(readFile(path.join(out, "help-contract.json"), "utf8")).resolves.toContain("exitCodes");
    await expect(readFile(path.join(out, "help-contract.md"), "utf8")).resolves.toContain("Help Contract Report");
  });
});
