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
  let result = 0n;
  for (const line of lines) {
    result += getMaxJoltage(line);
  }
  console.log(result);
}

export function getMaxJoltage(bank: string): bigint {
  const positions: number[] = Array(12).fill(0);
  let start = 0;
  for (let pos = 0; pos < 12; pos++) {
    const maxLen = bank.length - 12 + pos
    for (let i = start; i <= maxLen; i++) {
      const num = Number.parseInt(bank[i]);
      if (num <= positions[pos]) continue;
      positions[pos] = num;
      start = i + 1;
    }
  }
  return BigInt(positions.join(""));
}
