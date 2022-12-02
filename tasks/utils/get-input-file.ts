export function getInputFile(day: number): Promise<string> {
  const url = new URL(`/2022/day/${day}/input`, "https://adventofcode.com");
  return fetch(url, {
    headers: { Cookie: `session=${Deno.env.get("AOC_SESSION_ID")}` },
  }).then((res) => res.text());
}
