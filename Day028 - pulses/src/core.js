const circle = document.querySelector('.circle');
let count = 0;

displayCount();


function increment() {
    count++;
    if (count > 60) count = 0;
    displayCount();
}

function displayCount() {
    // circle.textContent = `${count}s`;
}

document.addEventListener('click', () => {
    count = 0;
    displayCount();
});

setInterval(() => {
    increment();
}, 2000);
