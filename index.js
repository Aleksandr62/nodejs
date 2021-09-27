const colors = require("colors");

function isNotSimple(number) {
  return [2, 3, 5, 7].some((item) => number !== item && number % item === 0);
}

function simpleNumbers(start, end, res = []) {
  if (start === 1) start += 1;
  if (![2, 3, 5, 7].includes(start) && !isNotSimple(start))
    res = [...res, start];
  return start - 1 < end ? simpleNumbers(start + 1, end, res) : res;
}

const start = parseInt(process.argv[2]);
const end = parseInt(process.argv[3]);
const arraySimpleNumbers =
  typeof start !== "number" || typeof end !== "number"
    ? console.log(colors.red("Введите диапазон чисел"))
    : simpleNumbers(start, end);

arraySimpleNumbers.length === 0
  ? console.log(colors.red(`Простых чиcел в диапазоне ${start} - ${end} нет`))
  : arraySimpleNumbers.forEach((item, idx, f) => {
      (idx + 1) % 3 === 0
        ? console.log(colors.red(item))
        : (idx - 1) % 3 === 0
        ? console.log(colors.yellow(item))
        : console.log(colors.green(item));
    });
