import { isDefinedAndNotEmpty, isNotEmpty } from "../lib/fp.ts";

export interface ParsedInput {
  monkeys: Monkey[];
}

export interface Monkey {
  items: number[];
  operation: string;
  test: {
    divisibleBy: number;
    throwOnTrueToMonkey: number;
    throwOnFalseToMonkey: number;
  };
  inspectedItems: number;
}

export function parse(input: string): ParsedInput {
  const lines = input.split("\n").filter(isDefinedAndNotEmpty);
  const monkeys: Monkey[] = [];
  while (isNotEmpty(lines)) {
    const _monkeyLine = lines.shift()!; //       Monkey 0:
    const startingItemsLine = lines.shift()!; //  Starting items: 79, 98
    const operationLine = lines.shift()!; //      Operation: new = old * 19
    const testLine = lines.shift()!; //           Test: divisible by 23
    const testIfTrueLine = lines.shift()!; //       If true: throw to monkey 2
    const testIfFalseLine = lines.shift()!; //      If false: throw to monkey 3
    monkeys.push({
      items: startingItemsLine
        .split(":")[1]
        .split(",")
        .map((item) => item.trim())
        .map((item) => parseInt(item, 10)),
      operation: operationLine.split(" = ")[1],
      test: {
        divisibleBy: parseInt(
          testLine.substring(testLine.lastIndexOf(" ")),
          10
        ),
        throwOnTrueToMonkey: parseInt(
          testIfTrueLine.substring(testIfTrueLine.lastIndexOf(" ")),
          10
        ),
        throwOnFalseToMonkey: parseInt(
          testIfFalseLine.substring(testIfFalseLine.lastIndexOf(" ")),
          10
        ),
      },
      inspectedItems: 0,
    });
  }
  const parsed: ParsedInput = { monkeys };
  return parsed;
}

// deno-lint-ignore no-unused-vars old is mandatory for the eval
export function evalOperation(operation: string, old: number): number {
  return eval(operation);
}

export function playRound(
  monkeys: Monkey[],
  worryModification: (worry: number) => number = (w) => w
) {
  for (const monkey of monkeys) {
    while (isNotEmpty(monkey.items)) {
      const item = monkey.items.shift()!;
      monkey.inspectedItems++;
      const newItemWorry = worryModification(
        evalOperation(monkey.operation, item)
      );
      if (newItemWorry % monkey.test.divisibleBy === 0) {
        monkeys[monkey.test.throwOnTrueToMonkey].items.push(newItemWorry);
      } else {
        monkeys[monkey.test.throwOnFalseToMonkey].items.push(newItemWorry);
      }
    }
  }
}
