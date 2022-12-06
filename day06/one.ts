import { findEndIndexForUniqueWindow, parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return findEndIndexForUniqueWindow(parsed.signal, 4) + 1;
}
