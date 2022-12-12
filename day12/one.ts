import { findShortestPath, parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return findShortestPath(parsed.graph, parsed.start, parsed.target).length - 1;
}
