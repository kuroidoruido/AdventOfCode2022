import { isDefined, isDefinedAndNotEmpty } from "../lib/fp.ts";
import dijkstra from "https://deno.land/x/dijkstra/mod.ts";

export interface ParsedInput {
  nodes: Node[];
  graph: Record<string, Record<string, number>>;
  matrix: string[][];
  start: string;
  target: string;
}

export interface Node {
  id: string;
  height: number;
  adjecents: Record<string, number>;
  start: boolean;
  target: boolean;
}

let NODE_ID = 0;

export function parse(input: string): ParsedInput {
  const nodeMatrix = input
    .split("\n")
    .filter(isDefinedAndNotEmpty)
    .map((line) =>
      line
        .split("")
        .filter(isDefinedAndNotEmpty)
        .map((h): Node => {
          const id = String(NODE_ID);
          NODE_ID++;
          const start = h === "S";
          const target = h === "E";
          if (start) {
            const height = "a".charCodeAt(0) - 96;
            return { id, height, adjecents: {}, start, target };
          } else if (target) {
            const height = "z".charCodeAt(0) - 96;
            return { id, height, adjecents: {}, start, target };
          } else {
            const height = h.charCodeAt(0) - 96;
            return { id, height, adjecents: {}, start, target };
          }
        })
    );

  for (let vi = 0; vi < nodeMatrix.length; vi++) {
    for (let hi = 0; hi < nodeMatrix[0].length; hi++) {
      const up = nodeMatrix[vi - 1]?.[hi];
      const right = nodeMatrix[vi][hi + 1];
      const down = nodeMatrix[vi + 1]?.[hi];
      const left = nodeMatrix[vi][hi - 1];
      const currentHeight = nodeMatrix[vi][hi].height;
      const reachableFromCurrent = (h: number) => h <= currentHeight + 1;
      if (isDefined(up) && reachableFromCurrent(up.height)) {
        nodeMatrix[vi][hi].adjecents[up.id] = 1;
      }
      if (isDefined(right) && reachableFromCurrent(right.height)) {
        nodeMatrix[vi][hi].adjecents[right.id] = 1;
      }
      if (isDefined(down) && reachableFromCurrent(down.height)) {
        nodeMatrix[vi][hi].adjecents[down.id] = 1;
      }
      if (isDefined(left) && reachableFromCurrent(left.height)) {
        nodeMatrix[vi][hi].adjecents[left.id] = 1;
      }
    }
  }

  const nodes = nodeMatrix.flatMap((nodes) => nodes);
  const graph = Object.fromEntries(nodes.map((n) => [n.id, n.adjecents]));
  const start = nodeMatrix.flatMap((nodes) => nodes.filter((n) => n.start))[0];
  const target = nodeMatrix.flatMap((nodes) =>
    nodes.filter((n) => n.target)
  )[0];
  const matrix = nodeMatrix.map((line) => line.map((n) => n.id));

  const parsed: ParsedInput = {
    nodes,
    graph,
    start: start.id,
    target: target.id,
    matrix,
  };
  return parsed;
}

export function findShortestPath(
  graph: Record<string, Record<string, number>>,
  start: string,
  target: string
) {
  return dijkstra.find_path(graph, start, target);
}
