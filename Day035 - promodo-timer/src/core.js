const promodoSeconds = 25 * 60;
let timeInSeconds = promodoSeconds;
const timeEl = document.querySelector('.time');
let timer;
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');

setTimer();

function startTimer() {
    stopTimer()
    timer = setInterval(function () {
        setTimer();
        timeInSeconds--;
        if (timeInSeconds < 0) {
            timeEl.textContent = "00:00";
            clearInterval(timer);
            setTimeout(function () {
                alert("Time's up!");
                resetTimer();
                startTimer();
            }, 0);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    timeInSeconds = promodoSeconds;
    stopTimer()
    setTimer()
}

function setTimer() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timeEl.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

start.addEventListener('click', startTimer);
pause.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);


