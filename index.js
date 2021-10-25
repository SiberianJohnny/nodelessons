require('colors')

const colors = { green: 0, yellow: 1, red: 2 }

let currentColor = colors.green
const leftRest = process.argv[2];
const rightRest = process.argv[3];
let noPrimeNum = true;

if (isNaN(leftRest) || isNaN(rightRest)) {
  console.log('Incorrect start parameters'.red);
  return;
}

const isPrimeNum = (num) => {
  if (num <= 1)
    return false;
  for (let i = 2; i < num; i++)
    if (num % i === 0) return false;
  return true;
}

const changeColor = () => {
  currentColor++;
  if (currentColor > colors.red) {
    currentColor = colors.green;
  }
}

const colorPrint = (num) => {
  if (noPrimeNum) noPrimeNum = false;
  switch (currentColor) {
    case colors.red:
      console.log(`${num}`.red);
      break;
    case colors.green:
      console.log(`${num}`.green);
      break;
    case colors.yellow:
      console.log(`${num}`.yellow);
      break;
  }
  changeColor();
}

for (let i = leftRest; i <= rightRest; i++) {
  if (isPrimeNum(i)) colorPrint(i);
}
if (noPrimeNum) {
  console.log(`Wrong range[${leftRest},${rightRest}])`.red);
}