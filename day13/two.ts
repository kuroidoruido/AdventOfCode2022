import { isPairInRightOrder, Packet, parse } from "./common.ts";

export function two(input: string) {
  const parsed = parse(input);
  const allPackets = parsed.packets.flatMap((pair) => pair);
  allPackets.push([[2]], [[6]]);
  allPackets.sort((a, b) => (isPairInRightOrder(a, b) === "RIGHT" ? -1 : 1));
  const indexOf2 = allPackets.findIndex(isDividerPacket(2));
  const indexOf6 = allPackets.findIndex(isDividerPacket(6));
  const decoder = (indexOf2 + 1) * (indexOf6 + 1);
  return decoder;
}

function isDividerPacket(n: number) {
  return (p: Packet) =>
    Array.isArray(p) &&
    p.length === 1 &&
    Array.isArray(p[0]) &&
    p[0].length === 1 &&
    p[0][0] === n;
}
