function stripControlAndFormatPortable(s: string): string {
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

const allEqual = (arr: string[]): boolean =>
    arr.length === 0 || arr.every(v => v === arr[0]);


function splitBy(str: string, n: number): string[] {
    const out = [];
    for (let i = 0; i < str.length; i += n) {
        out.push(str.slice(i, i + n));
    }
    return out;
}

const allCharsSame = (s: string): boolean => {
    for (let i = 1; i < s.length; i++) {
        if (s[i] !== s[0]) return false;
    }
    return true;
};


export function extracted(content: string) {
    const ranges = stripControlAndFormatPortable(content).split(",");
    let sum = 0;
    ranges.forEach((range: string) => {
        const extremes = range.split("-");
        const start = Number.parseInt(extremes[0]);
        const end = Number.parseInt(extremes[1]);
        for (let i = start; i <= end; i++) {
            const num = i.toString();
            if(num.length<2)continue;
            if (num.length % 2 === 0) {
                const nums = splitInHalf(num);
                if (nums[0] === nums[1]) {
                    sum += i;
                    // console.log(i);
                    continue;
                }
                if (num.length > 2 && allEqual(splitBy(num, 2))) {
                    sum += i;
                    // console.log(i);
                    continue;
                }
            }
            if (num.length > 3 && num.length % 3 === 0 && allEqual(splitBy(num, 3))) {
                sum += i;
                // console.log(i);
                continue;
            }
            if (num.length > 5 && num.length % 5 === 0 && allEqual(splitBy(num, 5))) {
                sum += i;
                // console.log(i);
                continue;
            }
            if (num.length > 7 && num.length % 7 === 0 && allEqual(splitBy(num, 7))) {
                sum += i;
                // console.log(i);
                continue;
            }
            if (allCharsSame(num)) {
                // console.log(i);
                sum += i;
            }
        }
    });
    return sum;
}

if (import.meta.main) {
    const content = await Deno.readTextFile("data.txt");
    const sum = extracted(content);
    console.log(sum);
}
