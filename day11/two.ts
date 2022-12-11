import { newArray } from "../lib/array.ts";
import { maxAllN, multiplyAll } from "../lib/math.ts";
import { parse, playRound } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  const foo = parsed.monkeys.map((m) => m.test.divisibleBy).reduce(multiplyAll);
  newArray(10_000).forEach(() => playRound(parsed.monkeys, (w) => w % foo));
  return parsed.monkeys
    .map((m) => m.inspectedItems)
    .reduce(maxAllN(2), [])
    .reduce(multiplyAll);
}
