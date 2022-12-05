import { isNotEmpty } from "../lib/fp.ts";
import { extractTopOfStacks, parse, ParsedInput } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  const end = execute(parsed);
  return extractTopOfStacks(end).join("");
}

function execute(parsed: ParsedInput): ParsedInput {
  const stacks: string[][] = JSON.parse(JSON.stringify(parsed.stacks));
  const pending = [...parsed.operations];

  while (isNotEmpty(pending)) {
    const operation = pending.shift()!;
    stacks[operation.to - 1].push(
      ...stacks[operation.from - 1].splice(-operation.count)
    );
  }

  return { stacks, operations: parsed.operations };
}
