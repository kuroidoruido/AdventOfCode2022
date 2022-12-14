import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.167.0/testing/bdd.ts";
import { isPairInRightOrder } from "./common.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

describe("one", () => {
  it("test input", () => {
    assertEquals(one(testInput1), 13);
  });
});

describe("two", () => {
  it("test input", () => {
    assertEquals(two(testInput1), 140);
  });
});

const testInput1 = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`;

describe(isPairInRightOrder.name, () => {
  it("should [1,1,3,1,1] < [1,1,5,1,1]", () => {
    assertEquals(isPairInRightOrder([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]), "RIGHT");
  });
  it("should [[1],[2,3,4]] < [[1],4]", () => {
    assertEquals(isPairInRightOrder([[1], [2, 3, 4]], [[1], 4]), "RIGHT");
  });
  it("should [9] > [[8,7,6]]", () => {
    assertEquals(isPairInRightOrder([9], [[8, 7, 6]]), "NOT_RIGHT");
  });
  it("should [[4,4],4,4] < [[4,4],4,4,4]", () => {
    assertEquals(
      isPairInRightOrder([[4, 4], 4, 4], [[4, 4], 4, 4, 4]),
      "RIGHT"
    );
  });
  it("should [7,7,7,7] > [7,7,7]", () => {
    assertEquals(isPairInRightOrder([7, 7, 7, 7], [7, 7, 7]), "NOT_RIGHT");
  });
  it("should [] < [3]", () => {
    assertEquals(isPairInRightOrder([], [3]), "RIGHT");
  });
  it("should [[[]]] < [[]]", () => {
    assertEquals(isPairInRightOrder([[[]]], [[]]), "NOT_RIGHT");
  });
  it("should [[[],8],[9]] > [[8,[7],[],7,9],[1,[[1,8,6,1,9]],2,8,[]],[],[3,4,[0,[4]],5],[]]", () => {
    assertEquals(
      isPairInRightOrder(
        [[[], 8], [9]],
        [
          [8, [7], [], 7, 9],
          [1, [[1, 8, 6, 1, 9]], 2, 8, []],
          [],
          [3, 4, [0, [4]], 5],
          [],
        ]
      ),
      "RIGHT"
    );
  });
});
