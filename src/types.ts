export type Severity = "error" | "warning" | "info";

export interface HelpFinding {
  severity: Severity;
  code: string;
  message: string;
}

export interface HelpContractReport {
  command: string[];
  score: number;
  sections: {
    usage: boolean;
    commands: boolean;
    options: boolean;
    examples: boolean;
    exitCodes: boolean;
  };
  findings: HelpFinding[];
  outputPreview: string;
}
