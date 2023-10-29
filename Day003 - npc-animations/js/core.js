/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 20;
const enemies = [];
let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = "images/enemy2.png";
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.speed = Math.random() * 4 + 1
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 2;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.amplitude = Math.random() * 7;
    }

    update() {
        this.y += this.amplitude * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }

        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}


for (let i = 0; i < numberOfEnemies; i++) {
    enemies.push(new Enemy());
}


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();