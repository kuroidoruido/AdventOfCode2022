import { isDefined } from "../lib/fp.ts";
import { getDistance, getOutsideBorder, parse } from "./common.ts";

export function two(input: string, min: number, max: number) {
  const parsed = parse(input);
  for (const sensor of parsed.sensors) {
    const candidate = getOutsideBorder(sensor)
      .filter((c) => min <= c[0] && c[0] <= max && min <= c[1] && c[1] <= max)
      .find((c) =>
        parsed.sensors.every((s) => getDistance(s.position, c) > s.distance)
      );
    if (isDefined(candidate)) {
      return candidate[0] * 4_000_000 + candidate[1];
    }
  }
  return -1;
}
