window.addEventListener('load', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const height = canvas.height = 600;
    const width = canvas.width = 350;
    const colors = {red: '#E53E3E', blue: '#4299E1'};
    const ballSize = 20;
    const ballX = canvas.width / 2;
    const defaultBallSpeed = 0.1;
    const speedModifier = 0.01;
    const upAudio = new Audio("../assets/up.mp3");
    const downAudio = new Audio("../assets/down.mp3 ");

    ctx.font = "24px Impact";
    let score = 0;
    let lastTime = 0;
    let ballSpeed = defaultBallSpeed;
    let enemyBalls = [];
    let gameOver = false;

    class Ball {
        constructor(options) {
            this.x = options.x;
            this.y = options.y;
            this.color = options.color || colors.red;
            this.size = options.size || ballSize;
            this.vy = options.vy || 0;
            this.delete = false;
        }

        update(delta) {
            this.y += this.vy * delta
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        checkCollision(ball) {
            const distance = dist(ball.x, ball.y, this.x, this.y);
            if (distance < ballSize * 2) {
                if (this.color === ball.color) {
                    score++;
                    ballSpeed += speedModifier;
                    play(upAudio);
                } else {
                    gameOver = true;
                    play(downAudio);
                }
                this.delete = true;
                removeDeletedBalls();
                generateRandomBall();
            }
        }
    }


    const topBall = new Ball({x: ballX, y: height / 2 - ballSize, color: colors.blue, vy: 0});
    const bottomBall = new Ball({x: ballX, y: height / 2 + ballSize, color: colors.red, vy: 0});
    generateRandomBall();
    function animate(timestamp) {
        ctx.clearRect(0, 0, width, height);
        const delta = timestamp - lastTime;
        lastTime = timestamp;
        bottomBall.draw();
        topBall.draw();

        if (!gameOver) {
            enemyBalls.forEach(ball => {
                ball.checkCollision(topBall);
                ball.checkCollision(bottomBall);
                ball.update(delta);
                ball.draw();
            });
        } else {
            drawGameOver();
        }

        drawScore();

        requestAnimationFrame(animate);
    }


    animate(0);

    function changeBalls() {
        if (gameOver) return;
        const temp = topBall.y;
        topBall.y = bottomBall.y
        bottomBall.y = temp;
    }

    function generateRandomBall() {
        const commonOptions = {x: ballX, color: Math.random() > 0.5 ? colors.red : colors.blue};
        const topOptions = {y: 0, vy: ballSpeed, ...commonOptions};
        const bottomOptions = {y: height, vy: -ballSpeed, ...commonOptions};
        enemyBalls.push(new Ball(Math.random() < 0.5 ? topOptions : bottomOptions));
    }

    function removeDeletedBalls() {
        enemyBalls = enemyBalls.filter(ball => !ball.delete);
    }

    function dist(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function drawScore() {
        ctx.textAlign = "start";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 10, 40);
    }

    function drawGameOver() {
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }

    function play(audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.play()
    }


    document.addEventListener('click', () => changeBalls());
    document.addEventListener('keyup', (e) => {
        if (e.code === "Escape") {
            score = 0;
            ballSpeed = defaultBallSpeed;
            enemyBalls = [];
            gameOver = false;
            generateRandomBall();
        } else {
            changeBalls();
        }
    })
});