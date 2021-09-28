// Урок 2:
// задача 2
const colors = require("colors");
const EventEmitter = require("events");
const emitter = new EventEmitter();

const regExp =
  /\b([0-5][0-9])-([0-1][0-9]|[2][0-4])-([0][1-9]|[1-2][0-9]|[3][0-1])-([0][1-9]|1[0-2])-([2][0][2-9][1-9])\b/;

const dateTimer = process.argv;
dateTimer.splice(0, 2);

const showTimers = (timerId, end, start) => {
  const second = Math.floor(60 - start.getSeconds()) || 0;
  const minute = Math.floor(end.getMinutes() - start.getMinutes()) || 0;
  const hour = Math.floor(end.getHours() - start.getHours()) || 0;
  const day = Math.floor(end.getDate() - start.getDate()) || 0;
  console.log(`Таймер №${timerId}: ${day} ${hour}:${minute}:${second}`);
};
const setTimer = (dateTimer) => {
  const end = new Date(dateTimer.replace(regExp, "$5-$4-$3T$2:$1"));
  const timerId = setInterval(() => {
    showTimers(timerId, end, new Date());
  }, 1000);
  setTimeout(
    () => emitter.emit("stopTimer", timerId),
    end.getTime() - Date.now()
  );
};

dateTimer.forEach((item) => {
  !regExp.test(item)
    ? console.log(
        colors.red(item),
        "Введите дату и время в формате мин-час-день-месяц-год (05-08-01-10-2021)"
      )
    : setTimer(item);
});

const handleStopTimer = (timerId) => {
  console.log(`Timer №${timerId} stopped`);
  clearTimeout(timerId);
};

emitter.on("stopTimer", handleStopTimer);

// задача 1 -----------------------------------------------------------------------
console.log("Record 1");

setTimeout(() => {
  console.log("Record 2");
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log("Record 3");
      Promise.resolve().then(() => {
        console.log("Record 4");
      });
    });
  });
});

console.log("Record 5");

Promise.resolve().then(() =>
  Promise.resolve().then(() => console.log("Record 6"))
);
// Вывод:
// Record 1 - task
// Record 5 - task
// Record 6 - microtask
// Record 2 - makrotask task
// Record 3 - makrotask microtask makrotask task
// Record 4 - makrotask microtask makrotask microtask

// Урок 1:
/* const colors = require("colors");

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
 */
