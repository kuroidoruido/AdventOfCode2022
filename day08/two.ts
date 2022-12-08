import { takeUntil } from "../lib/array.ts";
import { maxAll, multiplyAll } from "../lib/math.ts";
import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  extractTreesToEdge,
  parse,
  ParsedInput,
} from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  return getAllCoordinates(parsed.size).map(scenicScore(parsed)).reduce(maxAll);
}

function getAllCoordinates(size: number): [number, number][] {
  const coordinates: [number, number][] = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      coordinates.push([i, j]);
    }
  }
  return coordinates;
}

function scenicScore(input: ParsedInput) {
  return (treeCoordinate: [number, number]): number => {
    const currentTreeHeight = input.trees[treeCoordinate[0]][treeCoordinate[1]];
    const isTaller = (_: unknown, current: number) =>
      current >= currentTreeHeight;
    return [
      extractTreesToEdge(input, treeCoordinate, DIRECTION_TOP),
      extractTreesToEdge(input, treeCoordinate, DIRECTION_RIGHT),
      extractTreesToEdge(input, treeCoordinate, DIRECTION_BOTTOM),
      extractTreesToEdge(input, treeCoordinate, DIRECTION_LEFT),
    ]
      .map((visibles) => visibles.reduce(takeUntil(isTaller), []).length)
      .reduce(multiplyAll);
  };
}
