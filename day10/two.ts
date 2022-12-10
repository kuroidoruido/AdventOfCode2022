import { chunk } from "../lib/array.ts";
import { parse, run } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  const cycles = run(parsed.commands);
  return drawCrt(cycles);
}

const CRT_ROWS = 40;
const CRT_COLUMNS = 6;
const CRT_PIXEL_COUNT = CRT_COLUMNS * CRT_ROWS;

function drawCrt(cycles: number[]): string[] {
  const crt: string[] = [];

  for (let i = 0; i < CRT_PIXEL_COUNT; i++) {
    const row = Math.floor(i / CRT_ROWS);
    const sprite = [
      row * CRT_ROWS + cycles[i] - 1,
      row * CRT_ROWS + cycles[i],
      row * CRT_ROWS + cycles[i] + 1,
    ];
    if (sprite.includes(i)) {
      crt.push("#");
    } else {
      crt.push(".");
    }
  }

  return chunk(crt, CRT_ROWS).map((c) => c.join(""));
}
