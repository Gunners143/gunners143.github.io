let remainingTime = 0;
let timerInterval = null;

const display = document.getElementById('timerDisplay');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function updateDisplay() {
const hours = Math.floor(remainingTime / 3600);
const mins = Math.floor((remainingTime % 3600) / 60);
const secs = remainingTime % 60;

display.textContent =
  String(hours).padStart(2, '0') + ':' +
  String(mins).padStart(2, '0') + ':' +
  String(secs).padStart(2, '0');

}

document.getElementById('startTimer').addEventListener('click', () => {
  if (timerInterval) return;

const hours = Number(hoursInput.value) || 0;
const minutes = Number(minutesInput.value) || 0;
const seconds = Number(secondsInput.value) || 0;

remainingTime = hours * 3600 + minutes * 60 + seconds;


  if (remainingTime <= 0) return;

  updateDisplay();

  timerInterval = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }, 1000);
});

document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = 0;
  updateDisplay();
});
