import { one } from "./one.ts";
import { two } from "./two.ts";

const input1 = await Deno.readTextFile("./input1.txt");

console.log('one = ', one(input1))
console.log('two = ', two(input1))