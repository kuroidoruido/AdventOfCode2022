import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

Deno.test("one", () => {
  assertEquals(one(testInput1), 7);
  assertEquals(one(testInput2), 5);
  assertEquals(one(testInput3), 6);
  assertEquals(one(testInput4), 10);
  assertEquals(one(testInput5), 11);
});

Deno.test("two", () => {
  assertEquals(two(testInput1), 19);
  assertEquals(two(testInput2), 23);
  assertEquals(two(testInput3), 23);
  assertEquals(two(testInput4), 29);
  assertEquals(two(testInput5), 26);
});

const testInput1 = `mjqjpqmgbljsphdztnvjfqwrcgsmlb
`;
const testInput2 = `bvwbjplbgvbhsrlpgdmjqwftvncz
`;
const testInput3 = `nppdvjthqldpwncqszvftbrmjlhg
`;
const testInput4 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
`;
const testInput5 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`;
