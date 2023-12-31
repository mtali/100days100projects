const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = canvas.height = 700;
const CANVAS_WIDTH = canvas.width = 700;
let canvasPosition;


const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d", {willReadFrequently: true});
collisionCanvas.height = 700;
collisionCanvas.width = 700;
let explosions = [];

let gameOver = false;


let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;
ctx.font = "45px Impact";

let ravens = [];

class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.4 + 0.45
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 6 + 2;
        this.directionY = Math.random() * 3 - 1.5;
        this.delete = false;
        this.image = new Image();
        this.image.src = "assets/raven.png";
        this.frame = 0;
        this.maxFrame = 5;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ]
        this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`
    }

    update(delta) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY *= -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;

        if (this.x < 0 - this.width) this.delete = true;

        this.timeSinceFlap += delta;
        if (this.timeSinceFlap > this.flapInterval) {
            this.frame++
            if (this.frame > this.maxFrame) this.frame = 0;
            this.timeSinceFlap = 0;
        }

        if (this.x < 0 - this.width) gameOver = true
    }

    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = "assets/boom.png";
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = "assets/boom.wav";
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
        this.delete = false;
    }

    update(delta) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += delta;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) this.delete = true;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size);
    }
}

function drawScore() {
    ctx.textAlign = "start";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 50, 75);
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 55, 80);
}

function drawGameOver() {
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER", canvas.width / 2 + 5, canvas.height / 2 + 5);
    ctx.fillText("space to restart!", canvas.width / 2, canvas.height / 2 + 50);
}

function spawnNextRaven(delta) {
    timeToNextRaven += delta;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort((a, b) => {
            return a.width - b.width;
        });
    }
}

function animate(timestamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    collisionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let delta = timestamp - lastTime;
    lastTime = timestamp;

    if (!gameOver) spawnNextRaven(delta);

    [...ravens, ...explosions].forEach(obj => obj.update(delta));
    [...ravens, ...explosions].forEach(obj => obj.draw());

    ravens = ravens.filter(obj => !obj.delete);
    explosions = explosions.filter(obj => !obj.delete);

    if (gameOver) drawGameOver();

    drawScore();

    requestAnimationFrame(animate);
}

animate(0);


document.addEventListener("click", e => {
    if (gameOver) return;
    canvasPosition = canvas.getBoundingClientRect();
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;

    const detectPixelColor = collisionCtx.getImageData(positionX, positionY, 1, 1);
    const pc = detectPixelColor.data;
    ravens.forEach(raven => {
        if (raven.randomColors[0] === pc[0] && raven.randomColors[1] === pc[1] && raven.randomColors[2] === pc[2]) {
            raven.delete = true;
            score++;
            explosions.push(new Explosion(raven.x, raven.y, raven.width));
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (!gameOver) return
    if (event.code === "Space") {
        ravens = [];
        explosions = [];
        score = 0;
        gameOver = false;
    }
});