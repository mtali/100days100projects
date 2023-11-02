document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 700;
    let lastTime = 0;

    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 500;
            this.enemyTimer = 0;
            this.enemyTypes = ["worm", "ghost", "spider"];
        }

        update(delta) {
            this.enemies = this.enemies.filter(enemy => !enemy.delete);

            if (this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy();
                this.enemyTimer = 0;
            }
            {
                this.enemyTimer += delta;
            }
            this.enemies.forEach(item => item.update(delta));
        }

        draw() {
            this.enemies.forEach(item => item.draw(this.ctx));
        }

        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemies.length)]
            if (randomEnemy === 'worm') this.enemies.push(new Worm(this));
            if (randomEnemy === 'ghost') this.enemies.push(new Ghost(this));
            if (randomEnemy === 'spider') this.enemies.push(new Spider(this));

            this.enemies.sort((a, b) => {
                return a.y - b.y;
            });
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.delete = false;
            this.frameX = 0;
            this.maxFrame = 5;
            this.frameInterval = 100;
            this.frameTimer = 0;
        }

        update(delta) {
            if (this.frameInterval > this.frameTimer) {
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0
                this.frameTimer = 0;
            } else {
                this.frameTimer += delta;
            }

            this.x -= this.vx * delta;
            if (this.x < 0 - this.width) this.delete = true;
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.image = worm;
            this.x = this.game.width;
            this.y = this.game.height - this.height;
            this.vx = Math.random() * 0.1 + 0.1;
        }
    }

    class Ghost extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.image = ghost;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.6;
            this.vx = Math.random() * 0.2 + 0.1;
            this.angle = 0;
            this.curve = Math.random() * 3;
        }

        update(delta) {
            super.update(delta);
            this.y += Math.sin(this.angle) * this.curve;
            this.angle += 0.04;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = 0.5;
            super.draw(ctx);
            ctx.restore();
        }
    }

    class Spider extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.image = spider;
            this.x = Math.random() * (this.game.width - this.width);
            this.y = 0 - this.height;
            this.vx = 0;
            this.vy = Math.random() * 0.1 + 0.1;
            this.maxLength = Math.random() * game.height;
        }

        update(delta) {
            super.update(delta);
            if (this.y < 0 - this.height * 2) this.delete = true;
            this.y += this.vy * delta;
            if (this.y > this.maxLength) this.vy *= -1;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.width * 0.5, 0);
            ctx.lineTo(this.x + this.width * 0.5, this.y + 10);
            ctx.stroke();
            super.draw(ctx);
        }
    }


    const game = new Game(ctx, canvas.width, canvas.height);

    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let delta = timestamp - lastTime;
        lastTime = timestamp;
        game.update(delta);
        game.draw();

        requestAnimationFrame(animate);
    }

    animate(0);
});