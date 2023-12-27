// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

const data = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

let array = data.split('\n')
//console.log(array)
let sum = 0;
for (let x = 0; x < array.length; x++) {
    let digitFound = false;
    let first: string = '';
    let last: string = '';
    for (let y = 0; y < array[x].length; y++) {
        const parsed = Number.parseInt(array[x][y], 10);
        if (Number.isInteger(parsed)) {
            if (!digitFound) {
                first = array[x][y];
                digitFound = true;
            }
            last = array[x][y];
        }
    }
    // console.log('1. '+first)
    // console.log('2. '+last)
    // console.log(first+last)
    sum+=Number.parseInt(first+last,10);
}
console.log(sum)

