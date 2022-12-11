import { moveRope, parse /*, printTrace*/ } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  const trace = moveRope(parsed.moves, 10);
  // printTrace(trace);
  return trace.length;
}
