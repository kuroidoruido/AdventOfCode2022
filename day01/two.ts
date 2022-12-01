import { numberSort, sortDesc } from "../lib/array.ts";
import { sumAll } from "../lib/math.ts";
import { parse } from "./common.ts";

export function two(input: string) {
    const parsed = parse(input);
    const allElfs = parsed.elfs.map(({ total}) => total);
    allElfs.sort(sortDesc(numberSort));
    return allElfs.slice(0, 3).reduce(...sumAll());
}

