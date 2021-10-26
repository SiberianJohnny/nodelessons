const EventEmitter = require('events');
const emitter = new EventEmitter();

const firstArg = process.argv[2].split('-');
const secondArg = process.argv[3].split('-');

const firstDate = {
  hours: firstArg[0],
  minutes: firstArg[1],
  seconds: firstArg[2],
  day: firstArg[3],
  month: firstArg[4],
  year: firstArg[5]
};
// const secondDate = {
//   hours: secondArg[0],
//   minutes: secondArg[1],
//   seconds: secondArg[2],
//   day: secondArg[3],
//   month: secondArg[4],
//   year: secondArg[5]
// };

const printTimer = () => {
  const timeLeft = ['|FIRST TIMER|'];
  if (firstDate.hours && firstDate.hours > 0) {
    timeLeft.push('Hours: ' + firstDate.hours)
  }
  if (firstDate.minutes && firstDate.minutes > 0) {
    timeLeft.push('Minutes: ' + firstDate.minutes)
  }
  if (firstDate.seconds >= 0) {
    timeLeft.push('Seconds: ' + firstDate.seconds)
  }
  if (firstDate.day && firstDate.day > 0) {
    timeLeft.push('Days: ' + firstDate.day)
  }
  if (firstDate.month && firstDate.month > 0) {
    timeLeft.push('Month: ' + firstDate.month)
  }
  if (firstDate.year && firstDate.year > 0) {
    timeLeft.push('Years: ' + firstDate.year)
  }
  return timeLeft;
}

emitter.once('timerOff', () => {
  console.log('TIME IS OVER')
})

emitter.on('years', () => {
  if (firstDate.year > 0) {
    firstDate.year = firstDate.year - 1;
    firstDate.month = 12;
    console.log(printTimer());
  } else {
    emitter.emit('timerOff')
  }
})

emitter.on('month', () => {
  if (firstDate.month > 0) {
    firstDate.month = firstDate.month - 1;
    firstDate.day = 30; // Наверное можно прописать разное количество дней для разных месяцев, но пусть будет 30 =)
    console.log(printTimer());
  } else {
    emitter.emit('years')
  }
})

emitter.on('days', () => {
  if (firstDate.day > 0) {
    firstDate.day = firstDate.day - 1;
    firstDate.hours = 24;
    console.log(printTimer());
  } else {
    emitter.emit('month')
  }
})

emitter.on('hours', () => {
  if (firstDate.hours > 0) {
    firstDate.hours = firstDate.hours - 1;
    firstDate.minutes = 60;
    console.log(printTimer());
  } else {
    emitter.emit('days')
  }
})


emitter.on('minutes', () => {
  if (firstDate.minutes > 0) {
    firstDate.minutes = firstDate.minutes - 1;
    firstDate.seconds = 60;
    console.log(printTimer());
  } else {
    emitter.emit('hours')
  }
})

emitter.on('seconds', () => {
  console.log(printTimer());
  setInterval(function () {
    if (firstDate.seconds > 0) {
      firstDate.seconds = firstDate.seconds - 1;
      console.log(printTimer());
    } else {
      emitter.emit('minutes')
    }
  }, 1000);
})

emitter.emit('seconds')