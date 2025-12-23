import { assertEquals } from "@std/assert";
import { getMaxJoltage } from "./main.ts";
import { removeCharAtPosition } from "./main.ts";
import {getHighestFromFour} from "./main.ts";

Deno.test(function removeCharAtPosition1() {
  assertEquals(removeCharAtPosition( "987654321111111",3), "98754321111111");
});

Deno.test(function removeCharAtPosition2() {
  assertEquals(removeCharAtPosition( "987654321111111",0), "87654321111111");
});

Deno.test(function removeCharAtPosition3() {
  assertEquals(removeCharAtPosition( "987654321111112",14), "98765432111111");
});

Deno.test(function getMaxJoltage1() {
  assertEquals(getMaxJoltage( "987654321111111"), 987654321111);
});

Deno.test(function getMaxJoltage2() {
  assertEquals(getMaxJoltage( "811111111111119"), 811111111119);
});

Deno.test(function getMaxJoltage3() {
  assertEquals(getMaxJoltage( "234234234234278"), 434234234278);
});

Deno.test(function getMaxJoltage4() {
  assertEquals(getMaxJoltage( "818181911112111"), 888911112111);
});

Deno.test(function getHighestFromFour1() {
  assertEquals(getHighestFromFour( "234234234234278"), "4234234234278");
});

Deno.test(function getHighestFromFour2() {
  assertEquals(getHighestFromFour( "2345234234234278"), "5234234234278");
});