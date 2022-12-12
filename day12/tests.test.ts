import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

Deno.test("one", () => {
  assertEquals(one(testInput1), 31);
});

Deno.test("two", () => {
  assertEquals(two(testInput1), 29);
});

const testInput1 = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;
