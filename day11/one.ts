import { newArray } from "../lib/array.ts";
import { maxAllN, multiplyAll } from "../lib/math.ts";
import { parse, playRound } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  newArray(20).forEach(() =>
    playRound(parsed.monkeys, (w) => Math.floor(w / 3))
  );
  console.log(parsed.monkeys);
  return parsed.monkeys
    .map((m) => m.inspectedItems)
    .reduce(maxAllN(2), [])
    .reduce(multiplyAll);
}
