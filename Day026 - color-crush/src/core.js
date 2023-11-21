window.addEventListener('load', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const height = canvas.height = 600;
    const width = canvas.width = 350;
    const colors = {red: '#E53E3E', blue: '#4299E1'};
    const ballSize = 20;
    const ballX = canvas.width / 2;
    let lastTime = 0

    class Ball {
        constructor(options) {
            this.x = options.x;
            this.y = options.y;
            this.color = options.color || colors.red;
            this.size = options.size || ballSize;
            this.vy = options.vy || 0;
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
    }


    const topBall = new Ball({x: ballX, y: height / 2 - ballSize, color: colors.blue, vy: 0});
    const bottomBall = new Ball({x: ballX, y: height / 2 + ballSize, color: colors.red, vy: 0});

    function animate(timestamp) {
        ctx.clearRect(0, 0, width, height);
        const delta = timestamp - lastTime;
        lastTime = timestamp;
        bottomBall.draw();
        topBall.draw();

        requestAnimationFrame(animate);
    }


    animate(0);

    function changeBalls() {
        const temp = topBall.y;
        topBall.y = bottomBall.y
        bottomBall.y = temp;
    }

    document.addEventListener('click', () => changeBalls());
    document.addEventListener('keyup', () => changeBalls())


});