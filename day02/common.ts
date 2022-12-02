import { isDefinedAndNotEmpty } from "../lib/fp.ts";

export interface ParsedInput {
  turns: Turn[];
}

export interface Turn {
  opponent: Shape;
  me: Shape;
  result: Result;
}

export type Shape = "Rock" | "Paper" | "Scissor";
export type Result = "Lost" | "Draw" | "Won";

function toShape(input: string): Shape {
  switch (input) {
    case "A":
    case "X":
      return "Rock";
    case "B":
    case "Y":
      return "Paper";
    case "C":
    case "Z":
      return "Scissor";
    default:
      throw new Error(`unknown input '${input}'`);
  }
}
function toResult(input: string): Result {
  switch (input) {
    case "X":
      return "Lost";
    case "Y":
      return "Draw";
    case "Z":
      return "Won";
    default:
      throw new Error(`unknown input '${input}'`);
  }
}

export function parse(input: string): ParsedInput {
  const lines = input.split("\n");
  const parsed: ParsedInput = {
    turns: lines.filter(isDefinedAndNotEmpty).map((l) => {
      const [opponent, meOrResult] = l.split(" ");
      return {
        opponent: toShape(opponent),
        me: toShape(meOrResult),
        result: toResult(meOrResult),
      };
    }),
  };
  return parsed;
}

export function shapeScore(shape: Shape) {
  switch (shape) {
    case "Rock":
      return 1;
    case "Paper":
      return 2;
    case "Scissor":
      return 3;
  }
}

export function result(opponent: Shape, me: Shape): Result {
  if (opponent === me) {
    return "Draw";
  } else if (
    opponent === "Scissor" && me === "Rock" ||
    opponent === "Paper" && me === "Scissor" ||
    opponent === "Rock" && me === "Paper"
  ) {
    return "Won";
  } else {
    return "Lost";
  }
}

export function resultScore(result: Result) {
  switch (result) {
    case "Lost":
      return 0;
    case "Draw":
      return 3;
    case "Won":
      return 6;
  }
}

export function deduceMyShape(opponent: Shape, result: Result): Shape {
  if (result === "Draw") {
    return opponent;
  }
  if (opponent === "Paper") {
    if (result === "Won") {
      return "Scissor";
    } else {
      return "Rock";
    }
  } else if (opponent === "Rock") {
    if (result === "Won") {
      return "Paper";
    } else {
      return "Scissor";
    }
  } else { // Scissor
    if (result === "Won") {
      return "Rock";
    } else {
      return "Paper";
    }
  }
}
