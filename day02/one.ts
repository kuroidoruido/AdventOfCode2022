import { sumAll } from "../lib/math.ts";
import { parse, result, resultScore, shapeScore, Turn } from "./common.ts";

export function one(input: string) {
  const parsed = parse(input);
  return parsed.turns.map(turnToScore).reduce(sumAll());
}

function turnToScore(turn: Turn): number {
  return shapeScore(turn.me) + resultScore(result(turn.opponent, turn.me));
}
