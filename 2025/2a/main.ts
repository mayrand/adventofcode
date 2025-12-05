function stripControlAndFormatPortable(s) {
    // Remove common “invisible” format chars (no \p needed)
    s = s.replace(/[\uFEFF\u200B-\u200D\u2060]/g, ""); // BOM, ZWSP, ZWNJ, ZWJ, WORD JOINER
    // Remove control chars except \n and \r
    s = s.replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "");
    return s;
}

function splitInHalf(str: string): string[] {
    const mid = Math.floor(str.length / 2);
    return [str.slice(0, mid), str.slice(mid)];
}

if (import.meta.main) {
    const content = await Deno.readTextFile("data.txt");
    const ranges = stripControlAndFormatPortable(content).split(",");
    let sum = 0;
    ranges.forEach((range: string) => {
        const extremes = range.split("-");
        if (
            extremes[0].length === extremes[1].length &&
            extremes[0].length % 2 > 0
        ) {
            return;
        }
        const start = Number.parseInt(extremes[0]);
        const end = Number.parseInt(extremes[1]);
        for (let i = start; i <= end; i++) {
            const num = i.toString();
            if (num.length % 2 > 0) {
                continue;
            }
            const nums = splitInHalf(num);
            if (nums[0] !== nums[1]) {
                continue;
            }
            sum += i;
        }
    });
    console.log(sum);
}
