window.addEventListener('load', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const height = canvas.height = 600;
    const width = canvas.width = 350;
    const colors = {red: '#E53E3E', blue: '#4299E1'};
    const ballSize = 20;
    const ballX = canvas.width / 2;
    let score = 0;
    let lastTime = 0;
    let ballSpeed = 0.1;
    let enemyBalls = [];

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
                    ballSpeed += 0.01;
                } else {
                    score = 0;
                    ballSpeed = 0.1;
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

        enemyBalls.forEach(ball => {
            ball.checkCollision(topBall);
            ball.checkCollision(bottomBall);
            ball.update(delta);
            ball.draw();
        });

        requestAnimationFrame(animate);
    }


    animate(0);

    function changeBalls() {
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

    document.addEventListener('click', () => changeBalls());
    document.addEventListener('keyup', () => changeBalls())


});