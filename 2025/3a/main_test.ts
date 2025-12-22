import { assertEquals } from "@std/assert";
import { getMaxJoltage } from "./main.ts";

Deno.test(function bank1() {
  assertEquals(getMaxJoltage( "987654321111111"), 98);
});

Deno.test(function bank2() {
  assertEquals(getMaxJoltage( "811111111111119"), 89);
});

Deno.test(function bank3() {
  assertEquals(getMaxJoltage( "234234234234278"), 78);
});

Deno.test(function bank4() {
  assertEquals(getMaxJoltage( "818181911112111"), 92);
});