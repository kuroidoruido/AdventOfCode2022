import { newArray } from "../lib/array.ts";
import { isDefinedAndNotEmpty, isNotDefined, isNotEmpty } from "../lib/fp.ts";
import { isNumber } from "../lib/type.ts";

export interface ParsedInput {
  packets: [Packet, Packet][];
}

export type Packet = (number | Packet)[];

export function parse(input: string): ParsedInput {
  const lines = input.split("\n").filter(isDefinedAndNotEmpty);
  const packets: ParsedInput["packets"] = [];

  while (isNotEmpty(lines)) {
    const left = lines.shift()!;
    const right = lines.shift()!;
    packets.push([eval(left), eval(right)]);
  }

  const parsed: ParsedInput = { packets };
  return parsed;
}

export function isPairInRightOrder(
  left: Packet | number,
  right: Packet | number,
  log = -1
): "RIGHT" | "SAME" | "NOT_RIGHT" {
  if (log > 500) {
    throw new Error("YAOURT");
  }
  if (log > 0) {
    console.log(
      newArray(log, " ").join(""),
      "isPairInRightOrder(",
      JSON.stringify(left),
      `<${typeof left}>`,
      ",",
      JSON.stringify(right),
      `<${typeof right}>`,
      ")"
    );
  }
  if (isNotDefined(left) || isNotDefined(right)) {
    throw new Error("should not pass not defined values ");
  }

  if (isNumber(left) && isNumber(right)) {
    if (left < right) {
      return "RIGHT";
    } else if (left > right) {
      return "NOT_RIGHT";
    } else {
      return "SAME";
    }
  } else if (Array.isArray(left) && Array.isArray(right)) {
    let i = 0;
    while (i < left.length) {
      const leftI = left[i];
      const rightI = right[i];
      if (isNotDefined(rightI)) {
        // right ran out before left
        return "NOT_RIGHT";
      }
      if (isPairInRightOrder(leftI, rightI) === "NOT_RIGHT") {
        return "NOT_RIGHT";
      }
      i++;
    }
    if (left.length < right.length) {
      return "RIGHT";
    } else if (left.length === right.length) {
      return "SAME";
    } else {
      throw new Error("Impossible");
      // return 'NOT_RIGHT';
    }
    // if (right.length === 0 && left.length > 0) {
    //   return "NOT_RIGHT";
    // }
    // let res: "RIGHT" | "SAME" | "NOT_RIGHT" = "RIGHT";
    // for (let i = 0; i < left.length; i++) {
    //   res = isPairInRightOrder(left[i], right[i], log > 0 ? log + 1 : -1);
    //   if (res !== "SAME") {
    //     break;
    //   }
    //   if (i + 1 < left.length && i + 1 >= right.length) {
    //     return "NOT_RIGHT";
    //   }
    // }
    // return res;
  } else if (isNumber(left)) {
    return isPairInRightOrder([left], right, log > 0 ? log + 1 : -1);
  } else {
    return isPairInRightOrder(left, [right], log > 0 ? log + 1 : -1);
  }
}