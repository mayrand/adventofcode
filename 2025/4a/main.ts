export function isAccessible(table: number[][]): boolean {
  const sum = table.flat().reduce((sum, val) => sum + val, 0) - 1;
  return sum < 4;
}

function skip(x: number, y: number, lenght: number, height: number): boolean {
  const skip = x == 0 && y == 0 || x == 0 && y == height - 1 ||
    x == lenght - 1 && y == 0 || x == lenght - 1 && y == height - 1;
  return skip;
}

export function countAccessible(array: number[][]): number {
  let count = 0;
  for (let x = 0; x < array.length; x++) {
    for (let y = 0; y < array[x].length; y++) {
      if (array[x][y] < 1) {
        continue;
      }
      let startx = x == 0 ? 0 : x - 1;
      let starty = y == 0 ? 0 : y - 1;
      let endx = x + 2;
      let endy = y + 2;
      const slice = array.slice(startx, endx).map((row) =>
        row.slice(starty, endy)
      );
      if (skip(x, y, array.length, array[x].length) || isAccessible(slice)) {
        count++;
      }
    }
  }
  return count;
}

if (import.meta.main) {
  const content = await Deno.readTextFile("data2");
  const lines = content.split(/\r?\n/);
  const array: number[][] = [];
  for (const line of lines) {
    const numArray: number[] = line.replace(
      /[@.]/g,
      (m) => m === "@" ? "1" : "0",
    )
      .split("").map(Number);
    array.push(numArray);
  }
  console.log(countAccessible(array));
}
