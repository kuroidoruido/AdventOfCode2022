import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

Deno.test("one", () => {
  assertEquals(one(testInput1), 13);
});

Deno.test("two 1", () => {
  assertEquals(two(testInput1), 1);
});
Deno.test("two 2", () => {
  assertEquals(two(testInput2), 36);
});

const testInput1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20

`;
