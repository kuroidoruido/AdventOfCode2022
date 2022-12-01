
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
            return todayDay;
        }
    }
})();

console.log('config', { day });

const process = Deno.run({
    cmd: [
        'deno',
        'test',
        '--allow-read', 
        './tests.spec.ts',
    ],
    cwd: `${Deno.env.get('PWD')}/day${day}`,
    stdout: 'piped',
    stderr: 'piped',
});

console.log(new TextDecoder().decode(await process.output()));
console.error(new TextDecoder().decode(await process.stderrOutput()));