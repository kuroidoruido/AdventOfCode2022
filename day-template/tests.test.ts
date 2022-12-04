import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

Deno.test("one", () => {
  assertEquals(one(testInput1), undefined);
});

Deno.test("two", () => {
  assertEquals(two(testInput1), undefined);
});

const testInput1 = `1
2
`;
