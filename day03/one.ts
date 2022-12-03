import { findCommonItems, uniq } from "../lib/array.ts";
import { sumAll } from "../lib/math.ts";
import { itemToPriority, parse, Rucksack } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return parsed.rucksacks
    .map(extractCommonItemBetweenCompartments)
    .map(itemToPriority)
    .reduce(sumAll);
}

function extractCommonItemBetweenCompartments(rucksack: Rucksack): string {
  const commonItem = findCommonItems(
    rucksack.firstCompartment,
    rucksack.secondCompartment,
  ).reduce(uniq, [] as string[]);
  if (commonItem.length === 0) {
    throw new Error(
      `Cannot found common item between the two compartment ${
        JSON.stringify(rucksack)
      }`,
    );
  } else if (commonItem.length > 1) {
    throw new Error(
      `Found more than one common item between the two compartment ${
        JSON.stringify(rucksack)
      } => ${JSON.stringify(commonItem)}`,
    );
  }
  return commonItem[0];
}
