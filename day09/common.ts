import { newArray } from "../lib/array.ts";
import { isDefinedAndNotEmpty, isNotEmpty } from "../lib/fp.ts";
import { MySet } from "../lib/set.ts";

export interface ParsedInput {
  moves: Move[];
}

export interface Move {
  direction: "UP" | "RIGHT" | "DOWN" | "LEFT";
  length: number;
}

export function parse(input: string): ParsedInput {
  const moves = input
    .split("\n")
    .filter(isDefinedAndNotEmpty)
    .map((line): Move => {
      const [direction, length] = line.split(" ");

      return {
        direction: toDirection(direction),
        length: parseInt(length, 10),
      };
    });
  const parsed: ParsedInput = { moves };
  return parsed;
}

function toDirection(direction: string): Move["direction"] {
  switch (direction) {
    case "U":
      return "UP";
    case "R":
      return "RIGHT";
    case "D":
      return "DOWN";
    case "L":
      return "LEFT";
    default:
      throw new Error("Invalid direction " + direction);
  }
}

export function positionComparator(
  a: [number, number],
  b: [number, number]
): number {
  return a[0] - b[0] + (a[1] - b[1]) * 1_000;
}

export function moveKnot(
  knotPosition: [number, number],
  direction: Move["direction"]
): [number, number] {
  switch (direction) {
    case "UP":
      return [knotPosition[0] - 1, knotPosition[1]];
    case "RIGHT":
      return [knotPosition[0], knotPosition[1] + 1];
    case "DOWN":
      return [knotPosition[0] + 1, knotPosition[1]];
    case "LEFT":
      return [knotPosition[0], knotPosition[1] - 1];
  }
}

export function bringCloser(
  head: [number, number],
  tail: [number, number]
): [number, number] {
  if (positionComparator(head, tail) === 0) {
    return [tail[0], tail[1]];
  }
  const distanceVector = [head[0] - tail[0], head[1] - tail[1]];
  if (Math.abs(distanceVector[0]) < 2 && Math.abs(distanceVector[1]) < 2) {
    return [tail[0], tail[1]];
  } else if (tail[0] !== head[0] && tail[1] !== head[1]) {
    return [
      tail[0] + distanceVector[0] / Math.abs(distanceVector[0]),
      tail[1] + distanceVector[1] / Math.abs(distanceVector[1]),
    ];
  } else if (tail[0] === head[0]) {
    return [tail[0], tail[1] + distanceVector[1] / Math.abs(distanceVector[1])];
  } else if (tail[1] === head[1]) {
    return [tail[0] + distanceVector[0] / Math.abs(distanceVector[0]), tail[1]];
  } else {
    throw new Error(
      " /!\\ missing condition " +
        JSON.stringify({ tail, head, distanceVector })
    );
  }
}

export function moveRope(moves: Move[], knotCount: number): [number, number][] {
  const tailTrace: MySet<[number, number]> = new MySet(positionComparator);
  const pending = [...moves];
  const knots: [number, number][] = newArray(knotCount, [0, 0]);
  const tailIndex = knots.length - 1;
  tailTrace.push(knots[tailIndex]);

  while (isNotEmpty(pending)) {
    const move = pending.shift()!;
    for (let i = 0; i < move.length; i++) {
      knots[0] = moveKnot(knots[0], move.direction);
      for (let knotIndex = 1; knotIndex < knots.length; knotIndex++) {
        knots[knotIndex] = bringCloser(knots[knotIndex - 1], knots[knotIndex]);
      }
      tailTrace.push(knots[tailIndex]);
    }
  }
  return tailTrace.asArray();
}
