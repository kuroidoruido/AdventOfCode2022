import { newArray } from "../lib/array.ts";
import { isDefinedAndNotEmpty } from "../lib/fp.ts";
import { maxAll, minAll } from "../lib/math.ts";

export interface ParsedInput {
  sensors: Sensor[];
  space: Space;
}

export interface Sensor {
  position: Coordinate;
  closestBeacon: Coordinate;
  distance: number;
}

export type Coordinate = [number, number];

export interface Space {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export function parse(input: string): ParsedInput {
  const regExp =
    /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
  const sensors = input
    .split("\n")
    .filter(isDefinedAndNotEmpty)
    .map((line): Sensor => {
      const [, sx, sy, bx, by] = line.match(regExp)!;
      const position: Coordinate = [parseInt(sx, 10), parseInt(sy, 10)];
      const closestBeacon: Coordinate = [parseInt(bx, 10), parseInt(by, 10)];
      return {
        position,
        closestBeacon,
        distance: getDistance(position, closestBeacon),
      };
    });

  const allX = sensors.flatMap((s) => [s.position[0], s.closestBeacon[0]]);
  const allY = sensors.flatMap((s) => [s.position[1], s.closestBeacon[1]]);
  const space: Space = {
    minX: allX.reduce(minAll),
    minY: allY.reduce(minAll),
    maxX: allX.reduce(maxAll),
    maxY: allY.reduce(maxAll),
  };

  const parsed: ParsedInput = { sensors, space };
  return parsed;
}

export function getDistance(from: Coordinate, to: Coordinate): number {
  return Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);
}

export interface Row {
  y: number;
  row: string[];
  startX: number;
}

export function createRow(space: Space, y: number): Row {
  const positionDiffX = space.maxX - space.minX;
  const startX = space.minX - positionDiffX;
  const rowSize = positionDiffX * 3;
  return { startX, y, row: newArray(rowSize, () => ".") };
}

export function putThingsOnRow(row: Row, sensors: Sensor[]) {
  sensors.forEach((s) => {
    if (s.position[1] === row.y) {
      row.row[s.position[0] - row.startX] = "S";
    }
    if (s.closestBeacon[1] === row.y) {
      row.row[s.closestBeacon[0] - row.startX] = "B";
    }
  });
}

export function printRow(row: Row) {
  const zero = row.row.map(() => " ");
  zero[-row.startX] = "0";

  console.log(`startX=${row.startX}\t y=${row.y}`);
  console.log(zero.join(""));
  console.log(row.row.join(""));
}

export function markImpossiblePositionOnRow(row: Row, sensors: Sensor[]) {
  sensors.forEach((sensor) => {
    const distance = getDistance(sensor.position, sensor.closestBeacon);
    if (
      sensor.position[1] - distance <= row.y &&
      row.y <= sensor.position[1] + distance
    ) {
      // the zone arround the sensors where no beacon are detected is crossing by the row
      const sensorsX = sensor.position[0];
      for (let i = 0; i < distance; i++) {
        if (getDistance(sensor.position, [sensorsX + i, row.y]) <= distance) {
          if (row.row[sensorsX + i - row.startX] === ".") {
            row.row[sensorsX + i - row.startX] = "#";
          }
          if (row.row[sensorsX - i - row.startX] === ".") {
            row.row[sensorsX - i - row.startX] = "#";
          }
        }
      }
    }
  });
}

function getPointsOnLine(
  from: Coordinate,
  to: Coordinate,
  translation: Coordinate
): Coordinate[] {
  const points: Coordinate[] = [];
  let current: Coordinate = [...from];
  while (getDistance(current, to) > 0) {
    points.push(current);
    current = [current[0] + translation[0], current[1] + translation[1]];
  }
  points.push(to);
  return points;
}

export function getOutsideBorder({ position, distance }: Sensor): Coordinate[] {
  const top: Coordinate = [position[0], position[1] - distance - 1];
  const bottom: Coordinate = [position[0], position[1] + distance + 1];
  const right: Coordinate = [position[0] + distance + 1, position[1]];
  const left: Coordinate = [position[0] - distance - 1, position[1]];
  console.log({ top, right, bottom, left });
  return [
    ...getPointsOnLine(top, right, [1, 1]),
    ...getPointsOnLine(left, bottom, [1, 1]),
    ...getPointsOnLine(top, left, [-1, 1]),
    ...getPointsOnLine(right, bottom, [-1, 1]),
  ];
}
