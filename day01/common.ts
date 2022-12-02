import { sumAll } from "../lib/math.ts";

export interface ParsedInput {
  elfs: {
    items: number[];
    total: number;
  }[];
}

export function parse(input: string): ParsedInput {
  const lines = input.split("\n");
  const parsed: ParsedInput = { elfs: [] };
  let currentElf: number[] = [];

  for (const line of lines) {
    if (line === "") {
      parsed.elfs.push({
        items: currentElf,
        total: currentElf.reduce(...sumAll()),
      });
      currentElf = [];
    } else {
      currentElf.push(Number.parseInt(line));
    }
  }

  return parsed;
}
