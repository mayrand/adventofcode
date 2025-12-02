import { assertEquals } from "@std/assert";
import { rotate } from "./main.ts";

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
  "L82"
];

Deno.test(function rotateTest() {
  let start = 50;
  moves.forEach(move => {
    start = rotate(start, move);
  });
  assertEquals(start, 32);
});

Deno.test(function rotateTest2() {
  assertEquals(rotate(50,"R50"), 0);
});

Deno.test(function rotateTest3() {
  assertEquals(rotate(50,"L50"), 0);
});

Deno.test(function rotateTest4() {
  assertEquals(rotate(50,"L550"), 0);
}); 

Deno.test(function rotateTest5() {
  assertEquals(rotate(50,"R550"), 0);
});