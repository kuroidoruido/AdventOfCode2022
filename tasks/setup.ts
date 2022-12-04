import { getInputFile } from "./utils/get-input-file.ts";

const day = (() => {
  const [dayFromArgs] = Deno.args;
  if (dayFromArgs) {
    if (dayFromArgs.length === 1) {
      return `0${dayFromArgs}`;
    } else {
      return dayFromArgs;
    }
  } else {
    const now = new Date();
    const todayDay = now.getDate();
    if (todayDay < 10) {
      return `0${todayDay}`;
    } else {
      return String(todayDay);
    }
  }
})();

console.log("config", { day });

Deno.mkdirSync(`./day${day}`);
for (const file of Deno.readDirSync("./day-template")) {
  Deno.copyFileSync(`./day-template/${file.name}`, `./day${day}/${file.name}`);
}
const encoder = new TextEncoder();
Deno.writeFileSync(
  `./day${day}/input1.txt`,
  encoder.encode(await getInputFile(parseInt(day)))
);
