import { chunk, findCommonItems, uniq } from "../lib/array.ts";
import { sumAll } from "../lib/math.ts";
import { itemToPriority, parse, Rucksack } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  return chunk(parsed.rucksacks, 3)
    .map((group) => group.map(toItemList))
    .map(extractCommonItemInsideGroup)
    .map(itemToPriority)
    .reduce(sumAll);
}

function toItemList(rucksack: Rucksack): string[] {
  const allRucksackItems = [
    ...rucksack.firstCompartment,
    ...rucksack.secondCompartment,
  ];
  return allRucksackItems.reduce(uniq, [] as string[]);
}

function extractCommonItemInsideGroup(group: string[][]): string {
  const pending = [...group];
  let commonItems = pending.shift()!;
  while (pending.length > 0) {
    commonItems = findCommonItems(commonItems, pending.shift()!)
      .reduce(uniq, [] as string[]);
  }

  if (commonItems.length === 0) {
    throw new Error(
      `Cannot found common item between the two compartment ${
        JSON.stringify(group)
      }`,
    );
  } else if (commonItems.length > 1) {
    throw new Error(
      `Found more than one common item between the two compartment ${
        JSON.stringify(group)
      } => ${JSON.stringify(commonItems)}`,
    );
  }
  return commonItems[0];
}
