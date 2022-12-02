import { parse } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return parsed.elfs.reduce((max, current) => {
    if (max > current.total) {
      return max;
    } else {
      return current.total;
    }
  }, -1);
}
