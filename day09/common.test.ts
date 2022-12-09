import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.167.0/testing/bdd.ts";
import { positionComparator } from "./common.ts";

describe(positionComparator.name, () => {
  it("should return 0 for equals value", () => {
    assertEquals(positionComparator([0, 0], [0, 0]), 0);
    assertEquals(positionComparator([-3, 2], [-3, 2]), 0);
  });
});
