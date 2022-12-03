import { isDefinedAndNotEmpty } from "../../lib/fp.ts";

export interface ParsedInput {
  lines: string[];
}

export function parse(input: string): ParsedInput {
  const lines = input.split("\n").filter(isDefinedAndNotEmpty);
  const parsed: ParsedInput = { lines };
  return parsed;
}
