const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;


function animate() {
    ctx.clearRect(0, 0);

    requestAnimationFrame(animate)
}

animate();