import { makeFallSand, parse } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  addFloor(parsed.matrix);
  let unitOfSand = 0;
  while (true) {
    const lastUnitResult = makeFallSand(parsed.matrix, parsed.minX, [500, 0]);
    unitOfSand++;
    if (lastUnitResult.sand[0] === 500 && lastUnitResult.sand[1] === 0) {
      break;
    }
  }
  return unitOfSand;
}

function addFloor(matrix: string[][]) {
  for (let i = 0; i < matrix[0].length; i++) {
    matrix[matrix.length - 1][i] = "#";
  }
}
