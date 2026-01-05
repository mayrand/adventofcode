import { assertEquals,
  assertThrows } from "@std/assert";
import {
  parseInputText,
  mergeInclusiveRanges,
  countOutside,
} from "./main.ts";

Deno.test("parseInputText: parses ranges and numbers, ignores blanks", () => {
  const input = `
    265252883201638-269190040850024
    195877371240788-197931294682307

    278402555432346
    132663185371131
    308642641112043
  `;
  const { numbers, ranges } = parseInputText(input);
  assertEquals(ranges, [
    [265252883201638, 269190040850024],
    [195877371240788, 197931294682307],
  ]);
  assertEquals(numbers, [
    278402555432346,
    132663185371131,
    308642641112043,
  ]);
});

Deno.test("parseInputText: accepts reversed range bounds", () => {
  const { ranges } = parseInputText(`10-1\n5-7\n`);
  assertEquals(ranges, [[1, 10], [5, 7]]);
});

Deno.test("parseInputText: throws on invalid lines", () => {
  assertThrows(
      () => parseInputText("abc-def\n"),
      Error,
      "Unrecognized line format",
  );
  assertThrows(
      () => parseInputText("1--2\n"),
      Error,
      "Unrecognized line format",
  );
});

Deno.test("mergeInclusiveRanges: merges overlapping ranges", () => {
  const ranges: [number, number][] = [
    [1, 5],
    [3, 10],
    [20, 25],
    [24, 30],
  ];
  assertEquals(mergeInclusiveRanges(ranges), [
    [1, 10],
    [20, 30],
  ]);
});

Deno.test("mergeInclusiveRanges: merges touching ranges (inclusive)", () => {
  const ranges: [number, number][] = [
    [1, 4],
    [5, 7],
    [9, 9],
    [8, 8],
  ];
  // Because inclusive, [1,4] and [5,7] merge; [8,8] and [9,9] also merge together,
  // and then with [5,7] into one [1,9].
    assertEquals(mergeInclusiveRanges(ranges), [[1, 9]]);
});

Deno.test("mergeInclusiveRanges: handles already disjoint & sorted", () => {
  const ranges: [number, number][] = [
    [1, 2],
    [10, 12],
    [20, 25],
  ];
  assertEquals(mergeInclusiveRanges(ranges), ranges);
});

Deno.test("mergeInclusiveRanges: handles empty", () => {
  assertEquals(mergeInclusiveRanges([]), []);
});

Deno.test("countOutside: all inside", () => {
  const numbers = [1, 2, 3, 4, 5];
  const ranges: [number, number][] = [[1, 5]];
  assertEquals(countOutside(numbers, ranges), 0);
});

Deno.test("countOutside: all outside", () => {
  const numbers = [-1, 0, 6, 7];
  const ranges: [number, number][] = [[1, 5]];
  assertEquals(countOutside(numbers, ranges), 4);
});

Deno.test("countOutside: mixed inside/outside with merges", () => {
  const numbers = [0, 3, 5, 6, 10, 11, 20];
  const ranges: [number, number][] = [
    [1, 4],
    [5, 9],
    [12, 15],
    [14, 18],
  ]; // merges to [1,9], [12,18]
  assertEquals(countOutside(numbers, ranges), 4); // 0, 10, 11, 20
});

Deno.test("countOutside: inclusive boundary checks", () => {
  const numbers = [1, 4, 5, 9, 10];
  const ranges: [number, number][] = [
    [1, 4],
    [5, 9],
  ];
  assertEquals(countOutside(numbers, ranges), 1); // only 10 is outside
});

Deno.test("countOutside: empty ranges => everything outside", () => {
  const numbers = [100, 200, 300];
  assertEquals(countOutside(numbers, []), 3);
});

Deno.test("countOutside: empty numbers => zero", () => {
  const ranges: [number, number][] = [[1, 100]];
  assertEquals(countOutside([], ranges), 0);
});

Deno.test("countOutside: large (but safe) numbers", () => {
  // These magnitudes are < Number.MAX_SAFE_INTEGER (~9e15), so exact.
  const ranges: [number, number][] = [
    [265252883201638, 269190040850024],
    [195877371240788, 197931294682307],
    [357924716181756, 359488291571889],
  ];
  const numbers = [
    278402555432346, // outside
    132663185371131, // outside
    308642641112043, // outside
    196000000000000, // inside (2nd range)
    358000000000000, // inside (3rd range)
  ];
  assertEquals(countOutside(numbers, ranges), 3);
});

Deno.test("countOutside: sample numbers", () => {
  // These magnitudes are < Number.MAX_SAFE_INTEGER (~9e15), so exact.
  const ranges: [number, number][] = [
    [3, 5],
    [10, 14],
    [16, 20],
    [12, 18],
  ];
  const numbers = [
    1, // outside
    5, // inside
    8, // outside
    11, // inside
    17, // inside
    32, // outside
  ];
  assertEquals(countOutside(numbers, ranges), 3);
});
