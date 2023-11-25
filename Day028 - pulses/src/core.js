const circle = document.querySelector('.circle');
let count = 0;

circle.textContent = `${count}s`;

function increment() {
    count++;
    if (count > 60) count = 0;
    circle.textContent = `${count}s`;
}

setInterval(() => {
    increment();
}, 2000);
