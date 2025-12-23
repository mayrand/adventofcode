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
    console.log(result);
  }
  console.log(result);
}

export function getMaxJoltage(bank: string): bigint {
  let striped = getHighestFromFour(bank);
  if (striped.length === 12) {
    return BigInt(striped);
  }
  let first = [10, -1];
  let second = [10, -1];
  let third = [10, -1];
  for (let i = 0; i < striped.length; i++) {
    const num = Number.parseInt(striped[i]);
    if (num < first[0]) {
      first[0] = num;
      first[1] = i;
    } else if (num < second[0]) {
      second[0] = num;
      second[1] = i;
    } else if (num < third[0]) {
      third[0] = num;
      third[1] = i;
    }
  }
    
  return BigInt(
    removeCharAtPosition(
      removeCharAtPosition(removeCharAtPosition(striped, first[1]), second[1] - 1),
      third[1] - 2,
    ),
  );
}

export function removeCharAtPosition(str: string, position: number, minLen: number = 12): string {
  if(str.length <= minLen) return str;
  return str.slice(0, position) + str.slice(position + 1);
}

export function getHighestFromFour(bank: string): string {
  let max = [0, -1];
  for (let i = 0; i < 4; i++) {
    const num = Number.parseInt(bank[i]);
    if (num > max[0]) {
      max[0] = num;
      max[1] = i;
    }
  }
  return bank.slice(max[1]);
}
