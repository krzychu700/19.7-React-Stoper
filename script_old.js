class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      startButton.textContent = 'Pauza';
      this.watch = setInterval(() => this.step(), 10);
    } else {
      this.running = false;
      startButton.textContent = 'Start';
      clearInterval(this.watch);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  resetHard() {
    addScore();
    this.reset();
    this.print();
    }
}
const stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('reset');
stopButton.addEventListener('click', () => stopwatch.resetHard());

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
const addScore = () => {
  let score = document.getElementsByClassName("stopwatch");
  let resultList = document.getElementsByClassName("results");
  const scoreText = score[0].innerText;
  const scoreList = document.createElement('li');
  scoreList.className = 'score';
  scoreList.innerHTML = scoreText;
  resultList[0].appendChild(scoreList); 
 }