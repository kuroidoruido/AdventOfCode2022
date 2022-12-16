import { one } from "./one.ts";
import { two } from "./two.ts";

const input1 = await Deno.readTextFile("./input1.txt");

console.log("one = ", one(input1, 2_000_000));
console.time("two");
console.log("two = ", two(input1, 0, 4_000_000));
console.timeEnd("two");
