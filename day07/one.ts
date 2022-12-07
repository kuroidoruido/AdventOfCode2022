import { sumAll } from "../lib/math.ts";
import { findDirectories, getSize, parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return findDirectories(parsed.fs, (dir) => getSize(dir) <= 100_000)
    .map((dir) => getSize(dir))
    .reduce(sumAll);
}
