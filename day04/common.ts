import { isDefinedAndNotEmpty } from "../lib/fp.ts";

export interface ParsedInput {
  pairs: { one: [number, number]; two: [number, number] }[];
}

export function parse(input: string): ParsedInput {
  const pairs = input
    .split("\n")
    .filter(isDefinedAndNotEmpty)
    .map((line) =>
      line.split(",").map((pair): [number, number] => {
        const [from, to] = pair.split("-").map((n) => parseInt(n));
        return [from, to];
      })
    )
    .map(([one, two]: [number, number][]) => ({ one, two }));
  const parsed: ParsedInput = { pairs };
  return parsed;
}
