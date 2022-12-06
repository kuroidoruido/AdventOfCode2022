import { uniq } from "../lib/array.ts";
import { isDefinedAndNotEmpty } from "../lib/fp.ts";

export interface ParsedInput {
  signal: string[];
}

export function parse(input: string): ParsedInput {
  const lines = input.split("\n").filter(isDefinedAndNotEmpty);
  const parsed: ParsedInput = {
    signal: lines[0].split("").filter(isDefinedAndNotEmpty),
  };
  return parsed;
}

export function findEndIndexForUniqueWindow(
  signal: string[],
  windowSize: number
): number {
  let index = 0;
  const window: string[] = [];
  const pending: string[] = [...signal];
  while (pending.length > 0) {
    if (window.length < windowSize) {
      window.push(pending.shift()!);
      index++;
    } else {
      window.shift();
      window.push(pending.shift()!);
      if (window.reduce(uniq, [] as string[]).length === windowSize) {
        return index;
      }
      index++;
    }
  }
  return -1;
}
