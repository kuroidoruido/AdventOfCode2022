import { maxAll } from "../lib/math.ts";
import { parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return parsed.elfs.map(({ total }) => total).reduce(maxAll);
}
