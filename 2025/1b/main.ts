import { readLines } from "std/io/mod.ts";
export type TwoNumbers = [number, number];
export function rotate(current: number, steps: string): TwoNumbers {
  let move = parseInt(steps.slice(1));
  move = steps[0] === "R" ? move : -move;
  let newCurrent = current + move;
  const shift = newCurrent % 100;
  let zeros = newCurrent === 0 ? 1 : Math.floor((Math.abs(newCurrent)) / 100);
  if (shift < 0) {
    newCurrent = 100 + shift;
    if (current > 0) {
      zeros++;
    }
  } else {
    newCurrent = shift;
  }
  if (move < -100) zeros++;
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
