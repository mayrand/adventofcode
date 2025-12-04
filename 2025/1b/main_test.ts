import { assertEquals } from "@std/assert";
import { rotate, TwoNumbers } from "./main.ts";

const moves = [
  "L68",
  "L30",
  "R48",
  "L5",
  "R60",
  "L55",
  "L1",
  "L99",
  "R14",
  "L82",
];

Deno.test(function rotateTest() {
  let start: TwoNumbers = [50, 0];
  moves.forEach((move) => {
    start = rotate(start[0], move);
  });
  assertEquals(start[0], 32);
});

Deno.test(function rotateTest1() {
  let count = 0;
  let current: TwoNumbers = [50, 0];
  moves.forEach((move) => {
    current = rotate(current[0], move);
    count += current[1];
  });
  assertEquals(count, 6);
});

Deno.test(function rotateTest2() {
  assertEquals(rotate(50, "R50"), [0, 1]);
});

Deno.test(function rotateTest3() {
  assertEquals(rotate(50, "L50"), [0, 1]);
});

Deno.test(function rotateTest4() {
  assertEquals(rotate(50, "L550"), [0, 6]);
});

Deno.test(function rotateTest5() {
  assertEquals(rotate(50, "R550"), [0, 6]);
});

Deno.test(function rotateTest6() {
  assertEquals(rotate(0, "L5"), [95, 0]);
});

Deno.test(function rotateTest7() {
  assertEquals(rotate(50, "L68"), [82, 1]);
});

Deno.test(function rotateTest8() {
  assertEquals(rotate(1, "L2"), [99, 1]);
});

Deno.test(function rotateTest9() {
  assertEquals(rotate(99, "R2"), [1, 1]);
});