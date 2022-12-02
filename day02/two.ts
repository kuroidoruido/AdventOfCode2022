import { sumAll } from "../lib/math.ts";
import {
  deduceMyShape,
  parse,
  resultScore,
  shapeScore,
  Turn,
} from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  return parsed.turns.map(turnToScore).reduce(sumAll());
}

function turnToScore(turn: Turn): number {
  return shapeScore(deduceMyShape(turn.opponent, turn.result)) +
    resultScore(turn.result);
}
