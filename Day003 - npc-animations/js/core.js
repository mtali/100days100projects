/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemies = [];

class Enemy {
    constructor() {
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = Math.random() * CANVAS_HEIGHT;
        this.width = 100;
        this.height = 100;
        this.speed = Math.random() * 4 - 2;
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;
    }

    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
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


    requestAnimationFrame(animate);
}

animate();