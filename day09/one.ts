import { moveRope, parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return moveRope(parsed.moves, 2).length;
}
