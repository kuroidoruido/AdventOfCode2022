import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

Deno.test("one", () => {
  // const url = new URL("./foo.js", "https://deno.land/");
  // assertEquals(url.href, "https://deno.land/foo.js");
  assertEquals(one(testInput1), 24000);
});

Deno.test("two", () => {
  assertEquals(two(testInput1), 45000);
});

const testInput1 = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;
