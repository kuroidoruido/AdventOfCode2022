import { isDefinedAndNotEmpty } from "../lib/fp.ts";

export interface ParsedInput {
  rucksacks: Rucksack[];
}

export interface Rucksack {
  firstCompartment: string[];
  secondCompartment: string[];
}

export function parse(input: string): ParsedInput {
  const rucksacks = input.split("\n")
    .filter(isDefinedAndNotEmpty)
    .map(splitHalf)
    .map(([one, two]) => ({
      firstCompartment: one.split(""),
      secondCompartment: two.split(""),
    }));
  const parsed: ParsedInput = { rucksacks };
  return parsed;
}

function splitHalf(s: string): [string, string] {
  const slitIndex = s.length / 2;
  if (slitIndex % 1 !== 0) {
    throw new Error(`Cannot split half '${s}' (length: ${s.length})`);
  }
  const one = s.slice(0, slitIndex);
  const two = s.slice(slitIndex);
  return [one, two];
}

export function itemToPriority(item: string): number {
  const charCode = item.charCodeAt(0);
  if (item.toLowerCase() === item) {
    return charCode - 96;
  } else {
    return charCode - 64 + 26;
  }
}
