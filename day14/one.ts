import { makeFallSand, parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  let unitOfSand = 0;
  while (
    makeFallSand(parsed.matrix, parsed.minX, [500, 0]).status !== "ABYSS"
  ) {
    unitOfSand++;
  }
  return unitOfSand;
}
