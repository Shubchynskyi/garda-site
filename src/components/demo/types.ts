export type LineTone = "normal" | "good" | "bad" | "muted";

export type TerminalLine = {
  at: number;
  text: string;
  tone?: LineTone;
};
