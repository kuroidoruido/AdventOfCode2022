import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.167.0/testing/bdd.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

describe("one", () => {
  it("test input", () => {
    assertEquals(one(testInput1), undefined);
  });
});

describe("two", () => {
  it("test input", () => {
    assertEquals(two(testInput1), undefined);
  });
});

const testInput1 = `1
2
`;
