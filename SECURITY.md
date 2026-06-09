# Security

`help-contract audit` executes the explicit help command supplied by the user. It is not a sandbox. It writes local reports only.

## Reporting Issues

Please report security issues privately if you find:

- execution of commands other than the explicit command array
- unsafe shell string composition
- arbitrary file writes outside the output directory
