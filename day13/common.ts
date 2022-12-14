import { newArray } from "../lib/array.ts";
import { isDefinedAndNotEmpty, isEmpty, isNotEmpty } from "../lib/fp.ts";
import { isNumber } from "../lib/type.ts";

export interface ParsedInput {
  packets: [Packet, Packet][];
}

export type Packet = (number | Packet)[] | number;

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
  left: Packet,
  right: Packet,
  log = -1
): "RIGHT" | "SAME" | "NOT_RIGHT" {
  stackLog(
    log,
    `isPairInRightOrder(<${typeof left}>${JSON.stringify(
      left
    )}, <${typeof right}>${JSON.stringify(right)})`
  );
  const res = (() => {
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
      while (true) {
        if (i < left.length && i >= right.length) {
          return "NOT_RIGHT";
        }
        if (i === left.length) {
          if (i === right.length) {
            return "SAME";
          }
          return "RIGHT";
        }
        const res = isPairInRightOrder(
          left[i],
          right[i],
          log > 0 ? log + 1 : log
        );
        if (res === "NOT_RIGHT") {
          return "NOT_RIGHT";
        } else if (res === "RIGHT") {
          return "RIGHT";
        }
        i++;
      }
    } else if (isNumber(left) && Array.isArray(right)) {
      return isPairInRightOrder([left], right, log > 0 ? log + 1 : log);
    } else if (Array.isArray(left) && isNumber(right)) {
      return isPairInRightOrder(left, [right], log > 0 ? log + 1 : log);
    } else {
      throw new Error("Oops");
    }
  })();
  stackLog(log, "=> ", res);
  return res;
}

function stackLog(indent: number, ...args: Parameters<typeof console.log>) {
  if (indent > 0) {
    console.log(newArray(indent, () => "  ").join(""), ...args);
  }
}
