import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";

Deno.test("one", () => {
  assertEquals(one(testInput1), 95437);
});

Deno.test("two", () => {
  assertEquals(two(testInput1), 24933642);
});

const testInput1 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;
