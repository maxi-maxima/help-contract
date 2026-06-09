# Contributing

Thanks for improving Help Contract.

## Local Setup

```bash
npm install
npm run check
```

## Development Rules

- Keep checks deterministic.
- Do not add model calls.
- Prefer explainable section checks over opaque scoring.
- Add tests for help text variants.

## Pull Requests

Please include:

- the help pattern being changed
- sample help text
- verification output from `npm run check`
