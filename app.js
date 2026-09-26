// Live Clock & Timestamp
function updateClock() {
  const now = new Date();

  // Format Time: HH:MM:SS
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Format Date: e.g. "Saturday, September 26, 2026"
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString(undefined, dateOptions);

  // Unix Epoch Timestamp (ms)
  const timestamp = now.getTime();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Update DOM elements
  const timeEl = document.getElementById('clock-time');
  const dateEl = document.getElementById('clock-date');
  const timestampEl = document.getElementById('clock-timestamp');
  const timezoneEl = document.getElementById('clock-timezone');

  if (timeEl) timeEl.textContent = timeString;
  if (dateEl) dateEl.textContent = dateString;
  if (timestampEl) timestampEl.textContent = `UNIX: ${timestamp}`;
  if (timezoneEl) timezoneEl.textContent = `TZ: ${timezone}`;
}

// Initial call and set interval
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
});
