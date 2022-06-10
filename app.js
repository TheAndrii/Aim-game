const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#e74c3c', '#f21202', '#3498db', '#e67e22', '#2ef202', '#e6f202', '#f2c602', '#02f2d2'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up'); 
});

timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up'); 
    startGame();
  }
});

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
  setTime(current);
  }
}

function setTime(value) {
  timeElement.innerHTML = `00:${value}`;
}

function finishGame() {
  timeElement.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(5, 20);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);;

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  setColor(circle);

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
  const color = getRandomColor();
  element.style.background = color;
} 

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index]; 
} 