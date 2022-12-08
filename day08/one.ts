import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  extractTreesToEdge,
  parse,
  ParsedInput,
} from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return countVisibles(parsed, 0);
}

function countVisibles(input: ParsedInput, distanceFromEdge: number): number {
  if (distanceFromEdge >= (input.size - 1) / 2) {
    if (
      isVisible(input, [distanceFromEdge, distanceFromEdge], DIRECTION_TOP) ||
      isVisible(input, [distanceFromEdge, distanceFromEdge], DIRECTION_RIGHT) ||
      isVisible(
        input,
        [distanceFromEdge, distanceFromEdge],
        DIRECTION_BOTTOM
      ) ||
      isVisible(input, [distanceFromEdge, distanceFromEdge], DIRECTION_LEFT)
    ) {
      return 1;
    } else {
      return 0;
    }
  }
  const allTreeCoordinatesInDistanceCircle = getDistanceCircleCoordinates(
    input.size,
    distanceFromEdge
  );
  return (
    allTreeCoordinatesInDistanceCircle.filter(
      (treeCoordinate) =>
        isVisible(input, treeCoordinate, DIRECTION_TOP) ||
        isVisible(input, treeCoordinate, DIRECTION_RIGHT) ||
        isVisible(input, treeCoordinate, DIRECTION_BOTTOM) ||
        isVisible(input, treeCoordinate, DIRECTION_LEFT)
    ).length + countVisibles(input, distanceFromEdge + 1)
  );
}

function isVisible(
  input: ParsedInput,
  position: [number, number],
  direction: readonly [number, number]
): boolean {
  const currentTree = input.trees[position[0]][position[1]];
  const extracted = extractTreesToEdge(input, position, direction);
  const visible = extracted.every((tree) => tree < currentTree);
  return visible;
}

function getDistanceCircleCoordinates(
  inputSize: number,
  distanceFromEdge: number
): [number, number][] {
  const coordinates: [number, number][] = [];
  const min = distanceFromEdge;
  const max = inputSize - distanceFromEdge;
  for (let i = min; i < max; i++) {
    coordinates.push([distanceFromEdge, i]);
    coordinates.push([inputSize - 1 - distanceFromEdge, i]);
  }
  for (let i = min + 1; i < max - 1; i++) {
    coordinates.push([i, distanceFromEdge]);
    coordinates.push([i, inputSize - 1 - distanceFromEdge]);
  }
  return coordinates;
}
