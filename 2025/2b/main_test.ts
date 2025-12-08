import { assertEquals } from "@std/assert";
import { extracted } from "./main.ts";

const ranges = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

Deno.test(function addTest() {
  const result = extracted(ranges);
  assertEquals(result, 4174379265);
});

Deno.test(function addTest2() {
  const result = extracted("565656-565656");
  assertEquals(result, 565656);
});

Deno.test(function addTest3() {
  const result = extracted("824824824-824824824");
  assertEquals(result, 824824824);
});
