import { minAll } from "../lib/math.ts";
import { findDirectories, getSize, parse } from "./common.ts";

const TOTAL_AVAILABLE_SPACE = 70_000_000;
const NEEDED_SPACE = 30_000_000;

export function two(input: string) {
  const parsed = parse(input);
  const remainingSpace = TOTAL_AVAILABLE_SPACE - getSize(parsed.fs);
  const missingSpace = NEEDED_SPACE - remainingSpace;
  return findDirectories(parsed.fs, (dir) => getSize(dir) >= missingSpace)
    .map((dir) => getSize(dir))
    .reduce(minAll);
}
