// Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
// Equipped with this new information, you now need to find the real first and last digit on each line. For example:
// In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

function oneB(): number {
    const data = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
    let array = data.split('\n')
    let sum = 0;
    for (let x = 0; x < array.length; x++) {
        sum += transformWords2Digits(array[x]);
    }
    return sum;
}

function transformWords2Digits(input: string): number {
    const digits: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let first: number = 0;
    let firstPos: number = Number.MAX_VALUE;
    let last: number = 0;
    let lastPos: number = Number.MIN_VALUE;
    let digitFound = false;
    for (let y = 0; y < input.length; y++) {
        const parsed = Number.parseInt(input[y], 10);
        if (Number.isInteger(parsed)) {
            if (!digitFound) {
                first = parsed;
                digitFound = true;
                firstPos=y;
            }
            last = parsed;
            lastPos=y;
        }
    }
    for (let idx in digits) {
        let pos = input.indexOf(digits[idx]);
        if (pos > -1 && firstPos > pos) {
            first = parseInt(idx) + 1;
            firstPos = pos;
        }
        pos = input.lastIndexOf(digits[idx]);
        if (pos > -1 && lastPos < pos) {
            last = parseInt(idx) + 1;
            lastPos = pos;
        }
    }
    
    return parseInt(first.toString()+last.toString());
}

console.log(oneB())