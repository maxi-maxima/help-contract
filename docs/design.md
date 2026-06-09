# Help Contract Design

## Problem

Agents often use CLI tools by reading `--help`. Many CLIs have help text written for humans who already know the tool, not for agents that need a stable command contract.

## Scope

`help-contract` runs or analyzes CLI help text and checks for usage, commands, options, examples, and exit codes. It writes JSON and Markdown reports.

It does not infer hidden CLI behavior or parse source code.

## Commands

- `audit -- <command> --help`: run a help command and report on the output.
- `demo`: analyze a built-in demo help text.

## Verification

The release gate is `npm run check`, demo generation, and `npm pack --dry-run --ignore-scripts`.
