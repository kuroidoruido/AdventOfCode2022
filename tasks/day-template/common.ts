export interface ParsedInput {
  lines: string[];
}

export function parse(input: string): ParsedInput {
  const lines = input.split("\n");
  const parsed: ParsedInput = { lines };
  return parsed;
}
