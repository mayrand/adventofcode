function stripControlAndFormatPortable(s: string): string {
  // Remove common “invisible” format chars (no \p needed)
  s = s.replace(/[\uFEFF\u200B-\u200D\u2060]/g, ""); // BOM, ZWSP, ZWNJ, ZWJ, WORD JOINER
  // Remove control chars except \n and \r
  s = s.replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "");
  return s;
}

if (import.meta.main) {
  const content = await Deno.readTextFile("data.txt");
  const lines = stripControlAndFormatPortable(content).split(/\r?\n/);
  let result = 0;
  for (const line of lines) {
    result += getMaxJoltage(line);
  }
  console.log(result);
}

export function getMaxJoltage(bank: string): number {
  let first = 0;
  let second = 0;
  for (let i = 0; i < bank.length; i++) {
    const num = Number.parseInt(bank[i]);
    if (first < num && i < bank.length - 1) {
      first = num;
      second = 0;
    } else if (second < num) {
      second = num;
    }
  }
  return first * 10 + second;
}
