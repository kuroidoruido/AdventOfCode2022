import { findEndIndexForUniqueWindow, parse } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  return findEndIndexForUniqueWindow(parsed.signal, 14) + 1;
}
