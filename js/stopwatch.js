let startTime = null;
let elapsedTime = 0;
let stopwatchInterval = null;

const display = document.getElementById('stopwatchDisplay');
const toggleBtn = document.getElementById('toggleStopwatch');


function updateDisplay() {
  const totalMilliseconds = elapsedTime;

  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const milliseconds = totalMilliseconds % 1000;

  display.textContent =
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(milliseconds).padStart(3, '0');
}

toggleBtn.addEventListener('click', () => {
  if (!stopwatchInterval) {
    startTime = Date.now() - elapsedTime;

    stopwatchInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);

    toggleBtn.textContent = 'Stop';
  } else {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    toggleBtn.textContent = 'Start';
  }
});


document.getElementById('resetStopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsedTime = 0;
  startTime = null;
  toggleBtn.textContent = 'Start';
  updateDisplay();
});


// Initial render
updateDisplay();
