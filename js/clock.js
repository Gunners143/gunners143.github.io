let is24Hour = true;

const clockEl = document.getElementById('clock');
const toggleBtn = document.getElementById('toggleFormat');
const dateEl = document.getElementById('dateDisplay');
const timezoneEl = document.getElementById('timezoneDisplay');
const savedFormat = localStorage.getItem('clockFormat');
if (savedFormat !== null) {
  is24Hour = savedFormat === '24';
}

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let suffix = '';

  if (!is24Hour) {
    suffix = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12;
  }

  const timeString =
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') +
    suffix;

  clockEl.textContent = timeString;
  updateButtonText();
}

function updateButtonText() {
  toggleBtn.textContent = is24Hour
    ? '12-hour clock'
    : '24-hour clock';
}

toggleBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
  updateClock();
});





  updateClock();






function updateDateAndTimezone() {
  const now = new Date();

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  dateEl.textContent = now.toLocaleDateString(undefined, dateOptions);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = -now.getTimezoneOffset() / 60;

  timezoneEl.textContent = `GMT${offset >= 0 ? '+' : ''}${offset} (${timezone})`;
}



// Initial run
updateButtonText();
updateClock();
setInterval(updateClock, 1000);
updateDateAndTimezone ();