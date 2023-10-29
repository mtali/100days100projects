const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = canvas.height = 700;
const CANVAS_WIDTH = canvas.width = 800;
let gameSpeed = 10;

const gameSpeedSlider = document.querySelector("#gameSpeed");
const gameSpeedSpan = document.querySelector("#speedValue");

updateSpeed(gameSpeed);


gameSpeedSlider.addEventListener("change", event => {
    let speed = event.target.value;
    updateSpeed(speed);
});

function updateSpeed(value) {
    gameSpeed = value;
    gameSpeedSlider.value = value;
    gameSpeedSpan.textContent = `${value}`;
}


const background1 = new Image();
background1.src = "images/layer-1.png";
const background2 = new Image();
background2.src = "images/layer-2.png";
const background3 = new Image();
background3.src = "images/layer-3.png";
const background4 = new Image();
background4.src = "images/layer-4.png";
const background5 = new Image();
background5.src = "images/layer-5.png";

class Layer {

    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

}

const layer1 = new Layer(background1, 0.2);
const layer2 = new Layer(background2, 0.4);
const layer3 = new Layer(background3, 0.6);
const layer4 = new Layer(background4, 0.8);
const layer5 = new Layer(background5, 1.0);

const layers = [layer1, layer2, layer3, layer4, layer5];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layers.forEach(layer => {
        layer.update();
        layer.draw();
    });
    requestAnimationFrame(animate);
}

animate();


