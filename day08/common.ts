import { isDefinedAndNotEmpty } from "../lib/fp.ts";

export interface ParsedInput {
  trees: number[][];
  size: number;
}

export function parse(input: string): ParsedInput {
  const trees = input
    .split("\n")
    .filter(isDefinedAndNotEmpty)
    .map((line) =>
      line
        .split("")
        .filter(isDefinedAndNotEmpty)
        .map((height) => parseInt(height, 10))
    );
  const parsed: ParsedInput = { trees, size: trees.length };
  return parsed;
}

export const DIRECTION_TOP = [-1, 0] as const;
export const DIRECTION_RIGHT = [0, 1] as const;
export const DIRECTION_BOTTOM = [1, 0] as const;
export const DIRECTION_LEFT = [0, -1] as const;

export function extractTreesToEdge(
  input: ParsedInput,
  position: [number, number],
  direction: readonly [number, number]
): number[] {
  const extracted: number[] = [];
  let currentCoordinate: [number, number] = [position[0], position[1]];

  while (
    0 < currentCoordinate[0] &&
    currentCoordinate[0] < input.size - 1 &&
    0 < currentCoordinate[1] &&
    currentCoordinate[1] < input.size - 1
  ) {
    currentCoordinate = [
      currentCoordinate[0] + direction[0],
      currentCoordinate[1] + direction[1],
    ];
    extracted.push(input.trees[currentCoordinate[0]][currentCoordinate[1]]);
  }

  return extracted;
}
