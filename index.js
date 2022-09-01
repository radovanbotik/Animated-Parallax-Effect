const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 300);
const CANVAS_HEIGHT = (canvas.height = 300);

let gameSpeed = 0;
// let gameFrame = 0;

const cloud = new Image();
cloud.src = "./Background/cloud.png";
const mountain = new Image();
mountain.src = "./Background/mountain.png";
const pine1 = new Image();
pine1.src = "./Background/pine1.png";
const pine2 = new Image();
pine2.src = "./Background/pine2.png";
const sky = new Image();
sky.src = "./Background/sky.png";

window.addEventListener("DOMContentLoaded", () => {
  const animationSpeedDOM = document.querySelector(".animation-speed");
  const slider = document.querySelector("#slider");
  slider.value = gameSpeed;
  animationSpeedDOM.textContent = gameSpeed;
  slider.addEventListener("change", e => {
    gameSpeed = e.target.value;
    animationSpeedDOM.textContent = gameSpeed;
  });
  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = image.width;
      this.height = image.height;
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
      // this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  const cloudDOM = new Layer(cloud, 2);
  const mountainDOM = new Layer(mountain, 1);
  const pineBackgroundDOM = new Layer(pine2, 1);
  const pineForegroundDOM = new Layer(pine1, 1);
  const skyDOM = new Layer(sky, 1);

  const imageObjects = [
    skyDOM,
    cloudDOM,
    pineBackgroundDOM,
    mountainDOM,
    pineForegroundDOM,
  ];

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //   gameFrame--;
    pineForegroundDOM.y = CANVAS_HEIGHT - pineForegroundDOM.height + 100;
    pineBackgroundDOM.y = CANVAS_HEIGHT - pineBackgroundDOM.height;
    mountainDOM.y = CANVAS_HEIGHT - mountainDOM.height;
    imageObjects.forEach((image, index) => {
      image.update();
      image.draw();
    });
    requestAnimationFrame(animate);
  };
  animate();
});
