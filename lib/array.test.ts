import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.167.0/testing/bdd.ts";
import { chunk, uniq } from "./array.ts";

describe(chunk.name, () => {
  it("should chunk correctly", () => {
    assertEquals(chunk([1, 2, 3, 4, 5, 6], 2), [[1, 2], [3, 4], [5, 6]]);
    assertEquals(chunk([1, 2, 3, 4, 5, 6], 3), [[1, 2, 3], [4, 5, 6]]);
    assertEquals(chunk([1, 2, 3, 4, 5, 6], 4), [[1, 2, 3, 4], [5, 6]]);
  });
});

describe(uniq.name, () => {
  it("should uniq correctly", () => {
    assertEquals([1, 2, 3, 4, 5, 6].reduce(uniq, [] as number[]), [
      1,
      2,
      3,
      4,
      5,
      6,
    ]);
    assertEquals([1, 2, 3, 3, 3, 3].reduce(uniq, [] as number[]), [1, 2, 3]);
    assertEquals([3, 2, 3, 2, 1, 1].reduce(uniq, [] as number[]), [3, 2, 1]);
  });
});
