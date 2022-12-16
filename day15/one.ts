import { sumAll } from "../lib/math.ts";
import {
  createRow,
  markImpossiblePositionOnRow,
  parse,
  putThingsOnRow,
} from "./common.ts";

export function one(input: string, rowY: number) {
  const parsed = parse(input);
  const row = createRow(parsed.space, rowY);
  putThingsOnRow(row, parsed.sensors);
  markImpossiblePositionOnRow(row, parsed.sensors);

  return row.row
    .map((position): number => (position === "#" ? 1 : 0))
    .reduce(sumAll);
}
