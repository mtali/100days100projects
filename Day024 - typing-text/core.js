const text = document.getElementById('text');
const sentence = "Celebrate your successes, no matter how small, and learn from your failures, for they are the blueprints of progress.";
let index = 1;
let paused = false;

setInterval(writeText, 100);

function writeText() {
    if (!paused) {
        text.innerText = sentence.slice(0, index);
        index++;
        if (index > sentence.length) {
            paused = true;
            setTimeout(() => {
                paused = false;
            }, 2000)
            index = 1;
        }
    }
}