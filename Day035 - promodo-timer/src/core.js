let timeInSeconds = 25 * 60;
const timeEl = document.querySelector('.time');

setTime();

const timer = setInterval(function () {

    setTime();

    timeInSeconds--;

    if (timeInSeconds < 0) {
        clearInterval(timer);
        timeEl.textContent = "00:00";
    }

}, 1000);

function setTime() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timeEl.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
