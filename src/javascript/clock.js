function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return; // если элемента нет — просто выходим

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds}`;
  clockEl.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();
