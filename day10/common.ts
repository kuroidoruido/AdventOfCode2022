import { isDefinedAndNotEmpty } from "../lib/fp.ts";

export interface ParsedInput {
  commands: Command[];
}

export type NoopCommand = { type: "noop" };
export type AddxCommand = { type: "addx"; add: number };
export type Command = NoopCommand | AddxCommand;

export function parse(input: string): ParsedInput {
  const commands = input
    .split("\n")
    .filter(isDefinedAndNotEmpty)
    .map((line): Command => {
      const [cmd, arg] = line.split(" ");
      if (cmd === "noop") {
        return { type: "noop" };
      } else if (cmd === "addx") {
        const add = parseInt(arg, 10);
        return { type: "addx", add };
      } else {
        throw new Error("Unrecognized command " + line);
      }
    });
  const parsed: ParsedInput = { commands };
  return parsed;
}

export function run(commands: Command[]): number[] {
  const cycles = [1];
  for (const cmd of commands) {
    switch (cmd.type) {
      case "noop":
        cycles.push(cycles[cycles.length - 1]);
        break;
      case "addx":
        cycles.push(cycles[cycles.length - 1]);
        cycles.push(cycles[cycles.length - 1] + cmd.add);
    }
  }
  return cycles;
}
