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

function addSecondsToInputs(addSeconds) {
  const h = parseInt(hoursInput.value || "0", 10);
  const m = parseInt(minutesInput.value || "0", 10);
  const s = parseInt(secondsInput.value || "0", 10);

  let total = (h * 3600) + (m * 60) + s + addSeconds;

  const newH = Math.floor(total / 3600);
  total %= 3600;
  const newM = Math.floor(total / 60);
  const newS = total % 60;

  hoursInput.value = newH;
  minutesInput.value = newM;
  secondsInput.value = newS;
}

function syncRemainingTimeFromInputs() {
  const hours = Number(hoursInput.value) || 0;
  const minutes = Number(minutesInput.value) || 0;
  const seconds = Number(secondsInput.value) || 0;

  remainingTime = hours * 3600 + minutes * 60 + seconds;
  updateDisplay();
}

const presetButtons = document.getElementById("presetButtons");

function setControlsRunning(isRunning) {
  // Disable preset buttons while timer is running
  if (presetButtons) {
    presetButtons.querySelectorAll("button").forEach(b => b.disabled = isRunning);
  }
  // Optionally disable inputs too (prevents confusion)
  hoursInput.disabled = isRunning;
  minutesInput.disabled = isRunning;
  secondsInput.disabled = isRunning;
}

if (presetButtons) {
  presetButtons.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-seconds]");
    if (!btn) return;

    const add = parseInt(btn.dataset.seconds, 10);
    addSecondsToInputs(add);
    syncRemainingTimeFromInputs();
  });
}

document.getElementById('startTimer').addEventListener('click', () => {
  if (timerInterval) return;

  const hours = Number(hoursInput.value) || 0;
  const minutes = Number(minutesInput.value) || 0;
  const seconds = Number(secondsInput.value) || 0;

  remainingTime = hours * 3600 + minutes * 60 + seconds;

  if (remainingTime <= 0) return;

  updateDisplay();
  setControlsRunning(true);

  timerInterval = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      setControlsRunning(false);
    }
  }, 1000);
});

document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = 0;
  updateDisplay();
  setControlsRunning(false);
});

// Ensure display is correct on load
updateDisplay();
