import { readLines } from "std/io/mod.ts";

export function rotate(current: number, steps: string): number {
  const num = parseInt(steps.slice(1)) % 100;
  const move = steps[0] === "R" ? num : -num;
  const shift = (current+move) % 100;
  let newCurrent = 0;
  if(shift < 0)
    newCurrent = 100 + shift;
  else
    newCurrent = shift;
  // console.log(move+" "+shift+" "+newCurrent);
  return newCurrent;
}

// export function countZeros()

if (import.meta.main) {
  const file = await Deno.open("data.txt");
  let count = 0;
  let current = 50;
  for await (const line of readLines(file)) {
    current = rotate(current, line);
    if(current==0) count++;
  }
  file.close();
  console.log(count);
}
