import { chunk } from "../lib/array.ts";
import { isDefinedAndNotEmpty, isEmpty } from "../lib/fp.ts";

export interface ParsedInput {
  stacks: string[][];
  operations: Move[];
}

export function parse(input: string): ParsedInput {
  const lines = input.split("\n");

  const stacks: string[][] = [];
  while (isDefinedAndNotEmpty(lines[0])) {
    const line = lines.shift();
    const chunks = chunk(line!.split(""), 4);

    if (isEmpty(stacks)) {
      chunks.forEach(() => stacks.push([]));
    }

    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i][0] === "[") {
        stacks[i].unshift(chunks[i][1]);
      }
    }
  }

  // skipt empty line
  lines.shift();

  const operations: Move[] = [];
  while (isDefinedAndNotEmpty(lines[0])) {
    const line = lines.shift()!;
    const [, count, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/)!;
    operations.push({
      count: parseInt(count),
      from: parseInt(from),
      to: parseInt(to),
    });
  }

  const parsed: ParsedInput = { stacks, operations };
  return parsed;
}

interface Move {
  count: number;
  from: number;
  to: number;
}

export function extractTopOfStacks(parsed: ParsedInput) {
  return parsed.stacks.map((stack) => stack[stack.length - 1]);
}

