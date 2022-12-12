import { minAll } from "../lib/math.ts";
import { findShortestPath, parse } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  return (
    parsed.nodes
      .filter((n) => n.height === 1)
      .map((n) => n.id)
      .map((nodeId) => {
        try {
          return findShortestPath(parsed.graph, nodeId, parsed.target).length;
        } catch (_) {
          // the lib used throw an error if it cannot find a path between start and target
          return Number.POSITIVE_INFINITY;
        }
      })
      .reduce(minAll) - 1
  );
}
