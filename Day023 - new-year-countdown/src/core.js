const body = document.body;
const endTime = new Date('December 31 2023 23:59:59');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');


function updateCountdown() {
    const now = new Date();
    const diff = endTime - now;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    daysEl.innerText = `${days}`;
    hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
    minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
    secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
}

function createSnowflake() {
    const snowflake = document.createElement('i');
    snowflake.classList.add('fas');
    snowflake.classList.add('fa-snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 2 + 3 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    document.body.appendChild(snowflake);
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

setInterval(updateCountdown, 1000);
setInterval(createSnowflake, 50)