import { sumAll } from "../lib/math.ts";
import { Command, parse, run } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  const cycles = run(parsed.commands);
  return computeSignalStrengh(cycles);
}

function computeSignalStrengh(cycles: number[]): number {
  return [20, 60, 100, 140, 180, 220]
    .map((cycle) => {
      if (cycles.length >= cycle) {
        return cycle * cycles[cycle - 1];
      } else {
        return 0;
      }
    })
    .reduce(sumAll);
}
