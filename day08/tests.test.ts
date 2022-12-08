import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

Deno.test("one", () => {
  assertEquals(one(testInput1), 21);
});

Deno.test("two", () => {
  assertEquals(two(testInput1), 8);
});

const testInput1 = `30373
25512
65332
33549
35390

`;
