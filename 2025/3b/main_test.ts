import { assertEquals } from "@std/assert";
import { getMaxJoltage } from "./main.ts";

Deno.test(function getMaxJoltage1() {
  assertEquals(getMaxJoltage( "987654321111111"), 987654321111n);
});

Deno.test(function getMaxJoltage2() {
  assertEquals(getMaxJoltage( "811111111111119"), 811111111119n);
});

Deno.test(function getMaxJoltage3() {
  assertEquals(getMaxJoltage( "234234234234278"), 434234234278n);
});

Deno.test(function getMaxJoltage4() {
  assertEquals(getMaxJoltage( "818181911112111"), 888911112111n);
});
