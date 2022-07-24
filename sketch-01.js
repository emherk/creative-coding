const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#FFD6D4";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#BCDEE8";
    context.strokeStyle = "#BCDEE8";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.006;
    let h = height * 0.09;
    const radius = width * 0.3;

    const numRect = 32;
    const angleBetween = math.degToRad(360 / numRect);
    for (let i = 0; i < numRect; i++) {
      const angle = i * angleBetween;

      context.save();
      context.translate(
        cx + radius * Math.sin(angle),
        cy + radius * Math.cos(angle)
      );
      context.rotate(-angle);
      context.scale(random.range(0.3, 2), random.range(0.3, 2));

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.arc(0, 0, radius, 0, angleBetween * 0.7);
      context.stroke();
      context.restore();

    }

    // context.beginPath();
    // context.lineWidth = 19;
    // context.arc(cx, cy, 4, 0, math.degToRad(360));
    // context.stroke();
  };
};

canvasSketch(sketch, settings);
