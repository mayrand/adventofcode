
// deno-lint-ignore-file no-explicit-any
/**
 * Count how many numbers are outside a set of inclusive ranges.
 * Input file format (lines):
 *   - Range lines: "start-end"    (e.g., 195877371240788-197931294682307)
 *   - Number lines: "number"      (e.g., 278402555432346)
 * Blank lines are allowed and ignored.
 *
 * Usage:
 *   deno run --quiet count_outside_text.ts input.txt
 *
 * Output:
 *   A single integer count printed to stdout.
 */

type Range = [number, number];

export function parseInputText(text: string): { numbers: number[]; ranges: Range[] } {
  const ranges: Range[] = [];
  const numbers: number[] = [];

  const lines = text.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue; // skip blank lines

    // Range line? pattern: start-end (both integers)
    const rangeMatch = line.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const s = Number(rangeMatch[1]);
      const e = Number(rangeMatch[2]);
      if (!Number.isFinite(s) || !Number.isFinite(e)) {
        throw new Error(`Invalid range numbers: "${line}"`);
      }
      // Ensure start <= end
      ranges.push(s <= e ? [s, e] : [e, s]);
      continue;
    }

    // Single number line?
    const numMatch = line.match(/^\d+$/);
    if (numMatch) {
      const n = Number(numMatch[0]);
      if (!Number.isFinite(n)) {
        throw new Error(`Invalid number: "${line}"`);
      }
      numbers.push(n);
      continue;
    }

    throw new Error(`Unrecognized line format: "${line}"`);
  }

  return { numbers, ranges };
}

/** Merge overlapping/touching inclusive ranges. */
export function mergeInclusiveRanges(ranges: Range[]): Range[] {
  if (ranges.length === 0) return [];
  const sorted = ranges
      .map(([s, e]) => (s <= e ? [s, e] as Range : [e, s] as Range))
      .sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));

  const merged: Range[] = [];
  let [cs, ce] = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const [s, e] = sorted[i];
    // Inclusive merging: if next start <= current end, they overlap or touch
    if (s-1 <= ce) {
      ce = Math.max(ce, e);
    } else {
      merged.push([cs, ce]);
      [cs, ce] = [s, e];
    }
  }
  merged.push([cs, ce]);
  return merged;
}

/** Count numbers that are NOT inside any inclusive range. */
export function countOutside(numbers: number[], ranges: Range[]): number {
  const merged = mergeInclusiveRanges(ranges);
  if (merged.length === 0) return numbers.length;

  const starts = merged.map(r => r[0]);
  const ends = merged.map(r => r[1]);

  // Rightmost index i such that starts[i] <= x; returns -1 if none
  function rightmostLE(arr: number[], x: number): number {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] <= x) lo = mid + 1; else hi = mid;
    }
    return lo - 1;
  }

  let outside = 0;
  for (const x of numbers) {
    const i = rightmostLE(starts, x);
    if (i >= 0 && x <= ends[i]) {
      // inside merged[i]
    } else {
      outside++;
    }
  }
  return outside;
}

async function main() {
  const path = Deno.args[0];
  if (!path) {
    console.error("Usage: deno run --quiet count_outside_text.ts <input.txt>");
    Deno.exit(2);
  }

  let text: string;
  try {
    text = await Deno.readTextFile(path);
  } catch (err) {
    console.error(`Failed to read file "${path}": ${err}`);
    Deno.exit(2);
  }

  let parsed: { numbers: number[]; ranges: Range[] };
  try {
    parsed = parseInputText(text);
  } catch (err) {
    console.error(String(err));
    Deno.exit(2);
  }

  const result = countOutside(parsed.numbers, parsed.ranges);
  console.log(result.toString());
}

if (import.meta.main) {
  main();
}
