import { parse } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  return parsed.pairs.filter(({ one, two }) => isOverlaping(one, two)).length;
}

function isOverlaping(
  range1: [number, number],
  range2: [number, number]
): boolean {
  return (
    (range1[0] <= range2[0] && range2[0] <= range1[1]) ||
    (range1[0] <= range2[1] && range2[1] <= range1[1]) ||
    (range2[0] <= range1[0] && range1[0] <= range2[1]) ||
    (range2[0] <= range1[1] && range1[1] <= range2[1])
  );
}
