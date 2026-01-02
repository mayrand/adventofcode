import { assertEquals } from "@std/assert";
import {countAccessible, isAccessible} from "./main.ts";

Deno.test(function isAccessible1() {
  const grid: number[][] = [
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
  ];
  assertEquals(isAccessible(grid), true);
});

Deno.test(function isAccessible2() {
  const grid: number[][] = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 1, 0],
  ];
  assertEquals(isAccessible(grid), false);
});

Deno.test(function isAccessible3() {
  const grid: number[][] = [
    [0, 1, 0],
    [1, 1, 0],
  ];
  assertEquals(isAccessible(grid), true);
});

Deno.test(function isAccessible4() {
  const grid: number[][] = [
    [1, 1], 
    [1, 1],
  ];
  assertEquals(isAccessible(grid), true);
});

Deno.test(function isAccessible5() {
  const grid: number[][] = [
    [1, 1], 
    [1, 1],
    [1, 1],
  ];
  assertEquals(isAccessible(grid), false);
});

Deno.test(function countAccessible1() {
  const grid: number[][] = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 1, 0],
  ];
  assertEquals(countAccessible(grid), 4);
});

Deno.test(function countAccessible2() {
  const grid: number[][] = [
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
  ];
  assertEquals(countAccessible(grid), 5);
});

Deno.test(function countAccessible3() {
  const grid: number[][] = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 0],
  ];
  assertEquals(countAccessible(grid), 3);
});

Deno.test(function countAccessible4() {
  const grid: number[][] = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 1, 1],
  ];
  assertEquals(countAccessible(grid), 4);
});

Deno.test(function countAccessible5() {
  const grid: number[][] = [
    [1, 0],
    [1, 1],
    [1, 1],
  ];
  assertEquals(countAccessible(grid), 3);
});
