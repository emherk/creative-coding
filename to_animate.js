const canvasSketch = require("canvas-sketch");
const { degToRad } = require("canvas-sketch-util/math");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  duration:2,
  fps: 60
};

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

const sketch = () => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.lineWidth =  8

    const cx = width * 0.5;
    const cy = height * 0.5;

    let hMultiplier = 0.026;
    // let h = height * hMultiplier;

    const radius = width * 0.3;
    const slices = 24;

    const clock = new Clock(cx, cy, radius, height, width, hMultiplier);

    clock.updateHMultiplier(playhead)
    clock.drawCircle(context, slices)

    context.beginPath();
    context.lineWidth = 19;
    context.arc(cx, cy, 4, 0, degToRad(360));
    context.stroke();
  };
};

// class ClockRectangle {
//   constructor(x, y, width, height, angle, clock) {
//     this.x = x;
//     this.y = y;
//     this.angle = angle;
//   }

//   update() {

//   }
// }

class Clock {
  constructor(cx, cy, radius, height, width, hMultiplier) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.height = height;
    this.width = width;
    this.hMultiplier = hMultiplier;
    this.h = height * hMultiplier;
    this.w = width * 0.006;
    this.growing = true;
  }


  updateHMultiplier = (playhead) => {
    console.log(this.growing)
    if (this.growing && this.hMultiplier < 0.6) {
      this.hMultiplier += playhead * 3;
    } else if (this.growing && this.hMultiplier >= 0.6) {
      this.growing = false;
    } else if (!this.growing && this.hMultiplier > 0.01) {
      this.hMultiplier -= playhead * 3;
    } else if (!this.growing && this.hMultiplier < 0.01) {
      this.growing = true;
    }
    this.h = this.height * this.hMultiplier;
  };

  drawCircle = (context, slices) => {
    const angleBetween = degToRad(360 / slices);
    for (let i = 0; i < slices; i++) {
      const angle = i * angleBetween;

      context.save();
      context.translate(
        this.cx + this.radius * Math.sin(angle),
        this.cy + this.radius * Math.cos(angle)
      );
      context.rotate(angle);
      // context.scale(random.range(0.3, 2), random.range(0.3, 0.7));
      context.scale(0.5, 0.2)

      context.beginPath();
      context.rect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);
      context.fill();
      context.restore();

    }
  };
}
canvasSketch(sketch, settings);
