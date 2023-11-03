window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 720;
    let lastTime = 0;
    let enemies = [];
    let score = 0;
    let gameOver = false;


    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight') &&
                    this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }

            });
            window.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key))
                }

            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('player');
            this.frameX = 0;
            this.frameY = 0;
            this.vx = 0;
            this.vy = 0;
            this.gravity = 0.00625;
            this.maxFrame = 8;
            this.fps = 60;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
        }

        draw(ctx) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.beginPath();
            ctx.arc(this.x + this.width * 0.5, this.y + this.height * 0.5, this.width * 0.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(delta, input, enemies) {

            enemies.forEach(enemy => {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.width / 2 + this.width / 2) {
                    gameOver = true;
                }
            })

            // Frames
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX += 1;
                this.frameTimer = 0;
            } else {
                this.frameTimer += delta;
            }


            // Controls
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.vx = 0.3125;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.vx = -0.3125;
            } else {
                this.vx = 0;
            }

            if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy = -2.25;
            }

            // Horizontal
            this.x += (this.vx * delta);
            if (this.x < 0) this.x = 0;
            if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

            // Vertical
            this.y += (this.vy * delta);
            if (!this.onGround()) {
                this.vy += (this.gravity * delta);
                this.frameY = 1;
                this.maxFrame = 5;
            } else {
                this.vy = 0;
                this.frameY = 0;
                this.maxFrame = 8;
            }

            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;

        }

        onGround() {
            return this.y >= this.gameHeight - this.height;
        }


    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('background');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.vx = 0.5;
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }

        update(delta) {
            this.x -= this.vx * delta;
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    class Enemy {
        constructor(worldWidth, worldHeight) {
            this.worldWidth = worldWidth;
            this.worldHeight = worldHeight;
            this.image = document.getElementById('enemy');
            this.width = 160;
            this.height = 119;
            this.x = this.worldWidth;
            this.y = this.worldHeight - this.height;
            this.vx = 0.3;
            this.maxFrames = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.frameX = 1;
            this.delete = false;
        }

        draw(ctx) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.beginPath();
            ctx.arc(this.x + this.width * 0.5, this.y + this.height * 0.5, this.width * 0.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(delta) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrames) this.frameX = 0;
                else this.frameX += 1;
                this.frameTimer = 0;
            } else {
                this.frameTimer += delta;
            }

            if (this.x < 0 - this.width) {
                this.delete = true;
                score += 1;
            }


            this.x -= (this.vx * delta);
        }
    }


    let enemyTimer = 0;
    const enemyInterval = 1500;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function handleEnemies(delta, ctx) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
        } else {
            enemyTimer += delta;
        }

        enemies.forEach(enemy => {
            enemy.update(delta);
            enemy.draw(ctx);
        });

        enemies = enemies.filter(enemy => !enemy.delete);
    }

    function displayStatusText(ctx) {
        ctx.font = '40px Helvetica';

        ctx.fillStyle = "black";
        context.fillText('Score: ' + score, 20, 50);
        ctx.fillStyle = "white";
        context.fillText('Score: ' + score, 22, 52);

        if (gameOver) {
            ctx.textAlign = 'center';
            ctx.fillStyle = "black";
            context.fillText('GAME OVER, try again!', canvas.width * 0.5, canvas.height * 0.5);
            ctx.fillStyle = "white";
            context.fillText('GAME OVER, try again!', canvas.width * 0.5 + 2, canvas.height * 0.5 + 2);

        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    function animate(timestamp) {
        const delta = timestamp - lastTime;
        lastTime = timestamp;

        context.clearRect(0, 0, canvas.width, canvas.height);

        // background.update(delta);
        background.draw(context);

        player.update(delta, input, enemies);
        player.draw(context);

        handleEnemies(delta, context);

        displayStatusText(context);

        if (!gameOver) {
            requestAnimationFrame(animate);
        }
    }

    animate(0);
})