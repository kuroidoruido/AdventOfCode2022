import { parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return parsed.pairs.filter(({ one, two }) => isOneContainingOther(one, two))
    .length;
}

function isOneContainingOther(
  range1: [number, number],
  range2: [number, number]
): boolean {
  return isContains(range1, range2) || isContains(range2, range1);
}

function isContains(
  container: [number, number],
  contains: [number, number]
): boolean {
  return container[0] <= contains[0] && contains[1] <= container[1];
}
