import { isNotEmpty } from "../lib/fp.ts";
import { extractTopOfStacks, parse, ParsedInput } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  const end = execute(parsed);
  return extractTopOfStacks(end).join("");
}

function execute(parsed: ParsedInput): ParsedInput {
  const stacks = JSON.parse(JSON.stringify(parsed.stacks));
  const pending = [...parsed.operations];

  while (isNotEmpty(pending)) {
    const operation = pending.shift()!;
    const remaingingMoves = operation.count;
    for (let i = remaingingMoves; i > 0; i--) {
      stacks[operation.to - 1].push(stacks[operation.from - 1].pop());
    }
  }

  return { stacks, operations: parsed.operations };
}
