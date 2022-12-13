import { isDefined } from "../lib/fp.ts";
import { sumAll } from "../lib/math.ts";
import { isPairInRightOrder, parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  const allRights = parsed.packets
    .map(([left, right], index) => {
      console.log(
        index + 1,
        " =>",
        JSON.stringify(left),
        "   ",
        JSON.stringify(right)
        // " => ",
        // comp
      );
      const comp = isPairInRightOrder(left, right, 1);
      console.log(" => ", comp);
      if (comp === "RIGHT" || comp === "SAME") {
        return index + 1;
      } else {
        return undefined;
      }
    })
    .filter(isDefined);
  console.log("all", allRights, allRights.length);
  return allRights.reduce(sumAll, 0);
}
