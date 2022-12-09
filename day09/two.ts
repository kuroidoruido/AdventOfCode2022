import { moveRope, parse } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  return moveRope(parsed.moves, 10).length;
}
