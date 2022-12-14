import { newArray } from "../lib/array.ts";
import { isDefinedAndNotEmpty, isNotDefined } from "../lib/fp.ts";
import { maxAll, minAll } from "../lib/math.ts";

export interface ParsedInput {
  paths: Path[];
  matrix: string[][];
  minX: number;
}

export type Coordinate = [number, number];
export type Path = Coordinate[];

export function parse(input: string): ParsedInput {
  const paths = input
    .split("\n")
    .filter(isDefinedAndNotEmpty)
    .map(
      (line): Path =>
        line
          .split(" -> ")
          .filter(isDefinedAndNotEmpty)
          .map((step): Coordinate => {
            const [x, y] = step.trim().split(",");
            return [parseInt(x, 10), parseInt(y, 10)];
          })
    );

  const allCoordinates = paths.flatMap((p) => p);
  const maxY = allCoordinates.map(([, y]) => y).reduce(maxAll) + 2;
  // const minX = allCoordinates.map(([x]) => x).reduce(minAll) - 1;
  // const maxX = allCoordinates.map(([x]) => x).reduce(maxAll);
  const minX = 500 - maxY - Math.floor(maxY * 0.1);
  const maxX = 500 + maxY + Math.floor(maxY * 0.1);

  const matrix = newArray(maxY + 1, () => newArray(maxX - minX + 1, () => "."));
  matrix[0][500 - minX] = "+";

  for (const path of paths) {
    for (let i = 0; i < path.length - 1; i++) {
      const expended = expendCoordinatePair(path[i], path[i + 1]);
      expended.forEach(([x, y]) => (matrix[y][x - minX] = "#"));
    }
  }

  const parsed: ParsedInput = { paths, matrix, minX };
  return parsed;
}

function expendCoordinatePair(
  [ax, ay]: Coordinate,
  [bx, by]: Coordinate
): Coordinate[] {
  const all: Coordinate[] = [];
  if (ax === bx) {
    if (ay < by) {
      for (let i = ay; i <= by; i++) {
        all.push([ax, i]);
      }
    } else if (ay > by) {
      for (let i = ay; i >= by; i--) {
        all.push([ax, i]);
      }
    } else {
      all.push([ay, by]);
    }
  } else if (ay === by) {
    if (ax < bx) {
      for (let i = ax; i <= bx; i++) {
        all.push([i, ay]);
      }
    } else if (ax > bx) {
      for (let i = ax; i >= bx; i--) {
        all.push([i, ay]);
      }
    } else {
      all.push([ax, by]);
    }
  } else {
    throw new Error(
      "Not handled " + JSON.stringify({ a: [ax, ay], b: [bx, by] })
    );
  }
  return all;
}

export function makeFallSand(
  matrix: string[][],
  minX: number,
  start: Coordinate
): { status: "REST" | "ABYSS"; sand: Coordinate } {
  let sandY = start[1];
  let sandX = start[0] - minX;
  while (true) {
    if (isNotDefined(matrix[sandY + 1])) {
      // console.log("ABYSS", [sandX, sandY]);
      return { status: "ABYSS", sand: [minX + sandX, sandY] };
    }
    if (matrix[sandY + 1][sandX] === ".") {
      sandY = sandY + 1;
    } else if (matrix[sandY + 1][sandX - 1] === ".") {
      sandY = sandY + 1;
      sandX = sandX - 1;
    } else if (matrix[sandY + 1][sandX + 1] === ".") {
      sandY = sandY + 1;
      sandX = sandX + 1;
    } else {
      // console.log("REST", [sandX, sandY]);
      matrix[sandY][sandX] = "o";
      return { status: "REST", sand: [minX + sandX, sandY] };
    }
  }
}
