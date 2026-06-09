<div align="center">

# Help Contract

**Audit CLI help text for agent-ready command contracts.**

[简体中文](README.zh-CN.md)

</div>

Agents often use a CLI the same way humans do: they run `--help` first. If help text omits examples, exit codes, or option semantics, agents guess.

`help-contract` treats CLI help as a contract. It runs a help command, checks whether the output contains the sections an agent needs, and writes JSON/Markdown reports.

No API keys. No model call. No source-code scanning.

## 30 Second Demo

```bash
npx github:maxi-maxima/help-contract demo
```

The demo writes:

```text
reports/demo/help-contract.json
reports/demo/help-contract.md
```

## Audit A CLI

```bash
npx github:maxi-maxima/help-contract audit -- my-cli --help
```

Custom output:

```bash
npx github:maxi-maxima/help-contract audit --out reports/help -- my-cli scan --help
```

## What It Checks

| Section | Why agents need it |
| --- | --- |
| Usage | The command shape and required positional arguments. |
| Commands | Available subcommands and their names. |
| Options | Flags, values, and switches. |
| Examples | Concrete invocations that reduce guessing. |
| Exit codes | How automation should interpret success and failure. |

## Scoring

Missing `usage` or `options` is an error-level issue. Missing `commands`, `examples`, or `exit codes` is warning-level.

The score is intentionally simple and explainable.

## What It Is Not

`help-contract` does not infer hidden behavior, parse source code, or prove the CLI works. It only checks the public help surface.

## Development

```bash
npm install
npm run check
node dist/cli.js demo --out reports/demo
npm pack --dry-run --ignore-scripts
```

## License

MIT
