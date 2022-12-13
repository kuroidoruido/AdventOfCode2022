import { isDefined } from "../lib/fp.ts";
import { sumAll } from "../lib/math.ts";
import { isPairInRightOrder, parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return parsed.packets
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
      if (comp === "RIGHT") {
        return index + 1;
      } else {
        return undefined;
      }
    })
    .filter(isDefined)
    .reduce((_, __, i, arr) => {
      if (i === 0) {
        console.log("all", arr, arr.length);
      }
      return arr;
    }, [] as number[])
    .reduce(sumAll, 0);
}
