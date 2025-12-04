import { readLines } from "std/io/mod.ts";
export type TwoNumbers = [number, number];
export function rotate(current: number, steps: string): TwoNumbers {
  let move = parseInt(steps.slice(1));
  move = steps[0] === "R" ? move : -move;
  let zeros = Math.floor(Math.abs(move) / 100);
  move = move % 100;
  let newCurrent = current + move;
  if (newCurrent < 0) {
    newCurrent = 100 + newCurrent;
    if (current > 0) {
      zeros++;
    }
  }
  if (newCurrent === 0 && current > 0) {
    zeros++;
  }
  if (newCurrent >= 100) {
    newCurrent = newCurrent - 100;
    zeros++;
  }
  // console.log(move + " " + current + " " + newCurrent + " " + zeros);
  return [newCurrent, zeros];
}

if (import.meta.main) {
  const file = await Deno.open("data.txt");
  let count = 0;
  let current: TwoNumbers = [50, 0];
  for await (const line of readLines(file)) {
    current = rotate(current[0], line);
    count += current[1];
  }
  file.close();
  console.log(count);
}
