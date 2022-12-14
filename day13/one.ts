import { isDefined } from "../lib/fp.ts";
import { sumAll } from "../lib/math.ts";
import { isPairInRightOrder, parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  const allRights = parsed.packets
    .map(([left, right], index) => {
      const comp = isPairInRightOrder(left, right);
      if (comp === "RIGHT" || comp === "SAME") {
        return index + 1;
      } else {
        return undefined;
      }
    })
    .filter(isDefined);
  return allRights.reduce(sumAll, 0);
}
